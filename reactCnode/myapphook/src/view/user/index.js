import React, { useEffect } from 'react'
import {Card, Avatar} from 'antd'
import { useParams } from 'react-router-dom'
import {useUser} from '../../store/action/index'
import { useSelector } from 'react-redux'
import TopicsList from '../../component/topicslist'
import FromNow from '../../component/fromnow'
import { UserOutlined } from '@ant-design/icons';

function UserPage() {
    const {loginname} = useParams()
    const getData = useUser()
    const {data, loading} = useSelector(state => state.user)
    let {recent_topics=[],recent_replies=[],avatar_url,create_at,githubUsername,score} = data;
    useEffect(() => {
        getData(loginname)
    }, [loginname])
    return (
        <div className="user_page">
            <Card
                loading={loading}
                className="user_detail"
            >
                <Avatar 
                    size={80} 
                    icon={<UserOutlined />} 
                    src={avatar_url}
                />
                <p style={{
                    marginTop: 20
                }}>用户名：{loginname}　注册时间：{<FromNow date={create_at} />}　积分：{score}</p>
                <p>github：<a href={`https://github.com/${githubUsername}`} target="_blank">https://github.com/{githubUsername}</a></p>
            </Card>
            <Card
                loading={loading}
                title={'最近创建的话题'}
                type={"inner"}
            >
                <TopicsList loading={loading} data={recent_topics} />
            </Card>
            <Card
                loading={loading}
                title={'最近参与的话题'}
                type={"inner"}
            >
                <TopicsList loading={loading} data={recent_replies} />
            </Card>
        </div>
    )
}

export default UserPage