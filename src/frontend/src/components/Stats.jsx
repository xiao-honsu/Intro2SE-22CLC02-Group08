import React from "react";
import "../styles/HomePageAdmin.scss";
import { Link } from "react-router-dom";
const Stats = ({ totalUsers, totalVisitToday, currentVisitors }) => {
  return (
    <div className="stats">
      <div className="stat-box">
        Current Visitors<br />
        <strong>{currentVisitors}</strong>
      </div>
      <div className="stat-box">
        Total Visits Today<br />
        <strong>{totalVisitToday}</strong>
      </div>
      <Link to="/ListUser" className="stat-box">
        <div>
          Total Users<br />
          <strong>{totalUsers}</strong>
        </div>
      </Link>
    </div>
  );
};

export default Stats;
