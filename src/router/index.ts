import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import HomePage from './../views/Home.vue';
import About from './../views/About.vue';
import E404 from './../components/E404.vue';

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
