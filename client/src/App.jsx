import { useState } from 'react'
import { useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'
import { set } from 'mongoose'

function App() {
  const [projectAssigments, setprojectAssigments] = useState([]) //data from backedn
  const [sortKey, setSortKey] = useState({key: 'startDate', order: 'decscending'}) //

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


  const handleSort = (key) => {
    setSortKey((prev) => {
      if (prev.key === key) {
        return { ...prev, order: prev.order === 'ascending' ? 'descending' : 'ascending' };
      } else {
        return { key, order: 'ascending' };
      }
    });
  };
  
  const sort = [...projectAssigments].sort((a, b) => {
    if (sortKey.order === 'ascending'){
      return a[sortKey.key] > b[sortKey.key] ? 1 : -1;
    }
    else{
      return a[sortKey.key] < b[sortKey.key] ? 1 : -1;
    }
  }); 



  return (
    <div className="App">
      <h1>Project Assigments</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('projectName')}>Project Name</th>
            <th onClick={() => handleSort('startDate')}>Start Date</th>
            <th onClick={() => handleSort('EmployeName')}>End Date</th>
            <th onClick={() => handleSort('status')}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sort.map((projectAssigment) => (
            <tr key={projectAssigment._id}>
              <td>{projectAssigment.projectName}</td>
              <td>{projectAssigment.startDate}</td>
              <td>{projectAssigment.endDate}</td>
              <td>{projectAssigment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default App
