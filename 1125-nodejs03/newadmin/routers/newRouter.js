const Router = require('koa-router')
const newControl = require('../controller/new')
let router = new Router({
    prefix: '/news'
})

router.get('/index', newControl.renderIndex)
router.get('/detail', newControl.renderDetail)

module.exports = router