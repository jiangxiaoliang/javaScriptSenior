const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')
const userData = require('./data/userData')
const fs = require('fs')

let app = new Koa()
let router = new Router()

app.use(static(__dirname + '/static'))
app.use(koaBody({
    multipart: true
}))


router.get('/', async(ctx, next) => {
    ctx.body = '主页'
})
// 登陆校验用户名
router.get('/checkUserName', async(ctx, next) => {
    console.log(ctx.request.query)
    let isFind = userData.find(user => user.username === ctx.request.query.username)
    if (isFind) {
        ctx.body = {
            status: 1,
            info: '用户名正确'
        }
    } else {
        ctx.body = {
            status: 2,
            info: '用户名错误'
        }
    }
})
// get通过params传参
router.get('/get/:id', async(ctx, next) => {
    console.log(ctx.params)
    ctx.body = 'get'
})
// post请求
router.post('/post', async(ctx, next) => {
    console.log(ctx.request.body)
    ctx.body = {
        status: 1,
        info: '请求成功'
    }
})
// 返回不同的数据格式
router.get('/xml', async(ctx, next) => {
    // ctx.set('content-type', 'text/xml')
    ctx.body = `<?xml version='1.0' encoding='utf-8' ?>
        <books>
            <nodejs>
                <name>nodejs实战</name>
                <price>56元</price>
            </nodejs>
            <react>
                <name>react入门</name>
                <price>50元</price>
            </react>
        </books>
    `
})
// formData文件上传
router.post('/upload', async(ctx, next) => {
    console.log('>>>>>>>>>>>upload>>>>>>>>>>')
    console.log(ctx.request.body)
    // console.log(ctx.request.files)
    let file = fs.readFileSync(ctx.request.files.img.path)
    if (!fs.existsSync('static/imgs')) {
        fs.mkdirSync('static/imgs')
    }
    fs.writeFileSync('static/imgs/'+ctx.request.files.img.name, file)
    ctx.body = '请求成功'
})
// 文件上传
router.post('/fileUpload', async(ctx, next) => {
    console.log('>>>>>>>>>>>>>fileUpload>>>>>>>>>>>>')
    let file = fs.readFileSync(ctx.request.files.myfile.path)
    if (!fs.existsSync('static/imgs')) {
        fs.mkdirSync('static/imgs')
    }
    fs.writeFileSync('static/imgs/'+ctx.request.files.myfile.name, file)
    ctx.body = '请求成功'
})


app.use(router.routes())
app.listen(8000)