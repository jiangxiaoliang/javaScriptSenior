import React, { createContext, useContext, useReducer } from 'react'

const myContext = createContext()

function reduce(state = 0, action) {
    switch(action.type) {
        case 'add':
            state += 1
            break
        case 'minus':
            state -= 1
            break
        default:
            break
    }
    return state
}

function Child() {
    // console.log(useContext(myContext))
    const {state, dispatch} = useContext(myContext)
    return (
        <div>
            <button onClick={() => {
                dispatch({
                    type: 'minus'
                })
            }}>-</button>
            <span>{state}</span>
            <button onClick={() => {
                dispatch({
                    type: 'add'
                })
            }}>+</button>
        </div>
    )
}

export default function Reduce() {
    // console.log(useReducer(reduce, 0))
    const [state, dispatch] = useReducer(reduce, 0)
    return (
        <myContext.Provider value={{
            state,
            dispatch
        }}>
            <Child />
        </myContext.Provider>
    )
}