const Koa = require('koa')
const views = require('koa-views')
const static = require('koa-static')
const koaBody = require('koa-body')
const router = require('./router')

let app = new Koa()

app.use(views(__dirname + '/views'), {
    map: {
        html: 'pug'
    }
})
app.use(static(__dirname + '/static'))
app.use(koaBody())
router(app)

app.listen(8000)