# Vue.js

[TOC]

## 组件的注册

在 `vue` 中，我们可以通过 `new Vue` 来创建一个组件，不过通常它是作为整个应用的顶层根组件存在的，我们还可以通过另外的方式来注册一个更为通用的组件

### Vue.component()

```js
Vue.component('组件名称', {组件选项})
```

- 组件名称遵循自定义组件命名规范：全小写、连字符（虽然驼峰式一般也没问题）
- 组件选项与 `new Vue` 选项配置基本一致（也有一些细节的不同）

#### 全局组件与局部组件

通过 `Vue.component` 注册的组件，我们称为全局组件，因为它可以在任意范围内使用，我们还可以定义局部组件

```js
new Vue({
  ...,
  components: {
  	'组件名称': {组件选项}	
	}
})
```

在一个组件内部通过 `components` 选项注册的组件是局部组件，只能在当前 `components` 选项所在的组件内部使用

> 注意：局部注册的组件只能中当前注册的组件中使用，不能在它的子组件中使用

### data

在非 `new Vue` 的组件中，`data` 必须为函数，函数返回值必须是一个对象，作为组件的最终 `data`

### props

组件中内部私有数据存储中组件 `data` 中，通过外部传入的数据，则通过 `props<` 选项接收

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
        <kkb-circle :r="n1"></kkb-circle>
        <hr />
        <kkb-circle :r="n2"></kkb-circle>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

    <script>
        
        let app = new Vue({
            el: '#app',
            data: {
                n1: 10,
                n2: 100
            },
            components: {
                'kkb-circle': {
                    props: ['r'],
                    data() {
                        return {pi: 3.14}
                    },
                    template: `<div>r: {{r}} -> {{pi * r * r}}</div>`
                }
            }
        });
    </script>
</body>
</html>
```

- 如果传入的 `props` 值为一个表达式，则必须使用 `v-bind`
- 组件中的 `data` 和 `props` 数据都可以通过组件实例进行直接访问
- `data` 中的 `key` 与 `props` 中的 `key` 不能冲突

### 组件通信

> 注意：不要修改 `props` 传入的数据

父组件通过 `props` 传入数据到子组件内部，但是子组件内部不要修改外部传入的 `props`，`vue` 提供了一种事件机制通知父级更新，父级中使用子组件的时候监听对应的事件绑定对应的处理函数即可

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
        <p>父组件：{{quantity}}</p>
        <kkb-child :quantity="initQuantity" @increment="appIncrement"></kkb-child>
        <kkb-child :quantity="initQuantity" @increment="appIncrement"></kkb-child>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        const child = {
            props: ['quantity'],
            data() {
                return {
                    n: this.quantity
                };
            },
            template: `
                <div>
                    <p>子组件：{{n}}</p>
                    <button @click="increment">按钮</button>
                </div>
            `,
            methods: {
                increment() {
                    this.n++;
                    this.$emit('increment', this.n);
                }
            }
        };

        new Vue({
            el: '#app',
            data: {
                quantity: 0,
                initQuantity: 0
            },
            components: {
                'kkb-child': child
            },
            methods: {
                appIncrement(v) {
                    this.quantity++;
                }
            }
        });
    </script>
</body>
</html>
```

#### $emit()

`vue` 为每个组件对象提供了一个内置方法 `$emit` ，它等同于自定义事件中的 `new Event`,`trigger` 等

```js
this.$emit('自定义事件名称', 事件数据)
```

- 事件数据就是中触发事件的同时携带传递的数据 - `event`

- 父级在使用该组件的过程中，可以通过 `@事件名称` 来注册绑定事件函数
- 事件函数的第一个参数就是事件数据

### 组件双绑的实现

虽然并不推荐在组件内部修改 `props` ，但是，有的时候确实希望组件内部状态变化的时候改变 `props` ，我们可以通过子组件触发事件，父级监听事件来达到这个目的，不过过程会比较繁琐，`vue` 提供了一些操作来简化这个过程

#### v-model

