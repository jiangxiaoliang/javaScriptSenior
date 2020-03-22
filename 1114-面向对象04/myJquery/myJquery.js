class MyJQuery {
    constructor(arg, root) {
        if(typeof root === 'undefined') {
            this.prevObject = new MyJQuery(document, null)
        }
        if(root) {
            this.prevObject = root
        }
        if(typeof arg === 'string') {
            let res = document.querySelectorAll(arg)
            res.forEach((item, index) => {
                this[index] = item
            })
            this.length = res.length
        } else if (typeof arg === 'function') {
            arg()
        } else {
            if(typeof arg.length === 'undefined') {
                // 只有一个原生对象
                this[0] = arg
                this.length = 1
            } else {
                arg.forEach((item, index) => {
                    this[index] = item
                })
                this.length = arg.length
            }
        }
    }
    click(fn) {
        for(let i = 0; i < this.length; i++) {
            this[i].addEventListener('click', fn)
        }
    }
    on(eventName, fn) {
        let eName = eventName.split(' ')
        console.log(eName)
        for(let j = 0; j < eName.length; j++) {
            for(let i = 0; i < this.length; i++) {
                this[i].addEventListener(eName[j], fn)
            }
        }
    }
    eq(index) {
        return new MyJQuery(this[index], this)
    }
    end() {
        return this.prevObject
    }
    css(...arg) {
        if(arg.length > 1) { // css("background","yellow")
            for(let i = 0; i < this.length; i++) {
                if(arg[0] in $.cssHooks) {
                    $.cssHooks[arg[0]].set(this[i], arg[1])
                } else {
                    this.setStyle(this[i], arg[0], arg[1])
                }
            }
        } else { // 获取样式
            if(typeof arg[0] === 'string') { // 单个 css("background")
                if(arg[0] in $.cssHooks) {
                    $.cssHooks[arg[0]].get(this[0])
                } else {
                    return this.getStyle(this[0], arg[0])
                }
            } else { // css({"background":"yellow","width":200})
                for(let key in arg[0]) {
                    if(arg[0].hasOwnProperty(key)) {
                        for(let i = 0; i < this.length; i++) {
                            this.setStyle(this[i], key, arg[0][key])
                        }
                    }
                }
            }
        }
    }
    getStyle(obj, attr) {
        return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr]
    }
    setStyle(obj, attr, val) {
        if(typeof val === 'number' && !(val in $.cssNumber)) {
            val  = val + 'px'
        }
        obj.style[attr] = val
    }
}

function $(arg) {
    return new MyJQuery(arg)
}
$.cssNumber = {
    columnCount: true,
    fillOpacity: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
}
// 自定义属性
$.cssHooks = {

}