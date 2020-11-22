import React from 'react'
import { Menu } from 'antd'
import {indexNav} from '../../router/index'
import { Link, useLocation } from 'react-router-dom'
import {types} from '../../router/index'
import qs from 'qs'

function IndexNav() {
    const {search} = useLocation()
    const {tab} = qs.parse(search.substr(1))
    let activeIndex = tab === undefined ? 0 : (types.indexOf(tab))
    return (
        <Menu className="index_nav" mode={'horizontal'} selectedKeys={[activeIndex+'']}>
            {indexNav.map((item, index) => {
                return (
                    <Menu.Item key={index}>
                        <Link to={item.path}>
                            {item.txt}
                        </Link>
                    </Menu.Item>
                )
            })}
        </Menu>
    )
}

export default IndexNav