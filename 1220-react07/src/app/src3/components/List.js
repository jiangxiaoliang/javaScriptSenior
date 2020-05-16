import React from 'react'
import Item from './Item'
import store from '../store'

export default class List extends React.Component {
    render() {
        console.log(store.getState())
        return (
            <div>
                <Item />
            </div>
        )
    }
}