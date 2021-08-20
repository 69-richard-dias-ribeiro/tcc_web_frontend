<template>
  <!-- <div>
    <button id="leave_btn" class="red_btn" style="margin: 10px">Sair</button>
  </div> -->

  <div class="container">
    <div class="container h-100">
      <div class="row">
        <div class="col-3">
          <a href="/">
          <button id="leave_btn" class="red_btn" style="margin: 10px">
            Sair
          </button>
          </a>
          
          <br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br />

          <div class="main_menu">
            <p style="font-size: 21px; font-weight: 500">
              <b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menu Principal</b>
            </p>

            <br /><br /><br />

            <router-link to="/empresa">
            <button id="company_btn" class="blue_btn" style="margin: 10px">
              Empresa
            </button>
            </router-link>
            <br /><br /><br />

            <button id="employees_btn" class="blue_btn" style="margin: 10px">
              Funcionários
            </button>
            <br /><br /><br />

            <button id="restrictions_btn" class="blue_btn" style="margin: 10px">
              Restrições
            </button>
            <br /><br /><br />

            <button id="alerts_btn" class="blue_btn" style="margin: 10px">
              Avisos
            </button>
            <br /><br /><br />

            <button id="metrics_btn" class="blue_btn" style="margin: 10px">
              Indicadores
            </button>
            <br /><br /><br />

            <button id="logs_btn" class="blue_btn" style="margin: 10px">
              Registros
            </button>
          </div>
        </div>

        <div class="col-9">
          <br />
          <div>
          <canvas id="canvas" width="1045px" height="664.5%"></canvas>
</div>
          <!-- Canvas goes here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
 
  },

  mounted() {

    function returnCurrentTimeStamp() {
      // Obtém a data/hora atual
      var data = new Date();

      // Guarda cada pedaço em uma variável
      var dia = data.getDate(); // 1-31
      var mes = data.getMonth(); // 0-11 (zero=janeiro)
      var ano4 = data.getFullYear(); // 4 dígitos
      var hora = data.getHours(); // 0-23
      var min = data.getMinutes(); // 0-59
      //var seg     = data.getSeconds();        // 0-59

      /* inserir um 0 em dias/meses/horas/minutos com um só digito ;) */
      mes = mes + 1;
      if (String(dia).length == 1) dia = "0" + dia;
      if (String(mes).length == 1) mes = "0" + mes;
      if (String(hora).length == 1) hora = "0" + hora;
      if (String(min).length == 1) min = "0" + min;

      // Formata a data e a hora (note o mês + 1)
      var str_data = dia + "/" + (mes) + "/" + ano4;
      var str_hora = hora + ":" + min;

      // Mostra o resultado
      return str_data + " " + str_hora;
    }

      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");

      var img = new Image();
  img.onload = function() {
    ctx.drawImage(img, 0, 0);
  };
  img.src = '/assets/gwagwa.png';
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12px Arial";
      ctx.fillText(returnCurrentTimeStamp(), 5, 15);

    window.setInterval(function () {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "12px Arial";
      ctx.fillText(returnCurrentTimeStamp(), 5, 15);
    
    }, 60000);
  },
};
</script>

<style scoped>
* {
  position: absolute;
  background-color: #f6f6f6;
  vertical-align: top;
  color: black;
}

#canvas {
  /* position: absolute !important;

  left: 505px !important;
  top: 25px; */
  border: 0.5px solid grey;
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
  margin: 10px;
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
  margin: 10px;
  background-position: left;
  background-repeat: no-repeat;
  background-size: contain;
  background-blend-mode: lighten;
}

.blue_btn:hover {
  background-color: #1664ca;
}
/*------------------------------------------------------------------------------*/

.main_menu {
  margin-left: 150px !important;
  word-break: keep-all;
  white-space: nowrap;
}

#leave_btn {
  background-image: url("../assets/leave_icon.png");
  padding-top: 0;
  margin-top: 0;
  position: fixed;
  text-align: center;
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

#alerts_btn {
  background-image: url("../assets/alerts_icon.png");
  width: 220px;
}

#metrics_btn {
  background-image: url("../assets/metrics_icon.png");
  width: 220px;
}

#logs_btn {
  background-image: url("../assets/logs_icon.png");
  width: 220px;
}
</style>