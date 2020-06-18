import {bootstrapControllers} from './libs/kkb';
const Koa = require('koa');

const app = new Koa();

(async function() {
    await bootstrapControllers(app, {
        basePath: '/api',
        controllers: __dirname + '/controllers/**/*.ts'
    });

    app.listen(8888);
})();