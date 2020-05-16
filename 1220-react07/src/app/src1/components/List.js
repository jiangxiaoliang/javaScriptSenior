import React from 'react'
import Item from './Item'

export default class List extends React.Component {
    render() {
        console.log(this.props.datas)
        return (
            <div>
                <Item datas={this.props.datas}/>
            </div>
        )
    }
}