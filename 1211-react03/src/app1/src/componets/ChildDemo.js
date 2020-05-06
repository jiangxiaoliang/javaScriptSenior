import React from 'react'
import './css/dialog.css'

export default class ChildDemo extends React.Component {
    static defaultProps = {
        title: '默认标题',
        content: '默认内容'
    }

    render() {
        console.log(this.props)
        return (
            <div className="dialog">
                <i className="dialog_close_btn"></i>
                <div className="dialog_header">
                    <span className="dialog_title">{this.props.title}</span>
                </div>
                <div className="dialog_content">{this.props.children ? this.props.children : this.props.content}</div>
            </div>
        )
    }
}