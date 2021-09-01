<template>
  <router-link to="/pagina_inicial">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Registros</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="!registros || registros.length <= 0" style="color: grey">
    <br />Nenhum registro encontrado.
  </h3><br /><br />
  <div style="display: inline-block">

<h3 style="position: fixed; left: 370px; top: 63px; color: #B0B0B0; background: transparent;">Listagem com o histórico de restrições infringidas ao longo do tempo.</h3>
<!-- <button style="cursor: pointer; box-shadow: 0 0 5px grey;background-color: black; color: white; border-color: green; border: 3px solid green;" @click="addRegistro__teste">T E S T E - adicionar registro</button> -->



<button @click="filtragem = !filtragem; dataMinima= '1900-01-01'; dataMaxima= '2050-12-31'" class="filter_btn">
{{ filtragem ? "Limpar filtros" : "Filtrar"}}
</button>



<div v-if="filtragem"><br /></div>
<div style="padding: 10px; box-shadow: 0 0 3px grey;" v-if="filtragem">
<label for="data_minima"><b>Data Mínima:&nbsp;&nbsp;</b></label>
<input id="data_minima" name="data_minima" type="date" v-model="dataMinima" />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<label for="data_minima"><b>Data Máxima:&nbsp;&nbsp;</b></label>
<input id="data_maxima" name="data_maxima" type="date" v-model="dataMaxima" /><br />
</div><br />


