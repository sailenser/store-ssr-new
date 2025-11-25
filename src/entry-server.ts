import { makeApp } from './app';

export default async function runApp(context: any) {
  const apiCache = {};
  const { app, router } = makeApp({ ssr: true, apiCache });

  router.push(context.url);

  await Promise.all([await router.isReady()]);

  return { app, router, apiCache };
}
