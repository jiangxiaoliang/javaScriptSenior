import React, { useMemo, useState } from 'react'

export default function Memo() {
    let [name] = useState('jxl')
    let [age, setAge] = useState(10)
    // let age2 = (() => { // 每次都会执行
    //     console.log('1')
    //     return age >= 18 ? '成年' : '未成年'
    // })()
    // 在视图更新前完成比useEffect早,计算属性
    let age2 = useMemo(() => {
        console.log(1)
        return age < 18 ? '未成年' : '成年'
    }, [age < 18])
    return (<div>
        姓名: {name}<br/>
        年龄: {age}<br/>
        阶段：{age2}<br/>
        <button onClick={() => setAge(age+2)}>增加两岁</button>
    </div>)
}