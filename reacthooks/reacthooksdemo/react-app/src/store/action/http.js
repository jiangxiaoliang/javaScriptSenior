import axios from 'axios'
import qs from 'qs'

const http = axios.create({
    baseURL: '/miaov',
    withCredentials: true,
    transformRequest: (data) => {
        return qs.stringify(data)
    }
})

export default http