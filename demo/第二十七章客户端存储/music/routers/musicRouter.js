const Router = require('koa-router')
const musicControl = require('../controller/music')

let router = new Router()

router.get('/', musicControl.testService)

router.get('/login', musicControl.login)
router.post('/checkUser', musicControl.checkUser)
router.get('/list', musicControl.list)
router.get('/error', musicControl.error)
router.get('/detail', musicControl.detail)

module.exports = router