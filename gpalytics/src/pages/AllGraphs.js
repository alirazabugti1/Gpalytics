import React from 'react';
import './AllGraphs.css';
import { Line, XAxis, Tooltip, YAxis, LineChart, ResponsiveContainer } from 'recharts';

function AllGraphs() {
  const data = [
    { name: 'Semester 1', value: 3.2 },
    { name: 'Semester 2', value: 3.5 },
    { name: 'Semester 3', value: 3.6 },
    { name: 'Semester 4', value: 3.8 },
  ];
  
  const graphData = [
    { title: "📊 Top Departments By GPA", data: [
        { name: 'CS', value: 3.5 },
        { name: 'EE', value: 3.2 },
        { name: 'ME', value: 3.6 },
        { name: 'BBA', value: 3.4 }
      ], className: "deptGraph" },
      
    { title: "📈 Student Performance Distribution", data: [
        { name: '2.0-2.5', value: 10 },
        { name: '2.5-3.0', value: 15 },
        { name: '3.0-3.5', value: 20 },
        { name: '3.5-4.0', value: 25 }
      ], className: "performanceGraph" },
      
    { title: "📚 Subject-Wise Performance", data: [
        { name: 'Math', value: 80 },
        { name: 'Physics', value: 75 },
        { name: 'CS', value: 85 },
        { name: 'English', value: 78 }
      ], className: "subjectGraph" },
      
    { title: "🏆 Top Performing Students", data: [
        { name: 'Ali', value: 3.9 },
        { name: 'Ahmed', value: 3.8 },
        { name: 'Sara', value: 3.85 },
        { name: 'Zain', value: 3.7 }
      ], className: "topStudentsGraph" }
  ];
  
  return (
    <div className='AllGraphs'>
      {/* Big Graph */}
      <div className="biggraph">
        <h3 className="Trends">📊 Overall Performance Trends</h3>
        <div className="container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
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
        {graphData.map((graph, index) => (
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
