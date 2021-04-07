import worker from './dumbworker'
import WebWorker from './dumbWorkerSetup'
import React, { useState, useEffect } from 'react';


const fetchWorker = (workerInstance, count, setCount) => {
    workerInstance.postMessage('Fetch Users');

    workerInstance.addEventListener('message', event => {
        setCount(count+1)
        console.log("I, webworker have returned!!! with: " + event.data)
    });
}

const App = () => {

    const [workerInstance, setWorkerInstance] = useState(new WebWorker(worker));
    const [count, setCount] = useState(0);
    // Similar to componentDidMount and componentDidUpdate:


  

  
    return <div>
        <button onClick={()=>{console.log("yo you pressed?" + ` ${count}`);setCount(count+1);fetchWorker(workerInstance, count, setCount)}}>Press Me to send out WW request</button>
    </div>
}



export default App