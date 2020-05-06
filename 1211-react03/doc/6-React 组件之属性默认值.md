# React.js

[TOC]

## 默认属性值

### defaultProps 静态属性

<u>defaultProps</u> 可以为 <u>Class</u> 组件添加默认 <u>props</u>。这一般用于 <u>props</u> 未赋值，但又不能为 null 的情况

> <span style="color:red">注意：<u>defaultProps</u> 是 <u>Class</u> 的属性，也就是静态属性，不是组件实例对象的属性</span>

```jsx
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>MyComponent - {this.props.max}</h2>
            </div>
        );
    }
}

MyComponent.defaultProps = {
    max: 10
}

ReactDOM.render(
    <MyComponent />,
    document.getElementById('app')
);
```

##### 基于 <u>static</u> 的写法

```jsx
class MyComponent extends React.Component {
  	static defaultProps = {
      	max: 10
    }
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <h2>MyComponent - {this.props.max}</h2>
            </div>
        );
    }
}

ReactDOM.render(
    <MyComponent />,
    document.getElementById('app')
);
```



## 非受控组件默认值

有的时候，我们希望给一个非受控组件一个初始值，但是又不希望它后续通过 <u>React.js</u> 来绑定更新，这个时候我们就可以通过 <u>defaultValue</u> 或者 <u>defaultChecked</u> 来设置非受控组件的默认值

### defaultValue 属性

```jsx
<input type="text" defaultValue={this.state.v1} />
```

### defaultChecked 属性

```jsx
<input type="checkbox" defaultChecked={this.state.v2}  />
<input type="checkbox" defaultChecked={this.state.v3}  />
```
