import { createApp } from './app';

export default async function runApp(context: any) {
  const { app, router } = createApp();

  router.push(context.url);

  await Promise.all([await router.isReady()]);

  return { app, router };
}
