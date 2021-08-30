<template>
  <router-link to="/funcionarios">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Usuários</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="(!usuarios || usuarios.length <= 0) && (listagemInclusaoEdicaoMode == 1)" style="color: grey">
    Nenhum usuário encontrado.
  </h3><span v-if="listagemInclusaoEdicaoMode == 1">
  <button class="add_btn" @click="listagemInclusaoEdicaoMode = 2;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar</button
  ></span><br /><br />
  <div style="display: inline-block">





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Listagem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div v-if="usuarios && usuarios.length > 0 && listagemInclusaoEdicaoMode == 1">
    <table
      v-if="usuarios"
      style="
        text-align: center;
        border-collapse: separate;
        border-spacing: 0 15px;
      "
    >
      <tr>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">ID</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Usuário</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Senha</th>
        <th style="border-bottom: 2px solid grey;">É Adm</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(u, index) in usuarios" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ u.id }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ colaboradores.find(c => { return c.id == u.usuario }).matricula }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ u.senha }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ calculaEadm(u) }}
        </td>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="edit_btn"
            @click="prepararFormEdicao(u);"
          >
            Editar
          </button>
        </td>
        &nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="delete_btn"
            @click="deleteUsuario(colaboradores.find(c => { return c.id == u.usuario }).matricula,
                                  colaboradores.find(c => { return c.id == u.usuario }).nome, usuarios.indexOf(u));"
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Inclusão ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 2"><br /><br />

      <label for="usuario">Usuário (matrícula do colaborador):</label><br />
      <select id="usuario" v-model="newUsuario.usuario">
          <option v-for="(c, index) in colaboradores" :key="index" :value="c.id">{{c.matricula}}</option>
      </select><br /><br />
      <label for="senha">Senha:</label><br />
      <input type="text" id="senha" v-model="newUsuario.senha" />
      <br /><br /><label>É Adm:</label><br />
      
      <input type="radio"  class="radioRadioso" name="eadm" id="eadm_sim" value="1" v-model="newUsuario.eadm"/>
      <label for="eadm_sim" style="font-weight: normal; cursor: pointer">Sim</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <input type="radio"  class="radioRadioso" name="eadm" id="eadm_nao" value="0" v-model="newUsuario.eadm"/>
      <label for="eadm_nao" style="font-weight: normal;  cursor: pointer">Não</label>
      <br /><br /><br /><br />

      <button id="addUsuario"
                class="salvar_btn"
                @click="addUsuario();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoUsuario"
                    class="cancelar_btn"
                    @click="resetarFormularios();">
                    Cancelar
        </button>
        <br /><br />
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 3"><br /><br />
      
      <label for="usuario">Usuário (matrícula do colaborador):</label><br />
      <select id="usuario" v-model="newUsuario.usuario">
          <option v-for="(c, index) in colaboradores" :key="index" :value="c.id">{{c.matricula}}</option>
      </select><br /><br />
      <label for="senha">Senha:</label><br />
      <input type="text" id="senha" v-model="newUsuario.senha" />
      <br /><br /><label>É Adm:</label><br />
      
      <input type="radio"  class="radioRadioso" name="eadm" id="eadm_sim" value="1" v-model="newUsuario.eadm"/>
      <label for="eadm_sim" style="font-weight: normal; cursor: pointer">Sim</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <input type="radio"  class="radioRadioso" name="eadm" id="eadm_nao" value="0" v-model="newUsuario.eadm"/>
      <label for="eadm_nao" style="font-weight: normal; cursor: pointer">Não</label>
      <br /><br /><br /><br />
      
      <button id="editUsuario"
                class="salvar_btn"
                @click="editUsuario();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoUsuario"
                    class="cancelar_btn"
                    @click="resetarFormularios();">
                    Cancelar
        </button>
        <br /><br />
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
            newUsuario:
            {
                id: -1,
                usuario: '',
                senha: '',
                eadm: ''
            }
        }
    },
    computed: {
    usuarios: function() {
      return this.$store.state.usuarios;
    },
    colaboradores: function () {
      return this.$store.state.colaboradores;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadColaboradores");
    this.$store.dispatch("loadUsuarios");
  },
  methods: {
    resetarFormularios() {
      this.listagemInclusaoEdicaoMode = 1;
      this.newUsuario = 
            {
                id: -1,
                usuario: '',
                senha: '',
                eadm: ''
            }
    },
    prepararFormEdicao(u) {
      this.listagemInclusaoEdicaoMode = 3;
      this.indexOfUsuarioASerEditado = this.usuarios.indexOf(u);
      this.newUsuario = 
            {
                id: u.id,
                usuario: u.usuario,
                senha: u.senha,
                eadm: u.eadm
            }
    },
    addUsuario() {
      this.$store.dispatch('addUsuario', this.newUsuario);
      this.resetarFormularios();
    },
    editUsuario() {
      var objForEditing = {
          usuarioForEditing: this.newUsuario,
          idOfNewUsuario: this.indexOfUsuarioASerEditado,
        };

        this.$store.dispatch("editUsuario", objForEditing);
        this.resetarFormularios();
    },
    deleteUsuario(matricula, nome, id) {
      if (confirm('Confirma a exclusão do(a) usuário(a) ' + matricula + ' (' + nome + ')?')) {
        this.$store.dispatch("deleteUsuario", id);
      }
    },
    calculaEadm(u) {
      if ( parseInt(u.eadm) == 1) {
        return "Sim";
      } else {
        return "Não"
      }
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

/* .radioRadioso {
  transform: scale(1.5);
  font-size: large;
  background:transparent;
  cursor: pointer;
} */

input[type="radio"] {
   box-shadow: none !important;
   cursor: pointer;
   width: 1.5em;
   height: 1.5em;
} 

select option {
  cursor: pointer;
}
</style>