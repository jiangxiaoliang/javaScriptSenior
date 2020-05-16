import React from 'react'
import Item from './Item'
// import store from '../store'

export default class List extends React.Component {
    render() {
        // console.log(store.getState())
        console.log(this.props)
        return (
            <div>
                <Item />
            </div>
        )
    }
}