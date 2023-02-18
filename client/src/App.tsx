import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Visualizator from './components/Visualizator';

function App() {
  const [count, setCount] = useState(105);

  const [listGenerated, setFlag] = useState(false);
  const [list, setList] = useState<number[]>([]);
  const [sort, setSort] = useState("bubble");
  const [startSorting, setStart] = useState(false);


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
  }



  

  return (
    <div className="App">
      <div className='left'>
        {/* <div className='opt'>
          <label htmlFor="rangeQuantity">List will consist of <h2 className='showCount'>{count}</h2> elements</label>
          <input type="range" value={count} min={10} max={200} step={1} name="rangeQuantity" id="rangeQuantity" onChange={(e)=>setCount(parseInt(e.target.value))} />
        </div> */}
        <div className='opt'>
         
          {listGenerated ? <div></div> :  <div className='button' onClick={()=>generateList()}>GENERATE LIST</div>}
        </div>
        {listGenerated ? <div className='button small' onClick={()=>{setSort("bubble");setStart(true)}}>BUBBLE SORT</div> : <div/>}
      {listGenerated ? <div className='button small' onClick={()=>{setSort("insertion");setStart(true)}}>INSERTION SORT</div> : <div/>}
      {listGenerated ? <div className='button small' onClick={()=>{setSort("selection");setStart(true)}}>SELECTION SORT</div> : <div/>}
      </div>
      <div className='right'>
        
        <Visualizator list={list} algorithm={sort} animate={startSorting}/>
      </div>
      
    </div>
  );
}

export default App;
