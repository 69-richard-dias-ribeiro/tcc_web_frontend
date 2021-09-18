<!--<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>-->
<template>
  <link
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <link
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
    rel="stylesheet"
  />
  <div v-on:keyup.enter="onEnter" class="container vertical-center" style="margin-top: 15%">
    <div class="container h-100">
      <div class="row align-items-center">
        <div class="col-6">
          <div>
            <img src="../assets/logo_with_title.png" />
          </div>
        </div>
        <div class="col-6 mx-auto">
          <div>
            <div
              style="
                border: 1px solid gray;
                padding: 30px;
                box-shadow: 0 0 3px gray;
                border-radius: 10px;
              "
            >
            
              <input
                
                id="login"
                type="text"
                placeholder="Matrícula"
                v-model="this.user"

              /><br /><br />
              <input
                
                id="password_input"
                :type="this.hidePassword ? 'password'  : 'text'"
                placeholder="Senha"
                v-model="this.password"

              /><span v-if="this.password" @click.stop="this.hidePassword = !this.hidePassword;"><img
                           :class="{hide : hidePassword, show: !hidePassword}"></span>
              
              <br /><br />
              <!-- <router-link to="/pagina_inicial"> -->
              <button class="login_button" @click="checkAuthenticity();">Entrar</button>
              <!-- </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// export default {
//   name: 'Home',
//   components: {
//     HelloWorld
//   }
// }

export default {
  
  data() {
    return {
      hidePassword: true,
      user: undefined,
      password: undefined
    }
  },
  methods: {
    onEnter: function() {
       this.checkAuthenticity();
    },
    passwordOnChange(input) {
      this.isPasswordEmpty = !input.nodeValue == '';
    },
    checkAuthenticity() {
      if (!this.user || !this.password) {
        alert('Informações de login não podem ficar vazias.');
      } else {
        this.$store.dispatch('checkAuthenticity', {usuario: this.user, senha: this.password});
      }
  }
  },
  beforeCreate() {
    this.$store.dispatch("loadEmpresa");
    this.$store.dispatch("loadDepartamentos");
    this.$store.dispatch("loadCargos");
    this.$store.dispatch("loadColaboradores");
    this.$store.dispatch("loadUsuarios");
    this.$store.dispatch("loadAreas");
  },
};
</script>

<style>
div {
  background-color: #F6F6F6;
}

input {
  border: 0.5px solid grey;
  border-radius: 5px;
}

.login_card {
  width: 20%;
  height: 20%;
  background-color: white;
  position: absolute;
}

.login_button {
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  padding: 0 16px;
  width: 40%;
  color: white;
  cursor: pointer;
}

.login_button:hover {
  background-color: #1664ca;
}

.show {
  background-image: url('../assets/password_eye_open.png');
  width: 27.6px; height: 27.6px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 0.5px solid grey;
  border-radius: 100%;
  cursor: pointer;
  background-color: #F6F6F6;
}

.hide {
  background-image: url('../assets/password_eye_shut.png');
  width: 27.6px; height: 27.6px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 0.5px solid grey;
  border-radius: 100%;
  cursor: pointer;
  filter: brightness(75%);
  background-color: #F6F6F6;
}


.hide:hover, .show:hover{
 box-shadow: 0 0 5px grey;
}

.hidden {
  display: none;
}
</style>
