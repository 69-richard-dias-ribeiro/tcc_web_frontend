<template><div v-if="$store.state.userAllowed">
  <router-link to="/funcionarios">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Departamentos</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="!departamentos || departamentos.length <= 0" style="color: grey">
    Nenhum departamento encontrado.
  </h3>
  <button class="add_btn" @click="addDepartamento()">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar</button
  ><br /><br />
  <div style="display: inline-block">
    <table
      v-if="departamentos && departamentos.length > 0"
      style="
        text-align: center;
        border-collapse: separate;
        border-spacing: 0 15px;
      "
    >
      <tr>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey; padding: 0 10px;">ID</th>
        <th style="border-bottom: 2px solid grey; padding: 0 10px;">Nome</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(d, index) in departamentos" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ d.id }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ d.nome }}
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
  </div>
  <div v-else>
    <h1 style="padding: 50px; color: grey;">Erro 401: usuário não autorizado</h1>
  </div>
</template>

<script>
export default {
  methods: {
    addDepartamento() {
      var nome_novo_departamento = prompt("Novo departamento:", "");

      var newDepartamento = { id: -1, nome: nome_novo_departamento };

      this.$store.dispatch("addDepartamento", newDepartamento);
    },
    deleteDepartamento(nome, id) {
      if (confirm('Confirma a exclusão do departamento "' + nome + '"?')) {
        this.$store.dispatch("deleteDepartamento", id);
      }
    },
    editDepartamento(nome, idItemASerEditado) {
      var resp = prompt('Novo valor de "' + nome + '":');

      if (resp) {

        var objForEditing = {
          newDepartamento: { 
                             id: -1, 
                             nome: resp, 
                           },
          idOfNewDepartment: idItemASerEditado,
        };

        this.$store.dispatch("editDepartamento", objForEditing);
      }
    }
  },
  computed: {
    departamentos: function () {
      return this.$store.state.departamentos;
    },
  },
  beforeCreate() {
    this.$store.dispatch("loadDepartamentos");
  },
};
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