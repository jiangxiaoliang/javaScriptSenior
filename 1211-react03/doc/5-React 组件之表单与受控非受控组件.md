# React.js

[TOC]

## 表单

在 <u>React</u> 里，<u>HTML</u> 表单元素的工作方式和其他的 <u>DOM</u> 元素有些不同。

一般来说，表单以及表单中的控件（如：input、select……）是页面中与 <u>JavaScript</u> 打交道最多的元素了。虽然我们可以通过 <u>ref</u> 的形式去操作它们，但是这样会比较麻烦，<u>React.js</u> 为我们提供了一个更好的方式把 <u>React.js</u> 中的数据以及逻辑与表单控件关联起来。



### 受控组件

`受控组件` : 用 <u>props</u> 传入数据的话，组件可以被认为是受控（因为组件被父级传入的 props 控制）

`非受控组件` : 数据只保存在组件内部的 <u>state</u> 的话，是非受控组件（因为外部没办法直接控制 <u>state</u>）

广义来说，页面中的任意元素都是一个独立的组件，表单控件也是，它们内部也会维护属于自己的状态（如：value，selected，checked……），当然这些状态是由原生实现的，而非 <u>React.js</u> 来控制的，但是有的时候我们希望通过 <u>React.js</u> 来管理和维护表单控件的状态，我们把这种控件（控件）称为： **受控组件**， 针对不同的组件，状态的维护方式也有所差异

- input
- textarea
- select

> 通过 <u>state</u> 来控制组件状态
>
> - 创建 <u>state</u> 与组件的某个状态进行绑定
> - 监听组件某些事件来更新 <u>state</u>

#### input

```jsx
class ControlledComponent extends React.Component {

    constructor(args) {
        super(args);
        this.state = {
            v1: 'kaikeba'
        };
        this.changeValue = this.changeValue.bind(this);
    }

    changeValue({target:{value:v1}}) {
        this.setState({
            v1
        });
    }

    render() {
        return(
            <div>
                <input type="text" value={this.state.v1} onChange={this.changeValue} />
            </div>
        );
    }
}
```

##### 通过受控组件，可以更加便捷的操控组件交互

```jsx
...
changeValue({target:{value}}) {
  	this.setState({
    		v1: value.toUpperCase()
  	});
}
...
```

#### textarea

<u>textarea</u> 与 <u>input</u> 类似，但是需要注意的是： 使用 <u>value</u> ，而不是 内容（<u>innerHTML</u>）

```jsx
// 正确
<textarea value={this.state.v2} onChange={this.changeValue2} cols="30" rows="10"></textarea>
// 错误
<textarea onChange={this.changeValue2} cols="30" rows="10">{this.state.v2}</textarea>
```

#### select

<u>select</u> 在 <u>React.js</u> 中也做了一些处理，不在是通过 <u>selected</u> 属性来表示选中元素，而是通过 <u>select</u> 标签的 <u>value</u> 属性

```jsx
<select value={this.state.v3} onChange={this.changeValue3}>
    <option value="html">html</option>
    <option value="css">css</option>
    <option value="javascript">javascript</option>
</select>
```

##### 多选

我们还可以设置多选 <u>select</u>，对应的 <u>value</u> 就是一个数组

```jsx
...
this.state = {
  	v4: ['html', 'javascript']
}
...

...
changeValue4({target:{options}}) {
  this.setState({
    v4: [...options].filter(o=>o.selected).map(o=>o.value)
  });
}
...

...
<select value={this.state.v4} onChange={this.changeValue4} multiple>
    <option value="html">html</option>
    <option value="css">css</option>
    <option value="javascript">javascript</option>
</select>
...
```

#### 单选

<u>radio</u> 和下面的 <u>checkbox</u> 需要注意的是，受控的属性不在是 <u>value</u> ，而是 <u>checked</u>

