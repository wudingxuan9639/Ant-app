import React,{ useRef } from 'react';
 
function Comp1() {
  //创建ref
  const inputEl = useRef();
  
  function getValue(){
    //获取input的value  inputEl.current就是Dom标签
    console.log(inputEl.current.value);
  }
  
  return (
    <div>
      {/* 赋值 */}
      <input ref={inputEl} type="text" />
      <button onClick={getValue}>点击获取value值</button>
    </div>
  )
}
export default Comp1;