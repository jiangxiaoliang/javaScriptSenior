import React, { useState } from 'react'

export default function Header(props) {
    const [todo, setTodo] = useState('')
    const {addTodo} = props
    return (
        <header>
            <h1>Todos</h1>
            <input
                id="new-todo"
                type="text"
                placeholder="What needs to be done?"
                value={todo}
                autoComplete="off"
                onChange={(e) => {
                    setTodo(e.target.value)
                }}
                onKeyDown={(e) => {
                    // console.log(e.keyCode)
                    if (e.keyCode === 13) {
                        if (!e.target.value.trim()) {
                            alert('输入内容为空')
                            e.target.focus()
                        } else {
                            addTodo(e.target.value)
                            setTodo('')
                        }
                    }
                }}
            />
        </header>
    )
}