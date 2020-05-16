let items = []
export default (state = items, action) => {
    switch (action.type) {
        case 'UPDATE_ITEM':
            return action.payload.items
        default:
            return state
    }
}