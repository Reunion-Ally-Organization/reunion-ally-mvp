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

const HowItWorksSection = () => {
  return (
    <section className="how-it-works-section">
      <h2 className="how-it-works-title">How It Works</h2>
      <p className="how-it-works-description">Get Your Reunion Organized in Three Simple Steps</p>
      <div className="how-it-works-steps">
        <div className="how-it-works-step">
          <div className="how-it-works-icon">🎉</div>
          <h3>Create Your Event</h3>
          <p>Set up your reunion details, invite lists, and budget in minutes.</p>
        </div>
        <div className="how-it-works-step">
          <div className="how-it-works-icon">📧</div>
          <h3>Invite & Coordinate</h3>
          <p>Share invitations, track RSVPs, and join your team for planning.</p>
        </div>
        <div className="how-it-works-step">
          <div className="how-it-works-icon">✅</div>
          <h3>Manage & Execute</h3>
          <p>Collect payments, share details, and offer guests everything in one place.</p>
        </div>
      </div>
    </section>
  );
};

const DashboardPage = () => (
  <>
    <DashboardPreview />
    <HowItWorksSection />
  </>
);

export default DashboardPage;