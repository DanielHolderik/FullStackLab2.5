import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [projectAssigments, setprojectAssigments] = useState([])
  const [sortKey, setSortKey] = useState({key: 'startDate', order: 'decscending'})

  const fetchProjectAssigments = async () => {
    try{
      const response = await axios.get('/api/projectassigments');
      const data = response.data;
      console.log("data: ", data); //debug
      setprojectAssigments(data);
    }
    catch (err){
      console.error("Error fetching projectAssigments :", err);
    }
  };

  useEffect(() => {
    fetchProjectAssigments();
    const refresh = setInterval(fetchProjectAssigments, 30000); 
    return () => clearInterval(refresh); 
  },[]);

  const sort =

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
