import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/register-seller',
      name: 'register seller',
      component: () => import('../views/RegisterSeller.vue')
    },
    {
      path: '/register-buyer',
      name: 'register buyer',
      component: () => import('../views/RegisterBuyer.vue')
    }
  ]
})

export default router
