import React from "react";
import "../styles/HomePageAdmin.scss";

const Stats = () => {
    return (
      <div className="stats">
        <div className="stat-box">Current Visitors<br /><strong>123</strong></div>
        <div className="stat-box">Total Visits Today<br /><strong>1234</strong></div>
        <div className="stat-box" id="button" role="button">Total Users<br /><strong>12345</strong></div>
      </div>
    );
  };
  
  export default Stats;
  