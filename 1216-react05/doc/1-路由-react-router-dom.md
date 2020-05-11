# React.js - 路由

[TOC]

## 路由

当应用变得复杂的时候，就需要分块的进行处理和展示，传统模式下，我们是把整个应用分成了多个页面，然后通过 <u>URL</u> 进行连接。但是这种方式也有一些问题，每次切换页面都需要重新发送所有请求和渲染整个页面，不止性能上会有影响，同时也会导致整个 <u>JavaScript</u> 重新执行，丢失状态。

### SPA

<u>Single Page Application</u> : 单页面应用，整个应用只加载一个页面（入口页面），后续在与用户的交互过程中，通过 <u>DOM</u> 操作在这个单页上动态生成结构和内容

**优点：**

- 有更好的用户体验（减少请求和渲染和页面跳转产生的等待与空白），页面切换快
- 重前端，数据和页面内容由异步请求（AJAX）+ DOM 操作来完成，前端处理更多的业务逻辑

**缺点：**

- 首屏处理慢

- 不利于 <u>SEO</u>

### <u>SPA</u> 的页面切换机制

虽然 <u>SPA</u> 的内容都是在一个页面通过 <u>JavaScript</u> 动态处理的，但是还是需要根据需求在不同的情况下分内容展示，如果仅仅只是依靠 <u>JavaScript</u> 内部机制去判断，逻辑会变得过于复杂，通过把 <u>JavaScript</u> 与 <u>URL</u> 进行结合的方式： <u>JavaScript</u> 根据 <u>URL</u>  的变化，来处理不同的逻辑，交互过程中只需要改变 <u>URL</u> 即可。这样把不同 <u>URL</u> 与 <u>JavaScript</u> 对应的逻辑进行关联的方式就是路由，其本质上与后端路由的思想是一样的。

### 后端路由与前端路由

后端路由与前端路由在本质上是类似的，都是把不同的 <u>URL</u> 与某个操作进行关联绑定，得到不一样的结果

#### 后端路由

通过 <u>HTTP</u> 把请求发送到后端服务器，后端服务器接收到请求以后根据不同的请求 <u>URL</u> 来执行不同的操作，返回处理好的数据（JSON、HTML、JS 代码、CSS、图像……）

- 需要发送 <u>HTTP</u> 请求
- 业务逻辑由后端处理，返回处理后的结果给前端（浏览器）

#### 前端路由

前端路由只是改变了 <u>URL</u> 或 <u>URL</u> 中的某一部分，但一定不会直接发送请求，可以认为仅仅只是改变了浏览器地址栏上的 <u>URL</u> 而已，<u>JavaScript</u> 通过各种手段处理这种 <u>URL</u> 的变化，然后通过 <u>DOM</u> 操作动态的改变当前页面的结构

- <u>URL</u> 的变化不会直接发送 <u>HTTP</u> 请求
- 业务逻辑由前端 <u>JavaScript</u> 来完成

目前前端路由主要的模式：

- 基于 <u>URL Hash</u> 的路由
- 基于 <u>HTML5 History API</u> 的路由

##### URL Hash

通过修改 <u>URL</u> 的 <u>Hash</u> 值来改变 <u>URL</u>，<u>Hash</u> 的变化是不会发送请求的，同时 <u>JavaScript</u> 通过监听 <u>hashchange</u> 事件来动态处理逻辑和页面渲染

**优点**

兼容性好

**缺点**

<u>URL</u> 不美观，<u>SEO</u> 不友好

##### HTML5 History API

封装一个函数，该函数通过 <u>HTML5 History</u> 提供的 <u>API</u> 来动态改变 <u>URL</u> ，这种方式也不会发送请求，然后同时根据要改变的目标 <u>URL</u> 来处理逻辑和页面渲染

> <u>URL Hash</u> 模式类似 <u>Vue</u> 中的数据拦截机制
>
> <u>HTML5 History API</u> 模式类似 <u>React.js</u> 中的 <u>setState</u>

### React.js 中的路由

<u>React.js</u> 路由的基本思想就是，把不同的 <u>URL</u> 与 指定的某些 <u>React.js</u> 组件进行关联，不同的 <u>URL</u> 渲染显示不同的组件，其它框架（如：vue、angular） 都是一样的思想



## React Router

理解了路由基本机制以后，也不需要重复造轮子，我们可以直接使用 <u>React Router</u> 库

https://reacttraining.com/react-router/

<u>React Router</u> 提供了多种不同环境下的路由库

- web
- native

### 基于 <u>Web</u> 的 <u>React Router</u>

基于 <u>web</u> 的 <u>React Router</u> 为：<u>react-router-dom</u>