<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Listagem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div v-if="registros && registros.length > 0">
    <table
      v-if="registros"
      style="
        text-align: center;
        border-collapse: separate;
        border-spacing: 0 15px;
      "
    >
      <tr v-if="new Date(dataMinima) && new Date(dataMaxima) && registros.find((reg) => reg.data >= dataMinima && reg.data <= dataMaxima)">
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">ID</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Data</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Colaborador</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Área</th>
        <th style="border-bottom: 2px solid grey;">Restrição</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(r, index) in registros" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;" v-if="new Date(dataMinima) && new Date(dataMaxima) && r.data >= dataMinima && r.data <= dataMaxima">
          {{ r.id }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;" v-if="new Date(dataMinima) && new Date(dataMaxima) && r.data >= dataMinima && r.data <= dataMaxima">
          {{ formatarDataPtBR(r.data) }}
        </td>
        <td :title="tooltipColaboradores(colaboradores.find(c => { return c.id == r.colaborador }))" style="cursor: zoom-in; padding-right: 15px; border: 0.25px solid grey;" v-if="new Date(dataMinima) && new Date(dataMaxima) && r.data >= dataMinima && r.data <= dataMaxima">
          {{ colaboradores.find(c => { return c.id == r.colaborador }).matricula }}
        </td>
        <td :title="tooltipAreas(areas.find(a => { return a.id == r.area }))" style="cursor: zoom-in; padding-right: 15px; border: 0.25px solid grey;" v-if="new Date(dataMinima) && new Date(dataMaxima) && r.data >= dataMinima && r.data <= dataMaxima">
          {{ areas.find(a => { return a.id == r.area }).titulo }}
        </td>
        <td :title="tooltipRestricoes(restricoes.find(restricao => { return restricao.id == r.restricao }))" style="cursor: zoom-in; padding-right: 15px; border: 0.25px solid grey;" v-if="new Date(dataMinima) && new Date(dataMaxima) && r.data >= dataMinima && r.data <= dataMaxima">
          {{ restricoes.find(restricao => { return restricao.id == r.restricao }).titulo }}
        </td>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <td v-if="new Date(dataMinima) && new Date(dataMaxima) && r.data >= dataMinima && r.data <= dataMaxima">
          <button
            class="delete_btn"
            @click="deleteRegistro(registros.indexOf(c));"
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
    <h3 v-if="new Date(dataMinima) && new Date(dataMaxima) && !registros.find((reg) => reg.data >= dataMinima && reg.data <= dataMaxima)" style="color:grey">Nenhum resultado encontrado para o filtro especificado.</h3>
</div>

</div> <!-- <<< n excluir essa div aqui, pfv, rs -->
</template>

<script>
export default {
    data() {
        return {
            newRegistro__teste:
            {
                id: 1,
                data: '2000-12-29',
                colaborador: 1,
                area: 1,
                restricao: 1
            },
            dataMinima: '1900-01-01',
            dataMaxima: '2050-12-31',
            filtragem: false
        }
    },
    computed: {
    registros: function () {
      return this.$store.state.registros;
    },
    colaboradores: function () {
      return this.$store.state.colaboradores;
    },
    areas: function () {
        return this.$store.state.areas;
    },
    restricoes: function () {
        return this.$store.state.restricoes;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadRegistros");
    this.$store.dispatch("loadColaboradores");
    this.$store.dispatch("loadAreas");
    this.$store.dispatch("loadRestricoes");
  },
  methods: {
    tooltipColaboradores(c) {
      return "Nome: " + c.nome + "\n" + 
             "Email:" + c.email + "\n" + 
             "Telefone: " + c.telefone;
    },
    tooltipAreas(a) {
      return "Descrição: " + a.titulo;
    },
    tooltipRestricoes(r) {
      var defineTipo = function(t) {
        if (t == 1) {
          return "Acesso Restrito";
        } else if (t == 2) {
          return "Distanciamento Social";
        } else {
          return " - ";
        }
      };

      var defineNivelRisco = function(nr) {
        if (parseInt(nr) == 1) {
          return "Baixo";
        } else if (parseInt(nr) == 2) {
          return "Médio";
        } else if (parseInt(nr) == 3) {
          return "Alto";
        } else {
          return " - ";
        }
      };

      var defineRestricaoGlobal = function(rg) {
        if (parseInt(rg) == 1) {
          return "Sim";
        } else if (parseInt(rg) == 0) {
          return "Não";
        } else {
          return " - ";
        }
      };

      return "Descrição: " + r.descricao + "\n" + 
             "Tipo: " + defineTipo(r.tipo) + "\n" + 
             "Nível de Risco: " + defineNivelRisco(r.nivelRisco) + "\n" +
             "É global: " + defineRestricaoGlobal(r.restricaoGlobal);
    },
      addRegistro__teste() {
      this.$store.dispatch('addRegistro', this.newRegistro__teste);
    },
    formatarDataPtBR(data) {
      var data_arr = data.split('-');
      return data_arr[2] + "/" + data_arr[1] + "/" + data_arr[0];
    },
    // addRegistro() {
    //   this.$store.dispatch('addRegistro', this.newRegistro);
    // },
    deleteRegistro(id) {
      if (confirm('Confirma a exclusão do registro com id igual a ' + id + '?')) {
        this.$store.dispatch("deleteRegistro", id);
      }
    }
  }
}
</script>

<style scoped>

.red_btn {
  background-color: #d93400;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  padding: 0 16px;
  padding-left: 50px;
  width: 120px;
  color: white;
  cursor: pointer;
  text-align: center;
  /*margin: 10px;*/
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
}

.red_btn:hover {
  background-color: #c22d00;
}

#leave_btn {
  background-image: url("../assets/leave_icon.png");
  top: 15px;
  left: 15px;
  position: fixed;
  text-align: center;
}

.delete_btn {
  background-color: #d93400;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  line-height: 28px;
  padding: 0 5px;
  padding-left: 35px;
  width: 110x;
  color: white;
  cursor: pointer;
  text-align: center;
  /*margin: 10px;*/
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/delete_icon.png");
}

.delete_btn:hover {
  background-color: #c22d00;
}

.hiddenRow {
  display: none;
}

input[type="date"] {
  box-shadow: 0 0 2px gray;
}

.filter_btn {
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  line-height: 28px;
  padding: 0 5px;
  padding-left: 45px;
  padding-right: 10px;
  width: 110x;
  color: white;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  /*margin: 10px;*/
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/filter_icon.png");

}

.filter_btn:hover {
  background-color: #1664ca;
}

</style>