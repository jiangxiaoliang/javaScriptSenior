var inputs = document.querySelectorAll('#fill_in input')
var target = document.querySelector('#target strong')
var start = document.querySelector('#go')
var p = document.querySelectorAll('#date p')
var now
var timer = null
var exceptTime = null

init()

function init() {
    now = new Date()
    var nowYear = now.getFullYear()
    var nowMonth = now.getMonth() + 1
    var nowDate = now.getDate()
    // console.log(nowYear, nowMonth, nowDate)

    inputs[0].value = nowYear
    inputs[1].value = nowMonth
    inputs[2].value = nowDate

    target.innerHTML = fillZero(nowYear) + '年' + fillZero(nowMonth) + '月' + fillZero(nowDate) + '日'

}

start.onclick = function() {
    if(timer) {
        return
    }
    now = new Date()
    var exceptYear = inputs[0].value
    var exceptMonth = inputs[1].value - 1
    var exceptDate = inputs[2].value
    // console.log(exceptYear, exceptMonth, exceptDate)
    target.innerHTML = fillZero(exceptYear) + '年' + fillZero(exceptMonth) + '月' + fillZero(exceptDate) + '日'
    exceptTime = new Date(exceptYear, exceptMonth, exceptDate)
    timer = setInterval(function() {
       update()
    }, 1000)
    update()
}

function update() {
    now = new Date()
    var dis = exceptTime - now
    if(dis < 0){
        alert('您输入的日期不能小于等于当前日期')
        clearInterval(timer)
        timer = null
        return
    }
    countDate(dis)
}

function fillZero(val) {
    return val < 10 ? ('0' + val) : val
}

function countDate(dis) {
    var oneDay = 1000 * 60 * 60 * 24
    var oneHour = 1000 * 60 *60
    var oneMin = 1000 * 60
    var oneSec = 1000
    var day = parseInt(dis / oneDay)
    var hour = parseInt((dis % oneDay) / oneHour)
    var min = parseInt((dis % oneHour) / oneMin)
    var sec = parseInt((dis % oneMin) / oneSec)
    // console.log(day, hour, min, sec)
    p[0].innerHTML = fillZero(day)
    p[1].innerHTML = fillZero(hour)
    p[2].innerHTML = fillZero(min)
    p[3].innerHTML = fillZero(sec)
}