import React from 'react'
import Item from '../components/Item'
import Pagination from '../components/Pagination'

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sort: 'desc'
        }

        this.sort = this.sort.bind(this)
    }

    sort(e) {
        // console.log(e.target.value)
        this.setState({
            sort: e.target.value
        })
    }

    render() {
        // console.log(this.props)
        let { items, history } = this.props
        let { sort } = this.state

        // 从url上的queryString获取
        // console.log(window.location.search.substr(1))
        let queryString = window.location.search.substr(1)
        let qs = new URLSearchParams(queryString)
        sort = qs.get('sort') || 'desc'


        items = items.sort((a, b) => {
            return sort === 'desc' ? a.price - b.price : b.price - a.price
        })
        return (
            <div>
                <h2>商品列表</h2>

                <select value={sort} onChange={(e) => {
                    history.push(`/?sort=${e.target.value}`)
                }}>
                    <option value='desc'>降序</option>
                    <option value='asc'>升序</option>
                </select>

                <ul className="item-list">
                    <li className="head">
                        <span>名称</span>
                        <span>价格</span>
                    </li>
                    {/* <Item /> */}
                    { items.map(item => {
                        return <Item item={item} key={item.id} />
                    }) }
                </ul>

                <div>
                    <Pagination page={1} pages={10} />
                </div>
            </div>
        )
    }
}