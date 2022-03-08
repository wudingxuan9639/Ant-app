import React, { useState } from "react";
// import ReactDOM from "react-dom";

function App() {
    const [n, setN] = useState(0);
    const [m, setM] = useState(10);
    console.log("执行最外层盒子了");
    return (
      <>
        <div>
          最外层盒子
          <Child1 value={n} />
          <Child2 value={m} />
          <button
            onClick={() => {
              setN(n + 1);
            }}
          >
            n+1
          </button>
          <button
            onClick={() => {
              setM(m + 1);
            }}
          >
            m+1
          </button>
        </div>
      </>
    );
  }
  const Child1 = React.memo((props) => {
    console.log("执行子组件1了");
    return <div>子组件1上的n：{props.value}</div>;
  });
  
  const Child2 = React.memo((props) => {
    console.log("执行子组件2了");
    return <div>子组件2上的m：{props.value}</div>;
  });

  export default App;