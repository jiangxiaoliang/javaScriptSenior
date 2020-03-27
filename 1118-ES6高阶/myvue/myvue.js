class Vue extends EventTarget{
    constructor(options) {
        super()
        this.$options = options
        this.observe(this.$options.data)
        this.compile()
    }
    observe(data) {
        let keys = Object.keys(data)
        let _this = this
        keys.forEach(key => {
            let dep = new Dep()
            let value = data[key]
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get() {
                    // console.log('get....')
                    if(Dep.target) {
                        console.log('dep...', Dep.target)
                        dep.addSub(Dep.target)
                    }
                    return value
                },
                set(newValue) {
                    // console.log('set......')
                    // 通过事件监听来解耦
                    // let event = new CustomEvent(key, { detail: newValue })
                    // _this.dispatchEvent(event)

                    // 发布订阅模式来解耦
                    dep.notify(newValue)
                    console.log(dep)
                    if(newValue != data[key]) {
                        value = newValue
                    }
                }
            })
        })
    }
    compile() {
        let el = document.querySelector(this.$options.el)
        this.compileNodes(el)
    }
    compileNodes(el) {
        let childrenNodes = el.childNodes
        // console.log(childrenNodes)
        childrenNodes.forEach(node => {
            if(node.nodeType === 1) {
                // console.log('元素节点')
                this.compileNodes(node)
            } else if (node.nodeType === 3) {
                // console.log('文本节点')
                let reg = /\{\{\s*(\S+)\s*\}\}/g
                if(reg.test(node.textContent)) {
                    let $1 = RegExp.$1
                    node.textContent = node.textContent.replace(reg, this.$options.data[$1])
                    // 事件监听
                    // this.addEventListener($1, (e) => {
                    //     // console.log(e.detail)
                    //     let newValue = e.detail
                    //     let oldValue = this.$options.data[$1]
                    //     let reg = new RegExp(oldValue,'g')
                    //     node.textContent = node.textContent.replace(reg, newValue)
                    // })

                    new Watcher(this.$options.data, $1, (newValue) => {
                        let oldValue = this.$options.data[$1]
                        let reg = new RegExp(oldValue,'g')
                        node.textContent = node.textContent.replace(reg, newValue)
                    })
                }
            }
        })
    }
}

// 管理器
class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify(newValue) {
        this.subs.forEach(sub => {
            sub.update(newValue)
        })
    }
}

//订阅者
class Watcher {
    constructor(data, key, cb) {
        console.log('watcher')
        Dep.target = this
        this.cb = cb
        data[key]
        Dep.target = null
    }
    update(newValue) {
        this.cb(newValue)
    }
}