const Service = require('egg').Service
const pageSize = 12

class MenuService extends Service {
    async query(payload, otherData = { page: 0 }) {
        const { ctx, service } = this
        const field = { userId: 1, title: 1, classify: 1, property: 1, product_pic_url: 1, name: 1 }
        const page = +otherData.page
        const skip = (page - 1) * pageSize
        const query = ctx.helper.filterDef(payload)
        const queryList = ctx.model.Menu.find(query, field)
        const total = await queryList.count()
        let list = []
        if (page === 0) {
            list = await queryList.find().sort({ _id: -1 })
        } else {
            list = await queryList.find().skip(skip).limit(pageSize)
            .sort({ _id: -1 })
        }
        // 查找评论
        for (let i = 0; i < list.length; i++) {
            const comments = await service.menu.getComment({ menu_id: list[i]._id })
            // console.log(comments)
            list[i]._doc.comments_len = comments.length
            list[i]._doc.menuId = list[i]._id
        }
        return {
            list,
            total,
            current_page: page,
            page_size: pageSize,
        }
    }

    async getComment(payload) {
        return await this.ctx.model.Comment.find(payload).sort({ _id: -1 }).populate({ path: 'userInfo', select: 'name _id avatar' })
    }

    async changeMenuInfo(updateAttr, updateValue) {
        return await this.ctx.model.Menu.update({ userId: updateAttr.userId }, updateValue, { multi: true })
    }

    async menuInfo(payload) {
        return await this.ctx.model.Menu.findOne(payload)
    }

    async comment(payload) {
        await this.ctx.model.Comment.create(payload)
        return await this.ctx.model.Comment.findOne(payload).populate({ path: 'userInfo', select: 'name _id avatar ' })
    }

    async property() {
        const property = await this.ctx.model.Property.find().select('-_id -__v')
        // console.log(property)
        const obj = []
        property.forEach(item => {
            const option = obj.find(o => o.parent_type === item.parent_type)
            if (option) {
                option.list.push(item)
            } else {
                const o = {
                    parent_type: item.parent_type,
                    parent_name: item.parent_name,
                    title: item.title
                }
                o.list = [ item ]
                obj.push(o)
            }
        })
        // console.log(obj)
        return obj
    }

    async classify() {
        const classifies = await this.ctx.model.Classification.find().select('-_id -__v')
        // console.log(classifies)
        const obj = []
        classifies.forEach(item => {
            const option = obj.find(o => o.parent_type === item.parent_type)
            if (option) {
                option.list.push(item)
            } else {
                const o = {
                    parent_type: item.parent_type,
                    parent_name: item.parent_name
                }
                o.list = [ item ]
                obj.push(o)
            }
        })
        return obj
    }

    async publish(payload) {
        if (!payload.parent_classify) {
            payload.parent_classify = payload.classify.split('-')[0]
        }
        // 错误设置
        const menu = this.ctx.model.Menu.create(payload)
        return menu
    }
}

module.exports = MenuService
