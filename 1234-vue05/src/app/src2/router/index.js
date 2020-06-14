import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import About from '@/views/About'
import Detail from '@/views/Detail'
import User from '@/views/User'
import Login from '@/views/Login'
import Cart from '@/views/User/Cart'
import Profile from  '@/views/User/Profile'

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
            component: Home,
            beforeEnter(to, from, next) {
                next()
            }
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
        },
        {
            path: '/user',
            name: 'user',
            component: User,
            children: [
                {
                    path: '',
                    name: 'userProfile',
                    component: Profile
                },
                {
                    path: 'cart',
                    name: 'userCart',
                    component: Cart
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
})

let user = {
    id: 1
}

router.beforeEach((to, from, next) => {
    if (user.id === 0 && to.name === 'user') {
        next({
            name: 'login'
        })
    } else {
        next()
    }
})

export default router