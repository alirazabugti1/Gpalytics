import React from "react";
import AllGraphs from './AllGraphs';
const PerformanceAnalysis = () => {
  return (
    <>
    <div>
    <h1 style={{paddingLeft: '410px', fontSize: "45px"}}>Performance Analysis</h1>
    </div>
    <div className="graphs">
    <AllGraphs/>
    </div>
    </>
  );
};

export default PerformanceAnalysis;
