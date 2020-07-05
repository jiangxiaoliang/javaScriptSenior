// function fn(a: string): string {
//     return a
// }
// let fn1: (a: string) => string = function(a) {
//     return a
// }
// type callback = (a: string)=> string
// interface ICallback {
//     (a: string): string
// }
// let fn2: callback = function(a) {
//     return a
// }
// let fn3: ICallback = function(a) {
//     return a
// }

interface PlainObject {
    [key: string]: string | number
}
function css(ele: HTMLElement, attr: PlainObject)
function css(ele: HTMLElement, attr: string, value: string | number)
function css(ele: HTMLElement, attr: any, value?: any) {
    if (typeof attr === 'string' && value) {
        ele.style[attr] = value
    }
    if (typeof attr === 'object') {
        Object.keys(attr).forEach(item => ele.style[item] = attr[item])
    }
}

let div = document.querySelector('div')
if (div) {
    css(div, 'width', '100px')
    css(div, {
        opacity: 1,
        width: '50px'
    })
}