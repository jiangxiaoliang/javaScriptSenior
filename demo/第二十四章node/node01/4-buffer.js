// let buffer = new Buffer(10)
// console.log(buffer)

// let buffer = new Buffer.alloc(10)
// let buf = new Buffer(10)
// console.log(buffer)
// console.log(buf)

// let buffer1 = new Buffer.from('大家好')
// let buf1 = new Buffer('大家好')
// console.log(buffer1)
// console.log(buf1)

// let buffer2 = new Buffer.from([0xe5, 0xa4, 0xa7, 0xe5, 0xae, 0xb6, 0xe5, 0xa5, 0xbd])
// console.log(buffer2.toString())

// let buffer3 = new Buffer.from([0xe5, 0xa4, 0xa7, 0xe5])
// let buffer4 = new Buffer.from([0xae, 0xb6, 0xe5, 0xa5, 0xbd])
// console.log(buffer3.toString())
// let newBuffer = Buffer.concat([buffer3, buffer4])
// console.log(newBuffer.toString())


// let { StringDecoder } = require("string_decoder");
// let decoder =  new StringDecoder();
// let res1 = decoder.write(buffer3);
// let res2 = decoder.write(buffer4);
// console.log(res1+res2);
