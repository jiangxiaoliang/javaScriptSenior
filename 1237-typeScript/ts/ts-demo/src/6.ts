class Person {
    // public name: string
    private age: number

    constructor(public name: string) {
        // this.name = name
        this.age = 1
    }

    getName(): string {
        return this.name
    }
    a(): number {
        return 1
    }
    b(): string {
        return 'b'
    }
}

let p1 = new Person('name')
p1.name
// p1.age
p1.getName()
p1.a()
p1.b()

export default {}