const Koa = require('koa')
const Router = require('koa-router')
const views = require('koa-views') // 加载模板(页面)
const static = require('koa-static') // 加载静态资源(js,css)
let app = new Koa()
let router = new Router()
let newData = require('./data/data.json')

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))
app.use(static(__dirname + '/static'))
router.get('/', ctx => {
    ctx.body = 'start'
})
// 主页
router.get('/index', async ctx => {
    let perPage = ctx.request.query.perPage || 5 // 每页显示多少数据
    let p = ctx.request.query.p || 1 // 当前第几页
    let dataCount = newData.length // 数据总条数
    let pCount = Math.ceil(dataCount / perPage) //总页数
    let showData = JSON.parse(JSON.stringify(newData)).splice(perPage*(p-1), perPage)

    await ctx.render('index', {
        showData,
        pCount
    })
})
// 详情页
router.get('/detail', async ctx => {
    // console.log(typeof ctx.request.query.id)
    let id = parseInt(ctx.request.query.id) || 1
    let detailData = newData.filter(data => data.id === id)[0]
    await ctx.render('detail', {
        detailData
    })
})
router.get('/data', async ctx => {
    let obj = {
        name: 'jxl',
        age: 20
    }
    let res = await new Promise(resolve => {
        setTimeout(() => {
            resolve(obj)
        }, 3000)
    })
    ctx.body = res
})

app.use(router.routes())
app.listen(8000)
