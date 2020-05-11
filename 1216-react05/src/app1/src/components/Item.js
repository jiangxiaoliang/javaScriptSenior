import React from 'react'
import { Link } from 'react-router-dom'

export default class Item extends React.Component {
    render() {
        const { item } = this.props
        return (
            <li>
                <span>
                    <Link to={'/detail/' + item.id}>{item.name}</Link>
                </span>
                <span>￥ {(item.price / 100).toFixed(2)}</span>
            </li>
    )
    }
}