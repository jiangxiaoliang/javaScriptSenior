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
 */
//outerNum - 控制外部选项卡显示的是第几个
 var outerNum = 5;
//innerNum - 控制当前对应的第几组的 内部的小选项卡
 var innerNum = 2;

var box = document.querySelector('#box');
var navsLi = box.querySelectorAll('.navs li');
var divs = box.querySelectorAll('div');
var outlen = navsLi.length;

for (var i = 0; i < outlen;i++ ){
    navsLi[i].className = '';
    divs[i].style.display = 'none';
}
//把当前应该显示的设置为选中状态
navsLi[outerNum].className = 'active';
divs[outerNum].style.display = 'block';

//内部选项卡
var innerLi = divs[outerNum].querySelectorAll('li');
var imgs = divs[outerNum].querySelectorAll('img');


for (var i = 0; i < innerLi.length;i++){
    innerLi[i].className = '';
    imgs[i].style.display = 'none';
}
innerLi[innerNum].className = 'active';
imgs[innerNum].style.display = 'block';
