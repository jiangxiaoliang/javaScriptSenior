import React from 'react'
import Item from './Item'

export default class List extends React.Component {
    render() {
        // console.log(this.props.datas)
        let items = window.localStorage.getItem('items')
        items = items && JSON.parse(items)
        console.log(items)
        return (
            <div>
                <Item />
            </div>
        )
    }
}