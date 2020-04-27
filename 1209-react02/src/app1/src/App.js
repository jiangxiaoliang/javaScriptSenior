import React from 'react';
// import Test from './components/test'
// import Test1 from './components/test1'
import FriendList from './components/friendlist1'

/**
 * 我们在js中通过函数方式封装一个选项卡，然后通过调用该函数，就可以在页面中指定位置显示该选项卡，那么在js中我们称这样的一个函数为组件（它具有一定独立功能）
 * - 自定义html标签
 *    - 结构
 *    - 样式
 *    - 功能
 * 
 * 函数组件
 *  - 通过函数来封装一个组件，函数的返回值作为该组件的渲染结构
 * 类组件
 *  - 通过类封装一个组件，必须集成React.Component基类
 *  - 类中必须包含一个render()
 * 
 * 自定义组件和元素html元素
 *  - 元素组件小写
 *  - 自定义组件首字母大写
 */

let datas = {
  family: {
      title: '家人',
      list: [
          {name: '爸爸'},
          {name: '妈妈'}
      ]
  },
  friend: {
      title: '朋友',
      list: [
          {name: '张三'},
          {name: '李四'},
          {name: '王五'}
      ]
  },
  customer: {
      title: '客户',
      list: [
          {name: '阿里'},
          {name: '腾讯'},
          {name: '头条'}
      ]
  }
};

function App() {
  return (
    <div>
      <div>hello react</div>
      <hr />
      {/* {Test(datas)} */}
      {/* <Test datas={datas} v={1} name={'age'} /> */}
      {/* <Test1 /> */}

      <FriendList datas={datas} />
    </div>
  )
}

export default App;
