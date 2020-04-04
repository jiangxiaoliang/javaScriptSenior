const fs = require('fs')

/**
 * 1 增删改查
 * 2 文件操作和目录操作
 * 3 所有文件操作，没有加上Sync都是异步，否则是同步
 */

// 文件操作
// fs.writeFile('1.txt', '我是写入的内容1', (err) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('write success')
// })
// a:追加  w:写入 r:读取
// fs.writeFile('1.txt', '追加的内容', {flag: 'a'}, (err) => {
// if(err) {
//     console.log(err)
// }
//     console.log('write success')
// })

// 文件读取
// fs.readFile('1.txt', 'utf8', (err, data) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(data)
// })
// fs.readFile('1.txt', (err, data) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(data.toString())
// })

// 重命名
// fs.rename('1.txt', '2.txt', (err) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('rename success')
// })

// 删除
// fs.unlink('2.txt', (err) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('unlink success')
// })

// 复制
// fs.copyFile('modelA.js', 'myModelA.js', (err) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('copy success')
// })
// function myCopy(src, dist) {
//     fs.writeFileSync(dist, fs.readFileSync(src))
// }
// myCopy('modelA.js', 'myModelA.js')

// 目录操作
// 创建目录
// fs.mkdir('11', err => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('mkdir success')
// })

// 修改目录名称
// fs.rename('11', '22', err => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('rename success')
// })

// 读取目录
// fs.readdir('22', (err, data) => {
//     if(err) {
//         console.log(err)
//     }
//     console.log(data)
// })

// 删除目录(只能删除空文件夹)
// fs.rmdir('22', err => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('rmdir')
// })

// 判断文件或者目录是否存在
// fs.exists('1-server.js', exist => {
//     console.log(exist)
// })

// 获取文件或目录的详细信息
// fs.stat('1-server.js', (err, data) => {
//     if(err) {
//         console.log(err)
//     }
//     // console.log(data)
//     // 判断是否是文件
//     console.log(data.isFile())
//     // 判断是否文件夹
//     console.log(data.isDirectory())
// })

// 删除非空文件夹：先删除文件，再删除文件夹
function removeDir(path) {
    let dir = fs.readdirSync(path)
    for(let i = 0; i < dir.length; i++) {
        let url = path + '/' + dir[i]
        let stat = fs.statSync(url)
        if(stat.isFile()) {
            fs.unlinkSync(url)
        } else {
            removeDir(url)
        }
    }
    fs.rmdirSync(path)
}
removeDir('22')