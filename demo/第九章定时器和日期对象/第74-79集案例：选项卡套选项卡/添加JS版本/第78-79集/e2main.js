var outNum = 0
var innerNum = 0

var navs = document.querySelectorAll('.navs li')
var divs = document.querySelectorAll('#box div')
var box = document.querySelector('#box')
var imgs = []
var innerLis = []
var timer = null

init()
auto()

function outChange() {
    for (var i = 0; i < navs.length; i++) {
        navs[i].classList.remove('active')
        divs[i].style.display = 'none'
        // imgs[i] = divs[i].querySelectorAll('img')
        // innerLis[i] = divs[i].querySelectorAll('li')
    }
    navs[outNum].classList.add('active')
    divs[outNum].style.display = 'block'
}

function innerChange() {
    for (var i = 0; i < innerLis[outNum].length; i++) {
        innerLis[outNum][i].classList.remove('active')
        imgs[outNum][i].style.display = 'none'
    }
    innerLis[outNum][innerNum].classList.add('active')
    imgs[outNum][innerNum].style.display = 'block'
}

function init() {
    setEvernt()
    outChange()
    innerChange()
}

function setEvernt() {
    // 鼠标移入事件
    for (var i = 0; i < navs.length; i++) {
        navs[i].index = i
        navs[i].onmouseover = function() {
            outNum = this.index
            innerNum = 0
            outChange()
            innerChange()
        }
        imgs[i] = divs[i].querySelectorAll('img')
        innerLis[i] = divs[i].querySelectorAll('li')
        for (var j = 0; j < innerLis[i].length; j++) {
            innerLis[i][j].index = j
            innerLis[i][j].onmouseover = function() {
                innerNum = this.index
                innerChange()
            }
        }
    }
}

function auto() {
    timer = setInterval(function() {
        innerNum++
        if (innerNum >= innerLis[outNum].length) {
            innerNum = 0
            outNum++
            if (outNum >= navs.length) {
                outNum = 0
            }
            outChange()
        }
        innerChange()
    },500)
}

box.onmouseover = function() {
    clearInterval(timer)
}

box.onmouseout = function() {
    auto()
}



