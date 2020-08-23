'use strict'
const Controller = require('egg').Controller

class UserActionController extends Controller {
    /**
     * post 关注或取消指定用户{followUserId}
     * get 获取指定用户关注的人
     */
    async following() {
        const { ctx, service } = this
        if (ctx.request.method === 'GET') {
            const payload = ctx.request.query || {}
            const payloadClone = ctx.helper.cloneDeepWith(payload)
            const follows = await service.user.findUserFollowing(payloadClone)
            const followsData = follows.map(item => {
                return {
                    name: item.name,
                    _id: item._id,
                    userId: item._id,
                    sign: item.sign,
                    avatar: item.avatar,
                    following_len: item.following.length,
                    follows_len: item.follows.length
                }
            })
            ctx.body = {
                code: 0,
                data: {
                    userId: payload.userId,
                    list: followsData
                },
                mes: '返回我的关注'
            }
            return
        }
        const body = ctx.request.body || {}
        const authorization = ctx.request.header.authorization.split(' ')[1]
        const decode = ctx.app.jwt.decode(authorization)
        body.userId = decode.data._id
        const isAdd = await service.user.toggleFollow(body)
        const findFollowUser = await service.user.findUserInfo({ _id: body.followUserId })
        ctx.body = {
            code: 0,
            data: {
                ...findFollowUser,
                isFollowing: isAdd
            },
            mes: isAdd ? '已关注' : '未关注'
        }
    }

    /**
     * 获取粉丝
     */
    async fans() {
        const { ctx, service } = this
        const payload = ctx.request.query || {}
        const payloadClone = ctx.helper.cloneDeepWith(payload)
        const follows = await service.user.findUserFans(payloadClone)
        const followsData = follows.map(item => {
            return {
                name: item.name,
                _id: item._id,
                userId: item._id,
                sign: item.sign,
                avatar: item.avatar,
                following_len: item.following.length,
                follows_len: item.follows.length
            }
        })
        ctx.body = {
            code: 0,
            data: {
                userId: payload.userId,
                list: followsData
            },
            mes: '返回我的粉丝'
        }
    }

    /**
     * get 获取指定用户收藏的菜单
     * post 登录用户收藏或者取消收藏
     */
    async collection() {
        const { ctx, service } = this
        if (ctx.request.method === 'GET') {
            const payload = ctx.request.query || {}
            console.log(payload, typeof payload.userId)
            const validateResult = await ctx.validate('user.collection', payload)
            console.log(validateResult)
            if (!validateResult) return
            const payloadClone = ctx.helper.cloneDeepWith(payload)
            const collections = await service.user.findUserCollections(payloadClone)
            ctx.body = {
                code: 0,
                data: {
                    userId: payload.userId,
                    list: collections
                },
                mes: '成功返回收藏'
            }
        }
        const body = ctx.request.body || {}
        const authorization = ctx.request.header.authorization.split(' ')[1]
        const decode = ctx.app.jwt.decode(authorization)
        body.userId = decode.data._id
        const toggleInfo = await service.user.toggleCollection(body)
        ctx.body = {
            code: 0,
            data: {
                isCollection: toggleInfo.isAdd,
                collection_len: toggleInfo.collection_len
            },
            mes: toggleInfo.isAdd ? '已收藏' : '取消收藏'
        }
    }
}

module.exports = UserActionController
