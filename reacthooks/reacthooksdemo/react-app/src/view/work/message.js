import React, { useState } from 'react'
import {connect} from 'react-redux'
import putMessage from '../../store/action/putMessage'

function Message(props) {
    const {showMessage, dispatch, id, setShowMessage, login} = props
    // console.log(props)
    let [info, setInfo] = useState('')
    let [put, setPut] = useState(false)
    return (
        <div className="message_wrap"
            style={{
                transform: `translateY(${showMessage ? 0 : '100%'})`
            }}
        >
            <textarea 
                value={info}
                onChange={(e) => {
                    setInfo(e.target.value)
                }}
            ></textarea>
            {put ? 
                <footer className="miiapv_footer put">评论提交中.....</footer> : 
                <footer className="miiapv_footer"
                    onClick={() => {
                        setPut(true)
                        if (!info.trim()) {
                            return
                        }
                        dispatch(putMessage({
                            article_id: id,
                            content: info
                        })).then(res => {
                            setInfo('')
                            setPut(false)
                            setShowMessage(false)
                            dispatch({
                                type: 'MESSAGE_ADD',
                                messageList: {
                                    content: info,
                                    create_time: Date.now(),
                                    username: login
                                }
                            })
                        })
                    }}
                >发表评论</footer>
            }
        </div>
    )
}

export default connect(state => state)(Message)