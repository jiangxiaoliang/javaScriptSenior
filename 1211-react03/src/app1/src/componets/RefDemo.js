import React from 'react'

export default class RefDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            content: '开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧开课吧'
        }

        this.getHeight = this.getHeight.bind(this)
        this.refEl = null
        this.refEl2 = React.createRef()
    }

    getHeight() {
        // let p = document.querySelector('p')
        // console.log(getComputedStyle(p)['height'])

        // console.log(this.refEl.offsetHeight)

        console.log(this.refEl2.current)
    }

    render() {
        return (
             <div>
                 <button onClick={this.getHeight}>按钮</button>
                 {/* <p ref={el => {
                    //  console.log(el)
                    this.refEl = el
                 }} style={{background: 'red', color: 'white'}}>{this.state.content}</p> */}

                <p ref={this.refEl2} style={{background: 'red', color: 'white'}}>{this.state.content}</p>
             </div>
        );
    }
}