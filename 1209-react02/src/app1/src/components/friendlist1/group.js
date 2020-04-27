import React from 'react'

export default class Group extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     expanded: false
        // }

        this.toggle = this.toggle.bind(this)
    }

    toggle(e) {
        // this.setState({
        //     expanded: !this.state.expanded
        // })

        // 子组件内部不允许直接修改父组件传入的props
        // this.props.expanded = !this.props.expanded

        if ('function' === typeof this.props.onChange) {
            this.props.onChange(this.props.index, !this.props.expanded)
        }
    }
    
    render() {
        let {expanded, data: {title, list}} = this.props
        return (
            <div className={["friend-group", expanded ? 'expanded': ''].join(' ')}>
                <dt onClick={this.toggle}>{title}</dt>
                {
                    list.map(item => {
                        return <dd key={item.name}>{item.name}</dd>
                    })
                }
            </div>
        )
    }
}

// let obj = {
//     x: 1
// }

// Object.defineProperty(obj, 'x', {
//     set() {
//         console.log('change....')
//     }
// })
// obj.x = 10

// function setVal(val) {
//     obj.x = 10
//     console.log('change....')
// }
// setVal(100)