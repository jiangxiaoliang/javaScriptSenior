module.exports = {
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        proxy: {
            '/api': {
                target: 'http://localhost:8888',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api/v1'
                }
            }
        }
    },
    lintOnSave: false
}