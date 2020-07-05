interface Point {
    x: number
    y: number
    [prop: number]: number
}
let p: Point = {
    x: 1,
    y: 2,
    3: 3,
    4: 5
}

interface IFunc {
    (a: string): string
}
let fn: IFunc = function(a) {
    return a
}
fn("1")

function css(ele: Element, attr: string, value?: number | string) {

}
let div = document.querySelector('.box')
css(div, 'height')
css(div, 'height', 100)
// css(div, 'height', true)