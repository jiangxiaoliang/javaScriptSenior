import {
    Get,
    Put,
    Post,
    Delete,
    Flow,
    Controller,
    Ctx,
    Query,
    Body,
    Params
} from 'koa-ts-controllers'
import { Context } from 'koa'
import authorization from '../middlewares/authorization'
import { BoardList as BoardListModel } from '../models/BoardList'
import { PostAddListBody, GetListsQuery, PutUpdateListBody, getAndValidateBoardList } from '../validators/BoardList'
import { getAndValidateBoard } from '../validators/Board'

@Controller('/list')
@Flow([authorization])
export class BoardListController {
    /**
     * 创建列表
     */
    @Post('')
    public async addList(
        @Ctx() ctx: Context,
        @Body() body: PostAddListBody
    ) {
        const { boardId, name } = body
        await getAndValidateBoard(boardId, ctx.userInfo.id)
        const maxOrderBoardList = await BoardListModel.findOne({
            where: {
                boardId
            },
            order: [['order', 'desc']]
        })
        const boardList = new BoardListModel()
        boardList.boardId = boardId
        boardList.name = name
        boardList.userId = ctx.userInfo.id
        boardList.order = maxOrderBoardList ? maxOrderBoardList.order + 65535 : 65535
        await boardList.save()

        ctx.status = 201
        return boardList
    }
    /**
     * 获取当前用户的制定面板的列表
     * /list?boardId=1
     */
    @Get('')
    public async getLists(
        @Ctx() ctx: Context,
        @Query() query: GetListsQuery
    ) {
        const { boardId } = query
        await getAndValidateBoard(boardId, ctx.userInfo.id)
        const boardLists = await BoardListModel.findAll({
            where: {
                boardId
            },
            order: [['order', 'asc']]
        })
        return boardLists
    }
    /**
     * 获取指定列表详情
     */
    @Get('/:id(\\d+)')
    public async getList(
        @Ctx() ctx: Context,
        @Params('id') id: number 
    ) {
        const boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        return boardList
    }
    /**
     * 更新
     */
    @Put('/:id(\\d+)')
    public async updateList(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateListBody
    ) {
        const { boardId, name, order } = body
        const boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        boardList.boardId = boardId || boardList.boardId
        boardList.name = name || boardList.name
        boardList.order = order || boardList.order
        boardList.save()

        ctx.status = 204
        return
    }
    /**
     * 删除
     */
    @Delete('/:id(\\d+)')
    public async deleteList(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        const boardList = await getAndValidateBoardList(id, ctx.userInfo.id)
        boardList.destroy()
        
        ctx.status = 204
        return
    }
}