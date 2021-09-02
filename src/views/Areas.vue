<template><div v-if="$store.state.userAllowed">
  <router-link to="/pagina_inicial">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Áreas</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="(!areas || areas.length <= 0) && (listagemInclusaoEdicaoMode == 1)" style="color: grey">
    Nenhuma área encontrada.
  </h3>
  <div>
  <p v-if="areas && !areas.find((a) => a.titulo.toUpperCase() == 'EMPRESA') && listagemInclusaoEdicaoMode == 1" style="border-radius: 10px; border: 2px solid red; display: inline-block;
                                                                      padding: 10px; font-weight: bolder; background-color: yellow">
    Obs.: para que o sistema funcione como esperado, é necessário que haja<br />
          uma área cujo título seja "Empresa". Nela, insira as coordenadas<br />
          da sua coorporação como um todo
  </p>
  </div><span v-if="listagemInclusaoEdicaoMode == 1">
  <button class="add_btn" @click="listagemInclusaoEdicaoMode = 2;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar</button
  ></span><br /><br />
  <div style="display: inline-block">





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Listagem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div v-if="areas && areas.length > 0 && listagemInclusaoEdicaoMode == 1">
    <table
      v-if="areas"
      style="
        text-align: center;
        border-collapse: separate;
        border-spacing: 0 15px;
      "
    >
      <tr>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">ID</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Título</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Descrição</th>
        <th style="border-bottom: 2px solid grey;">Coordenadas</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(a, index) in areas" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;" :class="{area_principal: a.titulo == 'Empresa'}">
          <div>{{ a.id }}</div>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;" :class="{area_principal: a.titulo == 'Empresa'}">
          <div>{{ a.titulo }}</div>
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;" :class="{area_principal: a.titulo == 'Empresa'}">
          <div>{{ a.descricao }}</div>
        </td>
        <td v-if="a.coordenadas && a.coordenadas.length > 0" style="padding-right: 15px; border: 0.25px solid grey;"
          :class="{area_principal: a.titulo == 'Empresa'}">
            <ol style="text-align: left;">
                <li v-for="(v, index) in a.coordenadas" :key="index">
                    {{ " Longitude:" + v[0] + "   |   Latitude: " + v[1] }}<br/>
                </li>
            </ol>
        </td>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="edit_btn"
            @click="prepararFormEdicao(a);"
          >
            Editar
          </button>
        </td>
        &nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="delete_btn"
            @click="deleteArea(a.titulo, areas.indexOf(a));"
          >
            Excluir
          </button>
        </td>
      </tr>
    </table>
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Inclusão ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 2"><br /><br />

      <label for="titulo">Título:</label><br />
      <input type="text" id="titulo" v-model="newArea.titulo" />
      <br /><br />
      <label for="descricao">Descrição:</label><br />
      <textarea style="width: 100%; height: 50px;" type="text" id="descricao" v-model="newArea.descricao" />
      <br /><br />

      <h3><u>Coordenadas dos vértices da área</u></h3>



      <div v-if="areas && !areas.find((a) => a.titulo.toUpperCase() == 'EMPRESA') && newArea.titulo.toUpperCase() == 'EMPRESA'">
      <span style="bolder">&#9679;&nbsp;Insira as coordenadas de sua organização na seguinte</span>&nbsp;<b>ordem:</b><br />
      <br />
      <img src="../assets/input_localizacao_empresa-quadrantes_gif.gif" />
      <br />
      </div>



      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px;"/>Longitude:&nbsp;&nbsp;
      <input type="number" id="longitude" v-model="newLongitude" />
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/latitude_icon.png" style="width: 30px;"/>Latitude:&nbsp;&nbsp;
      <input type="number" id="latitude" v-model="newLatitude" />
      <br /><br />
      



    <div style="border: 1px solid grey;" v-if="newArea.coordenadas && newArea.coordenadas.length > 0">
      <div v-for="(v, index) in newArea.coordenadas" :key="index" style="border-bottom: 1px solid grey;">
              {{ ( index + 1 ) + " º vértice: Longitude:" + v[0] + " | Latitude: " + v[1] }}<br/>
      </div>
    </div><br />


      <button v-if="newArea.coordenadas && newArea.coordenadas.length < 4" @click="addNewCoordenadaToNewArea();" class="inflating_btn" style=" border:none; background-color: green; color: white; cursor: pointer; font-size: 16px;">&#10010;&nbsp;&nbsp;Adicionar coordenada</button>&nbsp;
      <button @click="clearCoordenadas();" class="inflating_btn" style="border: none; background-color: red; color: white; cursor: pointer; font-size: 16px;">&#10006;&nbsp;&nbsp;Limpar Coordenadas</button>
      <br /><br /><br /><br />

      <button id="addArea"
                class="salvar_btn"
                @click="addArea();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoArea"
                    class="cancelar_btn"
                    @click="resetarFormularios();">
                    Cancelar
        </button>
        <br /><br />
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 3"><br /><br />
      
      <label for="titulo">Título:</label><br />
      <input type="text" id="titulo" v-model="newArea.titulo" />
      <br /><br />
      <label for="descricao">Descrição:</label><br />
      <textarea style="width: 100%; height: 50px;" type="text" id="descricao" v-model="newArea.descricao" />
      <br /><br />

      <h3><u>Coordenadas dos vértices da área</u></h3>

      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/longitude_icon.png" style="width: 30px;"/>Longitude:&nbsp;&nbsp;
      <input type="number" id="longitude" v-model="newLongitude" />
      <br/>
      &nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/latitude_icon.png" style="width: 30px;"/>Latitude:&nbsp;&nbsp;
      <input type="number" id="latitude" v-model="newLatitude" />
      <br /><br />
      



    <div style="border: 1px solid grey;" v-if="newArea.coordenadas && newArea.coordenadas.length > 0">
      <div v-for="(v, index) in newArea.coordenadas" :key="index" style="border-bottom: 1px solid grey;">
              {{ ( index + 1 ) + " º vértice: Longitude:" + v[0] + " | Latitude: " + v[1] }}<br/>
      </div>
    </div><br />


      <button v-if="newArea.coordenadas && newArea.coordenadas.length < 4" @click="addNewCoordenadaToNewArea();" class="inflating_btn" style=" border:none; background-color: green; color: white; cursor: pointer; font-size: 16px;">&#10010;&nbsp;&nbsp;Adicionar coordenada</button>&nbsp;
      <button @click="clearCoordenadas();" class="inflating_btn" style="border: none; background-color: red; color: white; cursor: pointer; font-size: 16px;">&#10006;&nbsp;&nbsp;Limpar Coordenadas</button>
      <br /><br /><br /><br />
      




      <button id="editArea"
                class="salvar_btn"
                @click="editArea();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoArea"
                    class="cancelar_btn"
                    @click="resetarFormularios();">
                    Cancelar
        </button>
        <br /><br />
