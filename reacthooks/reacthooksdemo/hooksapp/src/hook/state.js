import React, { useState } from 'react'

// export default class State extends React.Component {
//     state = {
//         name: 'jxl',
//         age: 10
//     }
//     setAge = () => {
//         let { age } = this.state
//         this.setState({
//             age: ++age
//         })
//     }
//     render() {
//         let { age, name } = this.state
//         return (
//             <div>
//                 姓名：{name}<br/>
//                 年龄：{age}<br/>
//                 <button onClick={this.setAge}>增加一岁</button>
//             </div>
//         )
//     }
// }

export default function State() {
    // console.log(useState(18))
    // let [age, setAge] = useState(18)
    // return (<div>
    //     年龄: {age}<br/>
    //     <button onClick={() => setAge(age+1)}>增加一岁</button>
    // </div>)

    // console.log(useState({
    //     name: 'jxl',
    //     age: 18
    // }))
    // let [state, setAge] = useState({
    //     name: 'jxl',
    //     age: 18
    // })
    // return (<div>
    //     姓名: {state.name}<br/>
    //     年龄: {state.age}<br/>
    //     <button onClick={() => setAge({
    //         ...state,
    //         age: state.age+1
    //     })}>增加一岁</button>
    // </div>)

    let [name] = useState('jxl')
    let [age, setAge] = useState(18)
    return (<div>
        姓名: {name}<br/>
        年龄: {age}<br/>
        <button onClick={() => setAge(age+1)}>增加一岁</button>
    </div>)
}