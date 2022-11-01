import React from 'react';

//import { Navigate, useParams } from 'react-router-dom';
//import { useQuery, useMutation } from '@apollo/client';

import DateTime from '../utils/dateTime/dateTime';

//import EventList from '../components/EventList';
//import Auth from '../utils/auth';


const Dashboard = () => {

    return (
        <div>
            <h2>
                Viewing your dashboard.
            </h2>

            <div className="flex-row justify-space-between mb-3">
                <div>
                    <EventList events={user.events} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;