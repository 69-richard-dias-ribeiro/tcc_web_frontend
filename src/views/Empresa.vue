<template>
<h1 style="position: fixed; left: 40px; color: rgb(85, 85, 85)">Empresa</h1>
<!-- <div v-if="this.empresa"> -->
    <h3 style="color: gray;">Nenhuma informação encontrada.</h3>
    <button id="cadastramentoVisivelBtn" class="iniciar_cadastramento_btn">Iniciar Cadastro</button>
<!-- </div> -->
<!-- <div v-else>
    <label for="razao_social">Razão Social</label>
    <input id="razao_social" type="text" v-bind="this.empresa.razaoSocial" />
</div> -->

</template>

<script>
//import { mapState } from 'vuex'

export default {
    name: 'Empresa',
  data() {
    return {
    //   empresa: {
    //       id:           0,
    //       razaoSocial:  undefined,
    //       nomeFantasia: undefined,
    //       endereco:     undefined,
    //       logotipo:     undefined,
    //       area:         [0, 0, 0, 0]
    //   },
      cadastramentoBoolean: false
    }
  },
//   computed: mapState([
//     'empresa' 
//   ]),

  methods: {
      addToEmpresa() {
      this.$store.dispatch('addToEmpresa', this.empresa);
    }
  }
  
}
</script>

<style scoped>
.iniciar_cadastramento_btn {
  background-color: rgb(0, 194, 0);
  border: none;
  border-radius: 6px;
  font-size: 20px;
  line-height: 38px;
  padding: 0 16px;
  width: 40%;
  color: white;
  cursor: pointer;
}

.iniciar_cadastramento_btn:hover {
  background-color: rgb(0, 156, 0);
}
</style>