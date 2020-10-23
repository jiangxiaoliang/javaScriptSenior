import axios from 'axios'
import TMessage from '@/components/TMessage/TMessage'

axios.defaults.baseURL = process.env.VUE_APP_SERVER_API_PATH

axios.interceptors.request.use(configs => {
    try {
        let userInfo = JSON.parse(localStorage.getItem('user'))
        if (userInfo.authorization) {
            configs.headers.common.authorization = userInfo.authorization
        }
    } catch(e) {
    }
    return configs
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    // console.dir(error)
    let { message, errorDetails} = error.response.data
    if (errorDetails) {
        message += ' : ' + errorDetails
    }
    TMessage.error(message)
    throw error
})

// 注册
export const register = data => {
    return axios({
        method: 'post',
        url: '/user/register',
        data
    })
}

//登录
export const login = data => {
    return axios({
        method: 'post',
        url: '/user/login',
        data
    })
}

// 面板
// 获取当前登录用户的所有面板
export const getBoards = () => {
    return axios({
        method: 'get',
        url: '/board'
    })
}
// 获取指定面板
export const getBoard = (id) => {
    return axios({
        method: 'get',
        url: '/board/' + id
    })
}
// 添加面板
export const postBoard = data => {
    return axios({
        method: 'post',
        url: '/board',
        data
    })
}

// 列表
// 获取指定面板下的所有列表
export const getLists = boardId => {
    return axios({
        method: 'get',
        url: '/list',
        params: {
            boardId
        }
    })
}
// 添加列表
export const postList = data => {
    return axios({
        method: 'post',
        url: '/list',
        data
    })
}
// 编辑列表
export const putList = data => {
    return axios({
        method: 'put',
        url: '/list/' + data.id,
        data: {
            boardId: data.boardId,
            name: data.name,
            order: data.order
        }
    })
}

//获取所有卡片
export const getCards = boardListId => {
    return axios({
        method: 'get',
        url: '/card',
        params: {
            boardListId
        }
    })
}
// 添加卡片
export const postCard = data => {
    return axios({
        method: 'post',
        url: '/card',
        data
    })
}
// 编辑卡片
export const putCard = data => {
    return axios({
        method: 'put',
        url: '/card/' + data.id,
        data: {
            boardListId: data.boardListId,
            name: data.name,
            description: data.description,
            order: data.order
        }
    })
}
// 上传附件
export const uploadAttachment = data => {
    let fd = new FormData()
    fd.append('boardListCardId', data.boardListCardId)
    fd.append('attachment', data.file)
    return axios({
        method: 'post',
        url: '/card/attachment',
        data: fd
    })
}
// 删除附件
export const removeAttachment = data => {
    return axios({
        method: 'delete',
        url: '/card/attachment/' + data.id
    })
}
// 设置封面
export const setCover = data => {
    return axios({
        method: 'put',
        url: '/card/attachment/cover/' + data.id
    })
}
// 移除封面
export const removeCover = data => {
    return axios({
        method: 'delete',
        url: '/card/attachment/cover/' + data.id
    })
}
// 获取评论
export const getComments = data => {
    return axios({
        url: '/comment',
        params: data
    })
}
// 添加评论
export const addComment = data => {
    return axios({
        method: 'put',
        url: '/comment',
        data
    })
}