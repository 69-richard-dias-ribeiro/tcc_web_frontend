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
  mounted() {
    //este trecho preenchenche o armazenamento local do navegador com dados de teste toda vez em q carrega-se a página de login ;)
    if (!localStorage.getItem('departamentos')) localStorage.setItem('departamentos', "[{\"id\":1,\"nome\":\"a\"},{\"id\":2,\"nome\":\"b\"},{\"id\":3,\"nome\":\"c\"}]");
    if (!localStorage.getItem('cargos')) localStorage.setItem('cargos', "[{\"id\":1,\"nome\":\"123123123123123123123\"},{\"id\":2,\"nome\":\"asdasd123123\"},{\"id\":3,\"nome\":\"9889798\"}]");
    if (!localStorage.getItem('colaboradores')) localStorage.setItem('colaboradores', "[{\"id\":1,\"matricula\":\"14378\",\"nome\":\"Richard Dias Ribeiro\",\"email\":\"richardias9699@gmail.com\",\"telefone\":\"19996325356\",\"dataNasc\":\"2000-12-29\",\"dataAdmissao\":\"2000-12-30\",\"departamento\":1,\"cargo\":1, \"ultimaLongitude\":-47.016076, \"ultimaLatitude\": -22.718027},{\"id\":2,\"matricula\":\"13912\",\"nome\":\"Kevin O Chris\",\"email\":\"abcd@gmail.com\",\"telefone\":\"+5519995553611\",\"dataNasc\":\"1995-05-31\",\"dataAdmissao\":\"2021-09-05\",\"departamento\":2,\"cargo\":2, \"ultimaLongitude\":-47.016451, \"ultimaLatitude\": -22.717668}]");
    if (!localStorage.getItem('usuarios')) localStorage.setItem('usuarios', "[{\"id\":1,\"usuario\":1,\"senha\":\"todonicolascagezinho\",\"eadm\":\"1\"},{\"id\":2,\"usuario\":2,\"senha\":\"1234\",\"eadm\":\"1\"}]");
    if (!localStorage.getItem('areas')) localStorage.setItem('areas', "[{\"id\":1,\"titulo\":\"Empresa\",\"descricao\":\"Localização da Universidade de Jaguariúna - Campus 2. Endereço: Rod. Campinas-Mogi Mirim, s/nº - km 127 - Tanquinho Velho, Jaguariúna - SP, 13820-000.\",\"coordenadas\":[[\"-47.015000\",\"-22.717000\"],[\"-47.018000\",\"-22.717000\"],[\"-47.018000\",\"-22.719000\"],[\"-47.015000\",\"-22.719000\"]]},{\"id\":2,\"titulo\":\"Área X\",\"descricao\":\"Área localizada nas proximidades do bloco 5 da universidade.\",\"coordenadas\":[[\"-47.017100\",\"-22.718000\"],[\"-47.017500\",\"-22.718000\"],[\"-47.017500\",\"-22.718500\"],[\"-47.017100\",\"-22.718500\"]]}]");
    if (!localStorage.getItem('restricoes')) localStorage.setItem('restricoes', "[{\"id\":1,\"titulo\":\"covid-19\",\"descricao\":\"123123123123123\",\"tipo\":\"2\",\"aviso\":\"asdasdasdasdads\",\"nivelRisco\":\"1\",\"restricaoGlobal\":\"1\",\"colaboradores\":[],\"areas\":[{\"id\":1,\"titulo\":\"Empresa\",\"descricao\":\"Localização da Universidade de Jaguariúna - Campus 2. Endereço: Rod. Campinas-Mogi Mirim, s/nº - km 127 - Tanquinho Velho, Jaguariúna - SP, 13820-000.\",\"coordenadas\":[[\"-47.015000\",\"-22.717000\"],[\"-47.018000\",\"-22.717000\"],[\"-47.018000\",\"-22.719000\"],[\"-47.015000\",\"-22.719000\"]]}]},{\"id\":2,\"titulo\":\"restr teste\",\"descricao\":\"adasdasdasd\",\"tipo\":\"1\",\"aviso\":\"asdasdasdasdasd\",\"nivelRisco\":\"2\",\"restricaoGlobal\":\"0\",\"colaboradores\":[{\"id\":1,\"matricula\":\"14378\",\"nome\":\"Richard Dias Ribeiro\",\"email\":\"richardias9699@gmail.com\",\"telefone\":\"19996325356\",\"dataNasc\":\"2000-12-29\",\"dataAdmissao\":\"2000-12-30\",\"departamento\":1,\"cargo\":1,\"ultimaLongitude\":-47.016076,\"ultimaLatitude\":-22.718027},{\"id\":2,\"matricula\":\"13912\",\"nome\":\"Kevin O Chris\",\"email\":\"abcd@gmail.com\",\"telefone\":\"+5519995553611\",\"dataNasc\":\"1995-05-31\",\"dataAdmissao\":\"2021-09-05\",\"departamento\":2,\"cargo\":2,\"ultimaLongitude\":-47.016451,\"ultimaLatitude\":-22.717668}],\"areas\":[{\"id\":2,\"titulo\":\"Área X\",\"descricao\":\"Área localizada nas proximidades do bloco 5 da universidade.\",\"coordenadas\":[[\"-47.017100\",\"-22.718000\"],[\"-47.017500\",\"-22.718000\"],[\"-47.017500\",\"-22.718500\"],[\"-47.017100\",\"-22.718500\"]]}]}]");
    if (!localStorage.getItem('registros')) localStorage.setItem('registros', "[{\"id\":1,\"data\":\"2000-12-29\",\"colaborador\":1,\"area\":1,\"restricao\":1},{\"id\":2,\"data\":\"2000-12-30\",\"colaborador\":2,\"area\":2,\"restricao\":2},{\"id\":3,\"data\":\"2000-12-30\",\"colaborador\":2,\"area\":2,\"restricao\":2}]");
    if (!localStorage.getItem('empresa')) localStorage.setItem('empresa', "{\"id\":-1,\"razaoSocial\":\"asd\",\"nomeFantasia\":\"asd\",\"endereco\":\"asd\",\"area\":1}");

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
