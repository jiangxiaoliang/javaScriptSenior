const Koa = require('koa')
const Router = require('koa-router')

let app = new Koa()
let router = new Router()

let items = [
    {
        id: 1,
        name: 'iPhone XR',
        price: 542500
    },
    {
        id: 2,
        name: 'Apple iPad Air 3',
        price: 377700
    },
    {
        id: 3,
        name: 'Macbook Pro 15.4',
        price: 1949900
    },
    {
        id: 4,
        name: 'Apple iMac',
        price: 1629900
    },
    {
        id: 5,
        name: 'Apple Magic Mouse',
        price: 72900
    },
    {
        id: 6,
        name: 'Apple Watch Series 400',
        price: 599900
    }
]

router.get('/', async ctx => {
    ctx.body = 'hello'
})
router.get('/items', async ctx => {
    ctx.body = items
})

app.use(router.routes())
app.listen(8000)