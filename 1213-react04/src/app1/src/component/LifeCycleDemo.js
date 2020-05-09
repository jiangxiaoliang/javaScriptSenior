import React from 'react'

export default class LifeCycleDemo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            a: 1
        }
        console.log('组件初始化->constructor')
    }

    /**
     * 渲染函数会在组件自身的state变化的时候，父组件更新的时候更新
     */
    render() {
        console.log('组件开始渲染->render')
        return (
            <div>
                <h2>生命周期</h2>
                <button onClick = {() => {
                    this.setState({
                        a: this.state.a + 1
                    })
                }}>子组件</button>
                <p>state:{this.state.a}</p>
                <p>props:{this.props.val}</p>
            </div>
        )
    }

    /**
     * 组件的数据来源：
     *  - 传入的props
     *  - 内部的state
     * 
     * 当一个组件拥有一个自己的状态(state),同时这个状态有依赖 props 变化时
     */
    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps', props, state)
        return null
    }

    componentDidMount() {
        console.log('componentDidMount')
    }
}