import {
    Controller,
    Get,
    Params,
    Query,
    Post,
    Body,
    Header,
    Ctx,
    Flow
} from 'koa-ts-controllers'
import {IsNumberString, IsNotEmpty} from 'class-validator'
import Boom from '@hapi/Boom'
import { Context } from 'koa';
import authorization from '../middlewares/authorization'

class GetUsersQuery {
    @IsNumberString()
    page: number
}
class PostUserBody {
    @IsNotEmpty({
        message: '用户名不能为空'
    })
    name: string;
    @IsNotEmpty({
        message: '密码不能为空'
    })
    password: string
}

@Controller('/test')
class TestController {
    // @Get('/hello')
    // async hello(a: any) {
    //     console.log(a.b)
    //     return 'hello test'
    // }

    // @Get('/user/:id(\\d+)')
    // async getUser(
    //     // @Params() p: {id: number}
    //     @Params('id') id: number
    // ) {
    //     return '当前parmas中id：' + id
    // }

    // @Get('/user')
    // async getUser2(
    //     @Query() q: {id: number}
    // ) {
    //     return '当前parmas中id：' + q.id
    // }

    @Post('/user')
    async postUser(
        // @Body() body: {
        //     name: string,
        //     password: string
        // },
        @Ctx() ctx: Context,
        @Body() body: PostUserBody,
        @Header() h:any
    ) {
        // console.log(h)
        // return `post参数为：${JSON.stringify(body)}`
        // console.log(body.name)
        // console.log(JSON.stringify(body))
        ctx.status = 201
        return {
            id: 1,
            name: body.name,
            createdAt: new Date()
        }
    }

    @Get('/users')
    async getUsers(
        @Query() q: GetUsersQuery
    ) {
        // 业务逻辑出现了错误，比如用户不存在，用户名已经被注册
        // if (true) {
        //     throw Boom.notFound('注册失败', '用户名已被注册')
        // }
        return '当前parmas中id：' + q.page
    }

    @Get('/auth')
    @Flow([authorization])
    async auth(
        @Ctx() ctx: Context
    ) {
        
        return '不登录看不到'
    }
    @Get('/noauth')
    async noauth(
    ) {
        return '随便看'
    }
}