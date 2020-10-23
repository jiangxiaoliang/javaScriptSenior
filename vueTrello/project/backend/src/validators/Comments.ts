import {
    IsNumber,
    MaxLength,
    IsNumberString,
    ValidateIf
} from 'class-validator'

export class PostAddCommentBody {
    @IsNumber({}, {
        message: 'boardListCardId必须是数字'
    })
    boardListCardId: number

    @MaxLength(2000,  {
        message: '评论内容不能大于2000'
    })
    content: string
}

export class GetCommentsQuery {
    @IsNumberString({}, {
        message: 'boardListCardId必须是数字'
    })
    boardListCardId: number

    @ValidateIf(o => o.page !== undefined)
    @IsNumberString({}, {
        message: '分页必须是数字'
    })
    page?: number
}