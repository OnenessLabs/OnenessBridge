import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'
import BridgeView from '../views/bridge/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:type?',
      name: 'home',
      component: BridgeView
    },
    // {
    //   path: '/auth_callback',
    //   name: 'auth_callback',
    //   component: () => import('../views/AuthCallback/index.vue')
    // },
    {
      path: '/bridge',
      name: 'bridge',
      component: HomeView
    },
  ]
})

export default router
