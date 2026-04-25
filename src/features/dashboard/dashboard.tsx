import React from 'react';
import './dashboard.css';

const DashboardPreview = () => {
  return (
    <section className="dashboard-preview">
      <h2 className="dashboard-title">See It In Action</h2>
      <p className="dashboard-description">A Complete Reunion Management Dashboard</p>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Event Details</h3>
          <p>Date: July 20th, 2026</p>
          <p>Time: 11:00am - 5:00pm</p>
          <p>Location: Hilton Hotel Ballroom</p>
          <p>Cost: $25 per person</p>
        </div>
        <div className="dashboard-card">
          <h3>Attendance (102/300)</h3>
          <ul>
            <li>John Doe</li>
            <li>Jane Smith</li>
            <li>Jeffrey Brown</li>
            <li>Quinn White</li>
            <li>Fred Swift</li>
          </ul>
        </div>
        <div className="dashboard-card">
          <h3>Budget Overview</h3>
          <p>Collected: $3,700</p>
          <p>Remaining: $1,500</p>
        </div>
      </div>
    </section>
  );
};

export default DashboardPreview;