function log(t="localStorage") {
    return function(target: Function, key: string, descriptor: PropertyDescriptor) {
        let method = descriptor.value
        descriptor.value = function(a: number, b: number) {
            let result = method(a, b)
            console.log(t, {
                a,
                b,
                result
            });
            return result
        }
    }
}
// function log(target: Function, key: string, descriptor: PropertyDescriptor) {
//     // console.log(target, key, description)
//     let method = descriptor.value
//     descriptor.value = function(a: number, b: number) {
//         let result = method(a, b)
//         console.log('日志', {
//             a,
//             b,
//             result
//         });
//         return result
//     }
// }

class A {
    @log()
    static add(a: number, b: number) {
        return a + b
    }
    @log('database')
    static sub(a: number, b: number) {
        return a - b
    }
}

let rs1 = A.add(1, 2)
console.log(rs1)
let rs2 = A.sub(2, 1)
console.log(rs2)