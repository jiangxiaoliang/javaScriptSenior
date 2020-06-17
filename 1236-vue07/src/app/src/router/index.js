import Vue from 'vue'
import VueRouter from 'vue-router'

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
            // component: Home,
            component: () => import('@/views/Home'),
            beforeEnter(to, from, next) {
                next()
            }
        }
    ]
})
export default router