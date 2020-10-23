import {
    Min,
    IsNotEmpty,
    MaxLength,
    ValidateIf,
    IsNumberString,
    IsNumber
} from 'class-validator'
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard'
import { CardAttachment as CardAttachmentModel } from '../models/CardAttachment'
import Boom from '@hapi/Boom'

export class PostAddCardBody {
    @Min(1, {
        message: 'boardListId不能为空且必须是大于1的数字'
    })
    boardListId: number

    @IsNotEmpty({
        message: '名称不能为空'
    })
    @MaxLength(255, {
        message: '卡片名称不能大于255个字符'
    })
    name: string

    @ValidateIf(o => o.description !== undefined)
    @MaxLength(2000, {
        message: '卡片描述不能大于255个字符'
    })
    description: string
}

export class GetCardsQuery {
    @IsNumberString({}, {
        message: 'boardListId不能为空且是数字'
    })
    boardListId: number
}

export class PutUpdateCardBody {
    @ValidateIf(o=>o.boardListId !== undefined)
    @Min(1, {
        message: 'boardListId不能为空且必须是大于1的数字'
    })
    boardListId?: number;

    @ValidateIf(o=>o.name !== undefined)
    @MaxLength(255, {
        message: '卡片名称不能大于255个字符'
    })
    name?: string;

    @ValidateIf(o=>o.description !== undefined)
    @MaxLength(2000, {
        message: '卡片描述不能大于2000个字符'
    })
    description?: string;

    @ValidateIf(o=>o.order !== undefined)
    @IsNumber({}, {
        message: 'order必须为数字'
    })
    order?: number;
}

export async function getAndValidateBoardListCard(id: number, userId: number): Promise<BoardListCardModel> {
    const boardListCard = await BoardListCardModel.findByPk(id)
    if (!boardListCard) {
        throw Boom.notFound('指定卡片不存在')
    }
    if (boardListCard.userId !== userId) {
        throw Boom.forbidden('禁止访问该卡片')
    }
    return boardListCard
}

export async function getAndValidateCardAttachment(id: number, userId: number): Promise<CardAttachmentModel> {
    const cardAttachment = await CardAttachmentModel.findByPk(id)
    if (!cardAttachment) {
        throw Boom.notFound('指定附件不存在')
    }
    if (cardAttachment.userId !== userId) {
        throw Boom.forbidden('禁止访问该附件')
    }
    return cardAttachment
}