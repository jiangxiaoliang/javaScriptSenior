import React from 'react'

export default class Login extends React.Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)

        this.usernameRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    login() {
        // console.log(this.usernameRef.current, this.passwordRef.current)
        let { onLogin, history: { push } } = this.props
        if (typeof onLogin === 'function') {
            onLogin({
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            }).then((msg) => {
                alert(msg)
                push('/')
            }).catch((e) => alert(e))
        }
    }

    render() {
        return (
            <div>
                <p>
                    用户名：<input type='text' ref={this.usernameRef} />
                </p>
                <p>
                    密码：<input type='password' ref={this.passwordRef} />
                </p>
                <p>
                    <button onClick={this.login}>登陆</button>
                </p>
            </div>
        )
    }
}