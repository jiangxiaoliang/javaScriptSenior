import React, { useEffect } from 'react'
import IndexNav from './indexNav'
import TopicsList from '../../component/topicslist'
import { useSelector } from 'react-redux'
import {useTopicsList} from '../../store/action/index'
import qs from 'qs'
import { useLocation } from 'react-router-dom'
import IndexPagination from './indexPagination'

function IndexPage(props) {
    const {data, loading} = useSelector(state => state.topics)
    let getData = useTopicsList()
    let {search} = useLocation()
    let {tab='all', page=1} = qs.parse(search.substr(1))
    useEffect(() => {
        getData(tab, page)
    }, [tab, page])
    return (
        <div>
            <IndexNav />
            <TopicsList 
                data={data}
                loading={loading}
            />
            <IndexPagination />
        </div>
    )
}

export default IndexPage