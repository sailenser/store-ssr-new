import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import { renderToString } from 'vue/server-renderer';
import serialize from 'serialize-javascript';

//Подгружаем конфиг .env
dotenv.config();

// Constants
const port = process.env.PORT || 4587;
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

      // 3. Получаем функцию файла результата результата серверной сборки SSR
      const createServerApp = (await vite.ssrLoadModule('/src/entry-server.js')).default;

      const { app, router, apiCache } = await createServerApp({ url });

      const { matched } = router.currentRoute.value;
      const noSsrPage = matched.some(r => r.meta.guest || r.meta.auth);

      if (!noSsrPage) {
        const innerHtml = await renderToString(app);
        template = template.replace(`<!--ssr-outlet-->`, innerHtml);
      }

      const serverData = {
        ssr: !noSsrPage,
        apiCache,
      };

      template = template.replace(
        '<!--ssr-data-->',
        `<script>window.appServerData = ${serialize(serverData, { isJSON: true })}</script>`
      );

      // 6. Отправить на сервер отрисованный HTML-код.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  });
}

createExpressServer();
