import IndexPage from '../view/index/index'
import TopicPage from '../view/topic/index'
import UserPage from '../view/user/index'
import GetstartPage from '../view/getstart/index'
import AboutPage from '../view/about/index'
import Page404 from '../view/page404/index'
import qs from 'qs'

const types = ['all', 'good', 'share', 'ask', 'job', 'dev']

const route = [
    {
        path: '/',
        exact: true,
        render(props) {
            const {location} = props
            let {search} = location
            let {tab, page} = qs.parse(search.substr(1))
            if ((tab === undefined && page === undefined)
                || (types.includes(tab) && (page === undefined || page > 0))) {
                    return <IndexPage {...props} />
                }
            return <Page404 />
        }
    },
    {
        path: '/topics/:id',
        exact: true,
        render(props) {
            return <TopicPage {...props} />
        }
    },
    {
        path: '/user/:loginname',
        exact: true,
        render(props) {
            return <UserPage {...props} />
        }
    },
    {
        path: '/getstart',
        exact: true,
        render(props) {
            return <GetstartPage {...props} />
        }
    },
    {
        path: '/about',
        exact: true,
        render(props) {
            return <AboutPage {...props} />
        }
    },
    {
        path: '',
        exact: false,
        render(props) {
            return <Page404 {...props} />
        }
    }
]

const nav = [
    {
        path: '/',
        txt: '首页'
    },
    {
        path: '/getstart',
        txt: '新手入门'
    },
    {
        path: '/about',
        txt: '关于我们'
    }
]

const indexNav = [
    {
        path: '/?tab=all',
        txt: '全部'
    },
    {
        txt:"精华",
        path :"/?tab=good"
    },
    {
        txt:"分享",
        path :"/?tab=share"
    },
    {
        txt:"问答",
        path :"/?tab=ask"
    },
    {
        txt:"招聘",
        path :"/?tab=job"
    },
    {
        txt:"客户端测试",
        path :"/?tab=dev"
    }
]

export {route, nav, indexNav, types}