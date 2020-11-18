import React from 'react'

export default function Footer(props) {
    const {todos, removeCompleted} = props
    const unCompleted = todos.filter(item => !item.completed)
    const completed = todos.filter(item => item.completed)
    return (
        <footer style={{display: todos.length > 0 ? 'block' : 'none'}}>
            <a id="clear-completed" onClick={() => {
                removeCompleted()
            }}>Clear {completed.length} completed</a>
            <div id="todo-count">{unCompleted.length} items left</div>
        </footer>
    )
}