var minus = document.querySelectorAll('.minus')
var plus = document.querySelectorAll('.plus')
var n = document.querySelectorAll('.n')
var price = document.querySelectorAll('.price')
var count = document.querySelectorAll('.count')
var strong = document.querySelectorAll('strong')


// minus[0].onclick = function() {
//     var num, total
//     num = +n[0].innerHTML - 1
//     if (num < 0) {
//         alert('您选择的商品为空！')
//         return
//     }
//     total = num * (price[0].innerHTML * 10) / 10 // 解决小数问题
//     n[0].innerHTML = num
//     count[0].innerHTML = total
// }

// plus[0].onclick = function() {
//     var num, total
//     num = +n[0].innerHTML + 1
//     if (num > 10) {
//         alert('您最多选择10件！')
//         return
//     }
//     total = num * (price[0].innerHTML * 10) / 10 // 解决小数问题
//     n[0].innerHTML = num
//     count[0].innerHTML = total
// }



function tabb(index) {
    minus[index].onclick = function() {
        // var num, total
        // num = +n[index].innerHTML - 1
        // if (num < 0) {
        //     alert('您选择的商品为空！')
        //     return
        // }
        // total = num * (price[index].innerHTML * 10) / 10 // 解决小数问题
        // n[index].innerHTML = num
        // count[index].innerHTML = total
        changeNum(index, -1)
    }
    
    plus[index].onclick = function() {
        // var num, total
        // num = +n[index].innerHTML + 1
        // if (num > 10) {
        //     alert('您最多选择10件！')
        //     return
        // }
        // total = num * (price[index].innerHTML * 10) / 10 // 解决小数问题
        // n[index].innerHTML = num
        // count[index].innerHTML = total
        changeNum(index, 1)
    }
}

function changeNum(index, change) {
    var num, total
    num = +n[index].innerHTML + change
    // if (num < 0) {
    //     alert('您选择的商品为空！')
    //     return
    // } else if (num > 10) {
    //     alert('您最多选择10件！')
    //     return
    // }
    switch (true) {
        case num < 0:
            alert('您选择的商品为空！')
            return;
        case num > 10:
            alert('您最多选择10件！')
            return;
    }
    total = num * (price[index].innerHTML * 10) / 10 // 解决小数问题
    n[index].innerHTML = num
    count[index].innerHTML = total
    summary()
}

/**
 * 信息汇总
 */
function summary() {
    var totalCount = 0, countPrice = 0, max = 0
    for (var i = 0; i < n.length; i++) {
        totalCount += +n[i].innerHTML
        countPrice += +count[i].innerHTML
        if (+count[i].innerHTML != 0) {
            max = +price[i].innerHTML > max ? +price[i].innerHTML : max
        }
    }
    console.log(totalCount, countPrice, max)
    strong[0].innerHTML = totalCount
    strong[1].innerHTML = countPrice
    strong[2].innerHTML = max
}

for (var i = 0; i < n.length; i++) {
    tabb(i)
}