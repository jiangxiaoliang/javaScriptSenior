import React, { useEffect, useState } from 'react'

function Txt(props) {
    let {text, setEdit} = props
    return (
        <div>{text} <a onClick={() => {
            setEdit(true)
        }}>编辑</a></div>
    )
}
function Edit(props) {
    const {text, setText, setEdit} = props
    function toScroll() {
        let txt = document.querySelector('#txt')
        let y = window.scrollY
        txt.style.transform = `translateY(${y}px)`
        console.log(y)
    }
    useEffect(() => {
        window.addEventListener('scroll',toScroll)
        return () => { // 组件卸载
            window.removeEventListener('scroll', toScroll)
        }
    },[])
    return (
        <input
                type="text"
                value={text}
                id='txt'
                onChange={(e) => {
                    setText(e.target.value)
                }}
                onBlur={() => {
                    setEdit(false)
                }}
            />
    )
}

export default function Effect() {
    const [text, setText] = useState('今天的课程')
    const [edit, setEdit] = useState(false)
    // 只在edit变化是更新[edit] 只在组件加载时[]
    useEffect(() => {
        console.log('组件加载')
    }, [])
    return(<div>
        {edit ?
            <Edit
                text={text}
                setText={setText}
                setEdit={setEdit}
            />
            :
           <Txt text={text} setEdit={setEdit}/>
        }
        {[...('.'.repeat(100))].map((item, index) => {
            return <div key={index}>填充内容{index+1}</div>
        })}
    </div>)
}