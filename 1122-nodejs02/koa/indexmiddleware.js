const Koa = require('koa')
let app = new Koa()

// 中间件 函数
// ctx：content简写(req,res)
let m1 = function(ctx, next) {
    console.log('m1 start')
    throw new Error('some error...')
    next()
    console.log('m1 end')
}
let m2 = function(ctx, next) {
    console.log('m2 start')
    next()
    console.log('m2 end')
}
app.use(m1)
app.use(m2)
app.use(async ctx => {
    // 1.执行顺序
    // console.log('start')

    // 2.获取get参数
    // ctx.req === req; ctx.res === res;
    // ctx.response  koa封装的res ctx.request koa封装的req
    // console.log(ctx.request.query)

    // 3.别名res输出；  ctx.body(别名) 完整写法；ctx.response.body;

    // 4.异步处理
    // let res = await new Promise(resolve => {
    //     setTimeout(() => {
    //         resolve('resolved')
    //     }, 1000)
    // })
    // console.log(res)
    ctx.body = '中间件'
    // ctx.body = res
    // console.log('end')
})

// 错误处理中间件
app.on('error', err => {
    console.log('???' + err)
})

app.listen(8000)