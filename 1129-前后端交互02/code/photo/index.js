const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const koaBody = require('koa-body')
const fs = require('fs')
const users = require('./data/users.json')
const images = require('./data/images.json')

let app = new Koa()
let router = new Router()

app.use(koaBody({
    multipart: true
}))
app.use(static(__dirname + '/static'))

router.get('/', async(cxt, next) => {
    cxt.body = 'hellow'
})
router.post('/checkUser', async(ctx, next) => {
    console.log(ctx.request.body)
    // console.log(users)
    let { username, pwd } = ctx.request.body
    let res = users.find(user => {
        return user.username === username && user.pwd === pwd
    })
    if (res) {
        ctx.cookies.set('uid', res.uid, {
            maxAge: 3600*1000,
            overwrite: true,
            httpOnly: true
        })
        ctx.redirect('/photo.html')
    } else {
        ctx.redirect('/login.html')
    }
})
router.get('/checkUserName', async(ctx, next) => {
    console.log(ctx.request.query)
    let { username } = ctx.request.query
    let res = users.find(user => {
        return user.username === username
    })
    if (res) {
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
router.post('/upload', async(ctx, next) => {
    let filePath = ctx.request.files.img.path
    if (!fs.existsSync('static/upload')) {
        fs.mkdirSync('static/upload')
    }
    // 使用流方式转存
    let rs = fs.createReadStream(filePath);
    rs.pipe(fs.createWriteStream('static/upload/' + ctx.request.files.img.name))
    let uid = ctx.cookies.get('uid')
    let imageData = {
        imgUrl: `upload/${ctx.request.files.img.name}`,
        imgName: ctx.request.files.img.name,
        uid
    }
    images.push(imageData)
    let res = fs.writeFileSync('data/images.json', JSON.stringify(images))
    // ctx.body = {
    //     status: 1,
    //     info: '保存成功'
    // }
    ctx.body = res
})
router.get('/getImageData', async(ctx, next) => {
    let uid = ctx.cookies.get('uid')
    let res = images.filter(image => image.uid === uid)
    ctx.body = res
})


app.use(router.routes())
app.listen(8000)