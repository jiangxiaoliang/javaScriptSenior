import Login from '../view/login/index'
import Index from '../view/index/index'
import Work from '../view/work/index'
import Course from '../view/course/index'
import Lecturer from '../view/lecturer/index'

const routeList = [
    {
        name: '登陆',
        path: '/login',
        exact: true,
        render(props) {
            return <Login {...props}/>
        }
    },
    {
        name: '首页',
        path: '/',
        exact: true,
        render(props) {
            return <Index {...props}/>
        }
    },
    {
        name: '作品',
        path: '/work/:id',
        exact: true,
        render(props) {
            return <Work {...props}/>
        }
    },
    {
        name: '课程',
        path: '/course',
        exact: true,
        render(props) {
            return <Course {...props}/>
        }
    },
    {
        name: '登陆',
        path: '/lecturer',
        exact: true,
        render(props) {
            return <Lecturer {...props}/>
        }
    },
]

const nav = [
    {
        name: '首页',
        path: '/',
        exact: true,
        className: 'iconfont icon-home'
    },
    {
        name: '课程安排',
        path: '/course',
        exact: true,
        className: 'iconfont icon-kecheng'
    },
    {
        name: '讲师团队',
        path: '/lecturer',
        exact: true,
        className: 'iconfont icon-peixunjiangshi'
    }
]

export {routeList, nav}