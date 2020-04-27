import React from 'react'

/**
 * react组件中的事情
 *  - 事件是通过jsx标签上的行间事件属性来绑定的
 *      - 事件名称采用小驼峰：onMouseOver
 *      - 事件绑定函数可以直接写在行间，也可以写在其他方法中
 *  - 事件中的this
 *      - 默认情况下，事件绑定函数中this为undefined,需要根据实际使用情况来手动处理
 *  - 事件对象
 *      - 事件函数第一参数就是事件对象
 */
export default class Group extends React.Component {
    constructor(props) {
        super(props)

        /**
         * state初始化工作需要在构造函数中进行
         * 构造函数其实就是组件最开始执行的函数
         */
        this.state = {
            expanded: false
        }

        this.toggle = this.toggle.bind(this)
    }

    toggle(e) {
        // console.log('你点到我了')
        // console.log(this)
        // console.log(e.target)

        // this.state.expanded = !this.state.expanded
        // console.log(this.state.expanded)

        /**
         * state 中的值不能直接去改变
         * react 并没有主动去监听拦截数据的变化，如果直接修改state中的值是不会出发视图重新渲染
         * 它提供的方法：setState来修改state中的值，且在方法中去调用render
         */
        this.setState({
            expanded: !this.state.expanded
        })
        // 不是立即生效的
        // console.log(this.state.expanded)

        // Object.assign(this.state, {expanded: !this.state.expanded})
    }
    
    render() {
        let {title, list} = this.props.data
        let {expanded} = this.state
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