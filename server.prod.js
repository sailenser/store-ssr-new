import dotenv from 'dotenv';
import path from 'node:path';
import express from 'express';
import { readFileSync } from 'node:fs';
import serialize from 'serialize-javascript';
import { renderToString } from 'vue/server-renderer';
import makeApp from './dist-ssr/server/entry-server.js';
const template = readFileSync('./dist-ssr/client/index.html').toString('utf-8');

//Определяем прод или тест режим
const isProd = process.env.NODE_ENV === 'production';
const environment = isProd ? 'production' : 'dev';

//Подгружаем нужный конфиг .env
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${environment}`),
  quiet: true,
});

const port = isProd ? process.env.PORT_PROD : process.env.PORT_DEV;

const app = express();

app.use('/assets', express.static('dist-ssr/client/assets'));
// app.use('/img', express.static('dist-ssr/client/img'))

app.use('*all', async (request, response) => {
  const url = request.originalUrl;
  const context = { url };

  try {
    let page = template;
    let status = 200;
    const { app, router, apiCache } = await makeApp(context);

    const { matched } = router.currentRoute.value;
    const noSsrPage = matched.some(r => r.meta.guest || r.meta.auth);

    if (!noSsrPage) {
      const html = await renderToString(app);

      if (status === 200) {
        const serverData = {
          apiCache,
        };

        page = page
          .replace('<!--ssr-outlet-->', html)
          .replace(
            '<!--ssr-data-->',
            `<script>window.appServerData = ${serialize(serverData, { isJSON: true })}</script>`
          );
      }
    }

    response.status(status).end(page);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(
    `🛠️Режим сборки: ${environment.toUpperCase()} \n🚀 Сервер запущен на http://localhost:${port}`
  );
});
