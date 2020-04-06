const adminRouter = require('./routers/adminRouter')
const newRouter = require('./routers/newRouter')

module.exports = function(app) {
    app.use(adminRouter.routes())
    app.use(newRouter.routes())
}