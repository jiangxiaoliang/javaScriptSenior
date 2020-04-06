const data = require('../data/data.json')

module.exports = {
    getNewsData() {
        return JSON.parse(JSON.stringify(data))
    },
    getNewsById(id) {
        return data.filter(item => item.id === id)
    }
}