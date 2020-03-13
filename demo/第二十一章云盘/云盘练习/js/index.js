{
    let topPid = -1 // 顶层pid
    let topId = 0 // 顶层id
    let nowId = topId // 当前id

    /* 数据操作 */
    /**
     * 根据id获取当前项数据
     * @param {*} id 
     * @return {Object} 当前项数据
     */
    function getSelf(id) {
        return data.filter(item => item.id == id)[0]
    }
    /**
     * 查找子级
     * @param {*} pid 父级id
     * @return {Array} 所有子级
     */
    function getChild(pid) {
        return data.filter(item => item.pid == pid)
    }
    /**
     * 查找父级
     * @param {*} id 当前id
     * @return {Object} 对应父级
     */
    function getParent(id) {
        let s = getSelf(id)
        return getSelf(s.pid)
    }
    /**
     * 查找所有父级
     * @param {*} id 当前id
     * @return {Array} 对应所有负极
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
     * @param {*} id 当前id
     * @return {Array} 所有子集
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
     * 删除当前项及所有子集
     * @param {*} id 当前id
     * @return {Array} 返回删除后的数据
     */
    function removeData(id) {
        let allChild = getAllChild(id)
        allChild.push(getSelf(id))
        data = data.filter(item => !allChild.includes(item))
    }
    /**
     * 移动数据
     * @param {*} id 当前id 
     * @param {*} pid 父级id
     */
    function moveData(id, pid) {
        let nowSelf = getSelf(id)
        nowSelf.pid = pid
    }
    /**
     * 命名检测
     * @param {*} id 当前id
     * @param {*} title 名称
     * @return {Boolean} ture 有冲突 false 没有冲突
     */
    function testName(id, title) {
        let child = getChild(id)
        return child.some(item => item.title == title)
    }
    /**
     * 选中
     * @param {*} id 当前id
     * @param {*} checked 是否选择
     */
    function changeCheck(id, checked) {
        let nowData = getSelf(id)
        nowData.checked = checked
    }
    // 是否全部选择
    function isCheckedAll() {
        let child = getChild(nowId)
        return child.every(item => item.checked) && child.length > 0
    }
    // 全选
    function setAllChecked(checked) {
        let child = getChild(nowId)
        child.forEach(item => item.checked = checked)
    }
    // 获取当前id下的选中项
    function getChecked() {
        let child = getChild(nowId)
        return child.filter(item => item.checked)
    }

    //是否全选
    let checkedAll = document.querySelector('#checked-all')
    function setCheckedAll() {
        checkedAll.checked = isCheckedAll()
    }
    checkedAll.addEventListener('change', function() {
        setAllChecked(this.checked)
        folders.innerHTML = renderFolders()
    })

    /* 试图渲染 */
    let treeMenu = document.querySelector('#tree-menu')
    let breadNav = document.querySelector('.bread-nav')
    let folders = document.querySelector('#folders')
    render()
    function render() {
        treeMenu.innerHTML = renderTreeMenu(-1, 0)
        breadNav.innerHTML = renderBreadNav()
        folders.innerHTML = renderFolders()
    }
    /* 树状菜单渲染 */
    function renderTreeMenu(pid, level, isOpen) {
        let child = getChild(pid)
        let nowAllParent = getAllParent(nowId)
        nowAllParent.push(getSelf(nowId))
        let inner = `<ul>
            ${child.map(item => {
                let itemChild = getChild(item.id)
                return `<li class='${(nowAllParent.includes(item) || isOpen) ? 'open' : ''}'>
                    <p 
                        style="padding-left:${40 + level*20}px" 
                        class="${itemChild.length ? 'has-child' : ''} ${item.id == nowId ? 'active' : ''}"
                        data-id = '${item.id}'>
                        <span>${item.title}</span>
                    </p>
                    ${itemChild.length ? renderTreeMenu(item.id, level + 1, isOpen) : ''}
                </li>`
            }).join('')}
        </ul>`
        return inner
    }
    /* 路径导航渲染 */
    function renderBreadNav() {
        let nowSelf = getSelf(nowId)
        let allParent = getAllParent(nowId)
        let inner = ''
        allParent.forEach(item => {
            inner += `<a data-id = '${item.id}'>${item.title}</a>`
        })
        inner += `<span>${nowSelf.title}</span>`
        setCheckedAll()
        return inner
    }
    /* 文件夹视图渲染 */
    function renderFolders() {
        let child = getChild(nowId)
        let inner = ''
        child.forEach(item => {
            inner += `
            <li class='folder-item ${item.checked ? 'active' : ''}' data-id = '${item.id}'>
                <img src='img/folder-b.png' alt="">
                <span class="folder-name">${item.title}</span>
                <input type='text' class='editor' value="${item.title}">
                <label class="checked">
                    <input type='checkbox' ${item.checked ? 'checked' : ''} />
                    <span class="iconfont icon-checkbox-checked"></span>
                </label>
            </li>`
        })
        return inner
    }

    /* 弹窗 */
    // 成功弹窗
    function alertSuccess(info) {
        let succ = document.querySelector('.alert-success')
        clearTimeout(succ.timer)
        succ.innerHTML = info
        succ.classList.add('alert-show')
        succ.timer = setTimeout(() => {
            succ.classList.remove('alert-show')
        }, 1000)
    }
    // 警告弹窗
    function alertWarning(info) {
        let warn = document.querySelector('.alert-warning')
        clearTimeout(warn.timer)
        warn.innerHTML = info
        warn.classList.add('alert-show')
        warn.timer = setTimeout(() => {
            warn.classList.remove('alert-show')
        }, 1000)
    }
    // 重命名
    function reName(folder) {
        let folderName = folder.querySelector('.folder-name')
        let editor = folder.querySelector('.editor')
        folderName.style.display = 'none'
        editor.style.display = 'block'
        editor.select()
        editor.onblur = () => {
            if(!editor.value.trim()) {
                alertWarning('文件名称为空')
                editor.focus()
                return
            }
            if(editor.value.trim() == folderName.innerHTML) {
                folderName.style.display = 'block'
                editor.style.display = 'none'
                return
            }
            if(testName(nowId, editor.value.trim())) {
                alertWarning('换个名称')
                editor.focus()
                return
            }
            // folderName.innerHTML = editor.value.trim()
            getSelf(folder.dataset.id).title = editor.value
            render()
            folderName.style.display = 'block'
            editor.style.display = 'none'
            alertSuccess('重命名成功')
        }
    }

    /* 三大试图事件添加 */
    /* 树状菜单操作 */
    treeMenu.addEventListener('click', (e) => {
        let item = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target
        if(item.tagName === 'P') {
            nowId = item.dataset.id
            data.forEach(item => {
                delete item.checked
            })
            render()
        }
    })
    /* 路径导航操作 */
    breadNav.addEventListener('click', (e) => {
        if(e.target.tagName === 'A') {
            nowId = e.target.dataset.id
            data.forEach(item => {
                delete item.checked
            })
            render()
        }
    })
    /* 文件夹视图操作 */
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
    folders.addEventListener('dblclick', (e) => {
        // console.log(e.target)
        if(e.target.className === 'folder-name') {
            reName(e.target.parentNode)
        }
    })
    folders.addEventListener('change', (e) => {
        if(e.target.type === 'checkbox') {
            // if(e.target) {
            //     e.target.parentNode.parentNode.classList.add('active')
            // } else {
            //     e.target.parentNode.parentNode.classList.remove('active')
            // }
            let id = e.target.parentNode.parentNode.dataset.id
            changeCheck(id, e.target.checked)
            folders.innerHTML = renderFolders()
            setCheckedAll()
        }
    })
    // 阻止页面内容被选中
    document.addEventListener('selectstart', (e) => {
        e.preventDefault()
    })
    /* 新建文件夹 */
    let createBtn = document.querySelector('.create-btn')
    createBtn.addEventListener('click', (e) => {
        data.push({
            id: Date.now(),
            pid: nowId,
            title: getName()
        })
        render()
        alertSuccess('新建文件成功')
    })
    // 获取新建文件名称
    function getName() {
        let child = getChild(nowId)
        let names = child.map(item => item.title)
        names = names.filter(item => {
            if(item === '新建文件夹') {
                return true
            }
            if(item.substring(0,6) === '新建文件夹('
            && Number(item.substring(6, item.length-1)) >= 2
            && item[item.length - 1] === ')') {
                return true
            }
            return false
        })
        names.sort((n1, n2) => {
            n1 = Number(n1.substring(6, n1.length-1))
            n2 = Number(n2.substring(6, n2.length-1))
            n1 = isNaN(n1) ? 0 : n1
            n2 = isNaN(n2) ? 0 : n2
            return n1 - n2
        })
        if(names[0] !== '新建文件夹') {
            return `新建文件夹`
        }
        for(let i = 1; i < names.length; i++) {
            if(Number(names[i].substring(6, names[i].length-1)) != i + 1) {
                return `新建文件夹(${i + 1})`
            }
        }
        return `新建文件夹(${names.length + 1})`
    }

    // 右键菜单
    let contextmenu = document.querySelector('#contextmenu')
    window.addEventListener('mousedown', (e) => {
        contextmenu.style.display = 'none'
    })
    window.addEventListener('resize', (e) => {
        contextmenu.style.display = 'none'
    })
    window.addEventListener('mousewheel', (e) => {
        contextmenu.style.display = 'none'
    })
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault()
    })
    folders.addEventListener('contextmenu', (e) => {
        let item = null
        if(e.target.tagName === 'LI') {
            item = e.target
        } else if (e.target.parentNode.tagName === 'LI') {
            item = e.target.parentNode
        }
        if(item) {
            contextmenu.style.display = 'block'
            e.stopPropagation()
            e.preventDefault()
            let l = e.clientX
            let t = e.clientY
            // let maxT = window.innerHeight - contextmenu.offsetHeight
            // let maxL = window.innerWidth - contextmenu.offsetWidth
            let maxT = document.documentElement.clientHeight - contextmenu.offsetHeight
            let maxL = document.documentElement.clientWidth - contextmenu.offsetWidth
            l = Math.min(maxL, l)
            t = Math.min(maxT, t)
            contextmenu.style.left = l + 'px'
            contextmenu.style.top = t + 'px'
            contextmenu.folder = item
        }
    })
    // 右键菜单单项操作
    contextmenu.addEventListener('mousedown', (e) => {
        e.stopPropagation()
    })
    contextmenu.addEventListener('click', function (e) {
        if(e.target.classList.contains('icon-lajitong')) {
            // console.log('del', this.folder)
            confirm('确定删除当前文件夹吗？', () => {
                removeData(Number(this.folder.dataset.id))
                render()
                alertSuccess('删除文件夹成功')
            }, () => {
                console.log('取消')
            })
        } else if (e.target.classList.contains('icon-yidong')) {
            let id = Number(this.folder.dataset.id)
            let nowPid = getSelf(id).pid
            moveAlert(() => {
                if(newPid === null || newPid == nowId) {
                    alertWarning('未做任何移动')
                    return false
                }
                let allChild = getAllChild(id)
                let newParent = getSelf(newPid)
                allChild.push(getSelf(id))
                if(allChild.includes(newParent)) {
                    alertWarning('不能移动到在自己里面')
                    return false
                }
                if(testName(newPid, getSelf(id).title)) {
                    alertWarning('文件夹名称冲突')
                    return false
                }
                nowId = newPid
                moveData(id, newPid)
                render()
                alertSuccess('移动成功')
                return true
            })
        } else if (e.target.classList.contains('icon-zhongmingming')) {
            // console.log('rename')
            // console.log(this.folder)
            reName(this.folder)
        }
        contextmenu.style.display = 'none'
    })

    // 确认弹框
    let confirmEl = document.querySelector('.confirm')
    let mask = document.querySelector('#mask')
    let closConfirm = confirmEl.querySelector('.clos')
    let confirmText = confirmEl.querySelector('.confirm-text')
    let confirmBtns = confirmEl.querySelectorAll('.confirm-btns a')
    function confirm(info, resolve, reject) {
        mask.style.display = 'block'
        confirmText.innerHTML = info
        confirmEl.classList.add('confirm-show')
        confirmBtns[0].onclick = (e) => {
            mask.style.display = 'none'
            confirmEl.classList.remove('confirm-show')
            resolve && resolve()
        }
        confirmBtns[1].onclick = (e) => {
            mask.style.display = 'none'
            confirmEl.classList.remove('confirm-show')
            reject && reject()
        }
    }
    closConfirm.addEventListener('click', (e) => {
        mask.style.display = 'none'
        confirmEl.classList.remove('confirm-show')
    })

    // 移动弹框
    let moveAlertEl = document.querySelector('.move-alert')
    let closMoveAlert = moveAlertEl.querySelector('.clos')
    let moveAlertMenu = moveAlertEl.querySelector('.move-alert-menu')
    let moveAlertBtns = moveAlertEl.querySelectorAll('.confirm-btns a')
    let newPid = null
    moveAlertMenu.addEventListener('click', (e) => {
        let item = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target
        if(item.tagName === 'P') {
            let p = moveAlertMenu.querySelectorAll('p')
            p.forEach(item => {
                item.classList.remove('active')
            })
            item.classList.add('active')
            newPid = item.dataset.id
        }
    })
    function moveAlert(resolve, reject) {
        moveAlertMenu.innerHTML = renderTreeMenu(topPid, 0, true)
        mask.style.display = 'block'
        moveAlertEl.classList.add('move-alert-show')
        newPid = null
        moveAlertBtns[0].onclick = () => {
            if(resolve) {
                if(resolve()) {
                    mask.style.display = 'none'
                    moveAlertEl.classList.remove('move-alert-show')
                }
            } else {
                mask.style.display = 'none'
                moveAlertEl.classList.remove('move-alert-show')
            }
        }
        moveAlertBtns[1].onclick = () => {
            mask.style.display = 'none'
            moveAlertEl.classList.remove('move-alert-show')
            reject && reject()
        }
    }
    closMoveAlert.addEventListener('click', (e) => {
        mask.style.display = 'none'
        moveAlertEl.classList.remove('move-alert-show')
    })

    // 框选
    let selectBox = null
    folders.addEventListener('mousedown', (e) => {
        let folderItems = folders.querySelectorAll('.folder-item ')
        if(!e.button == 0) {
            return
        }
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
            let rect = folders.getBoundingClientRect()
            let nowMouse = {
                x: e.clientX,
                y: e.clientY
            }
            let minX = Math.min(startMouse.x, nowMouse.x)
            let minY = Math.min(startMouse.y, nowMouse.y)
            let maxX = Math.max(startMouse.x, nowMouse.x)
            let maxY = Math.max(startMouse.y, nowMouse.y)
            let l = Math.max(minX, rect.left)
            let t = Math.max(minY, rect.top)
            let r = Math.min(maxX, rect.right)
            let b = Math.min(maxY, rect.bottom)

            // let l = Math.min(startMouse.x, nowMouse.x)
            // let t = Math.min(startMouse.y, nowMouse.y)
            // let w = Math.abs(startMouse.x - nowMouse.x)
            // let h = Math.abs(startMouse.y - nowMouse.y)
            selectBox.style.left = l + 'px'
            selectBox.style.top = t + 'px'
            selectBox.style.width = (r-l) + 'px'
            selectBox.style.height = (b-t) + 'px'
            folderItems.forEach(item => {
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
            })
            setCheckedAll()
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

    // 碰撞检查
    function coll(el1,el2) {
        let el1Rect = el1.getBoundingClientRect()
        let el2Rect = el2.getBoundingClientRect()
        if(el1Rect.right < el2Rect.left ||
            el1Rect.top > el2Rect.bottom ||
            el1Rect.left > el2Rect.right ||
            el1Rect.bottom < el2Rect.top) {
                return false
            }
        return true
    }

    // 批量删除
    let delBtn = document.querySelector('.del-btn')
    delBtn.addEventListener('click', (e) => {
        confirm('确定删除这些文件夹吗？', () => {
            // removeData(Number(this.folder.dataset.id))
            let checkedData = getChecked()
            if(checkedData.length < 1) {
                alertWarning('未选中任何文件')
                return
            }
            checkedData.forEach(item => {
                removeData(item.id)
            })
            render()
            alertSuccess('删除文件夹成功')
        }, () => {
            console.log('取消')
        })
    })

    // 批量移动
    let moveBtn = document.querySelector('.move-btn')
    moveBtn.addEventListener('click', (e) => {
        let checkedData = getChecked()
        if(checkedData.length < 1) {
            alertWarning('未选中任何文件')
            return
        }
        let nowPid = nowId
        moveAlert(() => {
            if(newPid === null || newPid == nowId) {
                alertWarning('未做任何移动')
                return false
            }
            for(let i = 0; i < checkedData.length; i++) {
                let id = checkedData[i].id
                let allChild = getAllChild(id)
                let newParent = getSelf(newPid)
                allChild.push(checkedData[i])
                if(allChild.includes(newParent)) {
                    alertWarning('不能移动到在自己里面')
                    return false
                }
                if(testName(newPid, checkedData[i].title)) {
                    alertWarning('文件夹名称冲突')
                    return false
                }
                moveData(id, newPid)
            }
            nowId = newPid
            render()
            alertSuccess('移动成功')
            return true
        })
    })
}