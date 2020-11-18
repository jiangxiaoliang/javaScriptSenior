import React, { useEffect, useRef } from 'react'

export default function Article(props) {
    const {data} = props
    const wrap = useRef(null)
    useEffect(() => {
        let imgs = wrap.current.querySelectorAll('img')
        imgs.forEach(img => {
            img.onload = function() {
                window.pageScroll.refresh()
            }
        })
    }, [data])
    return (
        <article className="miiaov_article" ref={wrap}>
            <h3>
                {data.title}
            </h3>
            <div className="miiaov_txt"
                dangerouslySetInnerHTML={{
                    __html: data.content
                }}
            >
            </div>
        </article>
    )
}