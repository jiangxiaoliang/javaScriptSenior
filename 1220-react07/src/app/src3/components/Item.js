import React from 'react'
// 引用路径会随着当前文件路径改变而改变
import store from '../store'

export default class Item extends React.Component {
    constructor(props) {
        super(props)

        this.el = null
        this.addNewItem = this.addNewItem.bind(this)
    }

    addNewItem() {
        let value = this.el.value

        store.dispatch({
            type: 'ADD_ITEM',
            payload: {
                name: value
            }
        })
        this.el.value = ''

        // 如果直接使用 store 会绕开组件的更新，因为它既不是 state, 也不是 props
        console.log(store.getState())
    }

    render() {
        // console.log(stroe.getState())
        let { items } = store.getState()
        return (
            <div>
                <ul>
                    <input type='text' ref={(el) => {
                        this.el = el
                    }} />
                    <button onClick={this.addNewItem}>添加</button>
                    {
                        items.map((item, index) => {
                            return (
                                <li key={item.id}>{item.name}</li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}