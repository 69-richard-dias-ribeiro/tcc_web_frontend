<script>
import { defineComponent } from 'vue'
import { Pie } from 'vue3-chart-v2'

export default defineComponent({
  computed: {
    registros: function () {
      return this.$store.state.registros;
    },
    restricoes: function () {
      return this.$store.state.restricoes;
    },
    numeroRegistrosPorNivelRisco: function() {
      var qtdeRegistrosNivelBaixo          = 0;
      var qtdeRegistrosNivelMedio          = 0;
      var qtdeRegistrosNivelAlto           = 0;
      var registros                        = this.registros;
      var restricoes                       = this.restricoes;
      
      console.log()
      for (let i = 0; i < registros.length; i++) {

          if (parseInt(restricoes.find(restr => restr.id == registros[i].restricao).nivelRisco) == 1) {
            qtdeRegistrosNivelBaixo++;
          } else if (parseInt(restricoes.find(restr => restr.id == registros[i].restricao).nivelRisco) == 2){
            qtdeRegistrosNivelMedio++;
          } else {
            qtdeRegistrosNivelAlto++;
          }
      }
      

      return [qtdeRegistrosNivelBaixo, qtdeRegistrosNivelMedio, qtdeRegistrosNivelAlto];
    }
  },
  name: 'Chart5',
  extends: Pie,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['1: Baixo', '2: Médio', '3: Alto'],
      datasets: [
        {
          label: 'Nº de Registros',
          backgroundColor: ['#ffcccc', '#ff6666', '#ff0000'],
          data: this.numeroRegistrosPorNivelRisco
        }
      ]
    });
  }
});
</script>