<script>
import { defineComponent } from 'vue'
import { Line } from 'vue3-chart-v2'

export default defineComponent({
  computed: {
    registros: function () {
      return this.$store.state.registros;
    },
    datasRegistros: function() {
      return this.registros.map(r => r.data);
    },
    numeroRegistrosPorData: function() {
      var logs = this.$store.state.registros;

      return this.datasRegistros.map(function(dataRegistro) {
        let qtde = 0;

        logs.forEach(function(log) {
          if (log.data == dataRegistro) qtde++;
        });

        return qtde;

      });
    }
  },
  name: 'Chart1',
  extends: Line,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.datasRegistros,
      datasets: [
        {
          label: 'Nº de Registros',
          backgroundColor: 'red',
          data: this.numeroRegistrosPorData,
          fill: false,
          pointRadius: 10,
          borderColor: 'red'
        }
      ]
    },
    {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1
          }
        }]
      }
    }
    )
  }
});
</script>