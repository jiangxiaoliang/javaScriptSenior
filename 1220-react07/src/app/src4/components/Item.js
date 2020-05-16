import React from 'react'
import { connect } from 'react-redux'

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.el = null
        this.addNewItem = this.addNewItem.bind(this)
    }

    addNewItem() {
        let value = this.el.value

        this.props.dispatch({
            type: 'ADD_ITEM',
            payload: {
                name: value
            }
        })
        this.el.value = ''

    }

    render() {
        console.log(this.props)
        return (
            <div>
                <ul>
                    <input type='text' ref={(el) => {
                        this.el = el
                    }} />
                    <button onClick={this.addNewItem}>添加</button>
                    {
                        this.props.items.map((item, index) => {
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

/**
 * connect 工厂函数，调用以后会返回一个包装组件（高阶组件）
 */
// export default Item
export default connect((state) => {
    // state 就是仓库的 state, 该函数返回一个对象，该对象会被解构复制给 props
    return {
        items: state.items
    }
})(Item)