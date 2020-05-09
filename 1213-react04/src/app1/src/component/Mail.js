import React from 'react'
import SendList from  './SendList'
import FriendList from './FriendList'
import './css/mail.css'

export default class Mail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            friend: null
        }

        this.clickUser = this.clickUser.bind(this)
    }

    clickUser(friend) {
        this.setState({
            friend
        })
    }

    render() {
        return (
            <div>
                <div className="clear">
                    <h1>发送邮件</h1>
                    <div className="fl">
                        <SendList friend={this.state.friend} />
                    </div>
                    <div className="fr">
                        <FriendList onClickUser={this.clickUser} />
                    </div>
                </div>
            </div>
        )
    }
}