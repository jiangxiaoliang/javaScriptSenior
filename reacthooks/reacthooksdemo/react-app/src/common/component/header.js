import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {useBack} from '../../common/hook/index'
import isLogin from '../../store/action/isLogin'
import logout from '../../store/action/logout'

function Header(props) {
    const path = props.location.pathname
    const back = useBack(props.history)
    const {user, changeShowMenu} = props
    const [isBackBtnShow, setIsBackBtnShow] = useState(false)
    useEffect(() => {
        props.dispatch(isLogin())
    })
    function getUser() {
        if (path === '/login') {
            return ''
        }
        if (user) {
            return (
                <span className="header-btn-right">
                    <span 
                        className="header-user"
                        onClick={() => {
                            setIsBackBtnShow(!isBackBtnShow)
                        }}
                    >{user}</span>
                    <span 
                        className="header-logout-btn"
                        style={{
                            display: isBackBtnShow ? 'block' : 'none'
                        }}
                        onClick={() => {
                            props.dispatch(logout())
                        }}
                    >
                        退出
                    </span>
                </span>
            )
        }
        return <Link className="user" to="/login" />
    }
    return (
        <header id="header">
            <nav className="menu">
                {path === '/login' ? 
                    <a className="header-btn-left iconfont icon-back"
                        href="/#"
                        onClick={() => {
                            back()
                        }}
                    >
                    </a> : <a
                        className="header-btn-left iconfont icon-hycaidan" 
                        onClick={changeShowMenu}
                    >
                    </a>
                    }
            </nav>
            <h1 className="logo">miaov.com</h1>
            {getUser()}
        </header>
    )
}

export default connect(state => {
    // console.log(state.login)
    return {user: state.login}
})(withRouter(Header))