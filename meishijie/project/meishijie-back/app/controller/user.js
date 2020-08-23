'use strict'
const Controller = require('egg').Controller

class UserControll extends Controller {
    // 用户注册
    async create() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        const findUser = await service.user.findUser({ name: payload.name })
        if (findUser) {
            ctx.body = {
                code: 1,
                mes: '用户已存在'
            }
            return
        }
        await service.user.create(payload)
        ctx.body = {
            code: 0,
            mes: '用户创建成功'
        }
    }
    // 用户登录
    async login() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        const findUser = await service.user.findUser({ name: payload.name })
        if (!findUser) {
            ctx.body = {
                code: 1,
                mes: '用户或密码输入错误，请重新输入'
            }
            return
        }
        const result = await ctx.compare(payload.password, findUser.password)
        if (!result) {
            ctx.body = {
                code: 1,
                mes: '用户或密码输入错误，请重新输入'
            }
            return
        }
        const token = await service.actionToken.apply(findUser._id)
        await service.actionToken.saveToken({ userId: findUser._id, token })
        ctx.body = {
            code: 0,
            data: {
                _id: findUser._id,
                name: findUser.name,
                token
            },
            mes: '登陆成功'
        }
    }
    // 获取用户信息
    async info() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        let userId = ''
        const authorization = ctx.request.header.authorization.split(' ')[1]
        const decode = ctx.app.jwt.decode(authorization)
        const ownerId = decode.data._id
        if (payload.userId) {
            userId = payload.userId
        } else {
            userId = ownerId
        }
        const findUser = await service.user.findUserInfo({ _id: userId })
        // 自己是否关注请求的的用户
        let isFollowing = false
        if (payload.userId) {
            const findOwner = await service.user.findUserFollowing({ userId: ownerId })
            isFollowing = !!findOwner.find(item => item._id.toString() === userId)
        }
        const menus = await service.menu.query({ userId })
        if (!findUser) {
            ctx.body = {
                code: 1,
                data: {},
                mes: '用户不存在'
            }
            return
        }
        ctx.body = {
            code: 0,
            data: {
                ...findUser,
                userId: findUser._id,
                work_menu_len: menus.total,
                isFollowing
            },
            mes: '用户已返回'
        }
    }
    // 用户注册
    async login_out() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        // paylaod为空，所以删除token表的所有记录
        await service.actionToken.deleteToken({ userId: payload._id })
        ctx.body = {
            code: 0,
            mes: '已登出'
        }
    }

    // 编辑用户信息
    async edit() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        let userId = ''
        const authorization = ctx.request.header.authorization.split(' ')[1]
        const decode = ctx.app.jwt.decode(authorization)
        const ownerId = decode.data._id
        if (ownerId) {
            userId = ownerId
        }
        payload._id = userId
        await service.user.changeUserInfo(payload)
        await service.menu.changeMenuInfo({ userId }, { name: payload.name })
        ctx.body = {
            code: 0,
            data: {},
            mes: '修改成功'
        }
    }
}

module.exports = UserControll
