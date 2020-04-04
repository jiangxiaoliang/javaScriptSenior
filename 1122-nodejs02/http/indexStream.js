/**
 * 1、原生node如何加载路由
 * 2、原生node如何加载页面
 * 3、原生node如何加载资源(css,js)
 */
const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('./mime.json')

const server = http.createServer((req, res) => {
    console.log(req.url)
    if (req.url === '/' || req.url === '/index') {
        res.setHeader('content-type', 'text/html;charset=utf8')
        // res.write('index 主页')
        let rs = fs.createReadStream('./views/index.html')
        rs.pipe(res)
    } else if (req.url === '/detail') {
        res.setHeader('content-type', 'text/html;charset=utf8')
        // res.write('详情页面')
        let rs = fs.createReadStream('./views/detail.html')
        rs.pipe(res)
    } else if (req.url === '/api/getData') {
        let obj = {
            name: 'jxl',
            age: 20
        }
        // res.setHeader('content-type', 'application/json')
        res.write(JSON.stringify(obj))
        res.end()
    } else {
        // console.log(path.extname(req.url))
        let extName = path.extname(req.url)
        res.setHeader('content-type', mime[extName])
        let rs = fs.createReadStream(__dirname + '/views' + req.url)
        rs.pipe(res)
    }
    // res.end()
})

server.listen(8000)