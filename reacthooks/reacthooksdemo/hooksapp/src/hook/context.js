import React, { createContext } from 'react'

// console.log(createContext())
const {Provider, Consumer} = createContext()

class Child extends React.Component {
    render() {
        return (
            <Consumer>
                {(context) => {
                    console.log(context)
                    return <strong>祖辈传下来的信息:{context.info}</strong>
                }}
            </Consumer>
        )
    }
}

class Parent extends React.Component {
    render() {
        return (
            <Child />
        )
    }
}

export default class Context extends React.Component {
    render() {
        return (
            <Provider value={{info: 'money'}}>
                <Parent />
            </Provider>
            
        )
    }
}