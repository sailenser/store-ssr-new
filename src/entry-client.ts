import { createApp } from './app';
// import './styles/index.scss';

(async function () {
  const { app, router } = createApp();

  await router.isReady();

  app.mount('#app');
})();
