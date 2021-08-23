<template>
      <router-link to="/pagina_inicial">
          <button id="leave_btn" class="red_btn" style="left: 10px;">
            Voltar
          </button>
      </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey;"><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Empresa</u></h1>
  <br /><br /><br /><br /><br /><br />

  <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Inclusão ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div v-if="!empresa" class="new_empresa_form">

        <label for="razao_social">Razão Social</label><br />
        <input id="razao_social" type="text" v-model="newEmpresa.razaoSocial" />
        <br /><br />
        <label for="nome_fantasia">Nome Fantasia</label><br />
        <input id="nome_fantasia" type="text" v-model="newEmpresa.nomeFantasia" />
        <br /><br />
        <label for="endereco">Endereço</label><br />
        <input id="endereco" type="text" v-model="newEmpresa.endereco" />
        <br /><br />
        



        <h3><u>Definição da localização do terreno - coordenadas</u></h3>
        <label for="area_q1">Canto superior direito (ex.: 12,345678)</label><br />
        <input type="number" id="area_q1" v-model="newEmpresa.area[0]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-1.png" /><br /><br />

                                        

        <label for="area_q2">Canto superior esquerdo (ex.: 12,345678)</label><br />
        <input type="number" id="area_q2" v-model="newEmpresa.area[1]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-2.png" /><br /><br />



        <label for="area_q3">Canto inferior esquerdo (ex.: 12,345678)</label><br />
        <input type="number" id="area_q3" v-model="newEmpresa.area[2]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-3.png" /><br /><br />



        <label for="area_q4">Canto inferior direito (ex.: 12,345678)</label><br />
        <input type="number" id="area_q4" v-model="newEmpresa.area[3]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-4.png" /><br /><br /><br />

        <button id="editarEmpresa"
                class="salvar_btn"
                @click="editEmpresa();">
                Salvar
        </button><br /><br />

  </div>
    <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Exibição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div v-if="empresa && !edicaoHabilitada" class="new_empresa_form">

        <button
                class="editar_empresa_btn"
                @click="prepararParaEdicao();">
                Editar informações
        </button><br /><br />

        <h4>Razão Social</h4>
        {{ empresa.razaoSocial }}
        <br />
        <h4>Nome Fantasia</h4>
        {{ empresa.nomeFantasia }}
        <br />
        <h4>Endereço</h4>
        {{ empresa.endereco }}
        <br /><br />
        



        <h3><u>Definição da localização do terreno - coordenadas</u></h3>
        <h4>Canto superior direito</h4>
        {{ empresa.area[0] }}<br />
        <h4>Canto superior esquerdo</h4>
        {{ empresa.area[1] }}<br />
        <h4>Canto inferior esquerdo</h4>
        {{ empresa.area[2] }}<br />
        <h4>Canto inferior direito</h4>
        {{ empresa.area[3] }}<br /><br />
  </div>
      <!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
  <div v-if="empresa && edicaoHabilitada" class="new_empresa_form">

        <label for="razao_social">Razão Social</label><br />
        <input id="razao_social" type="text" v-model="newEmpresa.razaoSocial" />
        <br /><br />
        <label for="nome_fantasia">Nome Fantasia</label><br />
        <input id="nome_fantasia" type="text" v-model="newEmpresa.nomeFantasia" />
        <br /><br />
        <label for="endereco">Endereço</label><br />
        <input id="endereco" type="text" v-model="newEmpresa.endereco" />
        <br /><br />
        



        <h3><u>Definição da localização do terreno - coordenadas</u></h3>
        <label for="area_q1">Canto superior direito (ex.: 12,345678)</label><br />
        <input type="number" id="area_q1" v-model="newEmpresa.area[0]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-1.png" /><br /><br />

                                        

        <label for="area_q2">Canto superior esquerdo (ex.: 12,345678)</label><br />
        <input type="number" id="area_q2" v-model="newEmpresa.area[1]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-2.png" /><br /><br />



        <label for="area_q3">Canto inferior esquerdo (ex.: 12,345678)</label><br />
        <input type="number" id="area_q3" v-model="newEmpresa.area[2]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-3.png" /><br /><br />



        <label for="area_q4">Canto inferior direito (ex.: 12,345678)</label><br />
        <input type="number" id="area_q4" v-model="newEmpresa.area[3]" /><br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-4.png" /><br /><br /><br />

        <button id="editarEmpresa"
                class="salvar_btn"
                @click="editEmpresa();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoEmpresa"
                    class="cancelar_btn"
                    @click="edicaoHabilitada = false;">
                    Cancelar
        </button>
        <br /><br />

  </div>
</template>

<script>
//import { mapState } from 'vuex';

export default {

  data() {
    return {
            newEmpresa: {
              id: -1,
              razaoSocial: '',
              nomeFantasia: '',
              endereco: '',
              logotipo: '',
              area: []
            },
            edicaoHabilitada: false
    } 
  },
   computed: {
     empresa: function () {
      return this.$store.state.empresa;
    }
   },

  methods: {
      editEmpresa() {
        this.$store.dispatch('editEmpresa', this.newEmpresa);
        this.edicaoHabilitada = false;
  },
  prepararParaEdicao() {
    this.newEmpresa = this.empresa;
    this.edicaoHabilitada = true;
  }
},

  beforeCreate () {
      this.$store.dispatch('loadEmpresa');
  }
  
}
</script>

<style scoped>
.editar_empresa_btn {
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

.editar_empresa_btn:hover {
  background-color: rgb(0, 156, 0);
}

.new_empresa_form label{
  font-weight: bolder;
}

.new_empresa_form input{
  padding-left: 60px;
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

.red_btn:hover {
  background-color: #c22d00;
}
</style>