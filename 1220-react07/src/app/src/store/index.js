/**
 * 使用 redux 来管理数据
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import users from './reducer/users'
import items from './reducer/items'

const stroe = createStore(
    combineReducers({
        users,
        items
    }),
    applyMiddleware(thunk)
)

export default stroe