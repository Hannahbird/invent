import React from 'react';
import EventList from '../components/EventList';

import Auth from '../utils/auth';

const Dashboard = () => {
  return (
    <div>
      <div>
        <div>
          <h2>Viewing your dashboard.</h2>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
