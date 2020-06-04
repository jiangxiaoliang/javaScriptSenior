# Vue.js

[TOC]

## 事件

在 `vue` 中，事件通过指令 `v-on` 进行绑定，`v-on` 缩写 `@` 

```html
<组件 v-on:事件名称="表达式" />
<组件 @事件名称="表达式" />
```

### 组件的 `methods` 选项

在组件选项中，提供了一个 `methods` 选项，用来存放组件中使用的函数方法，且存放在 `methods` 中的函数方法可以通过组件实例（this）进行访问

### 通过内联方式绑定事件处理函数

```html
<组件 @事件名称="fn" />

<script>
new Vue({
  ...,
  methods: {
  	fn() {
  		//...	
		}
	}
})
</script>
```

- 事件绑定函数中的 `this` 指向组件实例
- 事件绑定函数中的第一个参数默认为 `event` 对象

```html
<组件 @事件名称="fn('kaikeba', $event)" />

<script>
new Vue({
  ...,
  methods: {
  	fn(name, ev) {
  		//...	
		}
	}
})
</script>
```

也可以在事件绑定中直接调用函数（并不会立即执行，也是通过事件触发执行的）

- 事件对象需要手动传入，名称为 `$event`

### 事件修饰符

在事件函数中，我们可以通过 `ev.preventDefault()`、`ev.stopPropagation()` 来阻止默认行为，阻止冒泡，但是中 <u>vue</u> 中提供一些更加方便的方式来处理这些问题，这就是事件修饰符

#### .stop

#### .prevent

#### .capture

#### .self

#### .once

#### .passive

### 按键修饰符

`vue` 还提供了许多按键修饰符

#### .keyCode

```html
<组件 @keyup.13="fn" />
```

#### .enter

#### .down

#### .exact

### 原生事件

自定义组件中可以自定义一些事件，可以通过 `.native` 修饰符来指定监听原生中的事件，而不是组件自定义事件

