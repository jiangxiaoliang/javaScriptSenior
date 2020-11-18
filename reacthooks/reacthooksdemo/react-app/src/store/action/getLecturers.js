import HTTP from './http'

export default function getLecturers() {
    return function(dispatch) {
        return HTTP.post(`/lecturer/lists?page=1&rows=8`, {
            order: 'desc',
            sort: 'sort',
            category_id: 2,
        }).then(res => {
            // console.log(res)
            if (res.data.length > 0) {
                dispatch({
                    type: 'LOAD_LECTURERS',
                    data: res.data
                })
            }
        })
    }
}