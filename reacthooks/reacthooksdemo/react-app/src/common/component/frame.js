import React, { useEffect, useRef, useState } from 'react'
import BScroll from 'better-scroll'
import Header from './header'
import Menu from './menus'
import {useInnerHeight} from '../hook/index'
import '../css/reset.css'
import '../css/common.css'

export default function Frame(props) {
    const [showMenu, setShowMenu] = useState(false)
    const innerH = useInnerHeight()
    const wrap = useRef(null)
    const {pullUp, getData, refreshNow} = props
    useEffect(() => {
        window.pageScroll = new BScroll(wrap.current, {
            preventDefaultException: {
                tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|AUDIO|A|IMG)$/,
                className: /(^|\s)work_a(\s|$)/
            },
            pullUpLoad: pullUp ? { threshold: 200 } : false
        })
        if (pullUp) {
            window.pageScroll.on('pullingUp', () => {
                console.log('上滑加载更多')
                getData().then(res => {
                    if (res) {
                        window.pageScroll.finishPullUp()
                        window.pageScroll.refresh()
                    } else {
                        window.pageScroll.closePullUp()
                    }
                })
            })
        }
        // if (refreshNow) {
        //     window.pageScroll.refresh()
        // }
        return () => {
            window.pageScroll = null
        }
    }, [])
    function changeShowMenu() {
        setShowMenu(!showMenu)
    }
    function menuHide() {
        setShowMenu(false)
    }
    return (
        <div>
            <Header changeShowMenu={changeShowMenu}/>
            <Menu 
                menuHide={menuHide}
            />
            <div 
                id="main"
                style={{
                    transform: `translateX(${showMenu ? 4.5 : 0}rem)`,
                    height: innerH
                }}
                onTouchStart={menuHide}
            >
                <div className="pageWrap" ref={wrap}>
                    <div>
                        {props.children}
                    </div>
                </div>
                
            </div>
        </div>
    )
}