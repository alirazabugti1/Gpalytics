import React, { useEffect, useState } from "react";
import './Studentlist.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/students")  
            .then(response => response.json())
            .then(data => setStudents(data))
            .catch(error => console.error("Error fetching students:", error));
    }, []);
    
    return (
        <>
            <div>
                <h1 style={{ paddingLeft: '470px', fontSize: "45px" }}>Student List</h1>
            </div>
            <div className='tab'>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Name</th>
                            <th>Roll Number</th>
                            <th>Department</th>
                            <th>Gender</th>
                            <th>Semester</th>
                            <th>CGPA</th>
                            <th>Attendence</th>
                        </tr>
                    </thead>
                    <tbody>
                    {students.length > 0 ? (
  students.map((student, index) => {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{student.Name}</td>
        <td>{student.Rollnumber}</td>
        <td>{student.Department}</td>
        <td>{student.Gender}</td>
        <td>{student.Semester}</td>
        <td>{student.Cgpa}</td>
        <td>{student.Attendance}</td>
      </tr>
    );
  })
) : (
  <tr><td colSpan="6">No Data Available</td></tr>
)}

                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StudentList;
