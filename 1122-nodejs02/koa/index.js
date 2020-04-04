// koa express是node.js的框架
const Koa = require('koa')

let app = new Koa()

app.use(async ctx => {
    ctx.body = 'hello 你好'
})

app.listen(8000)