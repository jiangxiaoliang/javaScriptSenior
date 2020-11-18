import HTTP from './http'

export default function putMessage(info) {
    return function(dispatch) {
        return HTTP.post('/lecturer/addcomment', info).then(res => {
            // console.log(res)
            if (res.data.code !== 0) {
                alert(res.data.msg)
            }
            return true
        })
    }
}