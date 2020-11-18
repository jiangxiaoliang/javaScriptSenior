import React, { useState } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import login from '../../store/action/login'
import userImage from '../../common/images/user_img.png'
import {useBack} from '../../common/hook/index'

function LoginBox(props) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [vscode, setVscode] = useState('')
    const [vscodeShow, setVscodeShow] = useState(false)
    const [vscodeSrc, setVscodeSrc] = useState('/miaov/user/verify?' + Date.now())
    const back = useBack(props.history)
    const {setDeg} = props
    function toLogin() {
        props.dispatch(login({
            verify: vscode,
            username: user,
            password
        })).then(res => {
            alert(res.msg)
            setTimeout(() => {
                if (res.code !== 0) {
                    setVscodeSrc('/miaov/user/verify?' + Date.now())
                } else {
                    back()
                }
            }, 200)
        })
    }
    return (
        <div className="login_box">
            <figure className="user_img">
                <img src={userImage} alt="" />
                <figcaption>如有账号，请直接登陆</figcaption>
            </figure>
            <div className="login_form">
                <p>
                    <input 
                        type="text" 
                        placeholder="用户名" 
                        value={user}
                        onChange={e => {
                            setUser(e.target.value)
                        }}    
                    />
                </p>
                <p>
                    <input 
                        type="password" 
                        placeholder="请输入密码" 
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                </p>
                <p className="clearfix">
                   <input 
                        type="text" 
                        placeholder="验证码" 
                        value={vscode}
                        onChange={e => {
                            setVscode(e.target.value)
                        }}
                        onFocus={() => {
                            setVscodeShow(true)
                        }}
                        className="verifyCode"
                    />
                    {vscodeShow ? 
                        <img 
                            className="verify" 
                            src={vscodeSrc} 
                            alt=''
                            onClick={() => {
                                setVscodeSrc('/miaov/user/verify?' + Date.now())
                            }}
                        /> : ''
                    }
                </p>
                <button 
                    className="form_btn"
                    onClick={() => {
                        toLogin()
                    }}
                >登录</button>
                <p className="form_tip">没有账号？<a onClick={() => {
                    setDeg(180)
                }}>立即注册</a></p>
            </div>
        </div>
    )
}

export default connect(res => res)(withRouter(LoginBox))