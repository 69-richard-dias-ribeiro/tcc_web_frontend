<script>
import { defineComponent } from 'vue'
import { HorizontalBar } from 'vue3-chart-v2'

export default defineComponent({
  computed: {
    colaboradores: function() {
      return this.$store.state.colaboradores;
    },
    registros: function () {
      return this.$store.state.registros;
    },
    nomeDosColaboradores: function() {
      return this.colaboradores.map(c => c.nome);
    },
    numeroRegistrosPorColaborador: function() {
      var resultado = [];
      var registros = this.registros;
      var colaboradores = this.colaboradores;


      for (let i = 0; i < colaboradores.length; i++) {
        let qtde = 0;

        for (let j = 0; j < registros.length; j++) {
          if (registros[j].colaborador == colaboradores[i].id) qtde++;
        }

        resultado.push(qtde);
      }

      return resultado;
    }
  },
  name: 'Chart3',
  extends: HorizontalBar,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: this.nomeDosColaboradores,
      datasets: [
        {
          label: 'Nº de Registros',
          backgroundColor: 'orange',
          data: this.numeroRegistrosPorColaborador
        }
      ]
    },
    
    {
    indexAxis: 'y',
    scales: {
        yAxes: [{
            stacked: true,
            display: true,
            ticks: {
                suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                // OR //
                beginAtZero: true   // minimum value will be 0.
                
            }
        }],
        xAxes: [{
            ticks: {
                beginAtZero: true,
                stepSize: 1
            }
        }],
    }
    }
    
    )
  }
});
</script>