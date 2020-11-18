import React, { useEffect, useRef } from 'react'
import BScroll from 'better-scroll'

export default function LecturerAlert(props) {
    const {alertData, hideAlert} = props
    const wrap = useRef(null)
    let point = {}
    useEffect(() => {
        let bScroll = new BScroll(wrap.current, {
            scrollbar: true
        })
    }, [])
    return (
        <aside 
            className="elastic"
            onTouchStart={() => {
                hideAlert()
            }}
        >
            <div className="elastic_box"
                onTouchStart={(e) => {
                    e.stopPropagation()
                }}
            >
                <span 
                    className="close"
                    onTouchStart = {(e) => {
                        let touch = e.changedTouches[0]
                        point.x = touch.pageX
                        point.y = touch.pageY
                    }}
                    onTouchEnd = {(e) => {
                        let touch = e.changedTouches[0]
                        let nowPoint = {
                            x: touch.pageX,
                            y: touch.pageY
                        }
                        // console.log(point, nowPoint)
                        if ((Math.abs(nowPoint.x - point.x) < 5) && 
                            (Math.abs(nowPoint.y - point.y) <5)) {
                            hideAlert()
                        }
                    }}
                >关闭</span>
                <div className="elastic_img">
                    <img src={alertData.icon} alt="" />
                </div>
                <div className="elastic_txt">
                    <h3>{alertData.title}-妙味课堂 全职讲师</h3>
                    <div className="elastic_content" ref={wrap}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: alertData.content
                            }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}