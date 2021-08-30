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
<button style="cursor: pointer; box-shadow: 0 0 5px grey;background-color: black; color: white; border-color: green; border: 3px solid green;" @click="addRegistro__teste()">T E S T E - adicionar registro</button>


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
      <tr>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">ID</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Data</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Colaborador</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Área</th>
        <th style="border-bottom: 2px solid grey;">Restrição</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(r, index) in registros" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ r.id }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ formatarDataPtBR(r.data) }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ colaboradores.find(c => { return c.id == r.colaborador }).matricula }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ areas.find(a => { return a.id == r.area }).titulo }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ restricoes.find(restricao => { return restricao.id == r.restricao }).titulo }}
        </td>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <td>
          <button
            class="delete_btn"
            @click="deleteRegistro(registros.indexOf(c));"
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
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
                area: -1,
                restricao: -1
            }
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

</style>