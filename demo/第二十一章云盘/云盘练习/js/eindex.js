{
    let topId = 0
    let nowId = topId
    // console.log(getAllChild(0))

    /* 数据相关方法 */
    /**
     * 获取自己
     * @param {Number} id 当前id
     * @returns {Object}
     */
    function getSelf(id) {
        return data.filter(item => item.id == id)[0]
    }
    /**
     * 根据id查找子集
     * @param {*} id 
     * @returns 数组对象
     */
    function getChild(id) {
        return data.filter(item => item.pid == id)
    }
    /**
     * 查找对应id的父级
     * @param {*} id 
     * @returns Object
     */
    function getParent(id) {
        let now = getSelf(id)
        return getSelf(now.pid)
    }
    /**
     * 查找所有父级
     * @param {*} id 
     * @returns 数组对象
     */
    function getAllParent(id) {
        let parent = getParent(id)
        let allParent = []
        while(parent) {
            allParent.unshift(parent)
            parent = getParent(parent.id)
        }
        return allParent
    }
    /**
     * 获取所有子集
     * @param {*} id
     * @returns 数组对象：id所有子集 
     */
    function getAllChild(id) {
        let child = getChild(id)
        let allChild = []
        if(child.length > 0) {
            allChild = allChild.concat(child)
            child.forEach(item => {
                allChild = allChild.concat(getAllChild(item.id))
            })
        }
        return allChild
    }
    /**
     * 删除单项数据
     * @param {*} id 
     * @returns 返回删除后的数据
     */
    // console.log(removeData(2))
    function removeData(id) {
        data = data.filter(item => item.id != id)
        let allChild = getAllChild(id)
        allChild.forEach((item) => {
            removeData(item.id)
        })
    }
    /**
     * 移动数据：修改父级
     * @param {*} id 
     */
    function moveData(id) {
        getSelf(id).pid = newPid
    }
    /**
     * 检查当前id下是否存在和title名称一样的数据
     * @param {*} pid 
     * @param {*} title 
     */
    function testName(pid, title) {
        let child = getChild(pid)
        return child.some(item => item.title === title)
    }
    /**
     * 输入选择为数据添加checked属性
     * @param {*} id 
     * @param {*} checked 
     */
    function changeCheck(id, checked) {
        let nowSelf = getSelf(id)
        nowSelf.checked = checked
    }
    function isCheckedAll() {
        let child = getChild(nowId)
        return child.every(item => item.checked)
    }
    function setAllChecked(checked) {
        let child = getChild(nowId)
        child.forEach(item => item.checked = checked)
    }

    // 检测是否全选
    let checkedAll = document.querySelector('#checked-all')
    function setCheckedAll() {
        checkedAll.checked = isCheckedAll()
    }
    checkedAll.addEventListener('change', function() {
        setAllChecked(this.checked)
        folders.innerHTML = renderFolders()
    })

    /* 相关组件 */
    // 成功提示
    function alertSuccess(info) {
        let suc = document.querySelector('.alert-success')
        clearTimeout(suc.timer)
        suc.innerHTML = info
        suc.classList.add('alert-show')
        suc.timer = setTimeout(() => {
            suc.classList.remove('alert-show')
        }, 1000)
    }
    // 警告提示
    function alertWarning(info) {
        let warn = document.querySelector('.alert-warning')
        clearTimeout(warn.timer)
        warn.innerHTML = info
        warn.classList.add('alert-show')
        warn.timer = setTimeout(() => {
            warn.classList.remove('alert-show')
        }, 1000)
    }
    // 确认弹框
    let mask = document.querySelector('#mask')
    function confirm(info, resolve, reject) {
        let confirmEl = document.querySelector('.confirm')
        let colsConfirm = confirmEl.querySelector('.clos')
        let confirmText = confirmEl.querySelector('.confirm-text')
        let confirmBtns = confirmEl.querySelectorAll('.confirm-btns a')
        mask.style.display = 'block'
        confirmEl.classList.add('confirm-show')
        confirmText.innerHTML = info
        colsConfirm.onclick = (e) => {
            mask.style.display = 'none';
            confirmEl.classList.remove('confirm-show')
        }
        confirmBtns[0].onclick = (e) => {
            mask.style.display = 'none';
            confirmEl.classList.remove('confirm-show')
            resolve && resolve()
        }
        confirmBtns[1].onclick = (e) => {
            mask.style.display = 'none'
            confirmEl.classList.remove('confirm-show')
            reject && reject()
        }
    }
    // 移动提示
    let newPid = null
    function moveAlert(resolve, reject) {
        let moveAlertEl = document.querySelector('.move-alert')
        let closMoveAlert = moveAlertEl.querySelector('.clos')
        let moveTreeMenu = moveAlertEl.querySelector('.tree-menu')
        let confirmBtns = moveAlertEl.querySelectorAll('.confirm-btns a')
        mask.style.display = 'block'
        moveAlertEl.classList.add('move-alert-show')
        moveTreeMenu.innerHTML = renderTreeMenu(-1, 0, true)
        newPid = null
        moveTreeMenu.addEventListener('click', (e) => {
            let item = null
            if(e.target.tagName === 'P') {
                item = e.target
            } else if (e.target.tagName === 'SPAN') {
                item = e.target.parentNode
            }
            if(item) {
                newPid = item.dataset.id
                let p = moveTreeMenu.querySelectorAll('p')
                p.forEach(item => item.classList.remove('active'))
                item.classList.add('active')
            }
        })
        closMoveAlert.onclick = (e) => {
            mask.style.display = 'none'
            moveAlertEl.classList.remove('move-alert-show')
        }
        confirmBtns[0].onclick = (e) => {
            if(resolve) {
                if(resolve()) {
                    mask.style.display = 'none'
                    moveAlertEl.classList.remove('move-alert-show')
                }
            }
        }
        confirmBtns[1].onclick = (e) => {
            mask.style.display = 'none'
            moveAlertEl.classList.remove('move-alert-show')
            reject && reject()
        }
    }
    // 重命名
    function reName(folder) {
        let folderName = folder.querySelector('.folder-name')
        let editor = folder.querySelector('.editor')
        folderName.style.display = 'none'
        editor.style.display = 'block'
        editor.select()
        editor.onblur = (e) => {
            let inputText = editor.value
            if(!inputText.trim()) {
                alertWarning('文件夹名称不能为空')
                editor.focus()
                return
            }
            if(inputText.trim() === folderName.innerHTML) {
                alertWarning('文件名称未改变')
                folderName.style.display = 'block'
                editor.style.display = 'none'
                return
            }
            if(testName(nowId, inputText)) {
                alertWarning('名称重复')
                editor.focus()
                return
            }
            folderName.innerHTML = inputText
            folderName.style.display = 'block'
            editor.style.display = 'none'
            getSelf(folder.dataset.id).title = inputText
            treeMenu.innerHTML = renderTreeMenu(-1, 0)
            alertSuccess('重命名成功')
        }
    }

    /* 视图渲染 */
    let treeMenu = document.querySelector('#tree-menu')
    let breadNav = document.querySelector('.bread-nav')
    let folders = document.querySelector('#folders')
    render()
    function render() {
        treeMenu.innerHTML = renderTreeMenu(-1, 0)
        breadNav.innerHTML = renderBreadNav()
        folders.innerHTML = renderFolders()
    }
    // 侧边导航渲染
    function renderTreeMenu(id, level, isOpen) {
        let child = getChild(id)
        let inner = ''
        if(child) {
            let allParent = getAllParent(nowId)
            allParent.push(getSelf(nowId))
            inner += `<ul>
                ${child.map(item => {
                    child = getChild(item.id)
                    return (`<li class='${(allParent.includes(item) || isOpen) ? 'open' : ''}'>
                        <p 
                            class="${child.length ? 'has-child' : ''} ${item.id == nowId ? 'active' : ''}"
                            style="padding-left:${40 + level * 20}px"
                            data-id = '${item.id}'
                            >
                            <span>${item.title}</span>
                        </p>
                        ${child ? renderTreeMenu(item.id, level+1, isOpen) : ''}
                    </li>`)
                }).join('')}
            </ul>`
        }
        return inner
    }
    // 路径导航渲染
    function renderBreadNav() {
        let allParent = getAllParent(nowId)
        let inner = ''
        allParent.map(item => {
            inner += `<a data-id='${item.id}'>${item.title}</a>`
        }).join('')
        inner += `<span>${getSelf(nowId).title}</span>`
        return inner
    }
    // 文件夹渲染
    function renderFolders() {
        let child = getChild(nowId)
        let inner = ''
        child.map(item => {
            inner += `<li class='folder-item ${item.checked ? 'active' : ''}' data-id='${item.id}'>
                <img src='img/folder-b.png' alt="">
                <span class="folder-name">${item.title}</span>
                <input type='text' class='editor' value="${item.title}">
                <label class="checked">
                    <input type='checkbox' ${item.checked ? 'checked' : ''}/>
                    <span class="iconfont icon-checkbox-checked"></span>
                </label>
            </li>`
        }).join('')
        setCheckedAll()
        return inner
    }

    /* 三大试图切换 */
    // 树状菜单点击事件
    treeMenu.addEventListener('click', (e) => {
        let item = null
        if(e.target.tagName === 'P') {
            item = e.target
        } else if (e.target.tagName === 'SPAN') {
            item = e.target.parentNode
        }
        if(item) {
            nowId = item.dataset.id
            data.forEach(item => {
                delete item.checked
            })
            render()
        }
    })
    // 路径导航点击事件
    breadNav.addEventListener('click', (e) => {
        if(e.target.tagName === 'A') {
            nowId = e.target.dataset.id
            data.forEach(item => {
                delete item.checked
            })
            render()
        }
    })
    // 文件夹点击事件
    folders.addEventListener('click', (e) => {
        let item = null
        if(e.target.tagName === 'LI') {
            item = e.target
        } else if (e.target.tagName === 'IMG') {
            item = e.target.parentNode
        }
        if(item) {
            nowId = item.dataset.id
            data.forEach(item => {
                delete item.checked
            })
            render()
        }
    })
    // 重命名
    folders.addEventListener('dblclick', (e) => {
        if(e.target.className.includes('folder-name')) {
            reName(e.target.parentNode)
        }
    })
    // 选中事件
    folders.addEventListener('change', (e) => {
        if(e.target.type === 'checkbox') {
            let id = e.target.parentNode.parentNode.dataset.id
            changeCheck(id, e.target.checked)
            folders.innerHTML = renderFolders()
            setCheckedAll()
        }
    })
    document.addEventListener('selectstart', (e) => {
        e.preventDefault()
    })

    // 新建文件夹
    let createBtn = document.querySelector('.create-btn')
    createBtn.addEventListener('click', (e) => {
        data.push({
            id: Date.now(),
            pid: nowId,
            title: getName()
        })
        render()
        alertSuccess('新建文件夹成功')
    })
    // 新建文件夹命名及补位
    function getName() {
        let child = getChild(nowId)
        let data = child.map(item => {
            return item.title
        })
        let names = data.filter(item => {
            if(item === '新建文件夹') {
                return true
            } else if (item.substring(0, 6) === '新建文件夹('
            && Number(item.substring(6, item.length-1)) >= 2
            && item[item.length-1] === ')') {
                return true
            }
            return false
        })
        names.sort((n1, n2) => {
            n1 = Number(n1.substring(6, n1.length-1))
            n2 = Number(n2.substring(6, n2.length-1))
            n1 = isNaN(n1) ? 0 : n1
            n2 = isNaN(n2) ? 0 : n2
            return n1 -n2
        })
        if(names[0] !== '新建文件夹') {
            return '新建文件夹'
        }
        for(let i = 1; i < names.length; i++) {
            if(names[i].substring(6, names[i].length-1) != (i+1)) {
                return `新建文件夹(${i+1})`
            }
        }
        return `新建文件夹(${names.length+1})`
    }
    
    // 文件右键处理
    let contextMenu = document.querySelector('#contextmenu')
    window.addEventListener('click', (e) => {
        contextMenu.style.display = 'none'
    })
    window.addEventListener('resize', (e) => {
        contextMenu.style.display = 'none'
    })
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
    })
    folders.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        let item = null
        if(e.target.tagName === 'LI') {
            item = e.target
        } else if (e.target.tagName === 'IMG') {
            item = e.target.parentNode
        }
        if(item) {
            contextMenu.style.display = 'block'
            let l = e.clientX
            let t = e.clientY
            let maxL = window.innerWidth - contextMenu.offsetWidth
            let maxT = window.innerHeight - contextMenu.offsetHeight
            l = Math.min(l, maxL)
            t = Math.min(t, maxT)
            contextMenu.style.left = l + 'px'
            contextMenu.style.top = t + 'px'
            contextMenu.folder = item
        }
    })
    contextMenu.addEventListener('click', function (e) {
        if(e.target.className.includes('icon-lajitong')) {
            // console.log(this.folder.dataset.id)
            confirm('确认删除文件夹吗?', () => {
                removeData(Number(this.folder.dataset.id))
                render()
            }, () => {
                console.log('取消删除文件夹')
            })
        } else if (e.target.className.includes('icon-yidong')) {
            let id = Number(this.folder.dataset.id)
            let nowPid = getSelf(id).pid
            moveAlert(() => {
                if(newPid === null || newPid === nowId) {
                    alertWarning('未作任何移动')
                    return false
                }
                let allChild = getAllChild(id)
                allChild.push(getSelf(id))
                let newParent = getSelf(newPid)
                if(allChild.includes(newParent)) {
                    alertWarning('不能移动到自己或子集下面')
                    return false
                }
                if(testName(newPid, getSelf(id).title)) {
                    alertWarning('文件名称重复')
                    return false
                }
                moveData(Number(this.folder.dataset.id))
                nowId = newPid
                render()
                alertSuccess('移动成功')
                return true
            }, () => {
                console.log('取消移动')
            })
        } else if (e.target.className.includes('icon-zhongmingming')) {
            reName(this.folder)
        }
    })

    // 框选
    let selectBox = null
    folders.addEventListener('mousedown', (e) => {
        let startMouse = {
            x: e.clientX,
            y: e.clientY
        }
        let move = (e) => {
            if(!selectBox) {
                selectBox = document.createElement('div')
                selectBox.id = 'select-box'
                document.body.appendChild(selectBox)
            }
            let nowMouse = {
                x: e.clientX,
                y: e.clientY
            }
            let rect = folders.getBoundingClientRect()
            let minX = Math.min(startMouse.x, nowMouse.x)
            let minY = Math.min(startMouse.y, nowMouse.y)
            let maxX = Math.max(startMouse.x, nowMouse.x)
            let maxY = Math.max(startMouse.y, nowMouse.y)
            let l = Math.max(minX, rect.left)
            let t = Math.max(minY, rect.top)
            let r = Math.min(maxX, rect.right)
            let b = Math.min(maxY, rect.bottom)
            selectBox.style.left = l + 'px'
            selectBox.style.top = t + 'px'
            selectBox.style.width = (r-l) + 'px'
            selectBox.style.height = (b-t) + 'px'
            let folderItem = folders.querySelectorAll('.folder-item')
            folderItem.forEach(item => {
                let checkbox = item.querySelector('[type=checkbox]')
                if(coll(item, selectBox)) {
                    item.classList.add('active')
                    checkbox.checked = true
                    changeCheck(item.dataset.id, true)
                } else {
                    item.classList.remove('active')
                    checkbox.checked = false
                    changeCheck(item.dataset.id, false)
                }
                setCheckedAll()
            })
        }
        document.addEventListener('mousemove', move)
        document.addEventListener('mouseup', (e) => {
            document.removeEventListener('mousemove', move)
            if(selectBox) {
                document.body.removeChild(selectBox)
                selectBox = null
            }
        }, {
            once: true
        })
    })

    // 碰撞检测
    function coll(el1, el2) {
        let rect1 = el1.getBoundingClientRect()
        let rect2 = el2.getBoundingClientRect()
        if(rect1.right < rect2.left
        || rect1.bottom < rect2.top
        || rect1.left > rect2.right
        || rect1.top > rect2.bottom) {
            return false
        }
        return true
    }

    // 批量删除
    let delBtn = document.querySelector('.del-btn')
    delBtn.addEventListener('click', (e) => {
        let child = getChild(nowId)
        let checkedChild = child.filter(item => item.checked)
        if(!checkedChild.length) {
            alertWarning('未选中任何文件夹')
            return
        }
        confirm('确定删除这些文件夹吗', () => {
            checkedChild.forEach(item => {
                removeData(item.id)
            })
            render()
        }, () => {
            console.log('取消删除')
        })
    })

    // 批量移动
    let moveBtn = document.querySelector('.move-btn')
    moveBtn.addEventListener('click', (e) => {
        let child = getChild(nowId)
        let checkedChild = child.filter(item => item.checked)
        if(!checkedChild.length) {
            alertWarning('未选中任何文件夹')
            return
        }
        moveAlert(() => {
            if(newPid === null || newPid === nowId) {
                alertWarning('未作任何移动')
                return false
            }
            for(let i = 0; i < checkedChild.length; i++) {
                let id = checkedChild[i].id
                let allChild = getAllChild(id)
                allChild.push(checkedChild[i])
                let newParent = getSelf(newPid)
                if(allChild.includes(newParent)) {
                    alertWarning('不能移动到自己或子集下面')
                    return false
                }
                if(testName(newPid, getSelf(id).title)) {
                    alertWarning('文件名称重复')
                    return false
                }
                moveData(id)
            }
            nowId = newPid
            render()
            alertSuccess('移动成功')
            return true
        }, () => {
            console.log('取消移动')
        })
    })
}