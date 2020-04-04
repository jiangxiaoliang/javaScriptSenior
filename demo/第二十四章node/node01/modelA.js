console.log('A mmodel')
require('./modelB')
let a = 10
class Person {
    constructor() {
        this.name = 'jxl'
    }
    hobby() {
        console.log('like footable')
    }
}

// module.exports = {
//     a,
//     Person
// }

exports.a = a
exports.Person = Person