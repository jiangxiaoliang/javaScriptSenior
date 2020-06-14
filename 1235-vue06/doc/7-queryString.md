# vue-router

[TOC]

## queryString

有的时候，我们可能也会用到 <u>queryString</u>

```vue
<select v-model="sort">
  <option value="desc">从高到低</option>
  <option value="asc">从低到高</option>
</select>
```

### $route.query

我们可以通过路由对象 <u>$route</u> 的 <u>query</u> 属性来获取 <u>queryString</u>

```vue
...
computed: {
	sort: {
		get() {
      return this.$route.query.sort || 'desc';
    }
	}
}
...
```

### 编程式导航

有的时候，我们可能需要用到编程的方式来导航（跳转），而不是点击链接。如：当 `sort` 发生改变的时候跳转

```vue
...
computed: {
	sort: {
		get() {
      return this.$route.query.sort || 'desc';
    },
		set(newVal) {
			this.$router.push({
        name: 'home',
        query: {
          sort: newVal
        }
      });
		}
	}
}
...
```



## 路由组件的复用

为了提高性能，增强路由组件的复用，当路由切换使用的是同一个组件的时候，则会复用该路由组件，而不是销毁重建，这个时候，我们就需要通过 <u>watch</u> 或者 路由相关的生命周期函数来处理切换路由导致的变化

### watch

如果切换的路由复用了组件，这个时候，我们可以使用 <u>watch</u> 监听 <u>$route</u>

```vue
watch: {
  $route(to, from) {
      console.log('$route');
  }
}
```

- to : 改变之后的 <u>$route</u> 对象
- from : 改变之前的 <u>$route</u> 对象

但是我们可以使用 <u>vue-router</u> 提供路由守卫 （路由有关的生命周期函数）来处理路由有关的业务逻辑