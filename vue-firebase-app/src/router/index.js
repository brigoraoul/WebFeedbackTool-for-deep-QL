import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../views/StartPage.vue'

const routes = [
  {
    path: '/',
    name: 'StartPage',
    component: StartPage
  },
  {
    path: '/feedback',
    name: 'FeedbackPage',
    
    component: () => import('../views/FeedbackPage.vue')
  },
  {
    path: '/finish',
    name: 'EndPage',
    
    component: () => import('../views/EndPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
