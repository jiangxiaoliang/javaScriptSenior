import React, { useEffect, useRef, useState } from 'react'

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
    let t = useRef(null)
    // console.log(t)
    function toScroll() {
        let txt = document.querySelector('#txt')
        let y = window.scrollY
        t.current.style.transform = `translateY(${y}px)`
        // console.log(y)
    }
    useEffect(() => {
        // console.log(t)
        window.addEventListener('scroll',toScroll)
        t.current.select()
        return () => { // 组件卸载
            window.removeEventListener('scroll', toScroll)
        }
    },[])
    return (
        <input
                type="text"
                value={text}
                id='txt'
                ref={t}
                onChange={(e) => {
                    setText(e.target.value)
                }}
                onBlur={() => {
                    setEdit(false)
                }}
            />
    )
}

export default function Ref() {
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