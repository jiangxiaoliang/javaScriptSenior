import configs from './configs'
import Koa, {Context, Next} from 'koa'
import KoaRouter from 'koa-router'
import {bootstrapControllers} from 'koa-ts-controllers'
import path from 'path'
import koaBody from 'koa-body'
import Boom from '@hapi/Boom'
import {Sequelize} from 'sequelize-typescript'
import jwt from 'jsonwebtoken'
import koaStaticCache from 'koa-static-cache'

interface UserInfo {
    id: number;
    name: string;
}

(async () => {
    const app = new Koa()
    const router = new KoaRouter()

     // 静态资源代理
     app.use(koaStaticCache({
        dir: configs.storage.dir,
        prefix: configs.storage.prefix,
        gzip: true, // 是否压缩
        dynamic: true // 是否缓存
    }))

    // 链接数据库
    const db = new Sequelize({
        ...configs.database,
        models: [__dirname + '/models/**/*']
    })

    app.use(async(ctx: Context, next: Next) => {
        const token = ctx.header['authorization']
        if (token) {
            ctx.userInfo = jwt.verify(token, configs.jwt.privateKey) as UserInfo
        }
        await next()
    })

    // 注册路由
    await bootstrapControllers(app, {
        router,
        basePath: '/api',
        versions: [1],
        controllers: [
            path.resolve(__dirname, 'controllers/**/*')
        ],
        errorHandler: async(err: any, ctx: Context) => {
            // console.log(err)
            let status = 500;
            let body: any = {
                statusCode: status,
                error: "Internal Server error",
                message: "An internal server error occurred"
            }
            if (err.output) {
                status = err.output.statusCode,
                body = { ...err.output.payload }
                if (err.data) {
                    body.errorDetails = err.data
                }
            }
            ctx.status = status
            ctx.body = body
        }
    })

    // router.all('*', async ctx => {
    //     throw Boom.notFound('没有找到该路由')
    // })
    app.use(koaBody({
        multipart: true,
        formidable: {
            uploadDir: configs.storage.dir,
            keepExtensions: true
        }
    }))
    app.use(router.routes())

    app.listen(configs.server.port, configs.server.host, () => {
        console.log(`服务启动成功：http://${configs.server.host}:${configs.server.port}`)
    })
    // app.listen(8888)
})()