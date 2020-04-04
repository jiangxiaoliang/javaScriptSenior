const Koa = require('koa')

let app = new Koa()

app.use(ctx => {
    // 成功 {status:1,info:'成功'}
    // 失败 {status:0,info:'失败'}
    // ctx.status = 404
    ctx.status = 302 // 重定向
    // ctx.set('location', 'http://www.baidu.com')
    ctx.body = '状态码'
})

app.listen(8000)