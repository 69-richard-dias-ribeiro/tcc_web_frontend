<template>
  <router-view/>
  <!-- <mapa /> -->
  <Footer />
</template>

<script>
import Footer from "@/components/Footer.vue";
// import mapa from "../src/components/MapaTeste.vue";

export default {
  components: {
    Footer,
    // mapa
  },
  beforeCreate() {
      this.$store.dispatch('loadEmpresa');
    },
}
</script>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
