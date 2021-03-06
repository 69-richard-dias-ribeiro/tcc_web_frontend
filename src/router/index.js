import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
//import Empresa from '../views/Empresa.vue';
import FuncionariosOptions from '../views/FuncionariosOptions.vue';
import Usuarios from '../views/Usuarios.vue';
import Colaboradores from '../views/Colaboradores.vue';
import Departamentos from '../views/Departamentos.vue';
import Cargos from '../views/Cargos.vue';
import Areas from '../views/Areas.vue';
import Restricoes from '../views/Restricoes.vue';
import Registros from '../views/Registros.vue';
import Graficos from '../views/Graficos.vue';
import teste_mapa from '../views/Teste.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/pagina_inicial',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/empresa',
  //   name: 'Empresa',
  //   component: Empresa
  // },
  {
    path: '/funcionarios',
    name: 'Funcionarios',
    component: FuncionariosOptions
  },
  {
    path: '/funcionarios/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/funcionarios/colaboradores',
    name: 'Colaboradores',
    component: Colaboradores
  },
  {
    path: '/funcionarios/departamentos',
    name: 'Departamentos',
    component: Departamentos
  },
  {
    path: '/funcionarios/cargos',
    name: 'Cargos',
    component: Cargos
  },
  {
    path: '/areas',
    name: 'Areas',
    component: Areas
  },
  {
    path: '/restricoes',
    name: 'Restricoes',
    component: Restricoes
  },
  {
    path: '/registros',
    name: 'Registros',
    component: Registros
  },
  {
    path: '/graficos',
    name: 'Graficos',
    component: Graficos
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
  ,
  {
    path: '/teste_mapa',
    name: 'teste_mapa',
    component: teste_mapa
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
