import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './styles/App.css';
import Visualizator from './components/Visualizator';
import MenuAnimation from './components/MenuAnimation';

function App() {
  const [count, setCount] = useState(105);

  const [listGenerated, setFlag] = useState(false);
  const [list, setList] = useState<number[]>([]);
  const [sort, setSort] = useState("bubble");
  const [startSorting, setStart] = useState(false);
  const [speed, setSpeed] = useState(1);




  const generateList = ()=>{
    setList([...[]])
    for (let i = 1; i <= count; i++) {
      list.push(i)
    }
    list.sort(function (a, b) {
      return Math.random() - 0.5;
    });
    setList([...list])
    setFlag(true);
    // setStart(true);
  }



  

  return (
    <div className="App">
      <h1>SORTING VISUALIZATOR</h1>
      {!listGenerated?<MenuAnimation/>:<div/>}
      
      <div className='menu'>
              <div className='left' style={{width: listGenerated?"0%":"100%", display: listGenerated?"none":"flex"}}>

        <div className='opt'>
            <h2>Select sorting algorithm</h2>
            <select name="" id="" onChange={(e)=>setSort(e.target.value)}>
              <option value="bubble" >BUBBLE SORT</option>
              <option value="insertion" >INSERTION SORT</option>
              <option value="selection" >SELECTION SORT</option>
              <option value="count" >COUNTING SORT</option>
          </select>
        </div>
        <div className='opt'>
          {listGenerated ? <div></div> :  <div className='button start' onClick={()=>generateList()}>Start visualization</div>}
        </div>
        {/* {listGenerated ? <div className='button small' onClick={()=>{setSort("bubble");setStart(true)}}>BUBBLE SORT</div> : <div/>}
        {listGenerated ? <div className='button small' onClick={()=>{setSort("insertion");setStart(true)}}>INSERTION SORT</div> : <div/>}
        {listGenerated ? <div className='button small' onClick={()=>{setSort("selection");setStart(true)}}>SELECTION SORT</div> : <div/>}
        {listGenerated ? <div className='button small' onClick={()=>{setSort("count");setStart(true)}}>COUNTING SORT</div> : <div/>} */}
        {/* {listGenerated ? <div className='button small' onClick={()=>{setSort("bucket");setStart(true)}}>BUCKET SORT</div> : <div/>} */}
        </div>
        {listGenerated?<div className='wholeRight'><div className='right'>

        <Visualizator list={list} algorithm={sort} animate={startSorting} delay={speed}/>
       

        </div> {!startSorting?<div className='start p-abs' onClick={()=>setStart(true)}>Start</div>:<div/>}</div>:<div/>}
      </div>
      
      
      
    </div>
  );
}

export default App;
