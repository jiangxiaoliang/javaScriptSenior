import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers/index'

const stroe = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
)

export default stroe