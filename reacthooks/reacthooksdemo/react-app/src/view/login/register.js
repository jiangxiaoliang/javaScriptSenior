import React, { useState } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import register from '../../store/action/register'

function RegisterBox(props) {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [vscode, setVscode] = useState('')
    const [vscodeShow, setVscodeShow] = useState(false)
    const [vscodeSrc, setVscodeSrc] = useState('/miaov/user/verify?' + Date.now())
    const {setDeg} = props
    function toLogin() {
        props.dispatch(register({
            verify: vscode,
            username: user,
            password,
            repassword
        })).then(res => {
            alert(res.msg)
            console.log(res)
            setTimeout(() => {
                if (res.code === 0) {
                    setDeg(0)
                }
                setVscodeSrc('/miaov/user/verify?' + Date.now())
            }, 200)
        })
    }
    return (
        <div className="register_box">
            <h3>注册账号</h3>
            <div className="register_form">
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
                <p>
                    <input 
                        type="password" 
                        placeholder="请确认密码" 
                        value={repassword}
                        onChange={e => {
                            setRepassword(e.target.value)
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
                >注册</button>
                <p className="form_tip">已有账号？<a onClick={() => {
                    setDeg(0)
                }}>立即登陆</a></p>
            </div>
        </div>
    )
}

export default connect(res => res)(withRouter(RegisterBox))