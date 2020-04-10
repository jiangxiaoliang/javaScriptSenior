const musicRouter = require('./routers/musicRouter')

module.exports = function(app) {
    app.use(musicRouter.routes())
}