import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../views/Auth.vue';
import Guilds from '../views/Guilds.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      component: Auth
    },
    {
      path: '/guilds',
      name: 'guilds',
      component: Guilds
    }
  ]
})

export default router
