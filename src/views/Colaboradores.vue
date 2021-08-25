<template>
  <router-link to="/funcionarios">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Colaboradores</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="!colaboradores" style="color: grey">
    Nenhum colaborador encontrado.
  </h3>
  <button class="add_btn" @click="listagemInclusaoEdicaoMode = 2;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar</button
  ><br /><br />
  <div style="display: inline-block">





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Listagem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div v-if="colaboradores && listagemInclusaoEdicaoMode == 1">
    <table
      v-if="colaboradores"
      style="
        text-align: center;
        border-collapse: separate;
        border-spacing: 0 15px;
      "
    >
      <tr>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">ID</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Matrícula</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Nome</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">E-mail</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Data de nascimento</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Data de admissão</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Departamento</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Cargo</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(c, index) in colaboradores" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ c.id }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ c.matricula }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ c.nome }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ c.email }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ formatarDataPtBR(c.dataNasc) }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ formatarDataPtBR(c.dataAdmissao) }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ /*departamentos.find(d => d.id == c.departamento).nome*/c.departamento }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ /*cargos.find(c => c.id == c.cargo).nome*/ c.cargo }}</b>
        </td>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="edit_btn"
            @click="editDepartamento(d.nome, departamentos.indexOf(d))"
          >
            Editar
          </button>
        </td>
        &nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="delete_btn"
            @click="deleteDepartamento(d.nome, departamentos.indexOf(d))"
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Inclusão ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 2"><br /><br />
      <label for="matricula">Matrícula:</label><br />
      <input type="text" id="matricula" v-model="newColaborador.matricula" />
      <br /><br />
      <label for="nome">Nome:</label><br />
      <input type="text" id="nome" v-model="newColaborador.nome" />
      <br /><br />
      <label for="email">E-mail:</label><br />
      <input type="text" id="email" v-model="newColaborador.email" />
      <br /><br />
      <label for="telefone">Telefone:</label><br />
      <input type="text" id="telefone" v-model="newColaborador.telefone" />
      <br /><br />
      <label for="data_nasc">Data de nascimento:</label><br />
      <input type="date" id="data_nasc" v-model="newColaborador.dataNasc" />
      <br /><br />
      <label for="data_admissao">Data de admissão:</label><br />
      <input type="date" id="data_admissao" v-model="newColaborador.dataAdmissao" />
      <br /><br />
      <label for="departamento">Departamento:</label><br />
      <select id="departamento" v-model="newColaborador.departamento">
          <option v-for="(d, index) in departamentos" :key="index" :value="d.id">{{d.nome}}</option>
      </select>
      <br /><br />
      <label for="cargo">Cargo:</label><br />
      <select id="cargo" v-model="newColaborador.cargo">
          <option v-for="(c, index) in cargos" :key="index" :value="c.id">{{c.nome}}</option>
      </select>
      <br /><br /><br /><br />

      
      <button id="addColaborador"
                class="salvar_btn"
                @click="addColaborador();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoEmpresa"
                    class="cancelar_btn"
                    @click="resetarFormularios();">
                    Cancelar
        </button>
        <br /><br />
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 3">*Edição*
<!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||| Formulário de edição aqui ;) ||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
</div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            /* 
               1: listagem
               2: inclusão
               3: edição
            */
            listagemInclusaoEdicaoMode: 1,
            newColaborador:
            {
                id: -1,
                matricula: '',
                nome: '',
                email: '',
                telefone: '',
                dataNasc: null,
                dataAdmissao: null,
                departamento: null,
                cargo: null,
                usuário: null
            }
        }
    },
    computed: {
    cargos: function () {
      return this.$store.state.cargos;
    },
    departamentos: function () {
        return this.$store.state.departamentos;
    },
    colaboradores: function () {
      return this.$store.state.colaboradores;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadColaboradores");
    this.$store.dispatch("loadDepartamentos");
    this.$store.dispatch("loadCargos");
  },
  methods: {
    formatarDataPtBR(data) {
      var data_arr = data.split('-');
      return data_arr[2] + "/" + data_arr[1] + "/" + data_arr[0];
    },
    resetarFormularios() {
      this.listagemInclusaoEdicaoMode = 1;
      this.newColaborador = 
      {
                id: -1,
                matricula: '',
                nome: '',
                email: '',
                telefone: '',
                dataNasc: null,
                dataAdmissao: null,
                departamento: null,
                cargo: null,
                usuário: null
      }
    },
    addColaborador() {
      this.$store.dispatch('addColaborador', this.newColaborador);
      this.resetarFormularios();
    }
  }
}
</script>

<style scoped>
label {
  font-weight: bolder;
}

input {
  padding-left: 60px;
  box-shadow: 0 0 2px gray;
}

.add_btn {
  background-color: rgb(0, 194, 0);
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  padding: 0 16px;
  width: 10%;
  color: white;
  cursor: pointer;
  text-align: center;
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/add_icon.png");
}

.add_btn:hover {
  background-color: rgb(0, 156, 0);
}

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

.edit_btn {
  background-color: #1877f2;
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
  background-image: url("../assets/edit_icon.png");
}

.edit_btn:hover {
  background-color: #1664ca;
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

.salvar_btn {
  background-color: #1877f2;
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
  background-image: url("../assets/save_icon.png");
}

.cancelar_btn {
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  padding: 0 16px;
  padding-left: 50px;
  width: 142.5px;
  color: white;
  cursor: pointer;
  text-align: center;
  /*margin: 10px;*/
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/cancel_icon.png");
}

.salvar_btn:hover, .cancelar_btn:hover {
  background-color: #1664ca;
}
</style>