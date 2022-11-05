import React from 'react';
import DeptHeader from '../components/DeptHeader';
import DepartmentEventList from '../components/DepartmentEventList';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../utils/queries';

const DepDashboard = () => {
  return (
    <div>
      <h2>Viewing your dashboard.</h2>

      <div className="flex-row justify-space-between mb-3">
        <div>
          <DepartmentEventList />
        </div>
      </div>
    </div>
  );
};

export default DepDashboard;
