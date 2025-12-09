import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: 'default',
    },
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/views/About.vue'),
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
    component: () => import('@/views/auth/Login.vue'),
  },
  {
    name: 'auth.registration',
    path: '/registration',

    meta: {
      guest: true,
      layout: 'default',
    },
    component: () => import('@/views/auth/Registration.vue'),
  },

  {
    path: '/:any(.*)',
    component: () => import('@/components/E404.vue'),
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
