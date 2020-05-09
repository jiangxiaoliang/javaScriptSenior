import React from 'react'

export default class SendList extends React.Component {
    constructor(props) {
        super(props)

         /**
         * 在当前这个组件的内部会维护一个收件人的列表
         * 我们可以通过这个组件的input输入框来新增收件人
         *
         * 当前这个组件的 users 会根据传入的 props 来新增数据
         * 当前组件的 state 依赖了 props 的数据进行更新
         */
        this.state = {
            users: [
                
            ]
        }
        this.addUser = this.addUser.bind(this)
    }

    /**
     * 静态方法是属于类（构造函数的），而不是对象，所以不能在静态方法中使用 this 关键字
     */
    static getDerivedStateFromProps(props, state) {
        console.log(props, state)
        if (props.friend) {
            // 如果props传入了friend，则把传入的friend追加到 state中
            // return {
            //     users: [...state.users, props.friend]
            // }

            return {
                users: SendList.getNewUsers(props.friend, state.users)
            }
        }
        return null
    }

    addUser(e) {
        if (e.keyCode === 13) {
            // console.log(e.target.value)
            // this.setState({
            //     users: [...this.state.users, {email: e.target.value}]
            // })

            this.setState({
                users: SendList.getNewUsers({email: e.target.value}, this.state.users)
            })
            e.target.value = ''
        }
    }

    static getNewUsers(user, users) {
        console.log(user,users)
        if (users.find(u => u.email === user.email)) {
            return [...users]
        } else {
            return [...users, user]
        }
    }

    render() {
        return (
            <div>
               <div className="multi-input">
                   {
                       this.state.users.map(user => (
                           <div key={user.email}>{user.name} {user.email};</div>
                       ))
                   }
                   <div>
                       收件人：<input type='text' onKeyDown={this.addUser} />
                   </div>
               </div>
            </div>
        )
    }
}