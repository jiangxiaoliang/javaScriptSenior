import React from 'react'
import {Card, List, Comment, Avatar} from 'antd'
import { UserOutlined } from '@ant-design/icons'
import {Link} from 'react-router-dom'
import FromNow from '../../component/fromnow'

export default function Replies(props) {
    const {data, loading} = props
    return (
        <Card
            title="评论列表"
            loading={loading}
            type="inner"
        >
            <List 
                dataSource={data}
                renderItem={(itemData) => {
                    let {author,content,create_at} = itemData;
                    return (
                        <List.Item>
                            <Comment
                                author ={<Link to={`/user/${author.loginname}`}>{author.loginname}</Link>}
                                avatar = {
                                <Avatar 
                                    icon={<UserOutlined />}
                                    src = {author.avatar_url}
                                    title={author.loginname} 
                                />}
                                content={<div
                                    dangerouslySetInnerHTML={{
                                        __html: content
                                    }}
                                    ></div>
                                }
                                datetime={<time>发表于： {<FromNow date={create_at}/>}</time>}
                            >
                                
                            </Comment>
                        </List.Item>
                    )
                }}
                pagination={{
                    simple:true
                }}
            />
        </Card>
    )
}