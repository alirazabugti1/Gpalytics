import React, { useEffect, useState } from 'react'
import './dashboxes.css'

function DashBoxes(props)
{
    //Student Count ka fetch api
    const [count, newcount] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/student-count')
            .then(response => response.json())
            .then(data => newcount(data.total_students))
            .catch(error => console.error('Error Fetching Data:', error));
    }, []);

    //Student Average Cgpa ka fetch Api
    const [cgpa, setaveragecgpa] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/student-averagecgpa')
            .then(response => response.json())
            .then(data => setaveragecgpa(data.cgpa))
            .catch(error => console.error('Error Fetching Data:', error));
    }, []);

    //Student High Cgpa ka fetch Api
    const [high,newhigh] = useState(0);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/student-highcgpa')
            .then(response => response.json())
            .then(data => newhigh(data.cgpa))
            .catch(error => console.error('Error Fetching Data:', error));
    }, []);
    
    //Course Completion Rate ka fetch Api
    const [rate, newrate] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/student-completionrate')
            .then(response => response.json())
            .then(data => newrate(data.completion_rate))  // 👈 update yahan
            .catch(error => console.error('Error Fetching Data:', error));
    }, []);

     //Failing Student ka fetch Api
     const [olddata,newdata] = useState(0);

     useEffect(() => {
         fetch('http://127.0.0.1:5000/student-failing')
             .then(response => response.json())
             .then(data => newdata(data.failing_students))
             .catch(error => console.error('Error Fetching Data:', error));
     }, []);

    //Top dept ka fetch Api
    const [topDept, setTopDept] = useState('');

  useEffect(() => {
    
    fetch('http://127.0.0.1:5000/student-topdept')
      .then((response) => response.json())
      .then((data) => {
        setTopDept(data.top_dept);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);


  return (
    <div className='allbox'>

    <div className='box box1'>

        <p>{props.students}</p>
        <p id='first'>{count}</p>
        
    </div>
   
    <div className='box box2'>
        <p>{props.cgpa}</p>
        <p id='second'>{cgpa}</p>
    </div>

    <div className='box box3'>
        <p>{props.highestcgpa}</p>
        <p id='third'>{high}</p>
    </div>
    
    <div className='box box4'>
        <p>{props.rates}</p>
        <p id='fourth'>{rate}</p>
    </div>

    <div className='box box5'>
        <p>{props.fail}</p>
        <p id='fifth'>{olddata}</p>
    </div>
    
    <div className='box box6'>
        <p>{props.topdept}</p>
        <p id='sixth'>{topDept}</p>
    </div>
    


    </div>
  );
}

export default DashBoxes;
