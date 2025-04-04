import React from 'react'
import './dashboxes.css'

function DashBoxes(props) {
  return (
    <div className='allbox'>

    <div className='box box1'>

        <p>{props.students}</p>
        <p id='first'>1011</p>
        
    </div>
   
    <div className='box box2'>
        <p>{props.cgpa}</p>
        <p id='second'>2.78</p>
    </div>

    <div className='box box3'>
        <p>{props.highestcgpa}</p>
        <p id='third'>3.97</p>
    </div>
    
    <div className='box box4'>
        <p>{props.rates}</p>
        <p id='fourth'>87%</p>
    </div>

    <div className='box box5'>
        <p>{props.fail}</p>
        <p id='fifth'>19</p>
    </div>
    
    <div className='box box6'>
        <p>{props.topdept}</p>
        <p id='sixth'>Computer Science</p>
    </div>
    


    </div>
  );
}

export default DashBoxes;
