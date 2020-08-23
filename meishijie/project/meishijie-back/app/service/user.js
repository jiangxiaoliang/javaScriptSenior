const Service = require('egg').Service

class UserService extends Service {
    async create(payload) {
        const { ctx } = this
        payload.password = await ctx.genHash(payload.password)
        return await ctx.model.User.create(payload)
    }

    async findUser(payload, options = {}) {
        if ('userId' in payload) {
            payload._id = payload.userId
            delete payload.userId
        }
        return await this.ctx.model.User.findOne(payload, options)
    }

    // 查询用户信息
    async findUserInfo(payload, options) {
        const findUser = await this.ctx.model.User.findOne(payload, options)
        const menus = await this.ctx.service.menu.query({ userId: payload._id })
        if (!findUser) return findUser
        return {
            name: findUser.name,
            _id: findUser._id,
            userId: findUser._id,
            follows_len: findUser.follows.length,
            following_len: findUser.following.length,
            collections_len: findUser.collections.length,
            avatar: findUser.avatar,
            sign: findUser.sign,
            work_menu_len: menus.length,
            createdAt: findUser.createdAt
        }
    }

    // 查找用户的关注的人
    async findUserFollowing(payload) {
        const followings = await this.ctx.model.User
            .findOne({ _id: payload.userId }, { following: 1 })
            .populate({
                path: 'following',
                select: 'name _id sign follows following avatar'
            })
        if (followings) {
            return followings.following
        }
        return []
    }

    async toggleFollow(payload) {
        const following = await this.ctx.model.User
            .findOne({ _id: payload.userId })
            .populate({
                path: 'following' // 关注
            })
        const follows = await this.ctx.model.User
            .findOne({ _id: payload.followUserId })
            .populate({
                path: 'follows' // 粉丝
            })
        let isAdd = false
        // 关注 - 取关
        if (following.following.find(item => item._id.toString() === payload.followUserId)) {
            // 取消关注
            following.following = following.following.filter(item => item._id.toString() !== payload.followUserId)
            // 删除粉丝
            follows.follows = follows.follows.filter(item => item._id.toString() !== payload.userId)
            isAdd = false
        } else {
            // 关注
            following.following.push(payload.followUserId)
            // 添加粉丝
            follows.follows.push(payload.userId)
            isAdd = true
        }
        await following.save()
        await follows.save()
        return isAdd
    }

    // 查找指定用户的粉丝
    async findUserFans(payload) {
        const fans = await this.ctx.model.User
            .findOne({ _id: payload.userId }, { follows: 1 })
            .populate({
                path: 'follows',
                select: 'name _id sign follows following avatar'
            })
        if (fans) {
            return fans.follows
        }
        return []
    }

    // 查询指定用户收藏的菜谱
    async findUserCollections(payload) {
        const collections = await this.ctx.model.User
            .findOne({ _id: payload.userId }, { collections: 1 })
            .populate({
                path: 'collections'
            })
        if (collections) {
            return collections.collections
        }
        return []
    }

    // 编辑用户信息
    async changeUserInfo(payload) {
        return this.ctx.model.User.findByIdAndUpdate(payload._id, { ...payload })
    }

    // 用户收藏或者取消收藏
    async toggleCollection(payload) {
        const collections = await this.ctx.model.User
            .findOne({ _id: payload.userId })
            .populate({ path: 'collections' })
        const collectionUsers = await this.ctx.model.Menu
            .findOne({ _id: payload.menuId })
            .populate({ path: 'collectionUsers' })
        let isAdd = false
        if (collections.collections.find(item => item._id.toString() === payload.menuId)) {
            collections.collections = collections.collections.filter(item => item._id.toString() !== payload.menuId)
            collectionUsers.collectionUsers = collectionUsers.collectionUsers.filter(item => item._id.toString() !== payload.userId)
            isAdd = false
        } else {
            collections.collections.push(payload.menuId)
            collectionUsers.collectionUsers.push(payload.userId)
            isAdd = true
        }
        await collections.save()
        await collectionUsers.save()
        return {
            isAdd,
            collection_len: collectionUsers.collectionUsers.length
        }
    }
}

module.exports = UserService
