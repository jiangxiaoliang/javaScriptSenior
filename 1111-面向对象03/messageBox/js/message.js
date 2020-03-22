class MyEvent {
    constructor() {
        this.handle = {}
    }
    // 绑定自定义事件
    addEvent(eventName, fn) {
        if(typeof this.handle[eventName] === 'undefined') {
            this.handle[eventName] = []
        }
        this.handle[eventName].push(fn)
    }
    // 删除自定义事件
    removeEvent(eventName, fn) {
        for(let i = 0; i < this.handle[eventName].length; i++) {
            if(this.handle[eventName][i] === fn) {
                this.handle[eventName].splice(i, 1)
            }
            break
        }
    }
    // 触发自定义事件
    trigger(eventName) {
        this.handle[eventName].forEach(event => {
            event && event()
        })
    }
}

class Dialog extends MyEvent{
    constructor(options) {
        super()
        let opts = Object.assign({
            width: "35%",
            height: "200px",
            title: "默认标题",
            content: "默认内容",
            dragable: true, //是否可拖拽
            maskable: false, //是否有遮罩
            isCancel: true //是否有取消
        }, options)
        this.opts = opts
        this.init()
    }
    init() {
        this.renderView()
        this.close()
    }
    showDialog() {
        if(this.opts.dragable) {
            this.drag()
        }
        if(this.opts.maskable) {
            this.divEl.querySelector('.k-wrapper').style.display = 'block'
        }
        this.divEl.querySelector('.k-dialog').style.display = 'block'
    }
    close() {
        // this.divEl.querySelector('.k-close').addEventListener('click', (e) => {
        //    this.closeDialog()
        // })
        // this.divEl.querySelector('.k-default').addEventListener('click', (e) => {
        //     this.closeDialog()
        //  })
        // this.divEl.querySelector('.k-primary').addEventListener('click', (e) => {
        //     this.closeDialog()
        // })

        this.addEvent('closeDialog', this.closeDialog.bind(this))

        // 通过事件代理简化
        this.divEl.querySelector('.k-dialog').addEventListener('click', (e) => {
            // console.log(e.target.className)
            switch(e.target.className) {
                case 'k-close':
                    // this.closeDialog()
                    this.trigger('closeDialog')
                    break;
                case 'k-default':
                    // this.closeDialog()
                    this.trigger('closeDialog')
                    break;
                case 'k-primary':
                    // this.closeDialog()
                    // this.trigger('closeDialog')
                    this.confirm()
                    break;
            }
        })
    }

    confirm() {
        this.trigger('closeDialog')
    }

    closeDialog() {
        this.divEl.querySelector('.k-wrapper').style.display = 'none'
        this.divEl.querySelector('.k-dialog').style.display = 'none'
    }
    renderView() {
        let divEl = document.createElement('div')
        divEl.innerHTML = `
            <div class='k-wrapper'></div>
            <div class='k-dialog' style='width: ${this.opts.width}; height: ${this.opts.height}'>
                <div class='k-header'>
                    <span class='k-title'>${this.opts.title}</span><span class="k-close">X</span>
                </div>
                <div class='k-body'>
                    <span>${this.opts.content}</span>
                </div>
                <div class='k-footer'>
                    ${this.opts.isCancel ? "<span class='k-default'>取消</span>" : ''}
                    <span class='k-primary'>确定</span>
                </div>
            </div>
        `
        this.divEl = divEl
        document.querySelector('body').appendChild(divEl)
    }
    // 拖动对话框
    drag() {
        let startMouse = {}
        let startEl = {}
        let dragEl = this.divEl.querySelector('.k-dialog')
        dragEl.addEventListener('mousedown', (e) => {
            startMouse = {
                x: e.clientX,
                y: e.clientY
            }
            startEl = {
                x: parseFloat(getComputedStyle(dragEl)['left']),
                y: parseFloat(getComputedStyle(dragEl)['top'])
            }
            let move = (e) => {
                let nowMouse = {
                    x: e.clientX,
                    y: e.clientY
                }
                let dis = {
                    x: nowMouse.x - startMouse.x,
                    y: nowMouse.y - startMouse.y
                }
                let l = dis.x + startEl.x
                let t = dis.y + startEl.y
                l = Math.max(0, l)
                l = Math.min(l, window.innerWidth - dragEl.offsetWidth)
                t = Math.max(0, t)
                t = Math.min(t, window.innerHeight - dragEl.offsetHeight)
                dragEl.style.left = l + 'px'
                dragEl.style.top = t + 'px'
            }
            document.addEventListener('mousemove', move)
            document.addEventListener('mouseup', (e) => {
                document.removeEventListener('mousemove', move)
            }, {
                once: true
            })
            // e.preventDefault()
        })
    }
}

class InputDailog extends Dialog {
    constructor(options) {
        let newOpts = Object.assign({
            success: function() {console.log('默认callback')}
        }, options)
        super(newOpts)
        this.renderInput()
    }
    renderInput() {
        let inputEl = document.createElement('input')
        inputEl.classList.add('input-inner')
        inputEl.type = 'text'
        this.divEl.querySelector('.k-body').appendChild(inputEl)
        this.inputEl = inputEl
    }
    confirm() {
        super.confirm()
        let value = this.inputEl.value
        this.opts.success(value)
    }
}