/**
 * 控制当前一列中的功能
 *  - 点击第一个 - 号，需要控制 数量发生改变（减少）。限制数量不能小于0
 *  - 点击第一个 + 号，需要控制 数量发生改变（增加）。限制数量不能超过10
 * 根据数量，计算小计结果
 */

var plus = document.querySelectorAll('.plus');
var minus = document.querySelectorAll('.minus');
var ns = document.querySelectorAll('.n');
var price = document.querySelectorAll('.price');
var count = document.querySelectorAll('.count');


// todo(0);
// todo(1);
// todo(2);
// todo(3);
var len = ns.length;
//批量给元素添加事件
for(var i = 0;i<len;i++){
    todo(i);
}

function todo(index){
    //控制+号
    plus[index].onclick = function () {
        changeNum(index,+1);
    }
    //控制-号
    minus[index].onclick = function () {
        // var num = --ns[index].innerHTML;
        // var num = +ns[index].innerHTML - 1;
        // if (num < 0) {
        //     num = 0;
        //     alert('已经不能再少了哦');
        // }
        // ns[index].innerHTML = num;
        // count[index].innerHTML = num * (price[index].innerHTML * 10) / 10;
        changeNum(index,-1);
    }
}

function changeNum(index,change){
    var num = +ns[index].innerHTML + change;
    switch(true){
        case num > 10:
            alert('最大限购10件');
            num = 10;
            break;
        case num < 0:
            alert('已经不能再少了哦');
            num = 0;
            break;
    }

    // if (num > 10) {
    //     num = 10;
    //     alert('最大限购10件');
    // }else if(num<0){
    //     num = 0;
    //     alert('已经不能再少了哦');
    // }
    ns[index].innerHTML = num;
    count[index].innerHTML = num * (price[index].innerHTML * 10) / 10;
}
