import React from 'react'
import { useLocation } from 'react-router-dom'
import qs from 'qs'
import { Pagination } from 'antd'
import {Link} from 'react-router-dom'

export default function IndexPagination() {
    let {search} = useLocation()
    let {tab='all', page=1} = qs.parse(search.substr(1))
    return (
        <div className="index-pagination">
            <Pagination
                current={page-0}
                defaultPageSize={20}
                total={1000}
                showSizeChanger={false}
                itemRender={(page, type) => {
                    // console.log(page,type)
                    switch(type){
                        case "page":
                            return <Link to={`/?tab=${tab}&page=${page}`}>{page}</Link>
                        case "prev":
                            return <Link to={`/?tab=${tab}&page=${page}`}>{"<"}</Link>
                        case "next":
                            return <Link to={`/?tab=${tab}&page=${page}`}>{">"}</Link>
                        default:
                            return <Link to={`/?tab=${tab}&page=${page}`}>{"…"}</Link>
                    }
                }}
            />
        </div>
    )
}