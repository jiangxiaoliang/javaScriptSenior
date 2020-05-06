import React from 'react'

export default class FormDemo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            v1: 1,
            v2: '',
            v3: 'css',
            v4: ['html', 'javascript'],
            v5: '女',
            v6: ['前端', '后端']
        }
        this.changeV1 = this.changeV1.bind(this)
        this.changeV2 = this.changeV2.bind(this)
        this.changeV3 = this.changeV3.bind(this)
        this.changeV4 = this.changeV4.bind(this)
        this.changeValue5 = this.changeValue5.bind(this)
        this.changeValue6 = this.changeValue6.bind(this)
    }

    changeV1(e) {
        console.log(`......${e.target.value}`)
        this.setState({
            v1: e.target.value
        })
    }
    changeV2(e) {
        console.log(`v2....${e.target.value}`)
        this.setState({
            v2: e.target.value
        })
    }
    changeV3(e) {
        console.log(`v3...${e.target.value}`)
        this.setState({
            v3: e.target.value
        })
    }
    changeV4(e) {
        console.log(`v4....${e.target.options}`)
        // console.log([...e.target.options])
        this.setState({
            v4: [...e.target.options].filter(o=>o.selected).map(o=>o.value)
        })
    }
    changeValue5(e) {
        console.log(`v5....${e.target.value}`)
        this.setState({
            v5: e.target.value
        })
    }
    changeValue6(e) {
        console.log(`v6 ...${e.target.value}`)
        let {v6} = this.state
        if (v6.includes(e.target.value)) {
            v6 = v6.filter(v => v!==e.target.value)
        } else {
            v6.push(e.target.value)
        }
        this.setState({
            v6
        })
    }

    render() {
        return (
            <div>
                <h2>表单</h2>
                <hr />

                <input type='text' value={this.state.v1} onChange={this.changeV1} />
                {this.state.v1}
                <button onClick={() => {
                    this.setState({
                        v1: this.state.v1 + 1
                    })
                }}>按钮</button>
                <hr />

                <textarea value={this.state.v2} onChange={this.changeV2} cols='30' rows='10' />
                <hr />

                <select value={this.state.v3} onChange={this.changeV3}>
                    <option value='html'>html</option>
                    <option value='css'>css</option>
                    <option value='javascript'>javascript</option>
                </select>
                <hr />

                <select value={this.state.v4} onChange={this.changeV4} multiple>
                    <option value='html'>html</option>
                    <option value='css'>css</option>
                    <option value='javascript'>javascript</option>
                </select>
                <hr />

                <label><input name="gender" type="radio" value="男" checked={this.state.v5==='男'} onChange={this.changeValue5} />男</label>
                <label><input name="gender" type="radio" value="女" checked={this.state.v5==='女'} onChange={this.changeValue5} />女</label>

                <label><input name="interest" type="checkbox" value="前端" checked={this.state.v6.includes('前端')} onChange={this.changeValue6} />前端</label>
                <label><input name="interest" type="checkbox" value="后端" checked={this.state.v6.includes('后端')} onChange={this.changeValue6} />后端</label>
            </div>
        )
    }
}