import {bootstrapControllers} from 'koa-ts-controllers';
const Koa = require('koa');

const app = new Koa();

(async function() {
    await bootstrapControllers(app, {
        basePath: '/api',
        controllers: [__dirname + '/controllers/**/*.ts'],
        initBodyParser: true,
        boomifyErrors: true,
        versions:{
            1: 'This version is deprecated and will soon be removed. Consider migrating to version 2 ASAP',
            2: true,
            dangote: true // great for custom, business client specific endpoint versions
        }
    });

    app.listen(8888);
})();