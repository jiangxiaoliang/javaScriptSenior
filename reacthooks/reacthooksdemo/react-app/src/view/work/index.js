import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Frame from '../../common/component/frame'
import Skeleton from '../../common/component/skeleton'
import Main from './main'
import '../../common/css/miiaov.css'
import getWork from '../../store/action/getWork'
import getMessageList from '../../store/action/getMessageList'
import Message from './message'

function Work(props) {
    // console.log(props)
    const {data, loadEnd, match, dispatch, user, history} = props
    const {id} = match.params
    const [showMessage, setShowMessage] = useState(false)
    // console.log(data)
    // console.log(user)
    function getMessageData() {
        return dispatch(getMessageList(id))
    }
    useEffect(() => {
        dispatch(getWork(id))
        getMessageData()
        return () => {
            dispatch({
                type: 'WORK_RESET'
            })
            dispatch({
                type: 'MESSAGE_RESET'
            })
        }
    },[])
    return (
        <div>
            <Frame refreshNow={true} pullUp={true} getData={getMessageData}>
                {!loadEnd ? <Skeleton /> : (<Main data={data}/>)}
            </Frame>
            <footer 
                className="miiapv_footer"
                onClick={() => {
                    if (user) {
                        setShowMessage(true)
                    } else {
                        history.push('/login')
                    }
                }}
            >
                回复本帖
            </footer>
            <Message 
                showMessage = {showMessage}
                id={id}
                setShowMessage={setShowMessage}
            />
        </div>
    )
}

export default connect(state => {
    return {
        ...state.work,
        user: state.login
    }
})(Work)