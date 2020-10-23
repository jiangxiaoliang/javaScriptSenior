import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Flow,
    Body,
    Params,
    Query,
    Ctx
} from 'koa-ts-controllers'
import { Context } from 'koa'
import authorization from '../middlewares/authorization'
import { Board as BoardModel } from '../models/Board'
import { PostAddBoardBody, PutUpdateBoard,getAndValidateBoard } from '../validators/Board'

@Controller('/board')
@Flow([authorization])
export class BoardController {
    /**
     * 创建面板
     */
    @Post('')
    public async addBoard(
        @Ctx() ctx: Context,
        @Body() body: PostAddBoardBody
    ) {
        const { name } = body
        const board = new BoardModel()
        board.name = name
        board.userId = ctx.userInfo.id
        await board.save()
        ctx.status = 201
        return board
    }
    /**
     * 获取当前用户登录的所有面板
     */
    @Get('')
    public async getBoards(
        @Ctx() ctx: Context
    ) {
        const boards = await BoardModel.findAll({
            where: {
                userId: ctx.userInfo.id
            }
        })
        return boards
    }
    /**
     * 获取当前登录用户指定的一个面板
     */
    @Get('/:id(\\d+)')
    public async getBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        const board = await getAndValidateBoard(id, ctx.userInfo.id)
        return board
    }
    /**
     * 更新指定的看板
     */
    @Put('/:id(\\d+)')
    public async updateBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateBoard
    ) {
        const board = await getAndValidateBoard(id, ctx.userInfo.id)
        board.name = body.name || board.name
        await board.save()
        ctx.status = 204
    }
    /**
     * 删除指定看板
     */
    @Delete('/:id(\\d+)')
    public async deleteBoard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        const board = await getAndValidateBoard(id, ctx.userInfo.id)
        board.destroy()
        ctx.status = 204
    }
}