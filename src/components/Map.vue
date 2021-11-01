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

    <div v-for="(c, index) in colaboradores" :key="index">
    <ol-vector-layer>
        <ol-source-vector>
            <ol-feature>
                <ol-geom-point :coordinates="[c.ultimaLongitude, c.ultimaLatitude]"></ol-geom-point>
                <ol-style>
                    <ol-style-circle :radius="10">
                        <ol-style-fill :color="'white'"></ol-style-fill>
                        <ol-style-stroke :color="'black'" :width="2"></ol-style-stroke>
                    </ol-style-circle>
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
        },

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
      
      // a função abaixo serve para testar e demonstrar o funcionamento da função de detecção de restrições
      // infringidas. Nome = geraPosicoesAleatoriasColaboradores
      setInterval(()=>{

            // modo == 1: posições geradas por toda a empresa                   (dinâmico)
            // modo == 2: posições geradas em uma porção específica da empresa  (estático - testes)
            // modo == 3: posições geradas em uma porção ainda mais específica  (estático - testes)
            var modo = 2;

            if (modo == 1) {
                var areaDaEmpresa = Object.assign({}, this.areas.find(a => a.titulo.toLowerCase().trim() == 'empresa'));
                var coordenadas = Object.assign({},areaDaEmpresa.coordenadas);

                var minLong = (parseFloat(Object.assign([], coordenadas[1])[0]));
                var maxLong = (parseFloat(Object.assign([], coordenadas[0])[0]));
                var minLat =  (parseFloat(Object.assign([], coordenadas[1])[1]));
                var maxLat =  (parseFloat(Object.assign([], coordenadas[2])[1]));

                this.colaboradores.forEach(function(c){
                    c.ultimaLongitude = (Math.random() * (minLong - maxLong) + maxLong).toFixed(6);
                    c.ultimaLatitude =  (Math.random() * (minLat - maxLat) + maxLat).toFixed(6);
                });
            } else if (modo == 2) {
                var minLong2 = -47.017600;
                var maxLong2 = -47.016000;
                var minLat2 =  -22.717500;
                var maxLat2 =  -22.718600;

                this.colaboradores.forEach(function(c){
                    c.ultimaLongitude = (Math.random() * (minLong2 - maxLong2) + maxLong2).toFixed(6);
                    c.ultimaLatitude =  (Math.random() * (minLat2 - maxLat2) + maxLat2).toFixed(6);
                });

            } else {
                var minLong3 = -47.017600;
                var maxLong3 = -47.016800;
                var minLat3 =  -22.717700;
                var maxLat3 =  -22.718500;

                this.colaboradores.forEach(function(c){
                    c.ultimaLongitude = (Math.random() * (minLong3 - maxLong3) + maxLong3).toFixed(6);
                    c.ultimaLatitude =  (Math.random() * (minLat3 - maxLat3) + maxLat3).toFixed(6);
                });
            }

        }, 2000);
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
        },

    colaboradorDentroArea(posColab, v1, v3) {
        let minLong = v3[0];
        let maxLong = v1[0];
        let minLat = v1[1];
        let maxLat = v3[1];

        if (posColab[0] > minLong && posColab[0] < maxLong &&
            posColab[1] < minLat && posColab[1] > maxLat) {
            return true;
        } else {
            return false;
        }
    },

    c1ProximoC2(posColab1, posColab2, proximidadeMaxima) {
        let lat1 = posColab1[1];
        let lon1 = posColab1[0];
        let lat2 = posColab2[1];
        let lon2 = posColab2[0];
        
        function toRad(x) {return x * Math.PI / 180;}

        var R = 6371; // km
        var dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);
        var d = Math.acos(Math.sin(lat1)*Math.sin(lat2) + Math.cos(lat1)*Math.cos(lat2) * Math.cos(dLon)) * R;

        return (d * 1000) < proximidadeMaxima;
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