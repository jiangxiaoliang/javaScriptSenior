// vue.config.js
// webpack开发者自己写的配置，vue-cli会把开发者写的配置合并到内置的webpack配置中。 
module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/api': { // http://localhost:8081/api/banner
                target: 'http://127.0.0.1:7001', // http://127.0.0.1:7001/banner
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}