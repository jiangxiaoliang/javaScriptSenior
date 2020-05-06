import React from 'react'

export default class PropsDefaultValueDemo extends React.Component {
    constructor(props) {
        super(props)
    }

    // 给props设置默认值
    static defaultProps = {
        max: 10
    }

    render() {
        // let max = this.props.max || 10
        return(
            <div>
                <h2>值-{this.props.max}</h2>
            </div>
        )
    }
}