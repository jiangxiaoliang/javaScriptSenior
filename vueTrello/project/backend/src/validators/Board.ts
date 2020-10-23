import {
    IsNotEmpty,
    MaxLength,
    ValidateIf
} from 'class-validator'
import { Board as BoardModel } from '../models/Board'
import Boom from '@hapi/Boom'

export class PostAddBoardBody {
    @IsNotEmpty({
        message: '面板名称不能为空'
    })
    @MaxLength(255, {
        message: '面板名称不能大于255'
    })
    name: string
}

export class PutUpdateBoard {
    @ValidateIf(o => o.name !== undefined)
    @IsNotEmpty({
        message: '面板名称不能为空'
    })
    @MaxLength(255, {
        message: '面板名称不能大于255'
    })
    name ?: string
}

export async function getAndValidateBoard(id: number, userId: number): Promise<BoardModel> {
    const board = await BoardModel.findByPk(id)
    if (!board) {
        throw Boom.notFound('指定看板不存在')
    }
    if (board.userId !== userId) {
        throw Boom.forbidden('禁止访问该面板')
    }
    return board
}