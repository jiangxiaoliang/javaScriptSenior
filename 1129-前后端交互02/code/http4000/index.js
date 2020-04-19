const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
router.get('/', async(ctx, next) => {
    ctx.body = 'running at port 4000'
})
router.options('/*', async(ctx, next) => {
    console.log('..options...')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.body = 'options'
})
router.post('/getData', async(ctx, next) => {
    console.log('请求过来了')
    // 1.允许cros跨域请求
    // ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    // 2.允许设置头部信息
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild')
    // 3.允许前端获取的头部
    ctx.set('Access-Control-Expose-Headers', 'Date')
    //4.允许前端请求的方法 ；
    ctx.set("Access-Control-Allow-Methods",'PUT, POST, GET, DELETE, OPTIONS');
    // 5.允许前端携带凭证
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.body = {
        info: 'i am at 4000'
    }
})
router.post('/getDataService', async(ctx, next) => {
    ctx.body = {
        status: '1',
        info: 'getDataService at 40000'
    }
})


app.use(router.routes())
app.listen(4000)