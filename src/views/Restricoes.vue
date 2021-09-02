<template>
  <router-link to="/pagina_inicial">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey">
    <u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Restrições</u>
  </h1>
  <br /><br /><br /><br /><br /><br />
  <h3 v-if="(!restricoes || restricoes.length <= 0) && (listagemInclusaoEdicaoMode == 1)" style="color: grey">
    Nenhuma restricão encontrada.
  </h3><span v-if="listagemInclusaoEdicaoMode == 1">
  <button class="add_btn" @click="listagemInclusaoEdicaoMode = 2;">
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Adicionar</button
  ></span><br /><br />
  <div style="display: inline-block">





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Listagem ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
    <div v-if="restricoes && restricoes.length > 0 && listagemInclusaoEdicaoMode == 1">
    <table
      v-if="restricoes"
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
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Tipo</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Aviso</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Nível de Risco</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">É global</th>
        <th style="border-bottom: 2px solid grey; border-right: 2px solid grey;">Colaboradores</th>
        <th style="border-bottom: 2px solid grey;">Áreas</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="(r, index) in restricoes" :key="index">
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ r.id }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ r.titulo }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ r.descricao }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ (r.tipo == 1) ? "Acesso Restrito" : "Distanciamento Social" }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ r.aviso }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;"
            :class="{
                      nivelBaixoClass : r.nivelRisco == '1',
                      nivelMedioClass : r.nivelRisco == '2',
                      nivelAltoClass  : r.nivelRisco == '3'
                    }">
          {{ exibeNivelRisco(r.nivelRisco) }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          {{ (r.restricaoGlobal == 1) ? "Sim" : "Não" }}
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
          <ol>
              <li v-for="(c, index) in r.colaboradores" :key="index">
                  {{ c.nome }}
              </li>
          </ol> 
        </td>
        <td style="padding-right: 15px; border: 0.25px solid grey;">
         <ol>
              <li v-for="(a, index) in r.areas" :key="index">
                  {{ a.titulo }}
              </li>
          </ol>
        </td>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="edit_btn"
            @click="prepararFormEdicao(r);"
          >
            Editar
          </button>
        </td>
        &nbsp;&nbsp;&nbsp;
        <td>
          <button
            class="delete_btn"
            @click="deleteRestricao(r.titulo, restricoes.indexOf(r));"
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
      <input type="text" id="titulo" v-model="newRestricao.titulo" />
      <br /><br />
      <label for="descricao">Descrição:</label><br />
      <textarea style="width: 100%; height: 50px;" type="text" id="descricao" v-model="newRestricao.descricao" />

      <br /><br /><label>Tipo:</label><br />
      
      <input type="radio"  class="radioRadioso" name="tipo" id="tipo1" value="1" v-model="newRestricao.tipo"/>
      <label for="tipo1" style="font-weight: normal; cursor: pointer">Acesso restrito</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <input type="radio"  class="radioRadioso" name="tipo" id="tipo2" value="2" v-model="newRestricao.tipo"/>
      <label for="tipo2" style="font-weight: normal; cursor: pointer">Distanciamento social</label>
      <br />
      <br /><br />
      <label for="aviso">Aviso:</label><br />
      <textarea style="width: 100%; height: 50px;" type="text" id="aviso" v-model="newRestricao.aviso" />
      <br />

      <br /><br /><label>Nível de Risco:</label><br />
      
      <input type="radio"  class="radioRadioso" name="nivel_risco" id="nr1" value="1" v-model="newRestricao.nivelRisco"/>
      <label for="nr1" style="font-weight: normal; cursor: pointer">1 (Baixo)</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <input type="radio"  class="radioRadioso" name="nivel_risco" id="nr2" value="2" v-model="newRestricao.nivelRisco"/>
      <label for="nr2" style="font-weight: normal; cursor: pointer">2 (Médio)</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <input type="radio"  class="radioRadioso" name="nivel_risco" id="nr3" value="3" v-model="newRestricao.nivelRisco"/>
      <label for="nr3" style="font-weight: normal; cursor: pointer">3 (Alto)</label>
      <br /><br /><br />

      <label>A restrição em questão é global? (aplicavel à todos os colaboradores):</label><br />
      
      <input type="radio"  class="radioRadioso" name="eglobal" id="eglobal1" value="1" v-model="newRestricao.restricaoGlobal"/>
      <label for="eglobal1" style="font-weight: normal; cursor: pointer">Sim</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <input type="radio"  class="radioRadioso" name="eglobal" id="eglobal2" value="0" v-model="newRestricao.restricaoGlobal"/>
      <label for="eglobal2" style="font-weight: normal; cursor: pointer">Não</label>
      <br /><br /><br />

      <!-- <label v-if="newRestricao.nivelRisco != 0 || newRestricao.nivelRisco != '0'" for="colaboradores">Aplicável aos colaboradores:</label><br /> -->
      <div v-if="newRestricao.restricaoGlobal != 1 || newRestricao.restricaoGlobal != '1'">
      <label for="colaboradores456">Aplicável aos colaboradores:</label><br />
      <select multiple name="colaboradores456" id="colaboradores456" v-model="newRestricao.colaboradores">
          <option v-for="(c, index) in colaboradores" :key="index" :value="c">{{c.matricula + " - " + c.nome}}</option>
      </select>
      <br /><br /><br />
      </div>

      <label for="areas">Aplicável às áreas (selecione um ou mais):</label><br />
      <select multiple name="areas" id="areas" v-model="newRestricao.areas">
          <option v-for="(a, index) in areas" :key="index" :value="a">{{a.titulo}}</option>
      </select>
      <br /><br /><br /><br />
      
      <button id="addRestricao"
                class="salvar_btn"
                @click="addRestricao();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoRestricao"
                    class="cancelar_btn"
                    @click="resetarFormularios();">
                    Cancelar
        </button>
        <br /><br />
</div>





<!-- ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Edição ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ -->
<div v-if="listagemInclusaoEdicaoMode == 3"><br /><br />

      <label for="titulo">Título:</label><br />
      <input type="text" id="titulo" v-model="newRestricao.titulo" />
      <br /><br />
      <label for="descricao">Descrição:</label><br />
      <textarea style="width: 100%; height: 50px;" type="text" id="descricao" v-model="newRestricao.descricao" />

      <br /><br /><label>Tipo:</label><br />
      <label for="tipo1" style="font-weight: normal; cursor: pointer">Acesso restrito</label>
      <input type="radio"  class="radioRadioso" name="tipo" id="tipo1" value="1" v-model="newRestricao.tipo"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label for="tipo2" style="font-weight: normal; cursor: pointer">Distanciamento social</label>
      <input type="radio"  class="radioRadioso" name="tipo" id="tipo2" value="2" v-model="newRestricao.tipo"/>
      <br />
      <br /><br />
      <label for="aviso">Aviso:</label><br />
      <textarea style="width: 100%; height: 50px;" type="text" id="aviso" v-model="newRestricao.aviso" />
      <br />

      <br /><br /><label>Nível de Risco:</label><br />
      <label for="nr1" style="font-weight: normal; cursor: pointer">1 (Baixo)</label>
      <input type="radio"  class="radioRadioso" name="nivel_risco" id="nr1" value="1" v-model="newRestricao.nivelRisco"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label for="nr2" style="font-weight: normal; cursor: pointer">2 (Médio)</label>
      <input type="radio"  class="radioRadioso" name="nivel_risco" id="nr2" value="2" v-model="newRestricao.nivelRisco"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label for="nr3" style="font-weight: normal; cursor: pointer">3 (Alto)</label>
      <input type="radio"  class="radioRadioso" name="nivel_risco" id="nr3" value="3" v-model="newRestricao.nivelRisco"/>
      <br /><br /><br />

      <label>A restrição em questão é global? (aplicavel à todos os colaboradores):</label><br />
      <label for="eglobal1" style="font-weight: normal; cursor: pointer">Sim</label>
      <input type="radio"  class="radioRadioso" name="eglobal" id="eglobal1" value="1" v-model="newRestricao.restricaoGlobal"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <label for="eglobal2" style="font-weight: normal; cursor: pointer">Não</label>
      <input type="radio"  class="radioRadioso" name="eglobal" id="eglobal2" value="0" v-model="newRestricao.restricaoGlobal"/>
      <br /><br /><br />

      <!-- <label v-if="newRestricao.nivelRisco != 0 || newRestricao.nivelRisco != '0'" for="colaboradores">Aplicável aos colaboradores:</label><br /> -->
      <div v-if="newRestricao.restricaoGlobal != 1 || newRestricao.restricaoGlobal != '1'">
      <label for="colaboradores456">Aplicável aos colaboradores:</label><br />
      <select multiple name="colaboradores456" id="colaboradores456" v-model="newRestricao.colaboradores">
          <option v-for="(c, index) in colaboradores" :key="index" :value="c">{{c.matricula + " - " + c.nome}}</option>
      </select>
      <br /><br /><br />
      </div>

      <label for="areas">Aplicável às áreas:</label><br />
      <select multiple name="areas" id="areas" v-model="newRestricao.areas">
          <option v-for="(a, index) in areas" :key="index" :value="a">{{a.titulo}}</option>
      </select>
      <br /><br /><br /><br />

      <button id="editRestricao"
                class="salvar_btn"
                @click="editRestricao();">
                Salvar
        </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button id="cancelarEdicaoRestricao"
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
            newRestricao:
            {
                id: -1,
                titulo: '',
                descricao: '',
                tipo: null,
                aviso: '',
                nivelRisco: null,
                restricaoGlobal: null,
                colaboradores: [],
                areas: []
            }
        }
    },
    computed: {
    restricoes: function () {
      return this.$store.state.restricoes;
    },
    colaboradores: function () {
        return this.$store.state.colaboradores;
    },
    areas: function () {
        return this.$store.state.areas;
    }
  },
  beforeCreate() {
    this.$store.dispatch("loadRestricoes");
    this.$store.dispatch("loadColaboradores");
    this.$store.dispatch("loadAreas");
  },
  methods: {
    exibeNivelRisco(nivel_risco) {
        if (nivel_risco == "1") {
            return "1 (Baixo)";
        } else if (nivel_risco == "2") {
            return "2 (Médio)";
        } else if (nivel_risco == "3"){
            return "3 (Alto)";
        } else {
            return " - "
        }
    },
    resetarFormularios() {
      this.listagemInclusaoEdicaoMode = 1;
      this.newRestricao = 
            {
                id: -1,
                titulo: '',
                descricao: '',
                tipo: null,
                aviso: '',
                nivelRisco: null,
                restricaoGlobal: null,
                colaboradores: [],
                areas: []
            }
    },
    prepararFormEdicao(restricao) {
      this.listagemInclusaoEdicaoMode = 3;
      this.indexOfRestricaoASerEditada = this.restricoes.indexOf(restricao);
      this.newRestricao = {
                id: restricao.id,
                titulo: restricao.titulo,
                descricao: restricao.descricao,
                tipo: restricao.tipo,
                aviso: restricao.aviso,
                nivelRisco: restricao.nivelRisco,
                restricaoGlobal: restricao.restricaoGlobal,
                colaboradores: restricao.colaboradores,
                areas: restricao.areas
      }
    },
    addRestricao() {
      this.$store.dispatch('addRestricao', this.newRestricao);
      this.resetarFormularios();
    },
    editRestricao() {
      var objForEditing = {
          restricaoForEditing: this.newRestricao,
          idOfNewRestricao: this.indexOfRestricaoASerEditada,
        };

        this.$store.dispatch("editRestricao", objForEditing);
        this.resetarFormularios();
    },
    deleteRestricao(titulo, id) {
      if (confirm('Confirma a exclusão da restrição "' + titulo + '"?')) {
        this.$store.dispatch("deleteRestricao", id);
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

.nivelBaixoClass { background-color: #ffcccc; }
.nivelMedioClass { background-color: #ff6666; color: white;}
.nivelAltoClass  { background-color: #ff0000; color: white; }

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