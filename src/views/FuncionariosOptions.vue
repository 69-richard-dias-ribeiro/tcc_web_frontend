<template><div v-if="$store.state.userAllowed">
  <router-link to="/pagina_inicial">
    <button id="leave_btn" class="red_btn" style="left: 10px">Voltar</button>
  </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey; background: transparent;">
    <u style="background: transparent;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Opções de cadastramento</u>
  </h1>
  <br /><br /><br /><br /><br /><br />

  <div class="options">
    <div style="display: inline-block">

    <router-link to="/funcionarios/departamentos">
    <button id="opt2" class="blue_btn departments_btn" style="float: left;">
      Departamentos
    </button></router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

    <router-link to="/funcionarios/cargos">
    <button id="opt3" class="blue_btn roles_btn" style="float: none;">
      Cargos
    </button></router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;


    
    <router-link to="/funcionarios/colaboradores">
    <button id="opt1" class="blue_btn collaborators_btn" style="float: none;">
      Colaboradores
    </button></router-link>
    &nbsp;

    <router-link to="/funcionarios/usuarios">
    <button id="opt1" class="blue_btn users_btn" style="float: right;">
      Usuários
    </button></router-link>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    
  </div>  
  </div>
  </div>
  <div v-else>
    <h1 style="padding: 50px; color: grey;">Erro 401: usuário não autorizado</h1>
    <router-link to="/">Página de login</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

.options {
margin: 15% 10%;
}

.blue_btn {
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  /* padding: 0 16px; */
  width: 220px;
  color: white;
  cursor: pointer;
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

.departments_btn {
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/department_icon.png");
}

.roles_btn {
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/role_icon.png");
}

.collaborators_btn {
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/collaborator_icon.png");
}

.users_btn {
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
  background-image: url("../assets/user_icon.png");
}
</style>