import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as Vue from 'vue' // in Vue 3
import axios from 'axios'
import VueAxios from 'vue-axios'
console.log(Vue);
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/dist/vue3-openlayers.css'

// createApp(App).use(store).use(router).use(OpenLayersMap).mount('#app');
const app = createApp(App);
app.use(OpenLayersMap)
app.use(router)
app.use(store)
app.use(VueAxios, axios);
app.mount('#app')
