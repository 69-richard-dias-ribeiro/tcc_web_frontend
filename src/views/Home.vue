<template>
  <div v-if="$store.state.userAllowed">
    <div style="float: left;">
      <router-link to="/">
          <button @click="$store.dispatch('logOff');" id="leave_btn" class="red_btn" style="left: 10px;">
            Sair
          </button>
      </router-link>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span id="username_lbl">{{"Logado(a) como: " + $store.state.userName}}</span>
      <br /><br /><br /><br /><br /><br /><br /><br />
          <p style="font-size: 23px; font-weight: 500; color: grey; background: transparent;">
              <b><u style="background: transparent;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Principal</u></b>
            </p>


      <br />
      <!-- <router-link to="/empresa">
          <button id="company_btn" class="blue_btn">
             Empresa
          </button>
      </router-link><br/><br/> -->

      <router-link to="/areas" style="margin-left: 0px;">
          <button id="areas_btn" class="blue_btn">
              Áreas
          </button>
      </router-link><br/><br/>

      <router-link to="/funcionarios" style="margin-left: 15px;">
          <button id="employees_btn" class="blue_btn">
              Funcionários
          </button>
      </router-link><br/><br/>

      <router-link to="/restricoes" style="margin-left: 30px;">
          <button id="restrictions_btn" class="blue_btn">
              Restrições
          </button>
      </router-link><br/><br/>

      <!-- <router-link to="/areas" style="margin-left: 45px;">
          <button id="areas_btn" class="blue_btn">
              Áreas
          </button>
      </router-link><br/><br/> -->

      <router-link to="/graficos" style="margin-left: 60px;">
          <button id="charts_btn" class="blue_btn">
              Gráficos
          </button>
      </router-link><br/><br/>

      <router-link to="/registros" style="margin-left: 75px;">
          <button id="logs_btn" class="blue_btn">
              Registros
          </button>
      </router-link>
    </div>
    
    <div style="float: right;">
      <div id="map" class="map">
        <Map />
      </div>
      
    </div>
  </div>
  <div v-else>
    <h1 style="padding: 50px; color: grey;">Erro 401: usuário não autorizado</h1>
    <router-link to="/">Página de login</router-link>
  </div>
</template>


<script>
import Map from '../components/Map.vue';

export default {

  components: {
    Map
  },

  data () {
    return {
      
    }
  },

  computed: {
    registros: function () {
      return this.$store.state.registros;
    },
    colaboradores: function () {
      return this.$store.state.colaboradores;
    },
    areas: function () {
        return this.$store.state.areas;
    },
    restricoes: function () {
        return this.$store.state.restricoes;
    }
  },

  beforeCreate() {
    this.$store.dispatch("loadRegistros");
    this.$store.dispatch("loadColaboradores");
    this.$store.dispatch("loadAreas");
    this.$store.dispatch("loadRestricoes");
  }
};
</script>

<style>
div{
  background-color: transparent !important; 
}

.ol-layer {
  background-color: transparent;
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

.blue_btn {
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
  text-align: left;
  /*margin: 10px;*/
  margin-left: 20px;
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
}

.blue_btn:hover {
  background-color: #1664ca;
}

#leave_btn {
  background-image: url("../assets/leave_icon.png");
  top: 15px;
  left: 15px;
  position: fixed;
  text-align: center;
}

#username_lbl {
  top: -1px;
  left: 43%;
  position: fixed;
  text-align: center;
  /* text-shadow: 0 0 2.5px grey; */
  box-shadow: 0 3px 3px lightgrey;
  border: 1px solid grey;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  padding: 8px 3px;
  font-size: smaller;
}

#company_btn {
  background-image: url("../assets/company_icon.png");
  width: 220px;
}

#employees_btn {
  background-image: url("../assets/employees_icon.png");
  width: 220px;
}

#restrictions_btn {
  background-image: url("../assets/restrictions_icon.png");
  width: 220px;
}

#areas_btn {
  background-image: url("../assets/areas_icon.png");
  width: 220px;
}

#charts_btn {
  background-image: url("../assets/data_icon.png");
  width: 220px;
}

#logs_btn {
  background-image: url("../assets/logs_icon.png");
  width: 220px;
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

#map {
  /* position: absolute !important;

  left: 505px !important;
  top: 25px; */
  position: absolute;
  left: 26%;
  top: 9%;
  height: 585px;
  width: 68%;

  border: 0.5px solid grey;
  box-shadow: 0 0 5px grey;
  /*margin: 10%;*/
  background-color: #f6f6f6ce;
  
}
</style>