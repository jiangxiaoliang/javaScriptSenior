const fs = require('fs')
const data = require('../data/data.json')

module.exports = {
    getNewsData() {
        return JSON.parse(JSON.stringify(data))
    },
    async addNewsData(ctx) {
        // console.log(ctx.request.body) // 获取到post数据
        let addData = ctx.request.body
        let nowTime = new Date()
        // console.log(ctx.request.files) // 获取上传的文件
        if(!fs.existsSync('static/upload/img')) {
            fs.mkdirSync('static/upload/img')
        }
        let fileData = fs.readFileSync(ctx.request.files.img.path)
        fs.writeFileSync('static/upload/img/' + ctx.request.files.img.name, fileData)
        data.push({
            id: data[data.length - 1].id + 1,
            title: addData.title,
            content: addData.content,
            addTime: `${nowTime.getFullYear()}-${nowTime.getMonth() + 1}-${nowTime.getDate()}`,
            country: addData.country,
            type: addData.type,
            imgUrl: '/img/' + ctx.request.files.img.name
        })
        return new Promise((resolve, reject) => {
            fs.writeFile('./data/data.json', JSON.stringify(data), err => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve({
                        info: '保存成功',
                        status: 1
                    })
                }
            })
        })
    },
    delNews(id) {
        let filterData = data.filter(item => item.id !== id)
        return new Promise((resolve, reject) => {
            fs.writeFile('./data/data.json', JSON.stringify(filterData), err => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve({
                        info: '删除成功',
                        status: 1
                    })
                }
            })
        })
    }
}