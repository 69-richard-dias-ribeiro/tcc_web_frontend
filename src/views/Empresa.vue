<template><div v-if="$store.state.userAllowed">
      <router-link to="/pagina_inicial">
          <button id="leave_btn" class="red_btn" style="left: 10px;">
            Voltar
          </button>
      </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey; background: transparent;"><u style="background: transparent;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Empresa</u></h1>
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
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[0][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[0][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-1.png" /><br /><br />

                                        

        <label for="area_q2">Canto superior esquerdo (ex.: 12,345678)</label><br />
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[1][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[1][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-2.png" /><br /><br />



        <label for="area_q3">Canto inferior esquerdo (ex.: 12,345678)</label><br />
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[2][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[2][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-3.png" /><br /><br />



        <label for="area_q4">Canto inferior direito (ex.: 12,345678)</label><br />
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[3][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[3][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-4.png" /><br /><br /><br />

        <button id="editarEmpresa"
                class="salvar_btn"
                @click="editEmpresa('Incluíndo');">
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
        <div>
                <li v-for="(v, index) in areas.find((a) => a.titulo == 'Empresa').coordenadas" :key="index">
                    {{ " Longitude:" + v[0] + "   |   Latitude: " + v[1] }}<br/>
                </li>
            </div>
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
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[0][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[0][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-1.png" /><br /><br />

                                        

        <label for="area_q2">Canto superior esquerdo (ex.: 12,345678)</label><br />
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[1][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[1][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-2.png" /><br /><br />



        <label for="area_q3">Canto inferior esquerdo (ex.: 12,345678)</label><br />
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[2][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[2][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-3.png" /><br /><br />



        <label for="area_q4">Canto inferior direito (ex.: 12,345678)</label><br />
        &nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px; border: none;"/>Longitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[3][0]" />
        <br/>
        <img src="../assets/latitude_icon.png" style="width: 30px; border: none;"/>Latitude:&nbsp;&nbsp;
        <input type="number" id="longitude" v-model="newArea.coordenadas[3][1]" />
        <br /><br />
        <img src="../assets/input_localizacao_empresa-quadrante-4.png" /><br /><br /><br />

        <button id="editarEmpresa"
                class="salvar_btn"
                @click="editEmpresa('Editando');">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoEmpresa"
                    class="cancelar_btn"
                    @click="edicaoHabilitada = false;">
                    Cancelar
        </button>
        <br /><br />

  </div>
  </div>
  <div v-else>
    <h1 style="padding: 50px; color: grey;">Erro 401: usuário não autorizado</h1>
    <router-link to="/">Página de login</router-link>
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
              //logotipo: '',
              //area: []
              area: 1
            },
              edicaoHabilitada: false,
              newArea: {
                  id: 1,
                  titulo: 'Empresa',
                  descricao: 'registro contendo os vértices referentes a área na qual está situada a empresa como um todo.',
                  coordenadas: [[null,null],
                                [null,null],
                                [null,null],
                                [null,null]]
              }
    } 
  },
   computed: {
     empresa: function () {
      return this.$store.state.empresa;
    },
    areas: function () {
      return this.$store.state.areas;
    }
   },

  methods: {
      editEmpresa(incluindoOuEditando) {
        if (incluindoOuEditando == "Incluíndo") {
          this.$store.dispatch('editEmpresa', this.newEmpresa);
          this.$store.dispatch('addArea', this.newArea);

        } else if (incluindoOuEditando == "Editando") {
          var referenciaAreaDaEmpresa = this.areas.find(a => a.titulo == 'Empresa');

          var objForEditing = {
            areaForEditing: this.newArea,
            idOfNewArea: this.areas.indexOf(referenciaAreaDaEmpresa),
          };

          this.$store.dispatch("editArea", objForEditing);
        }
        
        this.edicaoHabilitada = false;
  },
  prepararParaEdicao() {
    this.newEmpresa = this.empresa;
    this.edicaoHabilitada = true;
  }
},

  beforeCreate () {
      this.$store.dispatch('loadEmpresa');
      this.$store.dispatch('loadAreas'); 
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