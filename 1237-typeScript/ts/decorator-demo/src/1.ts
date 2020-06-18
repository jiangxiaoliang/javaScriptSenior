class A {
    static add(a: number, b: number) {
        let result = a + b
        log(a, b, result)
        return result
    }
}

function log(a: number, b: number, result: number) {
    console.log('日志：', {
        a,
        b,
        result
    });
}

let rs1 = A.add(1, 2)
console.log(rs1)

export default {}