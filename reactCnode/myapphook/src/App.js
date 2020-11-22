import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {route} from './router/index'
import {Layout} from 'antd'
import Header from './component/header'
import Footer from './component/footer'
import './static/css/index.css';

function App() {
  return (
    <Layout className="page">
      <Header />
      <Layout.Content>
        <div className="wrap">
          <Switch>
            {
              route.map((item,index) => {
                return (
                  <Route
                    key={index}
                    path={item.path}
                    exact={item.exact}
                    render={(props) => {
                      props.name ='jxl'
                      return item.render(props)
                    }}
                  />
                )
              })
            }
          </Switch>
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default App;
