// Этот файл и его зависимости являются общими для сервера и клиента(тут мы созаем приложение ssr)
// он выполняется в Node.js на сервере.
import { createSSRApp, createApp } from 'vue';
import App from './App.vue';
import createRouter from './router';

// SSR требует создания нового экземпляра приложения для каждого запроса, поэтому мы экспортируем функцию,
// которая создает новый экземпляр приложения. Если бы мы использовали Vuex, мы бы также создали здесь новое хранилище.
export function makeApp(context: any) {
  const createSpaOrSsrApp = context.ssr ? createSSRApp : createApp;
  const app = createSpaOrSsrApp(App);

  const router = createRouter();
  app.use(router);

  app.provide('apicache', context.apiCache);

  return { app, router };
}
