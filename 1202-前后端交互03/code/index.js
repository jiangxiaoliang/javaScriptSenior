const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody())

router.get('/', async(ctx, next) => {
    ctx.body = 'hello'
})
router.get('/get', async(ctx, next) => {
    console.log(ctx.request.query)
    ctx.body = {
        status: 1,
        info: 'fetch get请求'
    }
})
router.post('/post', async(ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = {
        status: 2,
        info: 'fetch post请求'
    }
})
router.get('/axiosGet', async(ctx, next) => {
    ctx.body = {
        status: 1,
        info: 'axios get请求'
    }
})
router.post('/axiosPost', async(ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = {
        status: 1,
        info: 'axios post请求'
    }
})
router.get('/myaxios', async(ctx, next) => {
    ctx.body = {
        status: 1,
        info: 'myaxios get请求'
    }
})
app.use(router.routes())
app.listen(8000)