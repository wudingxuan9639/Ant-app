
import React, { useState ,useContext, createContext} from 'react';
import './App.css';

// 创建一个 context
const Context = createContext(0)



// 组件一, useContext 写法
function Item3 () {
  const count = useContext(Context);
  return (
    <div>{ count }</div>
  )
}

function App () {
  const [ count, setCount ] = useState(0)
  return (
    <div>
      点击次数: { count } 
      <button onClick={() => { setCount(count + 1)}}>点我</button>
      <Context.Provider value={count}>
        {/* <Item1></Item1>
        <Item2></Item2> */}
        <Item3></Item3>
      </Context.Provider>
    </div>
    )
}

export default App;
