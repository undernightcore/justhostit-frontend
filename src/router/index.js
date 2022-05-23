import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/panel',
    name: 'Panel',
    component: () => import('../views/Panel.vue')
  },
  {
    path: '/instanciar',
    name: 'Instanciar',
    component: () => import('../views/Instancias/Crear.vue')
  },
  {
    path: '/instancia/:id',
    name: 'UsarInstancia',
    component: () => import('../views/Instancias/Usar.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
