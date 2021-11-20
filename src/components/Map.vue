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
            // modo == 4: teste desativado
            // var modo = 4;

            // if (modo == 1) {
            //     var areaDaEmpresa = Object.assign({}, this.areas.find(a => a.titulo.toLowerCase().trim() == 'empresa'));
            //     var coordenadas = Object.assign({},areaDaEmpresa.coordenadas);

            //     var minLong = (parseFloat(Object.assign([], coordenadas[1])[0]));
            //     var maxLong = (parseFloat(Object.assign([], coordenadas[0])[0]));
            //     var minLat =  (parseFloat(Object.assign([], coordenadas[1])[1]));
            //     var maxLat =  (parseFloat(Object.assign([], coordenadas[2])[1]));

            //     this.colaboradores.forEach(function(c){
            //         c.ultimaLongitude = (Math.random() * (minLong - maxLong) + maxLong).toFixed(6);
            //         c.ultimaLatitude =  (Math.random() * (minLat - maxLat) + maxLat).toFixed(6);
            //     });
            // } else if (modo == 2) {
            //     var minLong2 = -47.017600;
            //     var maxLong2 = -47.016000;
            //     var minLat2 =  -22.717500;
            //     var maxLat2 =  -22.718600;

            //     this.colaboradores.forEach(function(c){
            //         c.ultimaLongitude = (Math.random() * (minLong2 - maxLong2) + maxLong2).toFixed(6);
            //         c.ultimaLatitude =  (Math.random() * (minLat2 - maxLat2) + maxLat2).toFixed(6);
            //     });

            // } else if (modo == 3){
            //     var minLong3 = -47.017600;
            //     var maxLong3 = -47.016800;
            //     var minLat3 =  -22.717700;
            //     var maxLat3 =  -22.718500;

            //     this.colaboradores.forEach(function(c){
            //         c.ultimaLongitude = (Math.random() * (minLong3 - maxLong3) + maxLong3).toFixed(6);
            //         c.ultimaLatitude =  (Math.random() * (minLat3 - maxLat3) + maxLat3).toFixed(6);
            //     });
            // }

            this.monitoramentoDeRestricoes();
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
        },

        ultimasPosicoes: null
      }
    },

    methods: {
    addRegistro() {
            this.$store.dispatch('addRegistro', this.newRegistro);
        },

    colaboradorDentroArea(posColab, v1, v3) {
        let minLong = parseFloat(v3[0]);
        let maxLong = parseFloat(v1[0]);
        let minLat  = parseFloat(v3[1]);
        let maxLat  = parseFloat(v1[1]);

        let longColab = parseFloat(posColab[0]);
        let latColab  = parseFloat(posColab[1]);

        if ((longColab > minLong) &&
            (longColab < maxLong) &&
            (latColab  > minLat)   && 
            (latColab  < maxLat)) {
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
    },

    monitoramentoDeRestricoes() {
        
        var restricoesAcesso =         this.restricoes.filter(r => r.tipo == 1);
        var restricoesDistanciamento = this.restricoes.filter(r => r.tipo == 2);

            restricoesAcesso = JSON.parse(JSON.stringify(restricoesAcesso));
            restricoesDistanciamento = JSON.parse(JSON.stringify(restricoesDistanciamento));
        
        var areas1ForaDoProxy;
        var areas2ForaDoProxy;

//------------------------------------------------------------------------------------
//-------------------- atualização das posições dos colaboradores --------------------
//------------------------------------------------------------------------------------
        

        this.axios.get('https://richard-wellington-mavi-api.herokuapp.com/ultimaslocalizacoes/')
                .then((response) => {
                    // return JSON.parse(JSON.stringify(response.data));
                    return response.data;
                }).then((resultado) => {
                    this.ultimasPosicoes = JSON.parse(JSON.stringify(resultado));
                });
    
        this.$store.dispatch("loadColaboradores");
        var colaboradoresForaDoProxy = JSON.parse(JSON.stringify(this.colaboradores));
        var ultimasPosicoes = JSON.parse(JSON.stringify(this.ultimasPosicoes));
        console.log('debug -> ultimasPosicoes: ', ultimasPosicoes);
        console.log('debug -> colaboradoresForaDoProxy: ', colaboradoresForaDoProxy,'\n\n\n');

        colaboradoresForaDoProxy.forEach((c) => {
            
            ultimasPosicoes.forEach((p) => {
            
                if (c.matricula == p.matricula) {
                    this.$store.dispatch('updateColaboradorPosition', 
                        {   
                            id: colaboradoresForaDoProxy.indexOf(c),
                            ultimaLongitude: p.ultimaLongitude.toFixed(6),
                            ultimaLatitude: p.ultimaLatitude.toFixed(6)
                        });
                }

            });
        });
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
    
        colaboradoresForaDoProxy.forEach((c1) => {

            // verificação de acesso restrito
            // ------------------------------
            restricoesAcesso.forEach((r1) => {
                areas1ForaDoProxy = JSON.parse(JSON.stringify(r1.areas));

                areas1ForaDoProxy.forEach((a1) => {
                    
                    //verifica se a restrição é aplicável para o colaborador atual (c1)
                    let restricaoAplicavelAoC1 = false;

                    for (let i = 0; i < r1.colaboradores.length; i++) {
                        if (c1.matricula == r1.colaboradores[i].matricula) restricaoAplicavelAoC1 = true;
                    }
                    
                    if ( (r1.restricaoGlobal == 1 || restricaoAplicavelAoC1) &&
                         this.colaboradorDentroArea([c1.ultimaLongitude, c1.ultimaLatitude], a1.coordenadas[0], a1.coordenadas[2]) ) {
                             console.log(new Date().toLocaleString() + " - violação de acesso restrito detectada");
                             this.newRegistro.data = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
                             this.newRegistro.colaborador = c1.id;
                             this.newRegistro.area = a1.id;
                             this.newRegistro.restricao = r1.id;

                             this.addRegistro();
                         }
                });
            });

            //verificação de distanciamento
            // ----------------------------
            colaboradoresForaDoProxy.forEach((c2) => {
                
                if (c1.matricula != c2.matricula) {
                    restricoesDistanciamento.forEach((r2) => {
                        areas2ForaDoProxy = JSON.parse(JSON.stringify(r2.areas));

                        areas2ForaDoProxy.forEach((a2) => {

                            
                            let restricaoAplicavelAoC1 = false;
                            let restricaoAplicavelAoC2 = false;

                            //verifica se a restrição é aplicável para o colaborador atual 1 (c1)
                            for (let j = 0; j < r2.colaboradores.length; j++) {
                                if (c1.matricula == r2.colaboradores[j].matricula) restricaoAplicavelAoC1 = true;
                            }

                            //verifica se a restrição é aplicável para o colaborador atual 2 (c2)
                            for (let k = 0; k < r2.colaboradores.length; k++) {
                                if (c2.matricula == r2.colaboradores[k].matricula) restricaoAplicavelAoC2 = true;
                            }

                            if ( ((r2.restricaoGlobal == 1) || (restricaoAplicavelAoC1 && restricaoAplicavelAoC2))   &&
                                   this.colaboradorDentroArea([c1.ultimaLongitude, c1.ultimaLatitude], a2.coordenadas[0], a2.coordenadas[2]) &&
                                   this.colaboradorDentroArea([c2.ultimaLongitude, c2.ultimaLatitude], a2.coordenadas[0], a2.coordenadas[2]) &&
                                   this.c1ProximoC2([c1.ultimaLongitude, c1.ultimaLatitude],
                                                    [c2.ultimaLongitude, c2.ultimaLatitude], 2) ) {
                                                        console.log(new Date().toLocaleString() + " - violação de distanciamento social detectada");
                                                        this.newRegistro.data = new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate();
                                                        this.newRegistro.colaborador = c1.id;
                                                        this.newRegistro.area = a2.id;
                                                        this.newRegistro.restricao = r2.id;

                                                        this.addRegistro();
                                                    } 
                               
                        });
                    });
                }

            });
        });
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