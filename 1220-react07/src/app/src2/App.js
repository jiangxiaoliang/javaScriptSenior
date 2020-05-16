import React from 'react'
import List from './components/List'

/**
 * 把数据放在一个大家都很方便能访问的位置
 *  - localStorage
 *  - 后端
 * 
 * 虽然可以通过 localStorage 共享数据，但是对数据的操作还是很随意
 * 
 * - 能够共享数据
 * - 能够管理数据
 */
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: [
        {
          id: 1,
          name: 'iPhone XR',
          price: 542500
        },
        {
          id: 2,
          name: 'Apple iPad Air 3',
          price: 377700
        },
        {
          id: 3,
          name: 'Macbook Pro 15.4',
          price: 1949900
        },
        {
          id: 4,
          name: 'Apple iMac',
          price: 1629900
        },
        {
          id: 5,
          name: 'Apple Magic Mouse',
          price: 72900
        },
        {
          id: 6,
          name: 'Apple Watch Series 4',
          price: 599900
        }
      ]
    }

    window.localStorage.setItem('items', JSON.stringify(this.state.items))
  }
  render() {
    return (
       <div>
         <List />
       </div>
    );
  }
}

export default App;
