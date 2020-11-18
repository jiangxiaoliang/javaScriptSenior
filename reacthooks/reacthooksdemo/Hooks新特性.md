# React Hooks
Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## React Hooks 优势
- 简化组件逻辑
- 复用状态逻辑
- 无需使用类组件编写

## React 常用 Hook
- useState  
    `const [state, setState] = useState(initialState);`
- useEffect
    类组件
        componentDidMount、componentDidUpdate 和 componentWillUnmount
    需要清除的副作用    
- useRef
- useContext
    context
        createContext、Provider、Consumer、contextType
- useMemo 
- useCallback

## Hook 使用规则

- 只在最顶层使用 Hook
- 只在 React 函数中调用 Hook
    - React 函数组件中
    - React Hook 中

## 自定义 Hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。
