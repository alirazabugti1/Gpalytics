import React from "react";
import DashBoxes from "./dashboxes"; 
import Sidebar from "../component/Sidebar";
const Dashboard = () =>
{
  return (
    <>
    <div>
      <h1 style={{paddingLeft: '470px', fontSize: "45px"}}>Dashboard</h1>
      
      <DashBoxes students="Total Students" cgpa = "Average CGPA" 
      highestcgpa = "Highest Cgpa" rates="Course Completion Rates" fail="Failing Students" topdept="Top Peforming Department"/>
      
    </div>
    <Sidebar/>
    </>
  );
};

export default Dashboard;
