import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/loginview.vue'
import RegisterView from '../views/registroview.vue'
import PacientesView from '../views/pacientesview.vue'
import AgendaView from '../views/agendaview.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/pacientes',
      component: PacientesView
    },
    {
      path: '/agenda',
      component: AgendaView
    }
  ]
})

export default router
