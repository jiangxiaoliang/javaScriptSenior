const { Service } = require("egg")

module.exports = () => {
    return async (ctx, next) => {
        let authorization = ctx.request.header.authorization
        console.log('authorization', authorization)
        if (!authorization) {
            ctx.body = {
                code: 1,
                data: {},
                error: 400,
                mes: '没有权限请求'
            }
            return
        }
        authorization = authorization.split(' ')[1]

        try {
            await ctx.app.jwt.verify(authorization, ctx.app.config.jwt.secret)
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                // 过期把数据库中也清除
                // await service.actionToken.deleteToken({userId: payload._id});
                ctx.app.jwt.decode(authorization, async function(err, data) {
                    if (err) {
                        await Service.actionToken.deleteToken({
                            userId: data.data._id
                        })
                    }
                })
                ctx.body = {
                    code: 1,
                    data: {},
                    error: 400,
                    mes: '登录已过期，请重新登录'
                }
                return
            }
        }
        const decode = ctx.app.jwt.decode(authorization)
        if (!decode) {
            ctx.body = {
                code: 1,
                data: {},
                error: 400,
                mes: 'token不合法，请检查后重试'
            }
            return
        }
        await next()
    }
}
