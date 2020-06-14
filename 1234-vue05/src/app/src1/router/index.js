import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Detail from '@/views/Detail'

// 指向VueRouter 的 install
Vue.use(VueRouter)

// 创建一个具体的路由对象，该对象就是我们应用中需要使用到的路由相关配置
let router = new VueRouter({
    mode: 'history',

    // 存放 url 与 组件的映射关系
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/detail/:id',
            name: 'detail',
            component: Detail
        }
    ]
})

export default router