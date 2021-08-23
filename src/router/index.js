import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Empresa from '../views/Empresa.vue';
import FuncionariosOptions from '../views/FuncionariosOptions.vue';
import Colaboradores from '../views/Colaboradores.vue';
import Departamentos from '../views/Departamentos.vue';
import Cargos from '../views/Cargos.vue';

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
  {
    path: '/empresa',
    name: 'Empresa',
    component: Empresa
  },
  {
    path: '/funcionarios',
    name: 'Funcionarios',
    component: FuncionariosOptions
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
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
