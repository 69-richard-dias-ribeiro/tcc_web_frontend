<template>
    <div v-if="$store.state.userAllowed">
      <router-link to="/pagina_inicial">
          <button id="leave_btn" class="red_btn" style="left: 10px;">
            Voltar
          </button>
      </router-link>
  <h1 style="position: fixed; left: 150px; top: 50px; color: grey; background: transparent;"><u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Gráficos</u></h1>
  <br /><br /><br /><br />




  <div>
  <div id="divGrafico1">
      <canvas id="canvasGrafico1">

      </canvas>
  </div>
        <div id="divGrafico2">
            <canvas id="canvasGrafico2">

            </canvas>
        </div>
  <div>
  </div>                                        
  <div id="divGrafico3">
      <canvas id="canvasGrafico3">

      </canvas>
  </div>
        <div id="divGrafico4">
            <canvas id="canvasGrafico4">

            </canvas>
        </div>
              <div id="divGrafico5">
                  <canvas id="canvasGrafico5">

                  </canvas>
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
#divGrafico1 {
  position: fixed;
  left: 1%;
  top: 17%;

  width: 50%;
  height: 37%;

  border: 0px solid grey;
  box-shadow: 0 0 5px grey;
}

#divGrafico2 {
  position: fixed;
  left: 52%;
  top: 17%;

  width: 47%;
  height: 37%;

  border: 0px solid grey;
  box-shadow: 0 0 5px grey;
}

#divGrafico3 {
  position: fixed;
  left: 1%;
  top: 56%;

  width: 40%;
  height: 37%;

  border: 0px solid grey;
  box-shadow: 0 0 5px grey;
}

#divGrafico4 {
  position: fixed;
  left: 42%;
  top: 56%;

  width: 28%;
  height: 37%;

  border: 0px solid grey;
  box-shadow: 0 0 5px grey;
}

#divGrafico5 {
  position: fixed;
  left: 71%;
  top: 56%;

  width: 28%;
  height: 37%;

  border: 0px solid grey;
  box-shadow: 0 0 5px grey;
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

* {
  background: transparent;
}
</style>