import React, { useEffect, useRef, useState } from 'react'

function Li(props) {
    const [edit, setEdit] = useState(false)
    const {inner, changeCompleted, remove, editVal} = props
    const elEdit = useRef(null)
    useEffect(() => {
        if (edit) {
            elEdit.current.select()
        } else {
            if (!inner.val.trim()) {
                setEdit(true)
            }
        }
    }, [edit])
    return (
        <li className={inner.completed ? 'done' : ''}>
            <div className="view"
                style={{display: edit ? 'none' : 'block'}}
                onDoubleClick={() => {
                    setEdit(true)
                }}
            >
                <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={inner.completed}
                    onChange={(e) => {
                        changeCompleted(inner.id, e.target.checked)
                    }}
                />
                <label  
                    >{inner.val}
                </label>
                <a className="destroy" onClick={() => {
                    remove(inner.id)
                }}></a>
            </div>
            <input 
                className="edit"
                style={{display: edit ? 'block' : 'none'}}
                type="text" 
                value={inner.val}
                ref={elEdit}
                onBlur={() => {
                    setEdit(false)
                }}
                onChange={(e) => {
                    editVal(inner.id, e.target.value)
                }}
            />
        </li>
    )
}

export default function Main(props) {
    const {todos, changeCompleted, remove, editVal, changeAllCompleted} = props
    const completed = todos.filter(item => item.completed)
    return (
        <section id="main" style={{display: todos.length > 0 ? 'block' : ''}}>
            <input id="toggle-all"
                type="checkbox" 
                checked={todos.length === completed.length}
                onChange={(e) => {
                    changeAllCompleted(e.target.checked)
                }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul id="todo-list">
                {
                    todos.map(item => {
                        return <Li
                            key={item.id}
                            inner={item}
                            changeCompleted={changeCompleted}
                            remove={remove}
                            editVal={editVal}
                        />
                    })
                }
            </ul>
        </section>
    )
}