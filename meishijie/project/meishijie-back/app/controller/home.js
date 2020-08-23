'use strict';
const host = 'http://127.0.0.1:7001'

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async banner() {
    const { ctx, service } = this
    const menus = await service.menu.query({}, { page: 1 })
    ctx.body = {
      code: 0,
      data: {
        list: menus.list.slice(0, 5)
      },
      mes: 'banner返回成功'
    }
  }
  async upload() {
    const { ctx } = this
    const { type } = ctx.request.query
    if (!type || !ctx.upload[type]) {
      ctx.body = {
        code: 1,
        data: {},
        mes: '请使用正确type类型'
      }
      return
    }
    const fileOptions = ctx.upload[type]
    const stream = await ctx.getFileStream()
    console.log(stream)
    const info = await ctx.helper.wirteStreamToDisk(stream, fileOptions)
    if (info.error) {
      ctx.body = {
        code: 1,
        data: {},
        mes: info.mes
      }
      return
    }
    ctx.body = {
      code: 0,
      data: {
        url: host + info.accessPath
      },
      mes: '上传图片成功'
    }
  }
}

module.exports = HomeController;
