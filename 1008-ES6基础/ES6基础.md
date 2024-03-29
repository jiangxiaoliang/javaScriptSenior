# ES6 基础

## 课堂主题
  ES6 基础语法及相关方法使用

## 课堂目标
可以在平时书写时，正确使用 ES6 新增语法及相关方法

## 正课内容
1. 员工信息列表操作
2. 评分效果
3. ES6 语法总结回顾

## 总结
### 作用域与作用域链
- 作用域：一条数据起作用的范围
    - 全局作用域：声明在全局的数据，在全局任意地方都可以修改和使用
    - 局部作用域(函数作用域)：只能在其声明的函数内部进行使用和修改
    - 局部作用域(块级作用域)
- 作用域链：调用数据时的查找规则，先在当前作用域查找，如果找不到的话，就向上找父作用域,一直找到全局作用域，如果还找不到就报错


### this 指向
- 在绝大多数情况下，函数的调用方式决定了this的值。
    1. 函数作为对象的方法调用时，this 指向当前对象。(事件处理函数，this 指向当前事件的元素)
    2. 其他情况下的函数调用，this 指向 window (函数直接调用，定期器调用，动画帧调用)
- 自定义 this 指向
    1. call 和 apply 在调用时，修改本次调用的 this 指向
    2. bind 在创建时，绑定改函数的 this 指向
    
### ES6 常用语法及方法

## 练习及安排
1. 独立完成今天课上的两个案例
2. 扩展练习 - 基于扁平化的数据生成树状菜单 
3. 预习完 DOM 的视频

## 下节课预告
- 无限级下拉菜单
- 学生系统
- 上移下移