#### 安装

```bash
npm i -S react-router-dom
```

#### 概览

<u>react-router-dom</u> 的核心是组件，它提供了一系列的组件，如：

- <u>Router</u> 组件
- <u>BrowserRouter</u> 组件
- <u>HashRouter</u> 组件
- <u>Route</u> 组件
- <u>Link</u> 组件
- <u>NavLink</u> 组件
- <u>Switch</u> 组件
- <u>Redirect</u> 组件

以及其它一些 <u>API</u>，来完成路由的功能



## 基础

### 应用场景（一）

假设当前应用有两个页面，对应的 <u>URL</u> 与 页面关系

```
/				:	首页
/about	:	关于我们
```

#### <u>Router</u> 组件

如果我们希望页面中某个部分的内容需要根据 <u>URL</u> 来动态显示，需要用到 <u>Router</u> 组件 ，该组件是一个容器组件，只需要用它包裹 <u>URL</u> 对应的根组件即可

<u>react-router-dom</u> 为我们提供了几个基于不同模式的 <u>router</u> 子组件

- <u>BrowserRouter</u> 组件
- <u>HashRouter</u> 组件
- <u>MemoryRouter</u> 组件
- <u>NativeRouter</u> 组件
- <u>StaticRouter</u> 组件

##### <u>BrowserRouter</u> 组件

基于 <u>HTML5 History API</u> 的路由组件

##### <u>HashRouter</u> 组件

基于 <u>URL Hash</u> 的路由组件

**css**

```css
ul {
    margin: 0;
    padding: 0;
}

li {
    list-style: none;
}

.item-list li {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px dotted #333;
}
.item-list li.head {
    font-weight: bold;
}
.item-list li span {
    min-width: 200px;
}

.pagination {
    margin: 10px;
}
.pagination a {
    margin: 0 5px;
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #f4f4f5;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    color: #606266;
    text-decoration: none;
}
.pagination a:hover {
    color: #409eff;
}
.pagination a.active {
    background-color: #409eff;
    color: #fff;
    cursor: text;
}
.pagination .goto {
    margin: 0 5px;
    box-sizing: border-box;
    width: 80px;
    height: 30px;
    border: 1px solid #dcdfe6;
    outline: none;
    text-align: center;
    vertical-align: top;
}
```

**App.js**

```jsx
import React from 'react';

import {BrowserRouter as Router} from 'react-router-dom';
// import {HashRouter as Router} from 'react-router-dom';

import BaseApp from './BaseApp/Index';

function App() {
    return (
        <div>
            <h1>React-Router</h1>
            <hr/>

            <Router>
                <BaseApp />
            </Router>
        </div>
    );
}

export default App;
```

```jsx
import {BrowserRouter as Router} from 'react-router-dom'
```

导入 `BrowserRouter` 组件，并命名 `Router` 别名，方便使用

```jsx
<Router>
	  <BaseApp />
</Router>
```

只对页面中的 `BaseApp` 组件使用路由

**./BaseApp/Index.js**

```jsx
import React from 'react';
import {Route, Link} from 'react-router-dom';

import Home from './Home';
import About from './About';

export default class BaseApp extends React.Component {

    render() {
        return(
            <div>
                <h2>路由基础使用</h2>

                <nav>
                    <Link to="/">Home</Link>
                    <span> | </span>
                    <Link to="/about">About</Link>
                </nav>
                <br/>

                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
            </div>
        );
    }

}
```

```jsx
import {Route} from 'react-router-dom';
```

#### <u>Route</u> 组件

注意这个组件是没有字母 <u>r</u> 的，通过该组件来设置应用单个路由信息，<u>Route</u> 组件所在的区域就是就是当 <u>URL</u> 与当前 <u>Route</u> 设置的 <u>path</u> 属性匹配的时候，后面 <u>component</u> 将要显示的区域

```jsx
<Route path='/' component={Home} />
```

当 <u>URL</u> 为：'/' 的时候，组件 <u>Home</u> 将显示在这里

##### exact

<u>exact</u> 属性表示路由使用 <u>精确匹配模式</u>，非 <u>exact</u> 模式下 '/' 匹配所有以 '/' 开头的路由

#### <u>Link</u> 组件

<u>Link</u> 组件用来处理 <u>a 链接</u> 类似的功能（它会在页面中生成一个 <u>a</u> 标签），但设置这里需要注意的，<u>react-router-dom</u> 拦截了实际 <u>a</u> 标签的默认动作，然后根据所有使用的路由模式（Hash 或者 HTML5）来进行处理，改变了 <u>URL</u>，但不会发生请求，同时根据 <u>Route</u> 中的设置把对应的组件显示在指定的位置

