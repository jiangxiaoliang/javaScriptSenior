import React from 'react'
import './index.css'
import Group from './group'

export default class FriendList extends React.Component {
    constructor(props) {
        super(props)

        let len = Object.keys(this.props.datas).length
        this.state = {
            expanded: new Array(len).fill(false)
        }

        this.changeExpanded = this.changeExpanded.bind(this)
    }

    changeExpanded(index, val) {
        let expanded = this.state.expanded
        expanded.fill(false)
        expanded[index] = val
        this.setState({
            expanded
        })
    }
    
    render() {
        // console.log(this.props)
        let {datas} = this.props
        let {expanded} = this.state
        return (
            <div className="friend-list">
                {/* {this.renderList()} */}
                
                {
                    Object.keys(datas).map((key, index) => {
                        let group = datas[key]
                        return <Group key={key} data={group} expanded={expanded[index]} onChange={this.changeExpanded} index={index}/>
                    })
                }
            </div>
        )
    }
}