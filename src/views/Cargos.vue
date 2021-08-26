<template>
  <router-link to="/funcionarios">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cargos</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="!cargos || cargos.length == 0" style="color: grey">
    Nenhum cargo encontrado.
  </h3>
  <button class="add_btn" @click="addCargo()">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar</button
  ><br /><br />
  <div style="display: inline-block">
    <table
      v-if="cargos && cargos.length > 0"
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
      <tr v-for="(c, index) in cargos" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ c.id }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ c.nome }}
        </td>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="edit_btn"
            @click="editCargo(c.nome, cargos.indexOf(c))"
          >
            Editar
          </button>
        </td>
        &nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="delete_btn"
            @click="deleteCargo(c.nome, cargos.indexOf(c))"
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  methods: {
    addCargo() {
      var nome_novo_cargo = prompt("Novo cargo:", "");

      var newCargo = { id: -1, nome: nome_novo_cargo };

      this.$store.dispatch("addCargo", newCargo);
    },
    deleteCargo(nome, id) {
      if (confirm('Confirma a exclusão do cargo "' + nome + '"?')) {
        this.$store.dispatch("deleteCargo", id);
      }
    },
    editCargo(nome, idItemASerEditado) {
      var resp = prompt('Novo valor de "' + nome + '":');

      if (resp) {

        var objForEditing = {
          newCargo: { 
                             id: -1, 
                             nome: resp, 
                           },
          idOfNewRole: idItemASerEditado,
        };

        this.$store.dispatch("editCargo", objForEditing);
      }
    }
  },
  computed: {
    cargos: function () {
      return this.$store.state.cargos;
    },
  },
  beforeCreate() {
    this.$store.dispatch("loadCargos");
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