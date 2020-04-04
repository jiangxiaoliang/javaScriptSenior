const Koa = require('koa')
const Router = require('koa-router')
const nunjucks = require('koa-nunjucks-2')

let app = new Koa()
let router = new Router()

app.use(nunjucks({
    ext: 'html', // .njk
    path: __dirname + '/views',
    nunjucksConfig: {
        trimBlocks: true // 防止XSS漏洞
    }
}))
router.get('/', async ctx => {
    // ctx.body = 'hello'
    await ctx.render('index', {
        username: '张三',
        num: 2,
        users: [{
            name: '张三',
            age: 18
        }, {
            name: '李四',
            age: 20
        }],
        str: 'hello world'
    })
})
router.get('/son', async ctx => {
    await ctx.render('son')
})
router.get('/import', async ctx => {
    await ctx.render('import')
})

app.use(router.routes())
app.listen(8000)