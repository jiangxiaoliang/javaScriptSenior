# Vue.js

[TOC]

## computed

在实际的应用中，我们会有一些原始数据，同时在应用中又会有一些数据是根据某些原始数据派生出来的，针对这样的一种情况，`vue` 定义了一个专门用来处理这种派生数据的选项：`computed`

```html
<div id="app">
  <label><input type="radio" v-model="gender" value="" /> 所有</label>
  <label><input type="radio" v-model="gender" value="男" /> 男</label>
  <label><input type="radio" v-model="gender" value="女" /> 女</label>
  <hr>
  <ul>
    <li v-for="user of showUsers">
      {{user.username}}
    </li>
  </ul>
</div>
```

```js
let app = new Vue({
  el: '#app',
  data: {
    gender: '',
    users: [
      {id: 1, username: 'baogege', gender: '男'},
      {id: 2, username: 'mt', gender: '男'},
      {id: 3, username: 'haigege', gender: '男'},
      {id: 4, username: 'zMouse', gender: '男'},
      {id: 5, username: 'reci', gender: '女'},
      {id: 6, username: 'lisi', gender: '女'}
    ]
  },
  computed: {
    showUsers() {
      return this.gender === '' ? [...this.users] : this.users.filter(user=>user.gender===this.gender);
    }
  }
});
```

- 计算属性类似 `getter` 和 `setter` ，当访问某个计算属性的时候，就会调用 `computed` 中同名的函数，函数的返回值将作为该计算属性的值
- 计算属性的值依赖计算函数中依赖的其它响应式数据
- 计算属性的值可以缓存，如果依赖的其它响应式数据没有发生变化，但多次访问该计算属性，得到结果是最近一次变化产生的值（相对于调用方法得到结果在某些时候性能要好一些）

```html
<div id="app">
  <p>{{now}}</p>
  <button @click="showDate=true">showDate</button>
  <p v-if="showDate">{{now}}</p>
</div>
```

```js
let app = new Vue({
  el: '#app',
  data: {
		showDate: false
  }
  computed: {
    now() {
      return Date.now();
    }
  }
});
```

### 计算属性的 `getter` 与 `setter`

默认情况下，计算属性函数是一个 `getter` 函数，如果计算属性只有 <u>get</u> 需求，则可以简写

```js
computed: {
  now() {
    return Date.now();
  }
  // 等于
  now: {
    get() {
      return Date.now();
    }
  }
}
```

但是有的时候，这种派生数据既有 `get` 需求，也有 `set` 需求

```html
<div id="app">
  <label><input type="radio" v-model="gender" value="" /> 所有</label>
  <label><input type="radio" v-model="gender" value="男" /> 男</label>
  <label><input type="radio" v-model="gender" value="女" /> 女</label>
  <hr>
  <ul>
    <li v-for="user of showUsers">
      <input type="checkbox" v-model="user.checked" />
      {{user.username}}
    </li>
  </ul>
  <label><input type="checkbox" v-model="checkAll">全选</label>
</div>
```

```js
let app = new Vue({
  el: '#app',
  data: {
    gender: '',
    users: [
      {id: 1, username: 'baogege', gender: '男',checked:false},
      {id: 2, username: 'mt', gender: '男',checked:false},
      {id: 3, username: 'haigege', gender: '男',checked:false},
      {id: 4, username: 'zMouse', gender: '男',checked:false},
      {id: 5, username: 'reci', gender: '女',checked:false},
      {id: 6, username: 'lisi', gender: '女',checked:false}
    ]
  },
  computed: {
    showUsers() {
      return this.gender === '' ? [...this.users] : this.users.filter(user=>user.gender===this.gender);
    },
    checkAll: {
      get() {
        return this.users.every(user=>user.checked);
      },
      set(newValue) {
        this.users = this.users.map(user=>{
          return {
            ...user,
            checked: newValue
          }
        });
      }
    }
  }
});
```



## watch

有的时候，我们需要的派生数据是通过异步的方式处理的，这个时候，计算属性就不太好用了（不能处理异步）。

我们可以使用另外一个选项：`watch`

```html
<div id="app">
  <input type="text" v-model="keyWord">
  <hr>
  <ul>
    <li v-for="user of showUsers">
      {{user.username}}
    </li>
  </ul>
</div>
```

```js
let app = new Vue({
  el: '#app',
  data: {
    keyWord: '',
    users: [
      {id: 1, username: 'baogege', gender: '男',checked:false},
      {id: 2, username: 'mt', gender: '男',checked:false},
      {id: 3, username: 'haigege', gender: '男',checked:false},
      {id: 4, username: 'zMouse', gender: '男',checked:false},
      {id: 5, username: 'reci', gender: '女',checked:false},
      {id: 6, username: 'lisi', gender: '女',checked:false}
    ],
    showUsers: []
  },
  watch: {
    keyWord(newVal, oldVal) {
      // 模拟网络请求
      setTimeout(_=>{
        this.showUsers = this.users.filter(user=>user.username.includes(newVal));
      }, 1000);
    }
  }
});
```

### 多层监听

对于多层数据的监听，可以使用字符串+点语法

```js
watch: {
  'a.b.c': function() {
    //...
  }
}
```

### 深度监听

默认情况下，`watch` 只对当前指定的值进行一层监听，如果需要对对象进行深度监听

```js
watch: {
  a: {
    handler() {
      console.log('a deep');
    },
    deep: true
  }
}
```

