# Event

## 事件监听器
- 事件监听和事件绑定区别
- addEventListener(type, listener[, options | useCapture])
  - 事件流
    - 事件冒泡
    - 事件捕获
  - 事件监听相关配置
    - capture: 是否在捕获阶段执行
    - once: 是否只执行一次
    - passive：阻止取消默认事件
- removeEventlistener 取消事件监听(不能用匿名函数)

## Event事件对象
- Event.target、Event.currentTarget 事件源
- 事件委托(事件代理)
  - 事件委托优点
    1. 可减少需要添加事件绑定的元素
    2. 可给新增的DOM元素添加事件(不刷新页面的情况下)
  - 事件委托缺点
    1. 事件处理函数中需增加判断事件源增加逻辑复杂度
    2. 祖父级和事件源之间不能阻止冒泡
- mouseenter、mouseleave和mouseover、mouseout事件区别
- Event.stopPropagation(),Event.cancelBubble取消冒泡
- Event.clientX,Event.clientY,Event.pageX,Event.pageY

## contextmenu事件
- Event.preventDefault阻止默认事件和return false(事件绑定时)

## 键盘事件
- keydown,keyup
- Event.keyCode,Event.key
- Event.altKey,Event.ctrlKey,Event.shiftKey
- 组合键

## 拖拽思路
- mousedown,mousemove,mouseup
- 拖拽公式：元素当前位置=(鼠标当前位置-鼠标初始位置)+元素初始位置
- 拖拽问题修复
- 限制拖拽范围

## 鼠标滚动事件
- mousewheel和DOMMouseScroll事件
- Event.wheelDelta和Event.detail

## 其他常用事件
- dblclick
- blur,focus,change,input,submit,reset
- 表单其他方法：blur(),focus(),select()

## 案例
- 鼠标跟随
- 自定义右菜单
- 键盘移动操作dom
- 拖拽
- 鼠标滚动事件兼容