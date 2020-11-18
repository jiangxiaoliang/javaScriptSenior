import HTTP from './http'

export default function register(data) {
    return function() {
        return HTTP.post('/user/register', data).then(res => {
            return res.data
        })
    }
}