import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  
const Navbar = () => {
  return (
   
    <nav className="navbar">
   <div className="logo">
  <p className="logo-title">Gpalytics</p>
  <p className="logo-slogan">Analyze, Improve, Excel.</p>
 
</div>
<h3 style={{paddingLeft:'15px'}}>Student Peformance & Analytics Dashboard</h3>
      
     <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/performance-analysis">Performance Analysis</Link></li>
      <li><Link to="/student-list">Student List</Link></li>
     </ul>
    </nav>
  );
};

export default Navbar;
