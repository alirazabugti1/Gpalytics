import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/dashboard";
import PerformanceAnalysis from "./pages/performanceanalysis";
import StudentList from "./pages/studentslist";
import './App.css'
function App() {
  return (
    <>
    <Router>
    <Navbar/>
      <Routes>
         <Route path='/' element={<Dashboard/>}/>
         <Route path='/performance-analysis' element={<PerformanceAnalysis/>}/>
         <Route path='/student-list' element={<StudentList/>}/>
      </Routes>
    </Router>
    
    </>
  );
}
export default App;
