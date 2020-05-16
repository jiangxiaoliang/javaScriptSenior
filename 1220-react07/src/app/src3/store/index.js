/**
 * 使用 redux 来管理数据
 */
import { createStore, combineReducers } from 'redux'

import users from './reducer/users'
import items from './reducer/items'

const stroe = createStore(
    combineReducers({
        users,
        items
    })
)

export default stroe