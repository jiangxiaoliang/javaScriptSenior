const Koa = require('koa')
const KoaRouter = require('koa-router')
const KoaBodyParser = require('koa-bodyparser')

let datas = {
    items: require('./data/items.json'),
    users: require('./data/users.json')
}
const app = new Koa()
const router = new KoaRouter()
let currentId = 20

app.use(async(ctx, next) => {
    // let origin = ctx.headers.origin;
    // ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    // ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    // ctx.set('Access-Control-Allow-Credentials', true);

    await next()
})
app.use(KoaBodyParser())

router.get('/', async ctx => {
    ctx.body = 'api'
})
router.get('/items', async ctx => {
    let sort = ctx.request.query.sort || 'desc'
    let items = datas.items.sort((a, b) => sort === 'asc' ? a.price - b.price : b.price - a.price)
    ctx.body = items
})
router.get('/item/:id', async ctx => {
    let id = Number(ctx.params.id)
    let item = datas.items.find(item => item.id === id)
    await new Promise(resolve => {
        setTimeout(_ => resolve(), 2000)
    })
    if (!item) {
        ctx.throw(404, '没有改商品')
        return
    }
    ctx.body = item
})
router.post('/add', async ctx => {
    // console.log(ctx.request.body);
    let {name} = ctx.request.body;

    if (name === '') {
        ctx.body = {
            code: 1,
            message: '商品名称不能为空'
        }
        return;
    }

    let newData = {
        id: currentId++,
        name
    };

    datas.items.unshift(newData);

    ctx.body = {
        code: 0,
        message: '提交成功',
        data: newData
    }
})

app.use(router.routes())
app.listen(7777)