import React from 'react'
import List from './components/List'

/**
 * 数据可以通过 props 方式传递给子组件，但是如果嵌套层级比较多，那么数据传递就会变成灾难
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
  }
  render() {
    return (
       <div>
         <List datas={this.state.items} />
       </div>
    );
  }
}

export default App;
