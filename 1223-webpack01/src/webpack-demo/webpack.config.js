const path = require('path')

module.exports = {
    mode: 'development',

    // entry: './src/index.js'
    // entry: [
    //     './src/index.js',
    //     './src/list.js'
    // ]
    entry: {
        // index: './src/index.js',
        // list: './src/list.js'
        // 'txt-demo': './src/txt-demo.js'
        // 'md-demo': './src/md-demo.js'
        // 'file-demo': './src/file-demo.js'
        'css-demo': './src/css-demo.js'
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        // filename: 'bundle.js' // 单文件入口
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.txt$/i,
                use: 'raw-loader'
            },
            {
                test: /\.md$/,
                // 多个loader可以使用数组，执行顺序从右到左
                use: ['html-loader', 'markdown-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        // 打包后存放的位置
                        outputPath: "./images",
                        publicPath: '../dist/images'
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    }
                ]
            }
        ]
    }
}