##### <u>to</u> 属性

<u>to</u> 属性类似 <u>a</u> 标签中的 <u>href</u>

### 应用场景（二）

最近生活拮据，想在应用中卖点东西补贴一下家用

#### 状态提升

前面讲组件中提到过组件状态提升，如果多个组件需要共享一个状态，那么就讲状态提升到使用该状态的共同父级组件上

**./BaseApp/Index.js**

```jsx
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
```

#### 传递 props

```jsx
<Route exact path='/' component={Home}
```

如果 <u>Route</u> 使用的是 <u>component</u> 来指定组件，那么不能使用 <u>props</u>

###### <u>Route</u> : <u>render</u>

```jsx
<Route exact path='/' render={() => <Home items={this.state.items} />} />
```

通过 <u>render</u> 属性来指定渲染函数，<u>render</u> 属性值是一个函数，当路由匹配的时候指定该函数进行渲染

#### 渲染列表

**Home.js**

```jsx
import React from 'react';

import {Link} from 'react-router-dom';

export default class Home extends React.Component {

    render() {
        let {items} = this.props;

        return (
            <div>
                <h2>商品列表</h2>
                <ul className="item-list">
                    <li className="head">
                        <span>名称</span>
                        <span>价格</span>
                    </li>
                    {
                        items.map(item=>(
                            <li key={item.id}>
                                <span>
                                    <Link to={'/Item/' + item.id}>{item.name}</Link>
                                </span>
                                <span>￥ {(item.price / 100).toFixed(2)}</span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }

}
```

##### <u>params</u>

在路由中，<u>params</u> 指的是 <u>path</u> 部分可变的部分，在这里我们需要定义一个新的路由用来展示商品的详情，我们希望通过 <u>/item/1</u> 、<u>/item/2</u>、<u>/item/……</u> 来访问对应 <u>id</u> 的商品，那么后面的数字部分就是可变的 - <u>params</u>，我们也称这样的路由为：动态路由

#### 动态路由

为了能给处理上面的动态路由地址的访问，我们需要为 <u>Route</u> 组件配置特殊的 <u>path</u>

```jsx
<Route path='/item/:id' component={Item} />
```

##### <u>path-to-regexp</u>

<u>path-to-regexp</u> 是一个专门用来处理 <u>URL</u> 的库，它用来了一种类似正则的字符串表示法

`:` 表示后面的部分为可变，`:` 后面的单词为匹配后的内容存储的名称，如：<u>/item/1</u> ，就是 `id=1`

默认情况下，它为我们提供了几个常用的字符表示：<u>*</u>、<u>?</u>、<u>+</u>

但是我们可以通过 `()` 来使用正则

```jsx
<Route path='/item/:id(\d+)' component={Item} />
```

上面表示 <u>/item/</u> 后面只能是数字

##### <u>Route</u> : <u>props</u>

当动态路由匹配以后，我们可以通过对应组件的 <u>props</u> 属性来访问当前路由匹配信息

#### 路由组件

如果一个组件是通过路由直接访问的，我们称为：<u>路由组件 - 视图组件</u>，其它的类型，根据具体功能可以称为：<u>业务组件</u>，<u>UI 组件</u>，<u>容器组件</u>，……

如果一个组件是路由组件，那么组件的 <u>props</u> 属性就会自动添加几个与路由有关的几个属性

- `history` : 对象，提供了一些用于操作路由的方法，类似原生 <u>JavaScript</u> 中的 <u>history</u> 对象
-  `location` : 对象，通过它可以获取当前路由 <u>URL</u> 信息，类似原生 <u>JavaScript</u> 中的 <u>history.location</u> 对象
- `match` : 对象，当前路由解析后的 <u>URL</u> 信息

##### <u>match</u> : <u>params</u>

```jsx
this.props.match.params.id
```

> <span style="color: red">注意：非路由组件是没有路由数据的</span>
>
> 如果一个组件既要接收手动传入的 <u>props</u>，又想接收路由信息
>
> ```jsx
> <Route path='/item/:id(\d+)' render={props => <Item {...props} items={this.state.items} />} />
> ```

**商品详情**

```jsx
render() {
  let items = this.props.items;
  let id = Number(this.props.match.params.id) || 0;
  let item = items.find(item => item.id === id);

  return item ? (
    <div>
      <h2>商品详情 - {item.name}</h2>
      <dt>ID</dt>
      <dd>{item.id}</dd>
      <dt>名称</dt>
      <dd>{item.name}</dd>
      <dt>价格</dt>
      <dd>￥ {(item.price / 100).toFixed(2)}</dd>
    </div>
  ) : <div>不存在该商品！</div>;
}
```

