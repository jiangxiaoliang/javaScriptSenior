// 正则的作用：查找、替换、验证、分割
// 需求 查找字符串里的所有数字 放在数组
// let str = "afdafdf12321fdsafd12312fda33535";
// [12321,12312, 33535];
// function getNum(str) {
//     let temp = ''
//     let arr = []
//     for (let i = 0; i < str.length; i++) {
//         if (!isNaN(str[i])) {
//             // 数字
//             temp += str[i]
//         } else {
//             // 字母
//             if (temp != '') {
//                 arr.push(temp)
//             }
//             temp = ''
//         }
//     }
//     if (temp) {
//         arr.push(temp)
//     }
//     return arr
// }
// console.log(getNum(str))
// let str = "afdafdf12321fdsafd12312fda33535";
// // \d:数字;  +:一个或多个
// let reg = /\d+/g
// let res = str.match(reg)
// console.log(res)

// 正则创建
// 1、字面量
// let str = 'hello wrold'
// let reg = /hello/gi
// let res = str.match(reg)
// console.log(res)
// 2、构造函数
// let str = 'hello wrold'
// let str1 = 'hello wrold123123'
// let reg = new RegExp('\\d+', 'gi')
// let res = str1.match(reg)
// console.log(res)

// js中各种正则方法
// 1、正则方法:test,exec
// let reg = /\d+/g
// let str = 'abdfada1'
// let res = reg.test(str)
// console.log(res)
// let reg = /\d+/g
// let str = 'abd2343fdf12312ada1'
// // let res = reg.exec(str)
// // console.log(res)
// console.log(reg.exec(str))
// console.log(reg.exec(str))
// console.log(reg.exec(str))
// console.log(reg.exec(str))

// 2.字符串方法:match,split,search,replace
// let str = "fdsaf123fda43";
// let reg = /\d+/g
// let res =  str.match(reg);
// console.log(res);

// let str = "fdsa,f123fd,a43";
// let reg = /\d+/g
// let res =  str.split(reg);
// console.log(res);

// let str = 'faaf23dadfa1231afdas2' // 替换成*
// let reg = /\d/g
// let res = str.replace(reg, '*')
// console.log(res)
// 替换敏感词；
// let str = "然后，正则表达式在各种计算机语言或各种应用领域得到了广大的应用和发展，演变成为计算机技术森林中的一只形神美丽且声音动听的百灵鸟。以上是关于正则表达式的起源和发展的历史描述，如今正则表达式在基于文本的编辑器和搜索工具中依然占据着一个非常重要的地位";
// // 把正则 替换成  "*";
// let reg = /正则|计算机/g
// // let newStr = str.replace(reg, '*')
// let newStr = str.replace(reg,function(arg) {
//     // console.log(arg)
//     return '*'.repeat(arg.length)
// })
// console.log(newStr)

// let str = 'afafd123adfa'
// let reg = /\d/g
// let res = str.search(reg)
// console.log(res)


// 元字符：正则里有特殊函数的非字母字符
// . * + $ ^ | \ () [] {}
// .匹配行结束符（\n \r \u2028 或 \u2029）以外的任意单个字符
// let str = `<div>fdsafdsaf</div>`;
// // “+” 1个或者多个  ； “*” 0个或者多个；
// let reg = /<div>.*<\/div>/g;
// let res =  reg.test(str);
// console.log(res);

// ^:以xx开头
// let str = 'afda23f1_dadaj'
// // \w : 数字、字母、下划线 （_）;
// let reg = /^a\w+j$/g
// let res = reg.test(str)
// console.log(res)

// []:字符集合
// let str = 'afbaafdabaafdab'
// // let reg = /a|b/g
// let reg = /[ab]/g
// let res = str.replace(reg, '*')
// console.log(res)

// 把所有非 a 或者 b 的替换成 *；
// let str = 'afbaafdabaafdab'
// let reg = /[^ab]/g
// let res = str.replace(reg, '*')
// console.log(res)

// let str = "fdsafdSAaf4324abABCf4535dsaf";
// let reg = /a|b/g;
// let reg = /[a-zA-Z]/g
// let reg = /[a-Z]/g;
// let reg = /[0-9]/g
// let reg = /[0-20]/g
// let res =  str.replace(reg,"*");
// console.log(res);
// 20
// [12]0
// . ===> [^\n\r\u2028\u2029]  \d ===> [0-9];
// \w ===>[a-zA-Z0-9_];

// {}:数量
// let str = "abcaaaabcdaafdsa";
// // let reg = /a{1,3}/g
// let reg = /a{1,}/g
// let res = str.replace(reg, '*')
// console.log(res)
// * = {0,} + = {1,} ? = {0, 1}

// ():分组
// let str = "ababfdsafabfdsaabfdsa";
// let reg = /(ab){2}/g
// let res = str.replace(reg, '*')
// console.log(res)

// let str = "fdsabc123fdabcsfdsabc444";
// let reg = /(abc)(\d+)/g
// let res = str.match(reg)
// // console.log(res)
// let $1 = RegExp.$1
// let $2 = RegExp.$2
// console.log($1, $2)

// let str = "2019-1-4";  //  -->4/12/2019;
// let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/g
// let res = str.replace(reg, '$3/$2/$1')
// console.log(res)

// 命名分组?<name>；  (x) 捕获分组； （?:）不捕获分组；
// let str = "fdsabc123fdsfdsabc444";
// let reg = /(?:abc)(?<num>\d+)/;
// let res =  reg.exec(str);
// console.log(res);

// es2018 -->es9
// 零宽断言； 
// 正向肯定断言； 
// let str = "iphone6iphone7iphone11iphonenumber";
// iphone-->苹果
// let reg = /iphone(?=\d{1,2})/g
// let res  = str.replace(reg,"苹果");
// console.log(res);

// 正向否定断言；
// let reg = /iphone(?!\d{1,2})/g
// let res  = str.replace(reg,"苹果");
// console.log(res);

// 负向肯定断言； 
// let str = "10px20px30pxipx";  //px 转成 像素；
// let reg = /(?<=\d{2})px/g;
// let res = str.replace(reg,"像素");
// console.log(res);


// 负向否定断言； 
// let str = "10px20px30pxipx";  //px 转成 像素；
// let reg = /(?<!\d{2})px/g;
// let res = str.replace(reg,"像素");
// console.log(res);


// 多行模式； 匹配多行
// let str = `abcd
// efgfda`;
// let reg = /^/gm;
// let res  = str.replace(reg,"*");
// console.log(res);
// sticky，粘性模式
let str = "244dfa12sf";
let reg =  /\d/gy;
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));
console.log(reg.exec(str));



// \b:  边界符号：  边界  非 \w 的；
// let str = "this is a knife";
// let reg = /\bis\b/g;
// let res =  str.match(reg);
// console.log(res);
