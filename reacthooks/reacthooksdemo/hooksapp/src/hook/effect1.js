import React, { useEffect, useState } from 'react'

// class Txt extends React.Component {
//     componentWillUnmount() {
//         console.log('组件即将卸载')
//     }
//     render() {
//         let {text, setEdit} = this.props
//         return (
//             <div>{text} <a onClick={() => {
//                 setEdit(true)
//             }}>编辑</a></div>
//         )
//     }
// }

// export default class Effect extends React.Component {
//     state = {
//         text: '今天的课程',
//         edit: false
//     }
//     componentDidMount() {
//         console.log('组件挂载完毕')
//     }
//     componentDidUpdate() {
//         console.log('组件更新完毕')
//     }
//     setStateEdit = (edit) => {
//         this.setState({
//             edit
//         })
//     }
//     render() {
//         let {text, edit} = this.state
//         return(<div>
//             {edit ?
//                 <input
//                     type="text"
//                     value={text}
//                     onChange={(e) => {
//                         this.setState({
//                             text: e.target.value
//                         })
//                     }}
//                     onBlur={() => {
//                         this.setStateEdit(false)
//                     }}
//                 />
//                 :
//                <Txt text={text} setEdit={this.setStateEdit}/>
//             }
//         </div>)
//     }
// }

function Txt(props) {
    let {text, setEdit} = props
    useEffect(() => {
        console.log('Txt状态有改变了')
        return () => {
            console.log('111')
        }
    })
    return (
        <div>{text} <a onClick={() => {
            setEdit(true)
        }}>编辑</a></div>
    )
}

export default function Effect() {
    const [text, setText] = useState('今天的课程')
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        console.log('状态有变化')
    })
    return(<div>
        {edit ?
            <input
                type="text"
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                }}
                onBlur={() => {
                    setEdit(false)
                }}
            />
            :
           <Txt text={text} setEdit={setEdit}/>
        }
    </div>)
}