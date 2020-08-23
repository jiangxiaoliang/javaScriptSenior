import Vue from 'vue'
import Router from 'vue-router'
import { userInfo } from '@/service/api'
import Store from '@/store'
Vue.use(Router)

// 引入组件 打包会打包在文件中，如果都用import的话，所有组件都会打包在一个文件中，导致文件很大
import Home from '@/views/home/Home.vue'

// 按需加载，访问路径的时候才会加载，不访问，不加载
const Recipe = () => import('@/views/recipe/recipe')
const Create = () => import('@/views/create/create')
const Edit = () => import('@/views/user-space/edit')

const Space = () => import(/* webpackChunkName: "space" */'@/views/user-space/space')
const MenuList = () => import(/* webpackChunkName: "space" */'@/views/user-space/menu-list')
const Fans = () => import(/* webpackChunkName: "space" */'@/views/user-space/fans')

const Detail = () => import('@/views/detail/detail')
const Login = () => import('@/views/user-login/index')

const viewsRoute = [
    {
        path: '/recipe',
        name: 'recipe',
        title: '菜谱大全',
        component: Recipe
    },
    {
        path: '/create',
        name: 'create',
        title: '发布菜谱',
        component: Create,
        meta: {
            login: true
        }
    },
    {
        path: '/edit',
        title: '编辑个人资料',
        name: 'edit',
        component: Edit,
        meta: {
            login: true
        }
    },
    {
        path: '/space',
        name: 'space',
        title: '个人空间',
        component: Space,
        redirect: {
            name: 'works'
        },
        meta: {
            login: true
        },
        children: [
            {
                path: 'works',
                name: 'works',
                title: '作品',
                component: MenuList,
                meta: {
                    login: true
                }
            },
            {
                path: 'fans',
                name: 'fans',
                title: '我的粉丝',
                component: Fans,
                meta: {
                    login: true
                }
            },
            {
                path: 'following',
                name: 'following',
                title: '我的关注',
                component: Fans,
                meta: {
                    login: true
                }
            },
            {
                path: 'collection',
                name: 'collection',
                title: '收藏',
                component: MenuList,
                meta: {
                    login: true
                }
            }
        ]
    },
    {
        path: '/detail',
        name: 'detail',
        title: '菜谱详情',
        component: Detail
    }
]

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            title: '首页',
            component: Home
        },
        {
            path: '/login',
            name: 'login',
            title: '登陆页',
            component: Login,
            meta: {
                login: true
            }
        },
        ...viewsRoute,
        {
            path: '*',
            name: 'notfound',
            title: '未找到',
            redirect: {
                name: 'home'
            }
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    const token = localStorage.getItem('token')
    const isLogin = !!token

    // 进入路由的时候，都要向后端验证token是否合法
    // 不管路由是否需要登陆，都需要展示用户信息
    // 都需要向后端发送请求用户信息
    const data = await userInfo()
    Store.commit('changeUserInfo', data.data)
    if (to.matched.some(item => item.meta.login)) {
        if (isLogin) { // 已登录
            if (data.error === 400) { // token校验
                next({ name: 'login' })
                localStorage.removeItem('token')
            }
            if (to.name === 'login') {
                next({ name: 'home' })
            } else {
                next()
            }
            return
        }
        // 没有登录，进入login,直接进入
        if (!isLogin && to.name === 'login') {
            next()
        }
        // 没有登录，进入的不是login,跳到login
        if (!isLogin && to.name !== 'login') {
            next({name: 'login'})
        }
    } else {
        next()
    }
})

export default router