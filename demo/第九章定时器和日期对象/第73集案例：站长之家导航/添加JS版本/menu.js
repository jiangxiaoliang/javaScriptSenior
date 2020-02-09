var nav = document.querySelector('#nav');
var aLi = nav.querySelectorAll('li');
var subNav = nav.querySelectorAll('.float_layer');
var timer = null;

/* 
    onmouseover - 鼠标经过
    onmouseout - 鼠标离开
*/

for(var i=0;i<aLi.length;i++){
    aLi[i].index = i;
    aLi[i].onmouseover = function(){

        clearTimeout(timer);
        for (var j = 0; j < subNav.length;j++){
            subNav[j].style.display = 'none';
        }
        subNav[this.index].style.display = 'block';
    }
    aLi[i].onmouseout = function(){
        var _this = this;
        timer = setTimeout(function(){
            //this的指向
            subNav[_this.index].style.display = 'none';
        },400);
        
    }
}