### 应用场景（三）

我想增加一个功能，用户可以按照商品价格的高低进行选择展示

#### 通过 <u>JavaScript</u> 实现排序切换

**Home.js**

```jsx
...
this.state = {
  	sort: 'desc'
  
  	this.changeSort = this.changeSort.bind(this);
}
...
changeSort({target: {value: sort}}) {
  	this.setState({sort});
}
...
render() {
  	let {items} = this.props;
  	let {sort} = this.state;
  	items = items.sort((a, b) => sort === 'asc'  ? a.price - b.price : b.price - a.price);
  	return(
      	...
      	<select value={sort} onChange={this.changeSort}>
          <option value="desc">从高到低</option>
          <option value="asc">从低到高</option>
      	</select>
      	...
    )
}
```

> 问题：刷新页面、分享 URL 都会丢失状态

#### 通过路由实现排序切换

##### queryString

通常我们把 <u>URL</u> `?` 后面的内容称为 <u>queryString</u>，在 <u>React.js</u> 中，我们可以通过 `this.props.location.search` 来获取，它的值是字符串，格式为：<u>?k1=v1&k2=v2</u>，为了方便操作，我们把它转成对象形式

##### URLSearchParams

在原生 <u>JJavaScript</u> 中内置了一个 <u>URLSearchParams</u> 的类，我们通过它可以很方便的操作 <u>queryString</u>

```jsx
let {location: {search}} = this.props;
let qs = new URLSearchParams(search);
let sort = qs.get('sort');
```

#### 扩展

##### qs 库 

https://www.npmjs.com/package/qs

##### 安装

```bash
npm i -S qs
```

##### 使用

```jsx
import queryString from 'qs';

let qsTest = queryString.parse(search, {ignoreQueryPrefix: true});
let sort = qsTest.sort;
```

##### 通过 <u>JavaScript</u> 编程的方式切换路由

除了使用 <u>\<Link\></u> 组件像 <u>a</u> 一样点击跳转路由，我们还可以通过编程的方式（<u>JavaScript</u>） 来切换路由

```jsx
let {history} = this.props;
```

```jsx
<select defaultValue={sort} onChange={({target:{value}})=>{
    history.push('/?sort=' + value);
  }}>
  <option value="desc">从高到低</option>
  <option value="asc">从低到高</option>
</select>
```

### 应用场景（四）

现在，我想给页面顶部的导航加上高亮效果，用来标识当前页面。这个时候，我们就可以使用 <u>react-router-dom</u> 提供的 <u>NavLink</u> 组件来实现

#### <u>NavLink</u> 组件

<u>NavLink</u> 与 <u>Link</u> 类似，但是它提供了两个特殊属性用来处理页面导航

##### activeStyle

当当前 <u>URL</u> 与 <u>NavLink</u> 中的 <u>to</u> 匹配的时候，激活 <u>activeStyle</u> 中的样式

##### activeClassName

与 <u>activeStyle</u> 类似，但是激活的是 <u>className</u>

##### isActive

默认情况下，匹配的是 <u>URL</u> 与 <u>to</u> 的设置，通过 <u>isActive</u> 可以自定义激活逻辑，<u>isActive</u> 是一个函数，返回布尔值

**index.js**

```jsx
<NavLink to="/" activeStyle={{color:'red'}} isActive={(match, location) => {
    return match || location.pathname.startsWith('/item')
}} exact>Home</NavLink>
<span> | </span>
<NavLink to="/about" activeStyle={{color:'red'}} exact>About</NavLink>
```

##### exact

精确匹配

### 应用场景（五）

当用户访问不存在的路由，我们需要提供一个反馈页面，也就是 404

**index.js**

```jsx
<Route exact path='/' render={props => <Home {...props} items={this.state.items} />} />
<Route path='/about' component={About} />
<Route path='/item/:id(\d+)' render={props => <Item {...props} items={this.state.items} />} />
{/*NotFound*/}
<Route component={NotFound} />
```

**NotFound.js**

```jsx
import React from 'react';

export default function NotFound() {
    return (
        <div>
            Not Found
        </div>
    );
}
```

> 默认情况下，<u>React.js</u> 会渲染所有与之匹配的路由组件，上面的案例中，当我们访问任意路由（如：/about），也会匹配 <u>NotFound</u> 路由组件渲染

#### <u>Switch</u> 组件

该组件只会渲染首个被匹配的组件

