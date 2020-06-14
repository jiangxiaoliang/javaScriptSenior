import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// import Home from '@/views/Home'
// import About from '@/views/About'
// import Detail from '@/views/Detail'
// import User from '@/views/User'
// import Login from '@/views/Login'
// import Cart from '@/views/User/Cart'
// import Profile from  '@/views/User/Profile'
// import BookChoose from '@/views/BookChoose'
// import BookBoy from '@/views/Book/BookBoy'
// import BookGirl from '@/views/Book/BookGirl'

// 指向VueRouter 的 install
Vue.use(VueRouter)

// 创建一个具体的路由对象，该对象就是我们应用中需要使用到的路由相关配置
let router = new VueRouter({
    mode: 'history',

    scrollBehavior (to, from, savedPosition) {
        console.log(savedPosition)
        if (savedPosition) {
            return savedPosition
        } else {
            return {
                x: 0,
                y: 0
            }
        }
    },

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
        },
        {
            path: '/about',
            name: 'about',
            // component: About,
            component: () => import('@/views/About'),
        },
        {
            path: '/detail/:id',
            name: 'detail',
            // component: Detail,
            component: () => import('@/views/Detail'),
            // 把params合并到props中
            // props: true
            // props: {id: 3, a: 1}
            props(r) {
                return {
                    id: r.params.id,
                    a: 1
                }
            }
        },
        {
            path: '/user',
            // name: 'user',
            alias: '/member',
            // component: User,
            component: () => import(/* webpackChunkName: "user" */ '@/views/User'),
            children: [
                {
                    path: '',
                    name: 'user',
                    // component: Profile,
                    component: () => import(/* webpackChunkName: "user" */ '@/views/User/Profile'),
                    meta: {requireAuth:true}
                },
                {
                    path: 'cart',
                    name: 'userCart',
                    // component: Cart,
                    component: () => import(/* webpackChunkName: "user" */ '@/views/User/Cart'),
                    meta: {requireAuth:true}
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            // component: Login
            component: () => import('@/views/Login'),
        },
        {
            path: '/book',
            name: 'book',
            // redirect: { name: 'bookChoose' }
            redirect: to => {
                let type = window.localStorage.getItem('bookType')
                return { name: type || 'bookChoose' }
            }
        },
        {
            path: '/bookChoose',
            name:'bookChoose',
            // component: BookChoose
            component: () => import(/* webpackChunkName: "book" */ '@/views/BookChoose'),
        },
        {
            path: '/bookBoy',
            name: 'bookBoy',
            // component: BookBoy
            component: () => import(/* webpackChunkName: "book" */ '@/views/Book/BookBoy'),
        },
        {
            path: '/bookGirl',
            name:'bookGirl',
            // component: BookGirl
            component: () => import(/* webpackChunkName: "book" */ '@/views/Book/BookGirl'),
        },
        {
            path: '*',
            // component: NotFound
        }
    ]
})

let user = {
    id: 1
}

router.beforeEach((to, from, next) => {
    NProgress.start()

    // if (user.id === 0 && to.name === 'user') {
    //     next({
    //         name: 'login'
    //     })
    // } else {
    //     next()
    // }
    if (user.id === 0 && to.meta.requireAuth) {
        next({
            name: 'login'
        })
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    NProgress.done()
})

export default router