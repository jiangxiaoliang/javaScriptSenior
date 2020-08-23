'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  const token = app.middleware.token()

  router.get('/', controller.home.index)
  router.get('/banner', controller.home.banner)
  router.post('/upload', controller.home.upload)

  router.post('/user/create', controller.user.create) // 注册
  router.post('/user/login', controller.user.login) // 登录
  router.post('/user/info', token, controller.user.info) // 获取用户信息
  router.post('/user/login_out', token, controller.user.login_out) // 用户退出
  router.post('/user/edit', token, controller.user.edit) // 编辑用户信息

  router.post('/user/following', controller.userAction.following) // 关注取消关注
  router.get('/user/following', controller.userAction.following) // 获取指定用户关注的人
  router.get('/user/fans', controller.userAction.fans) // 获取指定用户的粉丝
  router.get('/user/collection', token, controller.userAction.collection)
  router.post('/user/collection', token, controller.userAction.collection)

  // 菜谱相关
  router.get('/menu/query', controller.menu.query)
  router.get('/menu/menuInfo', controller.menu.menuInfo)
  router.get('/menu/comment', controller.menu.comment)
  router.post('/menu/comment', token, controller.menu.comment)
  router.get('/menu/property', controller.menu.property)
  router.get('/menu/classify', controller.menu.cassify)
  router.post('/menu/publish', controller.menu.publish)
};
