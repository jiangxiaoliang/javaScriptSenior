import React from 'react'
import './index.css'
import Group from './group'

export default class FriendList extends React.Component {
    /**
     * 在类组件中，通过标签属性传入的数据是保存类的一个熟悉：props
     */
    // renderList() {
    //     let {datas} = this.props
    //     return Object.keys(datas).map((key, index) => {
    //         let data = datas[key]
    //         return (
    //             <div key={key} className="friend-group">
    //                 <dt>{data.title}</dt>
    //                 {
    //                     data.list.map((item, index) => {
    //                         return <dd key={item.name}>{item.name}</dd>
    //                     })
    //                 }
    //             </div>
    //         )
    //     })
    // }

    render() {
        // console.log(this.props)
        let {datas} = this.props
        return (
            <div className="friend-list">
                {/* {this.renderList()} */}
                
                {
                    Object.keys(datas).map((key) => {
                        let group = datas[key]
                        return <Group key={key} data={group}/>

                        // return (
                        //     <div key={key} className="friend-group">
                        //         <dt>{group.title}</dt>
                        //         {
                        //             group.list.map(item => {
                        //                 return <dd key={item.name}>{item.name}</dd>
                        //             })
                        //         }
                        //     </div>
                        // )
                    })
                }
            </div>
        )
    }
}