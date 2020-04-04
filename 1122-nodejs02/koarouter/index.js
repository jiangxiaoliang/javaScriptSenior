const Koa = require('koa')
const Router = require('koa-router')
let app = new Koa()
let router = new Router()

// get： 地址栏； img、src
// get post put delete head patch；
// RESTfull；
/*
    对用户操作； 传统；
    增、删、改、查；url 是统一资源定位符；
    增 // http://www.test.com/adduser;
    删 // http://www.test.com/deluser;
    改 // http://www.test.com/updateuser;
    查 // http://www.test.com/getuser;
RESTfull； uri是统一资源标识符；多终端；
   增：  http://www.test.com/users   post
   删：  http://www.test.com/users   delete
   改：  http://www.test.com/users   put
   查：  http://www.test.com/users   get
*/

router.get('/index', ctx => {
    ctx.body = '主页'
})
router.get('/detail', ctx => {
    ctx.body = '详情页'
})
router.get('/data', ctx => {
    let obj = {
        name: 'jxl',
        age: 20
    }
    ctx.body = obj
})

app.use(router.routes())
app.listen(8000)