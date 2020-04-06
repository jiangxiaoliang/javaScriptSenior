const newService = require('../service/news')

module.exports = {
    async renderIndex(ctx) {
        let data = newService.getNewsData()
        let perPage = parseInt(ctx.request.query.perPage) || 5
        let p = parseInt(ctx.request.query.p) || 1
        let pCount = Math.ceil(data.length / perPage)
        let perPageData = data.splice(perPage * (p - 1), perPage)
        await ctx.render('news/index', {
            perPageData,
            pCount
        })
    },
    async renderDetail(ctx) {
        let id = parseInt(ctx.request.query.id) || 1
        let data = newService.getNewsById(id)[0]
        await ctx.render('news/detail', {
            data
        })
    }
}