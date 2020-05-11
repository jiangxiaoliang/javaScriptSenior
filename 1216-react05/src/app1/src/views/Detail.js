import React from 'react'

export default class Detail extends React.Component {
    render() {
         /**
         * 从动态路由 url 中拿到 :id 对应的内容
         *
         * 视图组件所需要的数据从何而来？？？？？？？？？？？？？？？？？？
         *
         *
         * - 组件的 父子通信
         * - 通过与该组件对应的 url 传递过来
         * - 通过后端获取：在组件的一些生命周期中发送请求（ajax）
         * - 通过本地存储
         * - 全局变量
         *
         * 数据通信
         *  选择何种方式
         *      -
         */

        // console.log(this.props)
        let { items, match: {params: { id } } } = this.props
        id = Number(id)
        // console.log(items, id)
        let item = items.find(item => item.id === id)
        // console.log(item)
        return (
            <div>
                <h2>商品详情-{item.name}</h2>
                <p>其他一些详情.......价格-{item.price}</p>
            </div>
        )
    }
}