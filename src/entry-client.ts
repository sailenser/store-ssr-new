import { makeApp } from './app';
import '@/assets/essential.css';

(async function () {
  const context = {
    ssr: window.appServerData.ssr,
    apiCache: window.appServerData.apiCache,
  };

  const { app, router } = makeApp(context);

  await router.isReady();

  app.mount('#app');
})();
