// console.log('index')
// let modelA = require('./modelA')
// console.log(modelA.a)
// let zhangshan = new modelA.Person()
// console.log(zhangshan.hobby())
// require('./modelB')

// require('./home')

// node_modules中的模块
let { a, b } = require('mytest')
console.log(a,b)

// npm:包管理器
// dependencies:运行依赖jquery、vue、react  ；devDependencies：开发依赖 sass less；