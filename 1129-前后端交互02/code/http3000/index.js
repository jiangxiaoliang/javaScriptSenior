const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const axios = require('axios')
const koaServerHttpProxy = require('koa-server-http-proxy')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaServerHttpProxy('/api', {
    target: 'http://localhost:4000',
    pathRewrite: {
        '^/api': ''
    }
}))
router.get('/', async(ctx, next) => {
    ctx.body = 'running at port 3000'
})
router.post('/test', async(ctx, next) => {
    ctx.cookies.set('name', 'jxl', {
        maxAge: 3600 * 1000
    })
    ctx.body = {
        info: 'test'
    }
})
router.post('/getData', async(ctx, next) => {
    let res = await axios({
        method: 'post',
        url: 'http://localhost:4000/getDataService'
    })
    console.log(res.data)
    ctx.body = res.data
})

app.use(router.routes())
app.listen(3000)