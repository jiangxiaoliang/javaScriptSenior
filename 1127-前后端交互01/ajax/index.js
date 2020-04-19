const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody())

router.get('/', async (ctx, next) => {
    ctx.body = 'hello'
})
router.get('/get', async(ctx, next) => {
    console.log(ctx.request.query)
    ctx.body = {
        status: '1',
        info: 'success'
    }
})
router.post('/post', async(ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = {
        status: '2',
        info: 'success'
    }
})
router.get('/jsonp', async(ctx, next) => {
    console.log(ctx.request.query)
    let cb = ctx.request.query.callback
    let obj = {
        status: '3',
        info: 'failed'
    }
    ctx.body = `${cb}(${JSON.stringify(obj)})`
})


app.use(router.routes())
app.listen(8000)