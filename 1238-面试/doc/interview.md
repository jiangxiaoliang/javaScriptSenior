## 如何准备面试

------

### 简历
- 2页以内最好

- 我只有大半页

- 突出自己的技术亮点

### 目标公司
- 天眼查
- 知乎
- 脉脉

### 面试题
我比较反对疯狂刷题

学习不进去：
1、看银行卡余额
2、看看招聘的jd

## 面试一分钟，台下十年功（资深或者前段架构师）
------
构建自己的知识体系，武林高手要有内力，不能每次打架都取巧（刷题，蒙题）
1. js基础
	1. 红宝书+es6
	2. console中写代码，如何统计一个网页中，总共用了多少种标签（new Set([...document.getElementsByTagName('*')].map(v=>v.tagName)).size）
	3. 升级版：统计网页中，出现次数最多的3个元素并打印出来
2.	js 进阶的部分
	1. 你不知道的javascript
3. 框架
	1.	js 语法之外，还有业界最优秀的设计模式，算法的内容
	2.	进阶的开发
		1. 组件化  vue 中的组件通讯
		2. 全家桶的使用
	3. 高阶的职位要求框架源码
		1. 虚拟dom到底是个啥，为什么需要他
			1. 使用js构建一个树，映射真实dom，减少真实dom操作的次数
		2. react16和react15架构有什么变化，所谓的filber到底是什么
			1. fiber架构，虚拟dom书改成了链表的存在，让diff可以终端
		3. vue中的虚拟dom和react15的又啥区别，做了什么优化
			1.	vue使用了snabbdom这个 库，在虚拟dom的遍历之前，做了一些预判
		4. vue已经有响应式，每个数据变化我们都可以做通知机制，为啥需要虚拟dom
			1.	每个变量都响应式，响应式知道组件层，组件内部使用虚拟dom
		5. vue/react如何实现ssr
			1.	client和server两个入口
			2.	redux/vex前后端路由如何统一
			3.	首屏异步数据如何渲染
			4.	路由如何统一
			5.	ssr占用服务器性能，流量大的时候，如何做降级渲染
		6. 大家能回答几个
	4. 天天都只写代码，不学习和练习，一定是个小菜鸡
4.	性能优化
	1.	从输入url到页面显示，到底发生了什么
	2.	文件加载更快
		1.	缓存dns
		2.	webpack打包文件， 文件名_hash.js的形式，为什么好这么做（上线少报错，合理利用缓存）
		3.	打包压缩，负载均衡
		4.	gzip
		5.	图片优化
	3.	代码执行更快
		1.	vuereact
		2.	虚拟列表
		3.	ssr
		4.	节流防抖（手写）
5.	工程化
	1.	webpack解决方案
	2.	loader，plugin
6. 计算机的一些基础
   1. 算法数据结构
      1. 排序，搜索，匹配
      2. 虚拟dom就是树
   2. 网络协议TCP HTTP
   3. 编译原理（vue的compile模块）
      1. 面试题：v-if倒是怎么执行的为什么标签有了v-if=false，dom都不渲染了
   4. 设计模式（上分套路）
7. 
   任何值钱的技能，都需要刻苦刻意练习（现在会简单的vuejs）

刻意练习
1. 任务分解
2. 依此刻意训练（枯燥，重复）
3. 及时反馈（学习高手的源码，比如vue,老师给你讲解反馈）

代码训练：
1. 节流防抖
2. promise
3. 项目
4. evetbus
5. 路由
6. 冒泡和快排
7. 图片懒加载

## 除了做项目之外，为啥看源码
------
vuex
1. 面试需要
2. 资深前段，架构设计，组件库
3. 解决诡异的bug

## 如何描述自己的技术亮点
------
1. 做过的明星项目
2. 项目的技术栈和一些细节，你负责的模块（增删改查，没啥好写）
3. 源码级别的深入
4. 性能，体验优化，体现你的极客精神的
5. 填坑
6. 获得了那些成长

简单的项目就不要写了

## 大厂面试流程
------
技术面试！！
负责人
hr


没啥经验咋办
1. 我建议先别捉急着工作，可以修炼2-3个月，修炼一些技术亮点并吧学习过程做成开源
2. 可以做一个项目（自己写）碰到问题解决可以写道简历上
	1. 博客或者论坛
	2. 前端vue
	3. 后端express+简单的mongdb
	4. jwt认证
	5. 简单的组件化设计
	6. 博客新建
	7. 博客的阅读
	8. 博客的评论
	9. 登陆注册
	10. 点赞
	11. 简单的部署
	12. 课上的项目，自己敲一遍，注意不是抄，是敲，然后课上的项目也可以写道简历里面
3. 可以看一个源码（准备的时间更长一些）

## 如何谈薪资
hr说：薪资10k，你有问题吗（谈到12k)
1. hr设置职位的时候薪资都是有一些弹性的
2. 谈判获得，都是纯利润
3. 谈判需要筹码
你被压下的薪资，都是hr的kpi

1. 现在岗位薪资被压了，其实我负责的任务有XX
2. 自己的成长
3. 其他公司开了多杀

谈判的意识，工作中也能用到
谈钱不用不好意思，最体面
和产品，和老师谈，争取利益 合理的区间尽可能争取自己的利益

个人特点，亮点，每个季度回顾一下，是否有亮点能更新
1. 看过vue源码，手写过一个


简历学习，发每个季度回顾简历
面试学习法：年后先约几个面试
1. 反正我不去，很放松的对待
2. 我和hr谈钱 练习
3. 面试官问我，有什么问题（问一些公司的技术栈，技术成长路线；根据我今天面试的结果，作为面试官，下一步我怎么去学习和进步，缺点，关注什么技术）
	1. 我一定要问，求建议，求指点
	2. 面试的技术咨询和指点
4. 回去之后写总结，面试当成学习

代码：敲 多敲
课上项目，脱稿写（api可以忘）
联系一些专门的技能

以上，建议你的技术要好，没有筹码
1. 课上的项目，好好复习，脱稿手敲
2. 课上涉及的源码，重点学习，手敲
3. 从新手到入门，其实还是没那么难
4. 入门到高手，不仅仅是天天打架，还需要学习

听一下，写一下，讲一下