`v-model` 是 `vue` 提供的一个用于实现数据双向绑定的指令，用来简化 `props 到 data`，`data 到 props` 的操作流程

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .kkb-radio {
            width: 20px;
            height: 20px;
            background-color: #cccccc;
        }
        .kkb-radio.checked {
            background-color: #92beee;
        }
        .plane {
            border: 1px solid #000000;
            width: 300px;
        }
        .plane .header {
            width: 100%;
            height: 30px;
            background: #cccccc;
        }
        .plane .content {
            height: 100px;
            width: 100%;
            display: none;
        }
        .plane.expanded .content {
            display: block;
        }
    </style>
</head>
<body>
    <div id="app">
        <!-- <kkb-radio :checked="val"></kkb-radio> -->
        <kkb-radio v-model="val"></kkb-radio>

        <br /><br /><br />

        <kkb-plane :expanded="val"></kkb-plane>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>

        const kkbRadio = {
            model: {
                prop: 'checked',
                event: 'check'
            },
            props: ['checked'],
            data() {
                return {
                    status: this.checked
                }
            },
            template: `
                <div class="kkb-radio" :class="{'checked': status}" @click="changeStatus"></div>
            `,
            methods: {
                changeStatus() {
                    this.status = !this.status;

                    this.$emit('check', this.status);
                }
            }
        };
        const kkbPlane = {
            props: ['expanded'],
            template: `
                <div class="plane" :class="{'expanded': expanded}">
                    <div class="header"></div>
                    <div class="content"></div>
                </div>
            `
        };
        

        let vm = new Vue({
            el: '#app',
            data: {
                val: true
            },
            components: {
                'kkb-radio': kkbRadio,
                'kkb-plane': kkbPlane
            },
            methods: {
                
            }
        });
    </script>
</body>
</html>
```

##### model 选项

`prop` 指定要绑定的属性，默认是 `value`

`event` 指定要绑定触发的事件，默认是 `input` 事件

#### .sync

通过 `v-model` 来进行双向绑定，会给状态维护带来一定的问题，因为修改比较隐蔽，同时只能处理一个 `prop` 的绑定，我们还可以通过另外一种方式来达到这个目的

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .kkb-radio {
            width: 50px;
            height: 50px;
            border: 5px solid #000000;
            background-color: #ffffff;
        }
        .kkb-radio.checked {
            border-color: green;
        }
        .kkb-radio.disabled {
            background-color: #cccccc;
        }
    </style>
</head>
<body>
    <div id="app">

        <p>val1: {{val1}}</p>
        <p>val2: {{val2}}</p>
        <hr>

        <kkb-radio :checked.sync="val1" :disabled.sync="val2"></kkb-radio>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>

        const kkbRadio = {
            props: ['checked', 'disabled'],
            data() {
                return {
                    status: this.checked,
                    dis: this.disabled
                }
            },
            template: `
                <div class="kkb-radio" :class="{'checked': status, 'disabled': dis}" @click="changeDis" @mouseover="setChecked" @mouseout="removeChecked"></div>
            `,
            methods: {
                setChecked() {
                    this.status = true;
                    this.$emit('update:checked', this.status);
                },
                removeChecked() {
                    this.status = false;
                    this.$emit('update:checked', this.status);
                },
                changeDis() {
                    this.dis = !this.dis;
                    this.$emit('update:disabled', this.dis);
                }
            }
        };

        let vm = new Vue({
            el: '#app',
            data: {
                val1: false,
                val2: false
            },
            components: {
                'kkb-radio': kkbRadio
            },
            methods: {
                
            }
        });
    </script>
</body>
</html>
```

##### update:[prop]

这里事件名称要使用 `update` 加上 `prop` 名称 的格式

### 插槽

默认情况下，组件模板解析后会替换整个组件内容，如果我们想在组件引用被包含的内容，可以通过 `vue` 提供的内置组件 `slot` 来获取

