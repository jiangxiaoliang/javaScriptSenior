window.onload = function() {
    // document.cookie = 'test2=test2;Max-Age=3600'
    // console.log(document.cookie)

    /**
     * localStorage,sessionStorage
     * setItem,getItem,removeItem,clear
     */
    let colorArr = ["white","rgb(204,232,207)", "rgb(200,200,169)", "rgb(114,111,128)"];
    let key = 0
    // if (getCookie('key')) {
    //     key = getCookie('key')
    // }
    if (localStorage.getItem('key')) {
        key = localStorage.getItem('key')
    }
    document.body.style.background = colorArr[key]
    document.querySelector('.changeSkin').onclick = function() {
        key++
        key = key > 3 ? 0 : key
        // setCookie('key', key, {
        //     'Max-Age': 3600
        // })
        localStorage.setItem('key', key)
        document.body.style.background = colorArr[key]
    }

    // 控制添加按钮显示或隐藏
    let uls = document.querySelectorAll('ul')
    let spans = document.querySelectorAll('.btnController')
    uls.forEach((item, index) => {
        item.onmouseover = () => {
            spans.forEach((span, key) => {
                if (index === (key+1)) {
                    span.style.display = 'block'
                } else {
                    span.style.display = 'none'
                }
            })
        }
    })
}

// 设置cookie
function setCookie(name, value, option = {}) {
    let cookieData = `${name}=${value};`
    for (let key in option) {
        let str = `${key}=${option[key]};`
        cookieData += str
    }
    document.cookie = cookieData
}
// 获取cookie
function getCookie(name) {
    let cookieArr = document.cookie.split('; ')
    for (let i = 0; i < cookieArr.length; i++) {
        let arr2 = cookieArr[i].split('=')
        if (arr2[0] === name) {
            return arr2[1]
        }
    }
    return null
}

function showDetail(musicData) {
    if (localStorage.getItem('musicData')) {
        let localData = JSON.parse(localStorage.getItem('musicData'))
        if (!localData.find(v => v.id === musicData.id)) {
            localData.push(musicData)
            localStorage.setItem('musicData', JSON.stringify(localData))
        }
    } else {
        localStorage.setItem('musicData', JSON.stringify([musicData]))
    }

    if (!localStorage.getItem('isOpen')) {
        window.open('/detail')
    }
}