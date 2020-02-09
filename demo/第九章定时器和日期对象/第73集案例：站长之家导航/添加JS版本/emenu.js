var navs = document.querySelectorAll('.normal')
var subnavs = document.querySelectorAll('.float_layer')
var timer = null

for (var i = 0; i < navs.length; i++) {
    // navs[i].index = i
    // navs[i].onmouseover = function() {
    //     for (var i = 0; i < navs.length; i++) {
    //         navs[i].classList.remove('active')
    //         subnavs[i].style.display = 'none'
    //     }
    //     this.classList.add('active')
    //     subnavs[this.index].style.display = 'block'
    // }
    // navs[i].onmouseout = function() {
    //     var _this = this
    //     timer = setTimeout(function() {
    //         subnavs[_this.index].style.display = 'none'
    //     }, 1000)
    // }
    // subnavs[i].onmouseover = function() {
    //     clearTimeout(timer)
    // }
    // subnavs[i].onmouseout = function() {
    //     var _this = this
    //     timer = setTimeout(function() {
    //         _this.style.display = 'none'
    //     },1000)
    // }
    (function(index){
        navs[index].onmouseover = function() {
            for (var i = 0; i < navs.length; i++) {
                navs[i].classList.remove('active')
                subnavs[i].style.display = 'none'
            }
            this.classList.add('active')
            subnavs[index].style.display = 'block'
        }
        navs[i].onmouseout = function() {
            var _this = this
            timer = setTimeout(function() {
                subnavs[index].style.display = 'none'
            }, 1000)
        }
        subnavs[i].onmouseover = function() {
            clearTimeout(timer)
        }
        subnavs[i].onmouseout = function() {
            var _this = this
            timer = setTimeout(function() {
                _this.style.display = 'none'
            },1000)
        }
    })(i)

}