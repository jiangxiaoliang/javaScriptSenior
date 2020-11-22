import axios from 'axios'
import {useDispatch} from 'react-redux'

const http = axios.create({
    baseURL: 'https://cnodejs.org/api/v1'
})

// 获取主题列表
function useTopicsList() {
    let dispatch = useDispatch()
    return function(tab="all",page=1,limit=20,mdrender=true) {
        dispatch({
            type: 'topics_loading'
        })
        http.get(`/topics?tab=${tab}&page=${page}&limit=${limit}&mdrender=${mdrender}`).then(res => {
            dispatch({
                type: 'topics_loadover',
                data: res.data.data
            })
        })
    }
}

// 获取主题列表详情
function useTopic() {
    let dispatch = useDispatch()
    return function(id) {
        dispatch({
            type: 'topic_loading'
        })
        http.get(`/topics/${id}`).then(res => {
            dispatch({
                type: 'topic_loadover',
                data: res.data.data
            })
        }).catch(e => {
            dispatch({
                type: 'topic_error',
                err_msg: e.response ? e.response.data.error_msg : '服务器未返回'
            })
        })
    }
}

// 获取用户详情
function useUser() {
    let dispatch = useDispatch()
    return function(id) {
        dispatch({
            type: 'user_loading'
        })
        http.get(`/topic/${id}`).then(res => {
            dispatch({
                type: 'user_loadover',
                data: res.data.data
            })
        })
    }
}

export {useTopicsList, useTopic, useUser}