</div>

  </div>
  </div>
  <div v-else>
    <h1 style="padding: 50px; color: grey;">Erro 401: usuário não autorizado</h1>
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
            newArea:
            {
                id: -1,
                titulo: '',
                descricao: '',
                coordenadas: []
            },
            newLongitude: null,
            newLatitude: null
        }
    },
    computed: {
    areas: function () {
      return this.$store.state.areas;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadAreas");
  },
  methods: {
    addNewCoordenadaToNewArea() {
        var coordenadaAtual = [this.newLongitude, this.newLatitude];
        var repeticaoEncontrada = false;

        this.newArea.coordenadas.forEach(function(c){
            if (c[0] == coordenadaAtual[0] && c[1] == coordenadaAtual[1]) repeticaoEncontrada = true;
        });


        if (!this.newLongitude || !this.newLatitude) {
            alert('Insira algum valor para longitude e latitude');
        } else if (repeticaoEncontrada) {
            alert('Erro: coordenada repetida')
        } else {
            this.newArea.coordenadas.push([this.newLongitude, this.newLatitude]);
        }
    },
    resetarFormularios() {
      this.listagemInclusaoEdicaoMode = 1;
      this.newArea = 
      {
                id: -1,
                titulo: '',
                descricao: '',
                coordenadas: []
      }
    },
    clearCoordenadas() {
        this.newArea.coordenadas = [];
        this.newLongitude = null;
        this.newLatitude = null;
    },
    prepararFormEdicao(area) {
      this.listagemInclusaoEdicaoMode = 3;
      this.indexOfAreaASerEditada = this.areas.indexOf(area);
      this.newArea = {
                id: area.id,
                titulo: area.titulo,
                descricao: area.descricao,
                coordenadas: area.coordenadas
      }
    },
    addArea() {
      this.$store.dispatch('addArea', this.newArea);
      this.resetarFormularios();
      this.newLongitude = null;
      this.newLatitude = null;
    },
    editArea() {
      var objForEditing = {
          areaForEditing: this.newArea,
          idOfNewArea: this.indexOfAreaASerEditada,
        };

        this.$store.dispatch("editArea", objForEditing);
        this.resetarFormularios();
    },
    deleteArea(titulo, id) {
      if (confirm('Confirma a exclusão da área "' + titulo + '"?')) {
        this.$store.dispatch("deleteArea", id);
      }
    }
  }
}
</script>

<style scoped>

.area_principal {
  background-color: yellow;
  font-weight: bold;
} 

.inflating_btn:hover {
  box-shadow: 0 0 20px black;
  transition: all 0.25s ease-in-out 0;
}

label {
  font-weight: bolder;
}

input {
  /* padding-left: 60px; */
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

.small_add_btn {
  background-color: rgb(0, 194, 0);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/add_icon.png");
  color:white;
}

.small_delete_btn {
    background-color: #d93400;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.add_btn:hover /*, .small_add_btn:hover*/ {
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

.red_btn:hover , small_delete_btn:hover{
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

.delete_btn:hover, small_delete_btn:hover {
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