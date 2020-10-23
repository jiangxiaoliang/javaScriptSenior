import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
const Board = () => import(/* webpackChunkName: "board" */ '@/views/Board.vue')
const Card = () => import(/* webpackChunkName: "card" */ '@/views/Card.vue')
const Register = () => import(/* webpackChunkName: "register" */ '@/views/Register.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
const NotFound = () => import(/* webpackChunkName: "notFound" */ '@/views/NotFound.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/board/:id(\\d+)',
    name: 'Board',
    component: Board,
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'list/:listId(\\d+)/card/:cardId(\\d+)',
        name: 'Card',
        component: Card
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

store.commit('user/initUserInfo')
router.beforeEach((to, from, next) => {
  // 如果该路由需要鉴权，则验证用户信息，否则跳转到登录页
  if (to.matched.some(matched => matched.meta.requireAuth) && !store.state.user.info) {
    next({
      name: 'Login'
    })
  } else {
    next()
  }
})

export default router