```css
.dialog {
    position: fixed;
    left: 50%;
    top: 30%;
    transform: translateX(-50%) translateY(-50%) ;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    background: #fff;
    width: 30%;
}
.dialog_header {
    padding: 20px 20px 0;
    text-align: left;
}
.dialog_title {
    font-size: 16px;
    font-weight: 700;
    color: #1f2d3d;
}
.dialog_content {
    padding: 30px 20px;
    color: #48576a;
    font-size: 14px;
    text-align: left;
}
.dialog_close_btn {
    position: absolute;
    right: 10px;
    top: 5px;
}
.dialog_close_btn:before {
    content: 'x';
    color: #999;
    font-size: 20px;
    cursor: pointer;
}
```

```html
<div id="app">
  <kkb-dialog title="标题">
    <p>这是内容</p>
  </kkb-dialog>
</div>
```

```js
const Dialog = {
  props: ['title'],
  template: `
    <div class="dialog">
    	<i class="dialog_close_btn"></i>
    	<div class="dialog_header">
    		<span class="dialog_title">{{title}}</span>
    	</div>
    	<div class="dialog_content">
    		<slot></slot>
    	</div>
    </div>
	`
};

new Vue({
  el: '#app',
  components: {
    'kkb-dialog': Dialog
  }
});
```

#### 具名插槽

```html
<div id="app">
  <kkb-dialog>
    <template v-slot:title>
      <h1>这是标题</h1>
    </template>

    <template v-slot:default>
      <p>这是内容</p>
    </template>
  </kkb-dialog>
</div>
```

```javascript
const Dialog = {
  props: ['title'],
  template: `
    <div class="dialog">
    	<i class="dialog_close_btn"></i>
    	<div class="dialog_header">
    		<slot name="title"></slot>
    	</div>
    	<div class="dialog_content">
    		<slot></slot>
    	</div>
    </div>
	`
};

new Vue({
  el: '#app',
  components: {
    'kkb-dialog': Dialog
  }
});
```

##### v-slot

使用内置组件 `template` 与 `v-slot` 指令进行配置，用来命名插槽，在组件模板中，通过 `<slot name="插槽名字">` 来使用

#### 作用域插槽

组件内部与组件包含的内容属于不同的作用域（被包含的内容是组件父级下的作用域）

```html
<div id="app">
  <kkb-dialog>
    <template v-slot:title>
      <h1>用户列表 - {{title}}</h1>
    </template>

    <template v-slot:default="data">
      <p>用户的姓名: {{data.user.username}}</p>
    </template>
  </kkb-dialog>
</div>
```

```javascript
const Dialog = {
  props: ['title'],
  data() {
    return {
      users: [
        {id: 1, username: 'baogege', gender: '男',checked:false},
        {id: 2, username: 'mt', gender: '男',checked:false},
        {id: 3, username: 'haigege', gender: '男',checked:false},
        {id: 4, username: 'zMouse', gender: '男',checked:false},
        {id: 5, username: 'reci', gender: '女',checked:false},
        {id: 6, username: 'lisi', gender: '女',checked:false}
      ]
    }
  },
  template: `
    <div class="dialog">
    	<i class="dialog_close_btn"></i>
    	<div class="dialog_header">
    		<slot name="title"></slot>
    	</div>
    	<div class="dialog_content">
    		<slot v-for="user of users" :user="user"></slot>
    	</div>
    </div>
	`
};

new Vue({
  el: '#app',
  data: {
    title: '开课吧'
  },
  components: {
    'kkb-dialog': Dialog
  }
});
```

### props 验证

组件的 `props` 就是组件的参数，为了确保传入的数据在可控的合理范围内，我们需要对传入的 `props` 的值类型进行必要的验证

```javascript
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

### 非 prop 特性

一个非 `prop` 特性是指传向一个组件，但是该组件并没有相应 `prop` 定义的特性，这些 `props` 会被自动添加到组件的根元素上

### 替换/合并已有的特性

默认情况下，非`prop` 特性的属性会覆盖组件根元素上同名的内容，但是针对 `style` 和 `class` 有特殊的处理，它们会合并（同名样式还是会覆盖）

### 禁用特性继承

如果你不希望组件的根元素继承特性，你可以在组件的选项中设置 `inheritAttrs: false`，我们可以通过组件的 `this.$attrs` 来获取这些属性

> 注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定

