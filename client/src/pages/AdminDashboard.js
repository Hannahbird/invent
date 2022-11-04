import React from 'react';
import EventList from '../components/EventList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

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
