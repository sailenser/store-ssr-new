import { makeApp } from './app';
// import '@/assets/styles/reset.css';
// import '@/assets/styles/fonts.css';
// import '@/assets/styles/animations.css';
// import '@/assets/styles/essential.css';
import '@/assets/styles/css/fonts.css';
import '@/assets/styles/css/index.css';

(async function () {
  const context = {
    ssr: window.appServerData.ssr,
    apiCache: window.appServerData.apiCache,
  };

  const { app, router } = makeApp(context);

  await router.isReady();

  app.mount('#app');
})();
