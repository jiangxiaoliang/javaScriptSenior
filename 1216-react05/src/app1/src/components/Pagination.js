import React from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

class Pagination extends React.Component {
    static defaultProps = {
        pages: 1,
        page: 1
    }
    static propTypes = {
        pages: PropTypes.number,
        page: PropTypes.number
    }

    render() {
        let { pages, page, history: { push } } = this.props
        return (
            <div className="pagination">
                {
                    (new Array(pages)).fill('').map((item, index) => {
                        return (
                            <Link key={ ++index } className={ index=== page ? 'active' : ''} to={ '/?page=' + index }>{index}</Link>
                        )
                    })
                }
                前往
                <input type='text' className='goto' onKeyDown={(e) => {
                    if (e.target.value !== '' && e.keyCode === 13) {
                        push('/?page=' + e.target.value)
                    }
                }} />
            </div>
        )
    }
}

/**
 * 通过 withRouter 对 Pagination 进行包装，withRouter 内部会把路由有关的几个对象注入到 Pagination 组件的 props 中，并返回 Pagination
 * 高阶组件 - 高阶函数
 */
export default withRouter(Pagination)