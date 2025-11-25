import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import HomePage from './../views/Home.vue';
import About from './../views/About.vue';
import E404 from './../components/E404.vue';
import Login from './../views/auth/Login.vue';
import Registration from './../views/auth/Registration.vue';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: HomePage,
    meta: {
      layout: 'default',
    },
  },
  {
    name: 'about',
    path: '/about',
    component: About,
    meta: {
      layout: 'default',
    },
  },
  {
    name: 'auth.login',
    path: '/login',
    meta: {
      guest: true,
      layout: 'default',
    },
    component: Login,
  },
  {
    name: 'auth.registration',
    path: '/registration',

    meta: {
      guest: true,
      layout: 'default',
    },
    component: Registration,
  },

  {
    path: '/:any(.*)',
    component: E404,
  },
];

export default function createAppRouter() {
  const createEnvRouter = import.meta.env.SSR ? createMemoryHistory : createWebHistory;

  const router = createRouter({
    routes,
    history: createEnvRouter(import.meta.env.BASE_URL),
  });

  return router;
}
