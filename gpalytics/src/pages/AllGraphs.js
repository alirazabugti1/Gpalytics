import React, { useEffect, useState } from 'react';
import './AllGraphs.css';
import { Line, XAxis, Tooltip, YAxis, LineChart, ResponsiveContainer } from 'recharts';

function AllGraphs() {
  const [avgcgpa, setAvgCgpa] = useState([]);
  const [deptGraph, setDeptGraph] = useState([]);
  const [performanceGraph, setPerformanceGraph] = useState([]);
  const [subjectGraph, setSubjectGraph] = useState([]);
  const [topStudentsGraph, setTopStudentsGraph] = useState([]);

  //Big Graph + Small Graphs api fetch
  useEffect(() => {
    // 1️⃣ Top Departments By GPA
    fetch('http://localhost:5000/api/top_departments_gpa')
        .then(res => res.json())
        .then(data => setDeptGraph(data))
        .catch(error => console.error('Error fetching top_departments_gpa:', error));

    // 2️⃣ Student Performance Distribution
    fetch('http://localhost:5000/api/student_performance_distribution')
        .then(res => res.json())
        .then(data => setPerformanceGraph(data))
        .catch(error => console.error('Error fetching student_performance_distribution:', error));

    // 3️⃣ Subject-Wise Performance
    fetch('http://localhost:5000/api/subject_wise_performance')
        .then(res => res.json())
        .then(data => setSubjectGraph(data))
        .catch(error => console.error('Error fetching subject_wise_performance:', error));

    // 4️⃣ Top Performing Students
    fetch('http://localhost:5000/api/top_performing_students')
        .then(res => res.json())
        .then(data => setTopStudentsGraph(data))
        .catch(error => console.error('Error fetching top_performing_students:', error));

    // 5️⃣ Avg CGPA
    fetch('http://127.0.0.1:5000/avg_cgpa')
        .then(response => response.json())
        .then(data => {
            const formattedData = Object.keys(data).map(key => ({
                name: key,
                value: data[key]
            }));
            setAvgCgpa(formattedData);
        })
        .catch(error => console.error('Error fetching avg_cgpa:', error));

}, []);

  const dynamicGraphData = [
    { title: "📊 Top Departments By GPA", data: deptGraph, className: "deptGraph" },
    { title: "📈 Student Performance Distribution", data: performanceGraph, className: "performanceGraph" },
    { title: "📚 Subject-Wise Performance", data: subjectGraph, className: "subjectGraph" },
    { title: "🏆 Top Performing Students", data: topStudentsGraph, className: "topStudentsGraph" }
  ];

  return (
    <div className='AllGraphs'>
      {/* Big Graph */}
      <div className="biggraph">
        <h3 className="Trends">📊 Average CGPA By Semesters</h3>
        <div className="container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={avgcgpa}>
              <XAxis dataKey="name" stroke="#fff" fontSize={10} />
              <YAxis stroke="#fff" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: "transparent", border: "none" }} cursor={false} />
              <Line type="monotone" dataKey="value" stroke="#ff9800" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Small Graphs */}
      <div className='SmallGraphsContainer'>
        {dynamicGraphData.map((graph, index) => (
          <div key={index} className={graph.className}>
            <h3>{graph.title}</h3>
            <div className="container">
              <ResponsiveContainer width={480} height={250}>
                <LineChart data={graph.data}>
                  <XAxis dataKey="name" stroke="#fff" fontSize={10} />
                  <YAxis stroke="#fff" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: "transparent", border: "none" }} cursor={false} />
                  <Line type="monotone" dataKey="value" stroke={index % 2 === 0 ? "#ff9800" : "#4caf50"} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllGraphs;
