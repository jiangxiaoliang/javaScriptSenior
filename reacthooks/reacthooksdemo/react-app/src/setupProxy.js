const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(createProxyMiddleware("/miaov", {
        target: "https://data.miaov.com/",
        secure: true, // 默认false，是否需要改变原始主机头为目标URL
        changeOrigin: true,
        pathRewrite: {
            "^/miaov": ""
        },
        cookieDomainRewrite: "https://data.miaov.com/"
    }))
}