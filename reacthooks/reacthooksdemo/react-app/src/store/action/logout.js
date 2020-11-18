import HTTP from './http'

export default function logout() {
    return function(dispatch) {
        return HTTP.post('/user/logout').then(res => {
            if (res.data.code === 0) {
                dispatch({
                    type: 'LOGOUT'
                })
            }
        })
    }
}