```jsx
...
this.state = {
  	v5: '女',
		v6: ['前端', '后端'],
}

...
changeValue5(e) {
    this.setState({
      	v5: e.target.value
    });
}

changeValue6({target:{value}}) {
    let {v6} = this.state;
    if (v6.includes(value)) {
      	v6 = v6.filter(v=>v!==value);
    } else {
      	v6.push(value)
    }
    this.setState({
      	v6
    });
}
...

...
<label><input name="gender" type="radio" value="男" checked={this.state.v5==='男'} onChange={this.changeValue5} />男</label>
<label><input name="gender" type="radio" value="女" checked={this.state.v5==='女'} onChange={this.changeValue5} />女</label>

<label><input name="interest" type="checkbox" value="前端" checked={this.state.v6.includes('前端')} onChange={this.changeValue6} />前端</label>
<label><input name="interest" type="checkbox" value="后端" checked={this.state.v6.includes('后端')} onChange={this.changeValue6} />后端</label>
...
```



### 非受控组件

话又说回来，通过上面的学习，我们知道，每个受控组件，且不同的类型的受控组件它能控制的状态只有那么一些：<u>value</u>、<u>checked</u>，但是实际上一个组件的状态远远不止这些，比如 <u>input</u> 的焦点、禁用、只读 等，都是组件的状态，如果每一个状态都通过上面的方式来管理，就会特别的麻烦了。这个时候，我们就需要用其他方式来处理了：<u>DOM</u>

#### Refs & DOM

<u>React.js</u> 提供了多种方式来获取 <u>DOM</u> 元素

- 回调 <u>Refs</u>
- <u>React.createRef()</u>

##### <u>ref</u> 属性

无论是 <u>回调 Refs</u> 还是 <u>React.createRef()</u>，都需要通过一个属性 <u>ref</u> 来进行设置

```jsx
<input ref={?} />
```

##### 回调 <u>Refs</u>

这种方式，我们在前面已经使用过了

```jsx
class UnControlledComponent extends React.Component {
  	constructor(props) {
      	super(props);
      	this.selectURL = this.selectURL.bind(this);
        this.getElementInfo = this.getElementInfo.bind(this);
  	}
  
  	selectURL() {
        this.refInput.select();
    }

    getElementInfo() {
        this.refDiv.getBoundingClientRect()
    }
  
  	render() {
        return (
            <input ref={el => this.refInput = el} type="text" value="http://kaikeba.com" />
            <button onClick={this.selectURL}>点击复制</button>
            <hr/>
            <button onClick={this.getElementInfo}>获取元素信息</button>
            <div ref={el => this.refDiv = el} style={{width: '100px', height:'100px',background:'red'}}></div>
        )
    }
}
```

##### React.createRef()

该方法返回一个 <u>ref 对象</u>，在 <u>jsx</u> 通过 <u>ref</u> 属性绑定该对象，该对象下的 <u>current</u> 属性就指向了绑定的元素或组件对象

```jsx
class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    hello() {
        console.log('ChildComponent');
    }

    render() {
        return(
            <div>
                <h2>ChildComponent</h2>
            </div>
        );
    }
}

class UnControlledComponent extends React.Component {
  	constructor(props) {
      	super(props);
      	this.selectURL = this.selectURL.bind(this);
        this.getElementInfo = this.getElementInfo.bind(this);
      
      	this.refInput = React.createRef();
        this.refDiv = React.createRef();
        this.refChild = React.createRef();
  	}
  
  	selectURL() {
        this.refInput.current.select();
    }

    getElementInfo() {
        this.refDiv.current.getBoundingClientRect()
    }
  
  	getElementInfo() {
        this.refChild.current;
    }
  
  	render() {
        return (
            <input ref={this.refInput} type="text" value="http://kaikeba.com" />
            <button onClick={this.selectURL}>点击复制</button>
            <hr/>
            <button onClick={this.getElementInfo}>获取元素信息</button>
            <div ref={this.refDiv} style={{width: '100px', height:'100px',background:'red'}}></div>
          	<hr/>
            <ChildComponent ref={this.refChild} />
            <button onClick={this.getReactComponent}>获取 React 实例对象</button>
        )
    }
}
```

## 建议

- 尽量避免从 <u>props</u> 中派生 <u>state</u>
- 尽量使用 <u>props</u>，避免使用 <u>state</u>
