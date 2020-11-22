import React from 'react'
import {Avatar, Col, List} from 'antd'
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import TopicTag from '../component/topicTag'
import FromNow from '../component/fromnow'

function TopicsList(props) {
    let {loading, data} = props
    loading = false
    data = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    return (
        <List
            className="topics_list"
            loading={loading}
            dataSource={data}
            renderItem={data => {
                let {author, last_reply_at, good, top, tab, title, id} = data;
                let avatar_url = ''
                let loginname = ''
                if (author) {
                    avatar_url = author.avatar_url
                    loginname = author.loginname
                }
                return (
                    <List.Item>
                        <Col xs={24} md={20}>
                            <Link to={`/user/jxl`}>
                                <Avatar 
                                    icon={<UserOutlined />}
                                    src={avatar_url}
                                    title={loginname}
                                />
                            </Link>
                            <TopicTag tab={top ? 'top' : (good ? 'good' : tab)}/>
                            <Link to={`/topics/${id ? id : 111}`}>{title ? title : '一些数据'}</Link>
                        </Col>
                        <Col xs={0} md={4}>
                            <FromNow date={last_reply_at} />
                        </Col>
                    </List.Item>
                )
            }}
        />
    )
}

export default TopicsList