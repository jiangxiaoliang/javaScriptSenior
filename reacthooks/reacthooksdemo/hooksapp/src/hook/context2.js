import React, { createContext, useContext } from 'react'

const myContext = createContext()

class Child extends React.Component {
    static contextType = myContext
    render() {
        // console.log(this.context)
        return (
            <div><strong>祖辈传下来的信息:{this.context.info}</strong></div>
        )
    }
}

function Child2() {
    console.log(useContext(myContext))
    const {info} = useContext(myContext)
    return (
        <strong>祖辈传下来的信息:{info}</strong>
        // <myContext.Consumer>
        //     {(context) => {
        //         console.log(context)
        //         return <strong>祖辈传下来的信息:{context.info}</strong>
        //     }}
        // </myContext.Consumer>
    )
}

// class Child extends React.Component {
//     render() {
//         return (
//             <Consumer>
//                 {(context) => {
//                     console.log(context)
//                     return <strong>祖辈传下来的信息:{context.info}</strong>
//                 }}
//             </Consumer>
//         )
//     }
// }

class Parent extends React.Component {
    render() {
        return (
            <div>
                <Child />
                <Child2 />
            </div>
        )
    }
}

export default class Context2 extends React.Component {
    render() {
        return (
            <myContext.Provider value={{info: 'money'}}>
                <Parent />
            </myContext.Provider>
            
        )
    }
}