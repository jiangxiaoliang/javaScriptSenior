'use strict'

const Service = require('egg').Service

class ActionTokenService extends Service {
    async apply(_id) {
        const { ctx } = this
        return ctx.app.jwt.sign({
            data: {
                _id
            }
        }, ctx.app.config.jwt.secret, {
            expiresIn: 24 * 60 * 60
        })
    }

    async saveToken(payload) {
        const { ctx } = this
        return ctx.model.Token.findOneAndUpdate({ userId: payload.userId }, { token: payload.token }, { upsert: true })
    }

    async deleteToken(payload) {
        return await this.ctx.model.Token.remove(payload)
    }
}

module.exports = ActionTokenService
