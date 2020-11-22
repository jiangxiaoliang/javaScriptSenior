import React, { useEffect, Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {useTopic} from '../../store/action/index'
import {Alert} from 'antd'
import Detail from './detail'
import Relies from './replies'

function TopicPage(props) {
    let {id} = useParams()
    let getData = useTopic()
    let {loading, data, isError, err_msg} = useSelector(state => state.topic)
    let history = useHistory()
    useEffect(() => {
        getData(id)
    }, [id])
    return (
        <div id="topic">
            {isError ? <Alert 
                closable
                message={'请求出错'}
                type="error"
                description={
                    <Fragment>
                        <p>{err_msg}</p>
                        <p>点击关闭按钮返回上一步</p>
                    </Fragment>
                }
                afterClose={() => {
                    history.goBack()
                }}
            /> : (<Fragment>
                <Detail loading={loading} data={data} />
                <Relies loading={loading} data={data.replies}/>
            </Fragment>)}
        </div>
    )
}

export default TopicPage