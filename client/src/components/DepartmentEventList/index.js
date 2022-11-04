import React from 'react';
import { QUERY_DEPARTMENT_EVENTS } from '../../utils/queries';

const DepartmentEventList = () => {
    const { loading, data } = useQuery(QUERY_DEPARTMENT_EVENTS);

    const events = data?.events || {};

    if (loading) {
        return <div>Loading...</div>;
    };

    if (events.length) {
        return (
            <>
                <h3>No Events Scheduled</h3>
            </>
        );
    };
};