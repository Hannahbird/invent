import React from 'react';
import EventList from '../components/EventList';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';


const Dashboard = () => {
    const { username: userParam } = useParams();

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