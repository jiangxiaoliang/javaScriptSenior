const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'production',
    
    devtool: 'source-map',

    entry: {
        // 'test': './src/test.js'
        'template': './src/template.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './public/js/[name].js'
    },

    module: {
        rules: [
            {
                test: /\.txt$/,
                use: 'raw-loader'
            },
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // }
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'my app',
            template: './html/template.html',
            filename: 'app.html'
        }),
        // new HtmlWebpackPlugin({
        //     // 模板文件存放的目录
        //     template: "./html/template1.html",
        //     // 生成（打包）后的html存放目录
        //     filename: "app1.html"
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: './public/css/[name].css'
        })
    ],

    devServer: {
        // 多目录，默认会
        contentBase: [path.join(__dirname, 'html')],
        open: true,
        port: '8081',
        index: 'app.html',
        // 开启热更新
        hot: true,
        // 即使 HMR 不生效，也不会刷新真个页面
        hotOnly: true,
        proxy: {
            '/api': {
                target: 'http://localhost:7777'
            }
        }
    }
}