import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Item extends React.Component {
    constructor(props) {
        super(props)

        this.el = null
        this.addNewItem = this.addNewItem.bind(this)
    }

    addNewItem() {
    }

    async componentDidMount() {
        // 正向代理、反向代理
        // 角色：请求者 代理者 目标
        // 正向代理：请求者&代理者在同一个域   目标
        // 反向代理：请求者      代理者&目标
        // /api/items => http://localhost:3000/api/items => http://localhost:7777/api/items
        // let res = await axios({
        //     // url: 'http://localhost:8000/api/items'
        //     url: '/api/items'
        // })
        // // console.log(res)

        // this.props.dispatch({
        //     type: 'UPDATE_ITEM',
        //     payload: {
        //         items: res.data
        //     }
        // })

        async function updateAction(dispatch) {
            // return new Promise((resolve, reject) => {
            //     setTimeout(() => {
            //         resolve({
            //             type: 'UPDATE_ITEM',
            //             payload: {
            //                 items: []
            //             }
            //         })
            //     })
            // })

            let res = await axios({
                url: '/api/items'
            })

            dispatch({
                type: 'UPDATE_ITEM',
                payload: {
                    items: res.data
                }
            })
        }

        this.props.dispatch(updateAction)
    }

    render() {
        // console.log(this.props)
        return (
            <div>
                <ul>
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