
import React from 'react'
import { useState } from 'react';
import "../styles/MenuAnimation.css"
interface Stage {
  index: number[];
  list: number[];
}
export default function MenuAnimation() {
    const [list, setList] = useState<number[]>([0,1,2,3,4,5,6,7,8,9])
    const [animating, setAnimating] = useState<boolean>(false)
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
    const [green, setGreen] = useState<number[]>([])
    const [stages, setStages] = useState<Stage[]>([])
    const [red, setRed] = useState<number[]>([])
    const [currentAnimationSort, setCurrent] = useState<number>(0)
    const addStage = (l: number[], indexes: number[])=>{
      stages.push({list: l, index: indexes})
  }
    const animateStages = async ()=>{
        await sleep(1000);
        for(let i=0;i<stages.length;i++){
          setList([...stages[i].list]);
          setRed([...stages[i].index])
          await sleep(150);
        }
        setStages([])
        setRed([])
        for(let i=0;i<list.length;i++){
            green.push(i)
            setGreen(([...green]))
            await sleep(50);
          }
          await sleep(2000);
          shuffle()
          setCurrent(currentAnimationSort+1)
          currentAnimationSort==2?setCurrent(0):setCurrent(currentAnimationSort+1)
          setAnimating(false)
          setGreen([]);
      }
    const shuffle = ()=>{
        list.sort(function (a, b) {
            return Math.random() - 0.5;
          });
        setList([...list])
    }
    const insertionSort = async()=>{
        shuffle()
        let l = [...list]
        console.log(l);
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
        setAnimating(true);
        animateStages();
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
        setAnimating(true);
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
        setAnimating(true);
        animateStages();
      
      }

    if(!animating){
      switch(currentAnimationSort){
        case 0:
          insertionSort();   
          break;
        case 1:
          bubbleSort();   
          break;
        case 2:
          selectionSort();   
          break;
      }
    }
    
    
    
    

  return (
    <div className='menu-animation'>
        {green.length>=1?<span className='menu-element menu-green'>[</span>:<span className='menu-element'>[</span>}

        {list.map((e,i)=>{
        return green.includes(i)?
        <span key={i} className="menu-element menu-green">{i!=list.length-1? ` ${e}, `:` ${e} `}</span>:
        red.includes(i)?<span key={i} className="menu-element menu-red">{i!=list.length-1? ` ${e}, `:` ${e} `}</span>:
        <span key={i} className="menu-element">{i!=list.length-1? ` ${e}, `:` ${e} `}</span>})}
    {green.length==list.length?<span className='menu-element menu-green'>]</span>:<span className='menu-element'>]</span>}
    </div>
  )
}
