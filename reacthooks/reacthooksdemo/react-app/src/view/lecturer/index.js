import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import Frame from '../../common/component/frame'
import LecturersTab from './lecturersTab'
import Join from './join'
import Footer from './footer'
import LecturerAlert from './lecturerAlert'
import getLecturers from '../../store/action/getLecturers'
import '../../common/css/teacher.css'

function Lecturer(props) {
    // console.log(props)
    const {data, dispatch} = props
    let newData = []
    const [show, setShow] = useState(false)
    const [alertData, setAlertData] = useState(null)
    function showAlert(data) {
        setAlertData(data)
        setShow(true)
    }
    function hideAlert() {
        setShow(false)
    }
    for (let i = 0; i < data.length; i+=3) {
        let newArr = []
        let end = i + 3
        end = end > data.length ? data.length : end
        for(let j = i; j < end; j++) {
            newArr.push(data[j])
        }
        newData.push(newArr)
    }
    useEffect(() => {
        dispatch(getLecturers())
    }, [])
    return (
        <div>
            <Frame refreshNow={true}>
                <div className="teacher_banner">
                    <h2><span>妙味团队</span></h2>
                    <LecturersTab 
                        data={data}
                        newData={newData}
                        showAlert={showAlert}
                    />
                </div>
                <Join />
                <Footer />
            </Frame>
            {
                show ? <LecturerAlert 
                    alertData={alertData}
                    hideAlert={hideAlert}
                /> : ''
            }
        </div>
    )
}

export default connect(state => {
    return state.lecturers
})(Lecturer)