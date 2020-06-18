interface IPointer {
    x: number,
    y: number
}
function fn(opt:IPointer) {

}
fn({
    x: 1,
    y: 2
})

interface Fly {
    fly(): void
}
class Person {
    constructor(public name: string) {

    }
}
class Child extends Person implements Fly {
    fly() {
        console.log('fly')
    }
}