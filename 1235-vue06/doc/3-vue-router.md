# vue-router

[TOC]

## 路由

当应用变得复杂以后，我们就需要通过一种便捷、高效的方式来管理应用，最常见的就是通过路由

路由：把 <u>url</u> 与 应用中的对应的组件进行关联，通过不同的 <u>url</u> 访问不同的组件

### <u>vue-router</u> 的安装

```bash
npm i vue-router
// OR
yarn add vue-router
```

### Vue.use()

通过前面提到的 <u>Vue.use</u> 方法，把 <u>vue-router</u> 安装到指定的 <u>Vue</u> 实例中

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);
```

### 创建路由对象

通过 <u>vue-router</u> 提供的 <u>Router</u> 构造函数（类）创建路由对象，路由对象包含了当前使用的模式（<u>hash</u>、<u>history</u>）、路由信息（<u>url</u> 与 组件的对应关系）等信息

```javascript
import Router from 'vue-router';
import Home from './views/Home.vue';
import Home from './views/About.vue';

const myRouter = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/about',
      component: About
    }
  ]
});

...,
  
new Vue({
  ...,
  router: myRouter
});
```

### <u>router-view</u> 组件

配置了路由信息以后，我们还需要在页面（组件）中指定路由对应的组件出现的位置，当前访问的 <u>url</u> 与某个路由信息匹配的时候，该组件就会出现在 <u>router-view</u> 组件所在的位置

```vue
// App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <hr>
    <router-view/>
  </div>
</template>
```