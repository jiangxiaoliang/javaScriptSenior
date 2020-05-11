import React from 'react';
import { Route, Link, NavLink, Switch, Redirect } from 'react-router-dom';
import Home from './views/Home'
import About from './views/About'
import Detail from './views/Detail'
import NotFound from './views/NotFound'
import './css/css.css'
import Login from './views/Login';
import Cart from './views/Cart';

/**
 * 页面-组件
 * 根据url的变化，应用中指定位置渲染不同的组件，从而显示不同的内容
 * 
 * 组件
 *  - 页面组件（视图组件），一个页面组件一般对应一个完整的页面（完整：一个url所表示的页面）
 *  - 功能组件（具有一定功能，一般情况下又不是一个完整的页面，轮播图，对话框等）
 *    - 带视图的功能组件（轮播图）
 *    - 不带视图的功能组件（数据过滤，请求-容器，错误捕获）
 *  - 容器组件
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
      ],
      users: [
        {
          id: 1,
          username: 'baoge',
          password: '123'
        },
        {
          id: 2,
          username: 'MT',
          password: '123'
        },
        {
          id: 3,
          username: 'dahai',
          password: '123'
        },
        {
          id: 4,
          username: 'zMouse',
          password: '123'
        },
        {
          id: 5,
          username: 'jxl',
          password: '123'
        }
      ],
      userInfo: {
        id: 0,
        username: ''
      }
    }
  }

  login({username, password}) {
    return new Promise((resolve, reject) => {
      if (!username || !password) {
        reject('请输入用户名或者密码')
      }
      let user = this.state.users.find(user => user.username === username && user.password === password)
      if (!user) {
        reject('用户名或者密码错')
      }
      this.setState({
        userInfo: {
          id: user.id,
          username: user.username
        }
      })
      resolve('登录成功')
    })
  }

  render() {
    // console.log(window.location)
    // const hash = window.location.hash || '#home'
    // console.log(hash)
    return (
      <div className="App">
        <h1>React路由</h1>
        <nav>
          {/* <a href='/'>首页</a> */}
          {/* <Link to='/'>首页</Link> */}
          <NavLink to='/' exact activeStyle={{color:'red'}} isActive={(match, location) => {
            // console.log(match, location)
            return match || location.pathname.startsWith('/detail')
          }}>首页</NavLink>
          <span>|</span>
          {/* <a href='/about'>关于我们</a> */}
          {/* <Link to='/about'>关于我们</Link> */}
          <NavLink to='/about' activeStyle={{color: 'red'}}>关于我们</NavLink>
          <span>|</span>
          {
            this.state.userInfo.id > 0 ? (
              <span>{this.state.userInfo.username}</span>
            ) : (
              <NavLink to='/login' activeStyle={{color: 'red'}}>登录</NavLink>
            )
          }
          <span>|</span>
          <NavLink to='/cart' activeStyle={{color: 'red'}}>购物车</NavLink>
        </nav>
        <hr />
        {/* <input type='text' /> */}

        {/* { hash === '#home' && <Home /> }
        { hash === '#about' && <About /> } */}

        {/*
          用来配置 url 与 组件的映射关系，什么url与什么组件显示在页面的什么位置
          <Route />所在的位置就是满足要求以后组件渲染对应的位置
        */}

        {/* 下面这种方式是传参给Rotue,而不是Home */}
        {/* <Route path='/' component={Home} exact items={this.state.items}/> */}

        {/*
          传递 props 给 component 制定的组件：
          Route 还提供一个 render 属性，传入一个函数，函数的返回值就等同于component制定组件渲染结果
        */}
        {/* <Route path ='/' exact items={this.state.items} render={() => {
          return <div>我是render出来的</div>
        }} /> */}
        <Switch>
          {/* <Route component={NotFound} /> */}
          <Route path='/' exact render={(props) => {
            return <Home {...props} items={this.state.items} />
          }} />

          {/* 如果组件是页面组件，那么这个两个不同的页面组件之间的数据传递就不要通过 传统组件父子通信来做，数据要通过页面（路由等方式来进行传递） */}
          {/* <Route path='/detail' component={Detail} /> */}

          {/* <Route path='/detail/:id' component={Detail} /> */}

          {/* 
            下面路由是动态的，后面 id 表示动态部分匹配到内容
            当下 /detail/xx 才能匹配到内容
            
            如果一个组件是路由组件（路由直接绑定并访问的组件），那么该组件就不会自动注入
            - history: 同histroy api
            - match: 当前访问的路由信息
            - location: 等同原生的location

            Detail 不在是路由组件了，那么也就表示 Route 注入的 路由相关信息就没有了
            如果使用了 render 函数，那么路由注入的 history、match 等对象都作为参数传递给了render函数了
            render 其实就是一个函数式的组件
          */}

          <Route path='/detail/:id' render={(props) => {
            // console.log(props)
            // <Detail match={props.match} history={props.history} location={props.location} />
            return <Detail {...props} items={this.state.items} />
          }} />

          <Route path='/about' component={About} />

          <Route path='/login' render={(props) => {
            return <Login {...props} onLogin={this.login.bind(this)} />
          }} />

          <Route path='/cart' render={() => {
            if (this.state.userInfo.id > 0) {
              return <Cart />
            } else {
              return <Redirect to='/login' />
            }
          }} />
          
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default App;
