import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import '../../common/css/index.css'
import Frame from '../../common/component/frame'
import Tab from '../../common/component/tab'
import Course from './course'
import Vip from './vip'
import Spec from './spec'
import Works from './works'
import getWorks from '../../store/action/getWorks'

let imgData = [
    require('../../common/images/tab/img1.png'),
    require('../../common/images/tab/img2.png'),
    require('../../common/images/tab/img3.png'),
    require('../../common/images/tab/img4.png')
]

function Index(props) {
    // console.log(props)
    // let [page, setPage] = useState(1)
    // function imageLoad() {
    //     console.log('imageLoad')
    // }
    function getWorksData() {
        let p = props.dispatch(getWorks())
        // setPage(++page)
        return p
    }
    useEffect(() => {
        getWorksData()
    }, [])
    return (
        <Frame
            pullUp={true}
            getData={getWorksData}
        >
            <div>
                <Tab 
                    data={imgData}
                    render={(data)=>{
                        return <img src={data.default} alt=''/>
                    }}
                />
                <section className="index_content">
                    <Course />
                    <Vip />
                    <Spec />
                    <Works {...props}/>
                </section>
            </div>
        </Frame>
    )
}

export default connect((props) => {
    return {...props.works}
})(Index)