import {
    Flow,
    Controller,
    Get,
    Put,
    Delete,
    Post,
    Body,
    Query,
    Params,
    Ctx
} from 'koa-ts-controllers'
import { Context } from 'koa'
import authorization from '../middlewares/authorization'
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard'
import { Comment as CommentModel } from '../models/Comment'
import { CardAttachment as CardAttachmentModel } from '../models/CardAttachment'
import { Attachment as AttachmentModel } from '../models/Attachment'
import {
    PostAddCardBody,
    getAndValidateBoardListCard,
    GetCardsQuery,
    PutUpdateCardBody,
    getAndValidateCardAttachment
} from '../validators/BoardListCard'
import { getAndValidateBoardList } from '../validators/BoardList'
import configs from '../configs'
import Boom from '@hapi/boom'

@Controller('/card')
@Flow([authorization])
export class BoardListCardController {
    /**
     * 创建卡片
     */
    @Post('')
    public async addCard(
        @Ctx() ctx: Context,
        @Body() body: PostAddCardBody
    ) {
        const { boardListId, name, description } = body
        await getAndValidateBoardList(boardListId, ctx.userInfo.id)
        const boardListCard = new BoardListCardModel()
        boardListCard.boardListId = boardListId
        boardListCard.userId = ctx.userInfo.id
        boardListCard.name = name
        boardListCard.description = description || ''
        await boardListCard.save()
        ctx.status = 201
        return boardListCard
    }
    /**
     * 获取卡片列表
     */
    @Get('')
    public async getCards(
        @Ctx() ctx: Context,
        @Query() query: GetCardsQuery
    ) {
        const { boardListId } = query
        await getAndValidateBoardList(boardListId, ctx.userInfo.id)
        const boardListCards = await BoardListCardModel.findAll({
            where: {
                boardListId
            },
            order: [['id', 'asc']],
            include: [
                {
                    model: CommentModel,
                    attributes: ['id']
                },
                {
                    model: CardAttachmentModel,
                    include: [
                        {
                            model: AttachmentModel
                        }
                    ]
                }
            ]
        })
        const boardListCardsData = boardListCards.map((card: BoardListCardModel) => {
            // 处理附件的路径和封面
            let coverPath = ''
            let attachments = card.attachments.map(attachment => {
                let data = attachment.toJSON() as CardAttachmentModel & { path: string }
                data.path = configs.storage.prefix + '/' + data.detail.name
                if (data.isCover) {
                    coverPath = data.path
                }
                return data
            })
            return {
                id: card.id,
                userId: card.userId,
                boardListId: card.boardListId,
                name: card.name,
                description: card.description,
                order: card.order,
                createdAt: card.createdAt,
                updatedAt: card.updatedAt,
                attachments: attachments,
                coverPath: coverPath,
                commentCount: card.comments.length
            }
        })
        return boardListCardsData
    }
    /**
     * 获取一个卡片信息
     */
    @Get('/:id(\\d+)')
    public async getCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        const boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
        return boardListCard
    }
    /**
     * 更新一个卡片信息
     */
    @Put('/:id(\\d+)')
    public async putCard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateCardBody
    ) {
        const { boardListId, name, description, order } = body
        const boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
        boardListCard.boardListId = boardListId || boardListCard.boardListId
        boardListCard.name = name || boardListCard.name
        boardListCard.description = description || boardListCard.description
        boardListCard.order = order || boardListCard.order
        await boardListCard.save()
        ctx.status = 204
        return
    }
    /**
     * 删除一个卡片信息
     */
    @Delete('/:id(\\d+)')
    public async deleteCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        const boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
        boardListCard.destroy()
        ctx.status = 204
        return
    }
    /**
     * 上传附件
     */
    @Post('/attachment')
    public async addAttachment(
        @Ctx() ctx: Context,
        @Body() body: any
    ) {
        const { boardListCardId } = body
        await getAndValidateBoardListCard(boardListCardId, ctx.userInfo.id)
        if (!ctx.request.files || !ctx.request.files.attachment) {
            throw Boom.badData('缺少附件')
        }
        const file = ctx.request.files.attachment
        // console.log(file)
        const attachment = new AttachmentModel()
        attachment.userId = ctx.userInfo.id
        attachment.originName = file.name
        attachment.name = file.path.split('\\').pop() as string
        attachment.type = file.type
        attachment.size = file.size
        await attachment.save()

        const cardAttachment = new CardAttachmentModel()
        cardAttachment.userId = ctx.userInfo.id
        cardAttachment.boardListCardId = boardListCardId
        cardAttachment.attachmentId = attachment.id
        cardAttachment.isCover = false
        await cardAttachment.save()

        ctx.status = 201
        return {
            id: cardAttachment.id,
            userInfo: cardAttachment.userId,
            boardListCardId: cardAttachment.boardListCardId,
            attachmentId: attachment.id,
            path: configs.storage.prefix + '/' + attachment.name,
            isCover: false,
            detail: attachment
        }
    }
    /**
     * 删除附件
     */
    @Delete('/attachment/:id(\\d+)')
    public async deleteAttachment(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        const cardAttachment = await getAndValidateCardAttachment(id, ctx.userInfo.id)
        // 这里只是移除了关联表，附件表，硬盘里存储的附件是没有删除
        cardAttachment.destroy()
        ctx.status = 204
        return
    }

    /**
     * 设置封面
     */
    @Put('/attachment/cover/:id(\\d+)')
    public async setCover(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let cardAttachment = await getAndValidateCardAttachment(id, ctx.userInfo.id)
        await CardAttachmentModel.update({
            isCover: false
        }, {
            where: {
                boardListCardId: cardAttachment.boardListCardId
            }
        })
        cardAttachment.isCover = true
        await cardAttachment.save()
        ctx.status = 204
        return
    }
    @Delete('/attachment/cover/:id(\\d+)')
    public async deleteCover(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let cardAttachment = await getAndValidateCardAttachment(id, ctx.userInfo.id)
        cardAttachment.isCover = false
        await cardAttachment.save()
        ctx.status = 204
        return
    }
}