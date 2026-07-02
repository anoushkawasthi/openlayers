# useEffect  

What happens is React ust only and only focus on what the UI should look like during rendering;  
Things like Timers, API calls, Accessing LocalStorage, Adding Event Listener all of this shouldn't be happening during this phase otherwise the UI will never be able to render since it will always get caught up with requests.  

First render -> then requests and all -> Build UI  

````
1) API Call 
import {useEffect} from "react"
function User(){
    useEffect(()=>{
        fetch("/Users")
    }
    //No dependancy array
    );
    return (
        <h1> User </h1>
    )
}

As no dependency array so it will run after each render.

DEPENDENCY ARRAY  
This is the second argument and makes a huge differnce in useEffect behaviour.
1) If no dependency array -> Runs after every Render.  
2) Empty Dependency array -> Runs once 
3) some variable -> every time the value of the variable changes it executes;

This makes sure only when a change occurs re-run.
