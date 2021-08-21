<template>
      <router-link to="/pagina_inicial">
          <button id="leave_btn" class="red_btn" style="left: 10px;">
            Voltar
          </button>
      </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px;color: rgb(85, 85, 85)"><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Empresa</u></h1>
  <br /><br /><br /><br /><br /><br />

  <!-- Informações ausentes !-->
  <div v-if="!empresaExists() && !cadastramentoBoolean">
        <h3 style="color: gray">Nenhuma informação encontrada.</h3>
        <button id="cadastramentoVisivelBtn"
                class="iniciar_cadastramento_btn"
                @click="cadastramentoBoolean = true;">
                Iniciar Cadastro
                </button>
  </div>

  <!-- Informações encontradas !-->
  <div v-if="empresa != null || cadastramentoBoolean" class="new_empresa_form">
        <label for="razao_social">Razão Social</label><br />
        <input id="razao_social" type="text" v-bind="newEmpresa.razaoSocial" />
        <br /><br />
        <label for="nome_fantasia">Nome Fantasia</label><br />
        <input id="nome_fantasia" type="text" v-bind="newEmpresa.nomeFantasia" />
        <br /><br />
        <label for="endereco">Endereço</label><br />
        <input id="endereco" type="text" v-bind="newEmpresa.endereco" />
        <br /><br />
        ... *inserção do logotipo* ...
        <br />
        <h3 style="color: rgb(85, 85, 85)">Definição da localização do terreno - coordenadas</h3>
        <label for="area_q1">Canto superior direito (ex.: 12.345678)</label><br />
        <input type="number" id="area_q1" v-bind="newEmpresa.area[0]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-1.png" />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {

  data() {
    return {
            newEmpresa: {
              id: 0,
              razaoSocial: undefined,
              nomeFantasia: undefined,
              endereco: undefined,
              logotipo: undefined,
              area: [-1, -1, -1, -1]
            },
            cadastramentoBoolean: false
    } 
  },
   computed: mapState([
     'empresa' 
   ]),

  methods: {
      empresaExists() {
        if (this.empresa != null) {
          return true;
        } else {
          return false;
        }
      },
      editEmpresa() {
      this.$store.dispatch('editEmpresa', this.newEmpresa);
    }
  },

  created() {
      this.$store.dispatch('loadEmpresa');
  }
  
}
</script>

<style scoped>
.iniciar_cadastramento_btn {
  background-color: rgb(0, 194, 0);
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  padding: 0 16px;
  width: 40%;
  color: white;
  cursor: pointer;
}

.iniciar_cadastramento_btn:hover {
  background-color: rgb(0, 156, 0);
}

.new_empresa_form label{
  font-weight: bolder;
}

.new_empresa_form input{
  padding-left: 30px;
  box-shadow: 0 0 2px gray;
}

img {
  width: 375px;
  border: 0.5px solid grey;
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

#leave_btn {
  background-image: url("../assets/leave_icon.png");
  top: 15px;
  left: 15px;
  position: fixed;
  text-align: center;
}
</style>