import React from 'react'

export default class UnControl extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            v1: this.props.value
        }
    }
    render() {
        return (
            <div>
                我的值是：{this.state.v1}
            </div>
        )
    }
}