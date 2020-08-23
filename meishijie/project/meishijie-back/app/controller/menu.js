'use strict'
const properties = require('../data/property')
const Controller = require('egg').Controller

class MenuControll extends Controller {
    async query() {
        const { ctx, service } = this
        const payload = ctx.request.query || {}
        const otherData = { page: 0 }
        // 转换分类查询数据
        if (payload.classify) {
            if (payload.classify.indexOf('-') === -1) {
                payload.parent_classify = payload.classify
            }
        }
        // property 是一个json字符串
        if (payload.property) {
            const property = JSON.parse(payload.property)
            Object.keys(property).forEach(key => {
                payload[`property.${key}`] = property[key]
            })
            delete payload.property
        }
        if (payload.page) otherData.page = payload.page
        if (isNaN(+otherData.page)) {
            ctx.body = {
                code: 1,
                data: {},
                mes: '分页数不为数字，请重新填写'
            }
            return
        }
        const query = {
            ...payload,
            classify: payload.classify,
            page: null
        }
        const menus = await service.menu.query(query, otherData)
        await ctx.helper.sleep(1000)
        ctx.body = {
            code: 0,
            data: {
                ...menus,
                userId: payload.userId
            },
            mes: '菜谱返回成功'
        }
    }

    // 获取菜单信息
    async menuInfo() {
        const { ctx, service } = this
        const payload = ctx.request.query || {}
        const menu = await service.menu.menuInfo({ _id: payload.menuId })
        if (!menu) {
            ctx.body = {
                code: 1,
                data: {
                    menuId: payload.menuId
                },
                mes: '信息不存在'
            }
            return
        }
        // console.log(menu._doc)
        menu._doc.menuId = menu._id
        const userInfo = await service.user.findUserInfo({ _id: menu.userId })
        const menuInfo = { ...menu._doc }
        menuInfo.collection_len = menuInfo.collectionUsers.length
        delete menuInfo.collectionUsers
        // 判断收藏的users是否包含自己
        let ownId = ''
        if (ctx.request.header.authorization) {
            const authorization = ctx.request.header.authorization.split(' ')[1]
            const decode = ctx.app.jwt.decode(authorization)
            ownId = decode.data._id
        }
        let isCollection = false
        if (ownId) {
            isCollection = !!menu.collectionUsers.find(item => item._id.toString() === ownId)
        }
        // 属性处理
        menuInfo.properties_show = []
        Object.keys(menuInfo.property).forEach(key => {
            for (let i = 0; i < properties.length; i++) {
                if (properties[i].title === key) {
                    for (let j = 0; j < properties[i].list.length; j++) {
                        if (properties[i].list[j].type === menuInfo.property[key]) {
                            menuInfo.properties_show.push({
                                type: properties[i].list[j].type,
                                name: properties[i].list[j].name,
                                parent_type: properties[i].type,
                                parent_title: properties[i].title,
                                parent_name: properties[i].name
                            })
                            break
                        }
                    }
                    break
                }
            }
        })
        ctx.body = {
            code: 0,
            data: {
                info: {
                    ...menuInfo,
                    isCollection,
                    userInfo
                },
                menuId: payload.menuId
            },
            mes: '菜谱信息返回成功'
        }
    }

    // 获取菜谱评论信息
    async comment() {
        const { ctx, service } = this
        if (ctx.request.method === 'GET') {
            const payload = ctx.request.query || {}
            const commentInfo = await service.menu.getComment(payload)
            // console.log(commentInfo)
            commentInfo.forEach(item => {
                item._doc.commentId = item._doc._id
                delete item._doc._id
                item._doc.userInfo._doc.userId = item._doc.userInfo._doc._id
                // delete item._doc.userInfo._doc._id
            })
            console.log(commentInfo)
            ctx.body = {
                ec: 200,
                data: {
                    comments: commentInfo,
                    menu_id: payload.menuId
                },
                mes: '成功返回评论'
            }
            return
        }
        const payload = ctx.request.body || {}
        let ownId = ''
        if (ctx.request.header.authorization) {
            const authorization = ctx.request.header.authorization.split(' ')[1]
            const decode = ctx.app.jwt.decode(authorization)
            ownId = decode.data._id
        }
        payload.userId = ownId
        payload.userInfo = payload.userId
        const commentInfo = await service.menu.comment(payload)
        commentInfo._doc.userInfo._doc.userId = commentInfo._doc.userInfo._doc._id
        delete commentInfo._doc.userInfo._doc._id
        ctx.body = {
            ec: 200,
            data: {
                comments: commentInfo,
                menu_id: payload.menuId
            },
            mes: '评论成功'
        }
    }

    // 获取所有属性
    async property() {
        const { ctx, service } = this
        const properties = await service.menu.property()
        ctx.body = {
            ec: 200,
            data: properties
        }
    }

    // 获取所有分类
    async cassify() {
        const { ctx, service } = this
        const classify = await service.menu.classify()
        ctx.body = {
            ec: 200,
            data: classify
        }
    }

    // 发布菜谱
    async publish() {
        const { ctx, service } = this
        const payload = ctx.request.body || {}
        let ownId = ''
        if (ctx.request.header.authorization) {
            const authorization = ctx.request.header.authorization.split(' ')[1]
            const decode = ctx.app.jwt.decode(authorization)
            ownId = decode.data._id
        }
        const findUser = await service.user.findUser({ _id: ownId })
        payload.name = findUser.name
        payload.userId = findUser._id
        await service.menu.publish(payload)
        ctx.body = {
            code: 0,
            data: {},
            mes: '发布成功'
        }
    }
}

module.exports = MenuControll
