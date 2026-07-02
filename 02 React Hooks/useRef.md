# useRef  
useRef is React's way of storing a value that survives re-renders without causing a re-render.  
Then how come is it different from a simple variable?  
````
Using a normal variable
function Counter() {

    let clicks = 0;

    function handleClick() {
        clicks++;
        console.log(clicks);
    }

    return (
        <>
            <button onClick={handleClick}>
                Click
            </button>
        </>
    );
}
  
  everytime the component renders, the values are deleted and then reassigned.
````
  
  In cases where we never re-render we can definitely use a normal variable.  
  But React component almost always re-render. 
  ### Example: Parent re-renders so the child has to render.
    
````
    function Parent(){
        const [theme, setTheme]=useState(false);

        return(
            <div>
               <button onCLick={()={
                setTheme(!theme)    
               }}>
               Change Theme
               </button>
               <Child/>
            </div>
        );
    };

    function Child(){
        const counter=useRef(0);

        function handleClick(){
            counter++;
            console.log("Click =" + counter);
        }
        return(
            <div>
            <button onClick ={handleClick}>CLicks</button>
            </div> 
        );
    };
      
        
    Now understand here since the Parent function is bound to re-render whenever the theme is changed so if the counter was not a useRef variable then in each re-render the value must have been lost/reassigned and we could not track it.  
````


| Normal Variable | useRef |
|-----------------|--------|
| Lives only for the current render | Lives for the lifetime of the component |
| Recreated on every render | Same object on every render |
| Loses its value after a re-render | Keeps its value after a re-render |
| React doesn't preserve it | React preserves it |

## Other Examples:
````
    1) Timer:  
    If no useRef was used in that case, everytime rendering would happen the timer would start again.  
    
    function Timer(){
        let timer;
        function start (){
            timer=setInterval(...);
        }
        function end(){
            timer=clearInterval(...);
        }
    }


    instead if we used;  
      
    function Timer(){
        const timer=useRef(null);
        function start (){
            timer.current=setInterval(()=>{
                console.log("Tick");
            },
            1000);  // Prints "Tick" to the console every 1 seconds
        }
        function end(){
            clearInterval(timer.current);
        }

        return(
            <>
            <button onClick={start}> Start </>
            <button onClick={stop}> Stop </>
        )
    }
````
````  
2) I want to show both previous and current counter values  

import {useState, useRef, useEffect} fron "react";

function Values(){
    const [count, setCount]= useState(0);
    const prev=useRef(null);
    useEffect(()=>{
        prev.current=count;
    },[count]);

    return(
        <> 
        <h1> Current:{count} </h1>
        <h1> Previous:{prev.current} </h1>
        <button onClick ={()=> setCount=count+1} > Increment </button>
        </>
    );
};

````