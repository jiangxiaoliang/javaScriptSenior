let a = 10
let obj = {
    name: 'jxl',
    age: 20
}
let fn = function() {
    console.log('fn.....')
}
let num = 10
let str = 'abc'

// 方式一 export default  默认导出，只能导出一个
export default a
// 方式二 导出多个
export { obj as myObj, num, str}