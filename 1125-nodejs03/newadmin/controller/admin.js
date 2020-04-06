const adminService = require('../service/admin')

module.exports = {
    async renderIndex(ctx) {
        await ctx.render('admin/admin')
    },
    async renderAddNews(ctx) {
        await ctx.render('admin/addNews')
    },
    async renderNewList(ctx) {
        let data = adminService.getNewsData()
        let perPage = parseInt(ctx.request.query.perPage) || 5
        let p = parseInt(ctx.request.query.p) || 1
        let pCount = Math.ceil(data.length / perPage)
        let perPageData = data.splice(perPage * (p - 1), perPage)
        await ctx.render('admin/newList', {
            perPageData,
            pCount
        })
    },
    async renderAddNewsData(ctx) {
       let res = await adminService.addNewsData(ctx)
       let resData
       if (res.status === 1) {
            resData = {
                info: '添加成功',
                status: 1
            }
       } else {
           resData = {
               info: '添加失败',
               status: 0
           }
       }
       let redirectUrl = '/admin/addNews'
       await ctx.render('admin/message', {
           res: resData,
           redirectUrl
       })
    },
    async delNews(ctx) {
        let id = parseInt(ctx.request.query.id) || 1
        let res = await adminService.delNews(id)
        if (res.status === 1) {
            resData = {
                info: '删除成功',
                status: 1
            }
       } else {
           resData = {
               info: '删除失败',
               status: 0
           }
       }
       let redirectUrl = '/admin/newList'
       await ctx.render('admin/message', {
           res: resData,
           redirectUrl
       })
    } 
}