import React from 'react'

export default class Drag extends React.Component {
    constructor(props) {
        super(props)
        this.elRef = React.createRef()

        this.mouseDown = this.mouseDown.bind(this)
        this.mouseUp = this.mouseUp.bind(this)
        this.startMouse = {}
        this.startEl = {
            x: 0,
            y: 0
        }
    }

    mouseDown(e) {
        console.log('down')
        let el = this.elRef.current
        this.startMouse = {
            x: e.clientX,
            y: e.clientY
        }
        this.startEl = {
            x: parseFloat(el.style.left),
            y: parseFloat(el.style.top)
        }
        document.onmousemove = this.mouseMove.bind(this)
    }
    mouseMove(e) {
        console.log('move')
        let el = this.elRef.current
        let nowMouse = {
            x: e.clientX,
            y: e.clientY
        }
        el.style.left = nowMouse.x - this.startMouse.x + this.startEl.x + 'px'
        el.style.top = nowMouse.y - this.startMouse.y + this.startEl.y + 'px'
    }
    mouseUp(e) {
        console.log('up')
        document.onmousemove = null
    }

    render() {
        return (
            <div style={{position: 'absolute', left: '0px', top:'0px'}} ref={this.elRef} onMouseDown={this.mouseDown} onMouseUp={this.mouseUp}>
                {this.props.children}
            </div>
        )
    }
}