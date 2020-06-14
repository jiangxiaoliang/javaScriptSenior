module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:7777',
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    },
    lintOnSave: false
}