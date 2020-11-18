import {BrowserRouter} from 'react-router-dom'
import IndexRoute from './router/index'
// import Frame from './common/component/frame'

function App() {
  return (
    <BrowserRouter>
      {/* <Frame> */}
        <IndexRoute />
      {/* </Frame> */}
    </BrowserRouter>
  );
}

export default App;
