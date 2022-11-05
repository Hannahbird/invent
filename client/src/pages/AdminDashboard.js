import React from 'react';
import EventList from '../components/EventList';

import Auth from '../utils/auth';

const Dashboard = () => {
  return (
    <div>
      <h2>Viewing your dashboard.</h2>

      <div className="flex-row justify-space-between mb-3">
        <div>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
