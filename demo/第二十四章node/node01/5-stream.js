const fs = require('fs')
let rs = fs.createReadStream('1.txt')
let ws = fs.createWriteStream('2.txt')
rs.pipe(ws)

let num = 0
let str = ''
rs.on('data', chunk => {
    num++
    str+=chunk
    console.log(chunk)
    console.log(num)
})
rs.on('end', () => {
    console.log(str)
})
// 流会把数据分成64kb的小文件
// let buffer = new Buffer.alloc(64 * 1024)
// fs.writeFile('64kb', buffer, err => {
//     if(err) {
//         console.log(err)
//     }
//     console.log('write success')
// })