# Vue.js

[TOC]

## 过滤器

过滤器是一个使用在 `双大括号插值` 和 `v-bind` 中，用于过滤输出内容的函数

假设有一个用于把内容转为大写的过滤器函数 `toUpperCase`

```html
{{content|toUpperCase}}
```

- `|` : 管道符，表示数据从左至右通过管道符进行传递
- 过滤器可以有多个，执行顺序从左至右，过滤器函数第一个参数的值就是其管道符前一个的结果

### 注册过滤器

#### 全局过滤器

```js
Vue.filter('过滤器名称', 过滤器函数);
```

#### 局部过滤器

```js
Vue.component('组件', {
  ...,
  filters: {
  	'过滤器名称': 过滤器函数	
	}
})
```

### 实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <div id="app">
        {{title|toUpperCase|slice(3)}}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                title: 'kaikeba'
            },
            filters: {
                toUpperCase: function(val) {
                    return val.toUpperCase();
                },
                slice(val, n) {
                    return val.slice(n);
                }
            }
        })
    </script>
</body>
</html>
```

