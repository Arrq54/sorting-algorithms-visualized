import React, { useEffect, useRef, useState } from 'react'
import "../styles/Visualizator.css"
export default function Visualizator(props: {list: number[], algorithm: string, animate: boolean}) {
    const [height, setHeight] = useState(500);
    const [width, setWidth] = useState();
    const [animating, setAnimating] = useState(false);
    const [list, setList] = useState<number[]>(props.list);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


    const [stages, setStages] = useState<number[][]>([])
    const [green, setGreen] = useState<number[]>([])


    const addStage = (l: number[])=>{
        stages.push(l)
    }

    const animateStages = async ()=>{
      console.log(stages.length);
      for(let i=0;i<stages.length;i++){
        setList([...stages[i]]);
      
        await sleep(1 );
      }
      setStages([])
      for(let i=0;i<list.length;i++){
        green.push(i)
        setGreen(([...green]))
        await sleep(5);
      }
      return
      
  
    }
    
    const bubbleSort =async ()=>{
      let l = [...list]
      for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < l.length; j++) {
          if (l[j] > l[j + 1]) {
            let temp = l[j];
            l[j] = l[j + 1];
            l[j + 1] = temp;
            addStage([...l]);
          }
        }
      }
      animateStages();
    }

    const insertionSort = async()=>{
      let l = [...list]
      let n = l.length;
      for (let i = 1; i < n; i++) {
          let current = l[i];
          let j = i-1; 
          while ((j > -1) && (current < l[j])) {
              l[j+1] = l[j];
              j--;
              addStage([...l]);
          }
          l[j+1] = current;
          addStage([...l]);
      }
      animateStages();
    }

    const selectionSort = async()=>{
      let l = [...list]
      let n = l.length;
        
      for(let i = 0; i < n; i++) {
          let min = i;
          for(let j = i+1; j < n; j++){
              if(l[j] < l[min]) {
                  min=j; 
              }
          }
          if (min != i) {
              // Swapping the elements
              let tmp = l[i]; 
              l[i] = l[min];
              l[min] = tmp;   
              addStage([...l]);
          }
          addStage([...l]);
      }
      animateStages();
    
    }

    const startSorting = ()=>{
      switch(props.algorithm){
        case"bubble":
          bubbleSort()
          break;
        case"insertion":
          insertionSort()
          break;
        case"selection":
          selectionSort()
          break;
        default: break;
      }
    }

    if(props.animate && animating==false){
      startSorting()
      setAnimating(true)
    }
  return (
    <div className='visualizator' >
      <div className='items'>
        {list.map((element,index)=>{
              return green.includes(index)?<div key={index} className='element green' style={{height: (element/list.length)*height, width: 8} }></div>:<div key={index} className='element' style={{height: (element/list.length)*height, width: 8} }></div>
             
          })}
      </div>
      
    </div>
  )
}
