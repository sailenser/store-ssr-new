import makeApp from './dist-ssr/server/entry-server.js';
import { renderToString } from 'vue/server-renderer';
import { readFileSync } from 'node:fs';
const template = readFileSync('./dist-ssr/client/index.html').toString('utf-8');
import express from 'express';
import serialize from 'serialize-javascript';

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

app.listen(3007);
