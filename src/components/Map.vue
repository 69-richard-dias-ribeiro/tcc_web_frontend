<template>
<ol-map :loadTilesWhileAnimating="true" :loadTilesWhileInteracting="true" style="height: 585px; background: none;">

    <ol-view ref="view" :center="obterCentroDoMapa" :rotation="rotation" :zoom="zoom" 
    :projection="projection" style="background-color: transparent;"/>

    <ol-tile-layer>
        <ol-source-osm />
    </ol-tile-layer>

    <!-- <ol-source-vector>
            <ol-feature>
                <ol-geom-polygon :coordinates=""></ol-geom-polygon>
                <ol-style>
                    <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
                </ol-style>
            </ol-feature>

    </ol-source-vector> -->

    <div v-for="(area, index) in areasProntasParaDesenhar" :key="index">
    <ol-vector-layer>
        <ol-source-vector>
            <ol-feature>
                <ol-geom-polygon :coordinates="[area]"></ol-geom-polygon>
                <ol-style>
                    <ol-style-stroke :color="strokeColor" :width="strokeWidth"></ol-style-stroke>
                </ol-style>
            </ol-feature>

        </ol-source-vector>

    </ol-vector-layer>
    </div>

</ol-map>
</template>

<script>
// import {
//     ref
// } from 'vue'
export default {
    name: 'Map',
    // setup() {
    //     const center = ref([40, 40])
    //     const projection = ref('EPSG:4326')
    //     const zoom = ref(8)
    //     const rotation = ref(0)
    //     return {
    //         center,
    //         projection,
    //         zoom,
    //         rotation
    //     }
    // },

    computed: {
        registros: function () {
            return this.$store.state.registros;
        },
        colaboradores: function () {
            return this.$store.state.colaboradores;
        },
        areas: function () {
            return this.$store.state.areas;
        },
        restricoes: function () {
            return this.$store.state.restricoes;
        },
        obterCentroDoMapa: function () {
            var areaDaEmpresa = Object.assign({}, this.areas.find(a => a.titulo.toLowerCase().trim() == 'empresa'));
            
            var coordenadas = Object.assign({},areaDaEmpresa.coordenadas);

            var longitude = (parseFloat(Object.assign([], coordenadas[0])[0]) + parseFloat(Object.assign([], coordenadas[1])[0])) / 2;
            var latitude = (parseFloat(Object.assign([], coordenadas[0])[1]) + parseFloat (Object.assign([], coordenadas[3])[1])) / 2;


            console.log('D --- E --- B --- U --- G');
            console.log('0,0 -> ' + parseFloat(Object.assign([], coordenadas[0])[0]));
            console.log('1,0 -> ' + parseFloat(Object.assign([], coordenadas[1])[0]));
            console.log('0,1 -> ' + parseFloat(Object.assign([], coordenadas[0])[1]));
            console.log('3,1 -> ' + parseFloat(Object.assign([], coordenadas[3])[1]));
            console.log('Centro - longitude: ' + longitude + ' | Centro - latitude: ' + latitude);

            return [longitude, latitude];
        },
        // retorna o conjunto do conjunto de coordenadas de cada área registrada
        areasProntasParaDesenhar: function () {
            
            var retorno = [];

            this.areas.forEach(function(a) {
                var coordenadas = Object.assign({},a.coordenadas);
                var resultado = [];

                for(let i = 0; i < 4; i++) {
                resultado.push(
                                [
                                    parseFloat(Object.assign([], coordenadas[i])[0]),
                                    parseFloat(Object.assign([], coordenadas[i])[1])
                                ]
                             );
                }
                
                retorno.push(resultado);
            });

            //console.log(retorno);
            return retorno;

        }
    },

    beforeCreate() {
        this.$store.dispatch("loadRegistros");
        this.$store.dispatch("loadColaboradores");
        this.$store.dispatch("loadAreas");
        this.$store.dispatch("loadRestricoes");
    },

    mounted() {
      this.obterCentroDoMapa;
      this.areasProntasParaDesenhar;
    
    },

    data () {
      return { 
        
        //center:     this.obterCentroDoMapa,
        projection: "EPSG:4326",
        zoom:       18,
        rotation:   0,

        radius: 40,
        strokeWidth: 2,
        strokeColor: 'red',

        newRegistro:
        {
            id: -1,
            data: null,
            colaborador: null,
            area: null,
            restricao: null
        }
      }
    },

    methods: {
    addRegistro() {
            this.$store.dispatch('addRegistro', this.newRegistro);
        }
    },

  }
</script>

<style scoped>
#map {
  position: absolute !important;

  left: 505px !important;
  top: 25px;
  /* position: absolute; */
  left: 26%;
  top: 9%;
  height: 585px;
  width: 68%;

  border: 0.5px solid grey;
  box-shadow: 0 0 5px grey;
  margin: 10%;
}

</style>