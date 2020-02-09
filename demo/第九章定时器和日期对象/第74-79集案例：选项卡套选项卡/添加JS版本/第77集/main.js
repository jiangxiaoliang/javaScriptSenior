/**
 * 1. 大的外层的选项卡
 * 2. 大的选项卡内部有一个小的选项卡
 * 3. 功能
 *      1. 自动切换
 *      2. 鼠标经过切换
 */

/**
 * 第一步：用两个变量 控制选项卡的显示
 * 
 * 第二步：给元素绑定鼠标经过的事件
 *  - 外层的选项卡
 *  - 内层选项卡
 * 
 */
//outerNum - 控制外部选项卡显示的是第几个
var outerNum = 5;
//innerNum - 控制当前对应的第几组的 内部的小选项卡
var innerNum = 5;

var box = document.querySelector('#box');
var navsLi = box.querySelectorAll('.navs li');
var divs = box.querySelectorAll('div');
var outlen = navsLi.length;
// var len = [4,2,4,2];
var lis = [];
var imgs = [];
// lis[0] = ['','']


init();


function init(){
    setEvent();
    if (outerNum >= outlen) {
        outerNum = 0;
    }
    if (innerNum >= lis[outerNum].length) {
        innerNum = 0;
    }
    //外部选项卡
    setOutChange();
    //内部选项卡
    setInnerChange();
   
}


function setOutChange(){
    //外部选项卡
    for (var i = 0; i < outlen; i++) {
        navsLi[i].className = '';
        divs[i].style.display = 'none';
    }
    //把当前应该显示的设置为选中状态
    navsLi[outerNum].className = 'active';
    divs[outerNum].style.display = 'block';
}

function setEvent() {
    for (var i = 0; i < outlen; i++) {
        navsLi[i].index = i;
        navsLi[i].onmouseover = function () {
            outerNum = this.index;
            innerNum = 0;
            setOutChange();
            setInnerChange();
        }
        lis[i] = divs[i].querySelectorAll('li');
        imgs[i] = divs[i].querySelectorAll('img');

        for (var j = 0;j<lis[i].length;j++){
            lis[i][j].index  = j;
            lis[i][j].onmouseover = function(){
                innerNum = this.index;
                setInnerChange();
            }
        }
    }

}
function setInnerChange(){
    //内部选项卡
    // var innerLi = divs[outerNum].querySelectorAll('li');
    // var imgs = divs[outerNum].querySelectorAll('img');

    // lis[outerNum]
    // imgs[outerNum]

    for (var i = 0; i < lis[outerNum].length; i++) {
        lis[outerNum][i].className = '';
        imgs[outerNum][i].style.display = 'none';
    }
    lis[outerNum][innerNum].className = 'active';
    imgs[outerNum][innerNum].style.display = 'block';
}

//给外部的选项卡 全部添加上鼠标经过的事件 onmouseover




