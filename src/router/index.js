import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import {useAuthState} from "../store"

const {getUsername} = useAuthState()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const username = getUsername()
  if (to.name !== 'login' && !username) next({ name: 'login' })
  else if (to.name === 'login' && username) next({ name: 'home' }) 
  else next()
})

export default router
