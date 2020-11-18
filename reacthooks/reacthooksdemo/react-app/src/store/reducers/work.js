export default function work(state = {
    data: {},
    loadEnd: false,
}, action) {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case 'WORK_RESET':
            return {
                data: {},
                loadEnd: false,
            }
        case 'WORK_LOADOVER':
            return {
                loadEnd: true,
                data: action.data
            }
        default:
            return state
    }
}