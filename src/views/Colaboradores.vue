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
  <button class="add_btn" @click="addColaborador()">
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
          <b>{{ c.dataDeNascimento }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ c.dataDeAdmissao }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ departamentos.find(d => d.id == c.departamento).nome }}</b>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <b>{{ cargos.find(c => c.id == c.cargo).nome }}</b>
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
<div v-if="listagemInclusaoEdicaoMode == 2">
<!-- ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
||||||||||||||||||||||||||||| Formulário de inclusão aqui ;) ||||||||||||||||||||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| -->
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 3">
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
            // 1: listagem
            // 2: inclusão
            // 3: edição
            listagemInclusaoEdicaoMode: 1
        }
    },
    computed: {
    cargos: function () {
      return this.$store.state.cargos;
    },
    departamentos: function () {
        return this.$store.state.departamentos;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadColaboradores");
  },
  methods: {
    //   addColaborador() {

    //   }
  }
}
</script>

<style scoped>
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
</style>