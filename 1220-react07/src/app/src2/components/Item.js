import React from 'react'

export default class Item extends React.Component {
    render() {
        // console.log(this.props.datas)
        let items = window.localStorage.getItem('items')
        items = items && JSON.parse(items)
        console.log(items)
        return (
            <div>
                
            </div>
        )
    }
}