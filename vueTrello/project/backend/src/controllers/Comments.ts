import {
    Controller,
    Ctx,
    Flow,
    Put,
    Get,
    Body,
    Query
} from 'koa-ts-controllers'
import {Context} from 'koa'
import authorization from '../middlewares/authorization'
import { PostAddCommentBody, GetCommentsQuery } from '../validators/Comments'
import { Comment as CommentModel } from '../models/Comment'
import { User as UserModel} from '../models/User'
import { getAndValidateBoardListCard } from '../validators/BoardListCard'
import { getAndValidateBoardList } from '../validators/BoardList'

@Controller('/comment')
@Flow([authorization])
export class CommentsController {
    /**
     * 添加评论
     */
    @Put('')
    public async addComment(
        @Ctx() ctx: Context,
        @Body() body: PostAddCommentBody
    ) {
        const { boardListCardId, content } = body
        await getAndValidateBoardListCard(boardListCardId, ctx.userInfo.id)
        let comment = new CommentModel()
        comment.userId = ctx.userInfo.id
        comment.boardListCardId = boardListCardId
        comment.content = content
        await comment.save()
        ctx.status = 201
        return comment
    }
    /**
     * 获取评论
     */
    @Get('')
    public async getComments(
        @Ctx() ctx: Context,
        @Query() query: GetCommentsQuery
    ) {
        let { boardListCardId, page } = query
        getAndValidateBoardList(boardListCardId, ctx.userInfo.id)
        const where = { boardListCardId }
        // 查询总评论数
        const commentCount = await CommentModel.count({ where })
        const limit = 3
        const pages = Math.ceil(commentCount / 2)
        page = Number(page)
        if (!page) {
            page = 1
        }
        page = Math.min(page, pages)
        page = Math.max(1, page)
        const comments = await CommentModel.findAndCountAll({
            where,
            limit,
            offset: (page - 1) * limit,
            order: [['id', 'desc']],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'name']
                }
            ]
        })
        return {
            limit,
            page,
            pages,
            ...comments
        }
    }

}