import React, { useEffect, useRef, useState } from 'react'
import "../styles/Visualizator.css"
interface Stage {
  index: number[];
  list: number[];
}
export default function Visualizator(props: {list: number[], algorithm: string, animate: boolean, delay: number}) {
    const [height, setHeight] = useState(500);
    const [width, setWidth] = useState();
    const [animating, setAnimating] = useState(false);
    const [list, setList] = useState<number[]>(props.list);
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));


    const [stages, setStages] = useState<Stage[]>([])
    const [green, setGreen] = useState<number[]>([])
    const [red, setRed] = useState<number[]>([])


    const addStage = (l: number[], indexes: number[])=>{
        stages.push({list: l, index: indexes})
    }

    const animateStages = async ()=>{
      console.log(stages.length);
      for(let i=0;i<stages.length;i++){
        setList([...stages[i].list]);
        setRed([...stages[i].index])
        await sleep(props.delay);
      }
      setStages([])
      setRed([])
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
            addStage([...l],[j,j+1]);
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
              addStage([...l],[j+1,j]);
          }
          l[j+1] = current;
          addStage([...l],[i,j+1]);
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
              addStage([...l],[i,min]);
          }
          addStage([...l],[]);
      }
      animateStages();
    
    }



    const countingSort = () => {
      let inputArr = [...list]
      let n = inputArr.length
      let k = Math.max(...inputArr);
      let t;
      const temp = new Array(k + 1).fill(0);
      for(let i = 0; i < n; i++){
        t = inputArr[i];
        
        temp[t]++;
        addStage([...inputArr],[i,t]);
      }
      for(let i = 1; i <= k; i++){
        temp[i] = temp[i] + temp[i - 1];  
      }
      const outputArr = new Array(n).fill(0);
      
      for(let i = n - 1; i >= 0; i--) {
        t = inputArr[i];
        outputArr[temp[t] - 1] = t;  
        addStage([...outputArr],[i,t]);
        temp[t] = temp[t] - 1;		
       }
      animateStages()
    }




    const bucketSort = ()=>
    {
      let arr = [...list]
      let n = arr.length
        if (n <= 0)
                return;
      
            // 1) Create n empty buckets      
            let buckets = new Array(n);
      
            for (let i = 0; i < n; i++)
            {
                buckets[i] = [];
            }
      
            // 2) Put array elements in different buckets
            for (let i = 0; i < n; i++) {
                let idx = arr[i] * n;
                let flr = Math.floor(idx);
                buckets[flr].push(arr[i]);
            }
      
            // 3) Sort individual buckets
            for (let i = 0; i < n; i++) {
                buckets[i].sort(function(a:number,b:number){return a-b;});
            }
      
            // 4) Concatenate all buckets into arr[]
            let index = 0;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < buckets[i].length; j++) {
                    arr[index++] = buckets[i][j];
                    addStage([...arr],[i,j]);
                }
            }
            animateStages()
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
        case"count":
          countingSort()
          break;
        case"bucket":
          bucketSort()
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
              return green.includes(index)?<div key={index} className='element green' style={{height: (element/list.length)*height, width: 8} }></div>:red.includes(index)?<div key={index} className='element red' style={{height: (element/list.length)*height, width: 8} }></div>:<div key={index} className='element' style={{height: (element/list.length)*height, width: 8} }></div>
             
          })}
      </div>
      
    </div>
  )
}
