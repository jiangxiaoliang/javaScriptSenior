export default function works(state = {
    data: [],
    loading: false,
    loadEnd: false,
    page: 1
}, action) {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case 'LOAD':
            return {
                ...state,
                loading: true,
            }
        case 'LOADOVER':
            return {
                ...state,
                loading: false,
                page: ++state.page,
                data: state.data.concat(action.data)
            }
        case 'LOADEND':
            return {
                ...state,
                loadEnd: true
            }
        default:
            return state
    }
}