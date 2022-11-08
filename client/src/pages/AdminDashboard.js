import React from 'react';
import EventList from '../components/EventList';
import AdminHeader from '../components/AdminHeader';

import Auth from '../utils/auth';

const Dashboard = () => {
  return (
    <div>
      <AdminHeader />
      <div className="container background">
        <div>
          <h2>Viewing your dashboard.</h2>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