```jsx
<Switch>
  	<Route exact path='/' render={props => <Home {...props} items={this.state.items} />} />
    <Route path='/about' component={About} />
    <Route path='/item/:id(\d+)' render={props => <Item {...props} items={this.state.items} />} />
    {/*NotFound*/}
    <Route component={NotFound} />
</Switch>
```

### 应用场景（六）

现在，我们要给用户增加一个购物车的功能

**index.js**

```jsx
// 添加一个连接
<NavLink to="/cart" activeStyle={{color:'red'}} exact>Cart</NavLink>
```

**Cart.js**

```jsx
// 购物车组件
import React from 'react';

export default class Cart extends React.Component {

    render() {
        return(
            <div>
                购物车
            </div>
        );
    }

}
```

我们还要配一个用户系统，比如：注册登录啥的

**index.js**

```jsx
// 模拟一个添加登录用户状态的 state
this.state = {
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
      }
    ],
    userInfo: {
      	id: 0,
      	username: ''
    },
  	...
}
  
// 添加一个登录链接
{
  	this.state.userInfo.id > 0 ? (
  			<span>{this.state.userInfo.username}</span>
  	) : (
    		<NavLink to='/login' activeStyle={{color:'red'}} exact>Login</NavLink>
  	)
}
```

#### <u>Redirect</u> 组件

未登录用户是不能访问购物车的，所以，我们需要在访问购物车的时候加入用户权限验证（鉴权），如果没有登录则跳转到登录

**index.js**

```jsx
<Route path='/cart' render={props => {
    if (this.state.userInfo.uid > 0) {
      		return <Cart />;
    } else {
      		// return <Login />;
      		return <Redirect to='/login' />;
    }
}}  />
```

##### <u>to</u>

设置跳转的 <u>URL</u>

**登录代码**

```jsx
// index.js
login({username, password}) {
  return new Promise( (resolve, reject) => {
    if (!username || !password) {
      reject('请输入用户名和密码');
    }

    let user = this.state.users.find(user => user.username === username && user.password === password);
    if ( !user ) {
      reject('用户不存在或者密码错误');
    }

    this.setState({
      userInfo: {
        id: user.id,
        username: user.username
      }
    });

    resolve('登录成功');
  } );
}
...
<Route path='/login' component={props => {
    return <Login {...props} onLogin={this.login.bind(this)} />;
}} />

// login.js
import React from 'react';

export default class Login extends React.Component {

    constructor(...props) {
        super(...props);

        this.login = this.login.bind(this);

        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    login() {
        let {onLogin, history: {push}} = this.props;

        if (typeof onLogin === 'function') {
            onLogin({
                username: this.usernameRef.current.value,
                password: this.passwordRef.current.value
            }).then(msg=>{
                alert(msg);
                push('/');
            }).catch(e=>alert(e));
        } 
    }

    render() {
        return(
            <div>
                <p>
                    用户名：<input type="text" ref={this.usernameRef} />
                </p>
                <p>
                    密码：<input type="password" ref={this.passwordRef} />
                </p>
                <p>
                    <button onClick={this.login}>登录</button>
                </p>
            </div>
        );
    }

}
```

### 应用场景（七）

我突然发现卖东西比做码农要赚钱（主要是能生发），所以加大产品投入量，期待有一天，我的头发要宝哥多，然后推荐给莫莫

随着产品的增多，那么多的数据就不可能一次性全部展示出来，所以我们为商品的展示添加一个分页功能

```jsx
// Pagination.js
import React from 'react';
import PropTypes from 'prop-types';

import {withRouter, Link} from 'react-router-dom';

class Pagination extends React.Component {

    static defaultProps = {
        pages: 1,
        page: 1
    }

    static propTypes = {
        pages: PropTypes.number,
        page: PropTypes.number
    }

    render() {

        let {pages, page, history: {push}} = this.props;
        // console.log(this.props);

        return (
            <div className="pagination">
                {
                    (new Array(pages)).fill('').map((v, i) => {
                        return (
                            <Link 
                                key={++i}
                                className={i === page ? 'active' : ''}
                                to={'/'+i}
                            >
                                {i}
                            </Link>
                        );
                    })
                }
                前往
                <input type="text" className="goto" onKeyDown={({target:{value}})=>{
                    if (value !== '') {
                        push('/' + value);
                    }
                }} />
                页
            </div>
        );
    }

}

export default withRouter(Pagination);
```

#### <u>withRouter</u> 组件

如果一个组件不是路由绑定组件，那么该组件的 <u>props</u> 中是没有路由相关对象的，虽然我们可以通过传参的方式传入，但是如果结构复杂，这样做会特别的繁琐。幸好，我们可以通过 <u>withRouter</u> 方法来注入路由对象



