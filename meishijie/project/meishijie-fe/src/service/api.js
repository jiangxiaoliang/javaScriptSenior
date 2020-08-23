import axios from 'axios'

class HttpRequest {
    constructor(options) {
        this.defaults = {
            baseURL: ''
        }
        this.defaults = Object.assign(this.defaults, options)
    }
    interceptors(install) {
        install.interceptors.request.use(config => {
            let token = localStorage.getItem('token')
            if (token) {
                config.headers.authorization = `token ${token}`
            }
            return config
        }, err => {
            return Promise.reject(err)
        })
        install.interceptors.response.use(res => {
            const { data } = res
            return data
        }, err => {
            return Promise.reject(err)
        })
    }
    request(options) {
        options = Object.assign(this.defaults, options)
        const instance = axios.create(options)
        this.interceptors(instance)
        return instance
    }
}

const request = new HttpRequest({
    baseURL: '/api'
})
const http = request.request()

/**
 * 注册账号
 * @param {Object} params - 
 * @param {Object} params.name - 用户名
 * @param {Object} params.password - 密码
 * @returns
 */
export async function register(params) {
    return await http.post('/user/create', params)
}

/**
 * 注册账号
 * @param {Object} params - 
 * @param {Object} params.name - 用户名
 * @param {Object} params.password - 密码
 * @returns
 */
export async function login(params) {
    return await http.post('/user/login', params)
}

// 获取用户信息
export async function userInfo(params) {
    return await http.post('/user/info', params)
}

// 用户退出
export async function login_out() {
    return await http.post('/user/login_out')
}

// 获取banner条
export async function getBanner() {
    return await http.get('/banner')
}

/**
 * 获取菜谱数据，可根据多维度进行筛选
 * @param {Object} params - 不填写默认获取所有菜谱
 * @param {string} params.userId - 指定用户菜单
 * @param {string} params.classify - 按照菜单分类筛选
 * @param {string} params.property - 按照菜单属性筛选
 * @param {string} params.property.craft - 按工艺筛选
 * @param {string} params.property.flavor - 按口味筛选
 * @param {string} params.property.hard - 按难度筛选
 * @param {string} params.property.peole - 按人数筛选
 * @param {string} params.page - 指定页码
 */
export async function getMenus(params) {
    return await http.get('/menu/query', { params })
}

/**
 * 关注/取消关注；收藏/取消收藏
 * @param {Object} params
 * @param {string} [params.followUserId] - 关注用户的id
 */
export async function toggleFollowing(params) {
    return await http.post('/user/following', params)
}

/**
 * 获取指定用户的粉丝
 * @param {Object} params 
 * @param {string} [params.userId] - 指定用户id
 */
export async function fans(params) {
    return await http.get('/user/fans', { params })
}

/**
 * 获取指定用户关注的人
 * @param {Object} params 
 * @param {string} [params.userId] - 指定用户id
 */
export async function following(params) {
    return await http.get('/user/following', { params })
}

/**
 * 获取指定用户收藏的菜谱
 * @param {Object} params 
 * @param {string} [params.userId] - 指定用户id
 */
export async function collection(params) {
    return await http.get('/user/collection', { params })
}

/**
 * 上传图片
 * @param {Object} params
 * @param {string} [params.type] - 上传图片的类型 product user step 
 */
export async function upload(params) {
    return await http.post('/upload', { params })
}

/**
 * 修改用户信息
 * @param {Object} params 
 * @param {string} [params.avatar] - 头像
 * @param {string} [params.name] - 昵称
 * @param {string} [params.sign] - 签名 
 */
export async function userEdit(params) {
    return await http.post('/user/edit', params)
}

/**
 * 根据菜单id获取菜单详情
 * @param {Object} params
 * @param {string} [params.menuId] - 菜单id 
 */
export async function menuInfo(params) {
    return http.get('/menu/menuInfo', { params })
}

/**
 * 收藏和取消收藏
 * @param {*} params 
 * @param {String} [params.menuId] - 指定收藏的菜单
 */
export async function toggleCollection(params) {
    return http.post('/user/collection', params)
}

/**
 * 获取菜谱评论
 * @param {*} params 
 * @param {String} [params.menuId] - 菜谱id
 */
export async function getComments(params) {
    return await http.get('/menu/comment', { params })
}

/**
 * 提交菜谱评论信息
 * @param {*} params
 * @param {String} [params.menuId] - 菜谱id
 * @param {String} [params.commentText] - 评论内容 
 */
export async function posComment(params) {
    return await http.post('/menu/comment', params)
}

// 获取所有属性分类
export async function getProperty() {
    return await http.get('/menu/property')
}

// 获取所有分类
export async function getClassify() {
    return await http.get('/menu/classify')
}

export async function publish(params) {
    return await http.post('/menu/publish', params)
}