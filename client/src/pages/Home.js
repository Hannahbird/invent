import React from 'react';
import HomeViews from '../components/HomeViews';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  return (
    <div className="flex-row">
      <div className="col-12 mb-3">
        <HomeViews />
      </div>
    </div>
  );
};

export default Home;
