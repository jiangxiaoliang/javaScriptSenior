import React from 'react';
// import FormDemo from './componets/FormDemo'
// import UnControl from './componets/UnControl'
// import RefDemo from './componets/RefDemo'
// import PropsDefaultValueDemo from './componets/PropsDefaultValueDemo'
// import PropsTypeDemo from './componets/PropsTypeDemo'
// import ChildDemo from './componets/ChildDemo'
import Drag from './componets/Drag'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      v1: 1,
      divStyle: {
        width: '100px',
        height: '100px',
        background: 'red',
        position: 'absolute'
      }
    }
    this.elRef = React.createRef()
  }

  render() {
    return (
      <div className="App">
        {/* <FormDemo /> */}

        {/* <UnControl value={this.state.v1} /> */}

        {/* <RefDemo /> */}

        {/* <PropsDefaultValueDemo /> */}

        {/* <PropsTypeDemo max={1000}/> */}

        {/* <ChildDemo title={'这是自定义标题'}>
          <form>
            用户名:<input type='text' /><br/>
            密码:<input type='password' />
          </form>
        </ChildDemo> */}

        <Drag>
          <div ref={this.elRef} style={this.state.divStyle}>
          </div>
        </Drag>
      </div>
    );
  }
}

export default App;
