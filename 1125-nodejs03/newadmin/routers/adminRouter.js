const Router = require('koa-router')
const adminControl = require('../controller/admin')
let router = new Router({
    prefix: '/admin'
})

router.get('/index', adminControl.renderIndex)
router.get('/addNews', adminControl.renderAddNews)
router.get('/newList', adminControl.renderNewList)
// 添加数据
router.post('/addNewsData', adminControl.renderAddNewsData)
// 删除数据
router.get('/delNews', adminControl.delNews)

module.exports = router