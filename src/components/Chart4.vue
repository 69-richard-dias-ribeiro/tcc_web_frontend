<script>
import { defineComponent } from 'vue'
import { Doughnut } from 'vue3-chart-v2'

export default defineComponent({
  computed: {
    registros: function () {
      return this.$store.state.registros;
    },
    restricoes: function () {
      return this.$store.state.restricoes;
    },
    numeroRegistrosPorTipoRestricao: function() {
      var qtdeRegistrosAcessoRestrito       = 0;
      var qtdeRegistrosDistanciamentoSocial = 0;
      var registros                        = this.registros;
      var restricoes                       = this.restricoes;
      
      for (let i = 0; i < registros.length; i++) {

          if (restricoes.find(restr => restr.id == registros[i].restricao).tipo == 1) {
            qtdeRegistrosAcessoRestrito++;
          } else {
            qtdeRegistrosDistanciamentoSocial++;
          }
      }

      return [qtdeRegistrosAcessoRestrito, qtdeRegistrosDistanciamentoSocial];
    }
  },
  name: 'Chart4',
  extends: Doughnut,
  mounted () {
    // Overwriting base render method with actual data.
    this.renderChart({
      labels: ['Acesso Restrito', 'Distanciamento Social'],
      datasets: [
        {
          label: 'Nº de Registros',
          backgroundColor: ['gray','purple'],
          data: this.numeroRegistrosPorTipoRestricao
        }
      ]
    });
  }
});
</script>