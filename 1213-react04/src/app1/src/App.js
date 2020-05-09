import React from 'react';
import LifeCycleDemo from './component/LifeCycleDemo'
import Mail from './component/Mail'
import ErrorDemo from './component/ErrorDemo'
import ErrorBoundary from './component/ErrorBoundary'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pVal: 1,
      pVal2: 1
    }
  }
  render() {
    return (
      <div className="App">
        <button onClick={() => {
          this.setState({
            pVal: this.state.pVal + 1
          })
        }}>父组件</button>
        <LifeCycleDemo val={this.state.pVal}/>

        <hr />
        <Mail />

        <hr />
        <ErrorBoundary>
          <ErrorDemo />
        </ErrorBoundary>
      </div>
    );
  }
}
export default App;
