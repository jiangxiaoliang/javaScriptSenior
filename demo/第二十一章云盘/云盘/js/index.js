{
    let topPid = -1;//顶层pid
    let topId = 0; //顶层id
    let nowId = 0; // 当前选中项的id
   
    /* 数据操作 */
    /**
     * Object getSelf(id) 根据id获取对应的当前项数据 
     * 参数：
     *      id 当前项 id
     * 返回值：
     *    当前项数据  
     * **/
    function getSelf(id){
        return data.filter(item=>id==item.id)[0];
    }
    /** 获取子级 
     * Array getChild(pid) 根据父级的id找到所有的子级
     * 参数：
     *  pid 父级的id
     * 返回值：
     *  对应的所有子级
     * **/
    function getChild(pid){
        return data.filter(item=>pid==item.pid);
    }
    /** 获取父级 
     * Object getParent(id) 根据当前项的id找到它的父级
     * 参数：
     *  id 当前项id
     * 返回值：
     *  对应的父级
     * **/
    function getParent(id){
        let s = getSelf(id);
        return  getSelf(s.pid);
    }

    /** 获取所有父级 
     * Array getAllParent(id) 根据当前项的id找到它的所有父级
     * 参数：
     *  id 当前项id
     * 返回值：
     *  对应的所有父级
     * **/
    function getAllParent(id){
        let parent  = getParent(id);
        let allParent = [];
        while(parent){
            allParent.unshift(parent);
            parent = getParent(parent.id);
        }
        return allParent;
    }
    /**
     * Array getAllChild(id) 根据 id 获取数据的所有子级（包含儿孙）
     * 参数：
     *  数据的id
     * 返回值：
     *  所有子数据
     */
    function getAllChild(id){
        let child = getChild(id);
        let allChild = [];
        if(child.length > 0){
            allChild = allChild.concat(child);
            child.forEach(item=>{
                allChild = allChild.concat(getAllChild(item.id));
            });
        }
        return allChild;
    }
    /**
     * removeData(id) 根据 id 删除当前项
     * 参数：
     *  数据的id
     */
    function removeData(id){
        let remove = getAllChild(id);
        remove.push(getSelf(id));
        data = data.filter(item=>!remove.includes(item));
        console.log(data);
    }

    /* 视图渲染 */
    let treeMenu = document.querySelector("#tree-menu");
    let breadNav = document.querySelector(".bread-nav");
    let folders = document.querySelector("#folders");

    render();
    function render(){
        treeMenu.innerHTML = renderTreeMenu(-1,0);
        breadNav.innerHTML = renderBreadNav();
        folders.innerHTML = renderFolders();
    }
    /* 树状菜单的渲染 */
    
    function renderTreeMenu(pid,level){
        let child = getChild(pid);
        let nowAllParent = getAllParent(nowId);
        nowAllParent.push(getSelf(nowId));
        let inner = `
            <ul>
                ${child.map(item=>{
                    let itemChild = getChild(item.id);
                    return `
                        <li class="${nowAllParent.includes(item)?"open":""}">
                            <p 
                                style="padding-left:${40+level*20}px" 
                                class="${itemChild.length?"has-child":""} ${item.id == nowId?"active":""}"
                                data-id="${item.id}"
                            >
                                <span>${item.title}</span>
                            </p>
                            ${itemChild.length?renderTreeMenu(item.id,level+1):""}
                        </li>
                    `
                }).join("")}
            </ul>
        `;
        return inner;
    }

    /* 路径导航渲染 */
    function renderBreadNav(){
        let nowSelf = getSelf(nowId);
        let allParent = getAllParent(nowId);
        let inner = '';
        allParent.forEach(item=>{
            inner += `<a data-id="${item.id}">${item.title}</a>`
        });
        inner += `<span>${nowSelf.title}</span>`;
        return inner;
    }

    /* 文件夹视图的渲染 */
    function renderFolders(){
        let child = getChild(nowId);
        let inner = "";
        child.forEach(item=>{
            inner += `
                <li class="folder-item" data-id="${item.id}">
                    <img src="img/folder-b.png" alt="">
                    <span class="folder-name">${item.title}</span>
                    <input type="text" class="editor" value="${item.title}">
                    <label class="checked">
                        <input type="checkbox" />
                        <span class="iconfont icon-checkbox-checked"></span>
                    </label>   
                </li>
            `;
        });
        return inner;
    }
    /* 弹窗 */
    // 成功弹窗
    function alertSuccess(info){
        let succ = document.querySelector(".alert-success");
        clearTimeout(succ.timer);
        succ.innerHTML = info;
        succ.classList.add("alert-show");
        succ.timer = setTimeout(()=>{
            succ.classList.remove("alert-show");
        },1000);
    }
    // 警告弹窗
    function alertWarning(info){
        let warning = document.querySelector(".alert-warning");
        clearTimeout(warning.timer);
        warning.innerHTML = info;
        warning.classList.add("alert-show");
        warning.timer = setTimeout(()=>{
            warning.classList.remove("alert-show");
        },1000);
    }



    /* 三大视图的事件添加 */

    /** 树状菜单操作 **/
    treeMenu.addEventListener("click",function(e){
        let item = e.target.tagName == "SPAN"?e.target.parentNode:e.target;
        if(item.tagName == "P"){
            nowId = item.dataset.id;
            render();
        }
    });

    /** 路径导航操作 **/
    breadNav.addEventListener("click",function(e){
        if(e.target.tagName === "A"){
            nowId = e.target.dataset.id;
            render();
        }
    });

    /** 文件夹视图 **/
    folders.addEventListener("click",function(e){
        let item = null;
        if(e.target.tagName == "LI"){
            item = e.target;
        } else if(e.target.tagName == "IMG"){
            item = e.target.parentNode;
        }
        if(item){
            nowId = item.dataset.id;
            render();
        }
    });

    /** 新建文件夹 **/
    let createBtn = document.querySelector(".create-btn");
    createBtn.addEventListener("click",function(){
        data.push({
            id: Date.now(),
            pid: nowId,
            title: getName()
        });
        render();
        alertSuccess("添加文件夹成功");
    });

    // 获取新建文件夹的名字
    function getName(){
        let child = getChild(nowId);
        let names = child.map(item=>item.title);
        names = names.filter(item=>{
            if(item === "新建文件夹"){
                return true;
            }
            if(
                item.substring(0,6) === "新建文件夹("
                &&Number(item.substring(6,item.length-1))>=2
                &&item[item.length-1] == ")"
            ){
                return true;
            }
            return false;
        });
        names.sort((n1,n2)=>{
            n1 =  n1.substring(6,n1.length-1);
            n2 =  n2.substring(6,n2.length-1);
            n1 = isNaN(n1)?0:n1;
            n2 = isNaN(n2)?0:n2;
            return n1 - n2;
        });
        if(names[0]!=="新建文件夹"){
            return "新建文件夹";
        }
        for(let i = 1; i < names.length; i++){
            if(Number(names[i].substring(6,names[i].length-1)) !== i+1){
                return `新建文件夹(${i + 1})`;
            }
        }
        return `新建文件夹(${names.length + 1})`;
    }
    // 右键菜单

    let contextmenu = document.querySelector("#contextmenu");
    window.addEventListener("mousedown",function(e){
        contextmenu.style.display = "none";
    });
    window.addEventListener("resize",function(e){
        contextmenu.style.display = "none";
    })
    window.addEventListener("scroll",function(e){
        contextmenu.style.display = "none";
    })
    document.addEventListener("contextmenu",function(e){
        e.preventDefault();
    });
    folders.addEventListener("contextmenu",function(e){
        let folder = null;
        if(e.target.tagName == "LI"){
            folder = e.target;
        } else if(e.target.parentNode.tagName == "LI"){
            folder = e.target.parentNode;
        }
        if(folder){
            contextmenu.style.display = "block";
            e.stopPropagation();
            e.preventDefault();
            let l = e.clientX;
            let t = e.clientY;
            let maxL = document.documentElement.clientWidth - contextmenu.offsetWidth;
            let maxT = document.documentElement.clientHeight - contextmenu.offsetHeight;
            l = Math.min(l,maxL);
            t = Math.min(t,maxT);
            contextmenu.style.left = l + "px";
            contextmenu.style.top = t + "px";
            contextmenu.folder = folder;
        }
    });
    // 右键菜单单选处理
    contextmenu.addEventListener("mousedown",function(e){
        e.stopPropagation();
    });
    contextmenu.addEventListener("click",function(e){
        // 删除单项
        if(e.target.classList.contains("icon-lajitong")){
            //console.log("删除",this.folder);
            removeData(Number(this.folder.dataset.id));
            render();
        // 移动单项    
        } else if(e.target.classList.contains("icon-yidong")){
            console.log("移动");
        // 重命名单选    
        } else if(e.target.classList.contains("icon-zhongmingming")){
            console.log("重命名");
        }
        contextmenu.style.display = "none";
    });
}