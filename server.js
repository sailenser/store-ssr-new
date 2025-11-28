import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { renderToString } from 'vue/server-renderer';
import serialize from 'serialize-javascript';

//Определяем прод или тест режим
const isProd = process.env.NODE_ENV === 'production';

const environment = isProd ? 'production' : 'dev';

//Подгружаем нужный конфиг .env
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${environment}`),
  quiet: true,
});

// Общие константы
const port = isProd ? process.env.PORT_PROD : process.env.PORT_DEV;
const baseUrl = process.env.BASE_URL || '/';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createExpressServer() {
  const app = express();

  //включаем gzip-сжатие
  app.use(compression());

  //appType: 'custom' - отключаем собственную логику HTML-обслуживания Vite и делаем собственную
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
    baseUrl: baseUrl,
  });

  app.use(vite.middlewares);

  app.use('*all', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. Считываем файл index.html
      let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');

      //2. Применяем HTML-преобразования Vite, добавляет /@vite для файлов в html в теге <script>
      template = await vite.transformIndexHtml(url, template);

      // 3. Запускаем серверную часть ssr и проучаем на выходе функцию для создания ssr серверной части
      const createServerApp = (await vite.ssrLoadModule('/src/entry-server.js')).default;

      const { app, router, apiCache } = await createServerApp({ url });

      const { matched } = router.currentRoute.value;
      const noSsrPage = matched.some(r => r.meta.guest || r.meta.auth);

      if (!noSsrPage) {
        // 4. Если наша страница SSR, то преобразуем html сгенерированый на сервере с учетом store и т.д. и внедряем его
        const innerHtml = await renderToString(app);
        template = template.replace(`<!--ssr-outlet-->`, innerHtml);
      }

      const serverData = {
        ssr: !noSsrPage,
        apiCache,
      };

      // 5. Вставляем данные кэша запросов к api и ключик помечающий текущая страница ssr или нет
      template = template.replace(
        '<!--ssr-data-->',
        `<script>window.appServerData = ${serialize(serverData, { isJSON: true })}</script>`
      );

      // 6. Отобразить на сервере отрисованный HTML-код.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(
      `🛠️Режим сборки: ${environment.toUpperCase()} \n🚀 Сервер запущен на http://localhost:${port}`
    );
  });
}

await createExpressServer();
