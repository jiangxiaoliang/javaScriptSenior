// mvc
const Koa = require('koa')
const views = require('koa-views')
const static = require('koa-static')
const router = require('./router')
const koaBody = require('koa-body') // 接受post请求参数

let app = new Koa()

app.use(koaBody({
    multipart: true // 允许文件上传
}))
app.use(views(__dirname + '/views', {
    extension: 'pug'
}))
app.use(static(__dirname + '/static'))
router(app)
app.listen(8000)