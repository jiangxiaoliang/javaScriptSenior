const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))

router.get('/', async(ctx, next) => {
    ctx.body = 'run in 3000'
})
router.get('/getAjax', async(ctx, next) => {
    console.log(ctx.query)
    // ctx.body = {
    //     name: 'jxl',
    //     age: 20
    // }
    // ctx.body = `var a = 10`

    let obj = {
        name: 'jxl',
        age: 20
    }
    let cb = ctx.query.cb
    ctx.body = `${cb}(${JSON.stringify(obj)})`
})

app.use(router.routes())
app.listen(3000)