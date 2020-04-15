const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody())

router.get('/', async(ctx, next) => {
    ctx.body = 'run in 4000'
})
router.get('/getAjax', async(ctx, next) => {
    console.log(ctx.request.query)
    let cb = ctx.request.query.cb
    let obj = {
        name: 'jxl',
        age: 20
    }
    // ctx.body = `var a = 20`

    ctx.body = `${cb}(${JSON.stringify(obj)})`
})
router.get('/jsonGet', async(ctx, next) => {
    console.log(ctx.request.query)
    ctx.body = {
        name: 'get',
        age: 20
    }
})
router.post('/jsonPost', async(ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = {
        name: 'post',
        age: 20
    }
}) 

app.use(router.routes())
app.listen(4000)