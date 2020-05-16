# Redux 中间件

[toc]

## Redux 中间件的作用

`Reudx` 中的中间件是通过对 `dispatch` 进行的二次封装，对 `action` 发起之后，`reducer` 调用之前的行为进行扩展，我们可以通过中间件来进行：`日志记录`、`发送报告`、`调用异步接口` ……



## 从日志记录需求开始

**需求：再每次 `dispatch` 的时候打印修改之前和之后的 `state`**

### 准备

```javascript
let initState = {
  users: []
}

function reducers(state=initState, {type, payload}) {
  switch(type) {
    case 'user/add':
      return Object.assign(state, {
        users: [...state.users, payload]
      });
  }

  return state;
}

let store = Redux.createStore(
  reducers
);
```

### 最直接最原始的做法

```javascript
console.log(store.getState());
store.dispatch({
  type: 'user/add',
  payload: 'zmouse'
});
console.log(store.getState());
```

### 封装 `logger`

```javascript
function logger(store, action) {
  console.log(store.getState());
  store.dispatch(action)
  console.log(store.getState());
}

logger(store, {
  type: 'user/add',
  payload: 'zmouse'
});
```

### 封装 `dispatch`

```javascript
let next = store.dispatch;
store.dispatch = function logger(action) {
  console.log(store.getState());
  next(action);
  console.log(store.getState());
}

store.dispatch({
  type: 'user/add',
  payload: 'zmouse'
});
```



## 添加错误报告发送

**需求：每次 `dispatch` 把提交的数据进行持久化**

```javascript
let next = store.dispatch;
store.dispatch = function storage(action) {
  next(action);
  let s = localStorage
}

store.dispatch({
  type: 'user/add',
  payload: 'zmouse'
});
```



## 封装合并多个中间件

- 把每个独立的中间件封装成独立的函数
- 每个中间件都需要获取一次 `dispatch`

```javascript
function logger(store) {
  let next = store.dispatch;
  return function loggerDispatch(action) {
    console.log('before: ', store.getState());
    next(action);
    console.log('after: ', store.getState());
  }
}

function storage(store) {
  let next = store.dispatch;
  return function storageDispatch(action) {
    next(action);
    localStorage.setItem('store', JSON.stringify(store.getState()));
    console.log('持久存储完成');
  }
}

store.dispatch = logger(store);
store.dispatch = storage(store);

store.dispatch({
  type: 'user/add',
  payload: 'zmouse'
});
```



## 方法一个方法统一处理中间件函数的注册

封装一个 `applyMiddleware` 方法

```js
function applyMiddleware(store, middlewares) {
  middlewares.reverse()
  middlewares.forEach(middleware => {
    store.dispatch = middleware(store)
  })
}

applyMiddleware(store, [logger, storage])
```



## 抽取 `next`

```js
function applyMiddleware(store, middlewares) {
  middlewares.reverse()
  let dispatch = store.dispatch
  middlewares.forEach(middleware => {
    dispatch = middleware(store)(dispatch)
  })
  store.dispatch = dispatch;
}

function logger(store) {
  return function(next) {
    return function loggerDispatch(action) {
      console.log('before: ', store.getState());
      next(action);
      console.log('after: ', store.getState());
    }
  }
}

function storage(store) {
  return function(next) {
    return function storageDispatch(action) {
      next(action);
      localStorage.setItem('store', JSON.stringify(store.getState()));
      console.log('持久存储');
    }
  }
}
```



## `ES6` 改写

```js
let logger = store => next => action => {
  console.log('before: ', store.getState());
  next(action);
  console.log('after: ', store.getState());
}
let storage = store => next => action => {
  next(action);
  localStorage.setItem('store', JSON.stringify(store.getState()));
  console.log('持久存储');
}
```



## 使用 `Redux.applyMiddleware` 方法

`Redux` 内置了一个 `applyMiddleware` 方法用来注册中间件

```javascript
let store = Redux.createStore(
  reducers,
  Redux.applyMiddleware(logger, storage)
);
```



## 异步的问题

仔细观察我们发现，默认的 `dispatch` 是没有对异步的任务进行处理的，且该方法默认情况下接收的是一个 `action` 对象

### `redux-thunk` 的原理

通过中间件重新封装 `dispatch` 方法，使它能够接收一个异步任务函数

```js
let thunk = store => next => action => {
  console.log('thunk');
  new Promise( (resolve, reject) => {
    action(next);
  } )
}

store.dispatch( dispatch => {
  setTimeout(() => {
    dispatch({
      type: 'user/add',
      payload: 'zmouse'
    });
  }, 1000);
} )
```

