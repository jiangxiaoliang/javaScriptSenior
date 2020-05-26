const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()

router.get('/api/data', async(ctx, next) => {
    ctx.body = 'jxl'
})

app.use(router.routes())
app.listen(7777)