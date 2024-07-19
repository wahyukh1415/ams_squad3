import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
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
