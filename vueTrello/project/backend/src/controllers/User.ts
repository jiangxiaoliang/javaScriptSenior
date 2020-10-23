import {
    Controller,
    Post,
    Body,
    Ctx
} from 'koa-ts-controllers'
import {RegisterBody, LoginBody} from '../validators/User'
import {User as UserModel} from '../models/User'
import Boom from '@hapi/Boom'
import { Context } from 'koa'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import configs from '../configs'

@Controller('/user')
export class UserController {

    @Post('/register')
    async register(
        @Ctx() ctx: Context,
        @Body() body: RegisterBody
    ) {
        const { name, password } = body
        // 查询数据库
        const user = await UserModel.findOne({
            where: {
                name
            }
        })
        if (user) {
            throw Boom.conflict('注册失败', '用户名已被注册')
        }

        const newUser = new UserModel()
        newUser.name = name
        newUser.password = password
        await newUser.save()
        ctx.status = 201
        return {
            id: newUser.id,
            name: newUser.name,
            createdAt: newUser.createdAt
        }
    }

    @Post('/login')
    async login(
        @Ctx() ctx: Context,
        @Body() body: LoginBody
    ) {
        const { name, password } = body
        const user = await UserModel.findOne({
            where: {
                name
            }
        })
        if (!user) {
            throw Boom.forbidden('登录失败', '用户名不存在!')
        }

        // 存在比较密码是否一致
        const md5 = crypto.createHash('md5')
        const hexPassword = md5.update(password).digest('hex')
        if (hexPassword !== user.password) {
            throw Boom.forbidden('登录失败', '密码错误!')
        }
        const userInfo = {
            id: user.id,
            name: user.name
        }
        const token = jwt.sign(userInfo, configs.jwt.privateKey)
        ctx.set('authorization', token)
        return userInfo
    }
}