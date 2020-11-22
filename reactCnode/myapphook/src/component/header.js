import React from 'react'
import {Layout, Affix, Row, Col, Menu} from 'antd'
import { Link, useLocation } from 'react-router-dom'
import {nav} from '../router/index'

function Header() {
    const {pathname} = useLocation()
    let activeIndex = nav.findIndex(navData => navData.path === pathname)
    return (
        <Affix offsetTop={0}>
            <Layout.Header id="header">
                <div className="wrap">
                    <Row>
                        <Col xs={6} sm={4} md={2}>
                            <h1 className="logo"><Link to={'/'}>logo</Link></h1>
                        </Col>
                        <Col xs={18} sm={20} md={22}>
                            <Menu mode="horizontal" theme="dark" selectedKeys={[activeIndex+""]}>
                                {nav.map((navData, index) => {
                                    return (
                                            <Menu.Item key={index}>
                                                <Link to={navData.path}>
                                                    {navData.txt}
                                                </Link>
                                            </Menu.Item>
                                    )
                                })}
                            </Menu>
                        </Col>
                    </Row>
                </div>
            </Layout.Header>
        </Affix>
    )
}

export default Header