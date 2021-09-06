<script>
import { defineComponent } from 'vue'
import { Bar } from 'vue3-chart-v2'

export default defineComponent({
  computed: {
    areas: function () {
      return this.$store.state.areas;
    },
    registros: function () {
      return this.$store.state.registros;
    },
    nomeDasAreas: function() {
      return this.areas.map(a => a.titulo);
    },
    numeroRegistrosPorArea: function() {
      var resultado = [];
      var areas = this.areas;
      var registros = this.registros;


      for (let i = 0; i < areas.length; i++) {
        let qtde = 0;

        for (let j = 0; j < registros.length; j++) {
          if (registros[j].area == areas[i].id) qtde++;
        }

        resultado.push(qtde);
      }

      return resultado;
    }
  },
  name: 'Chart2',
  extends: Bar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.nomeDasAreas,
      datasets: [
        {
          label: 'Nº de Registros',
          backgroundColor: 'blue',
          data: this.numeroRegistrosPorArea
        }
      ]
    },
    
    {
    scales: {
        yAxes: [{
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true,   // minimum value will be 0.
                stepSize: 1
            }
        }]
    }
    }
    )
  }
});
</script>