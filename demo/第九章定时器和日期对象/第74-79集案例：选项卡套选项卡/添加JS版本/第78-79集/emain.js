/**
 * 通过两个变量来分别控制外层和内层
 */

 var outNum = 0
 var innerNum = 0

 var outNavs = document.querySelectorAll('.navs li')
//  var innerNavs = document.querySelectorAll('#box div li')
//  var imgs = document.querySelectorAll('#box div img')
var divs = document.querySelectorAll('#box div')
var box = document.querySelector('#box')
var innerNavs = []
var imgs = []
var timer = null

init()
auto()
function init() {
    setEvent()
    if (outNum >= outNavs.length) {
        outNum = 0
    }
    if (innerNum >= innerNavs[outNum].length) {
        innerNum = 0
    }
    setOutChange()
    setInnerChange()
}

function setOutChange() {
    for (var i = 0; i < outNavs.length; i++) {
        outNavs[i].classList.remove('active')
        divs[i].style.display = 'none'
        // innerNavs[i] = divs[i].querySelectorAll('li')
        // imgs[i] = divs[i].querySelectorAll('img')
    }
    outNavs[outNum].classList.add('active')
    divs[outNum].style.display = 'block'
}

function setInnerChange() {
    for(var i = 0; i < innerNavs[outNum].length; i++) {
        innerNavs[outNum][i].classList.remove('active')
        imgs[outNum][i].style.display = 'none'
    }
    innerNavs[outNum][innerNum].classList.add('active')
    imgs[outNum][innerNum].style.display = 'block'
}

function setEvent() {
    for (var i = 0; i < outNavs.length; i++) {
        outNavs[i].index = i
        outNavs[i].onmouseover = function() {
            outNum = this.index
            innerNum = 0
            setOutChange()
            setInnerChange()
        }
        innerNavs[i] = divs[i].querySelectorAll('li')
        imgs[i] = divs[i].querySelectorAll('img')
        for (var j = 0; j < innerNavs[i].length; j++) {
            innerNavs[i][j].index = j
            innerNavs[i][j].onmouseover = function() {
                innerNum = this.index
                setInnerChange()
            }
        }
    }    
}

function auto() {
    timer = setInterval(function() {
        innerNum++
        if (innerNum >= innerNavs[outNum].length) {
            outNum++
            if (outNum >= outNavs.length) {
                outNum = 0
            }
            innerNum = 0
            setOutChange()
        }
        setInnerChange()
    }, 500)
}

box.onmouseover = function() {
    console.log('a')
    clearInterval(timer)
}

box.onmouseout = function() {
    auto()
}
