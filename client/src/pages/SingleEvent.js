import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import DepartmentList from '../components/DepartmentList';
import DateTime from '../utils/dateTime/dateTime';
import Auth from '../utils/auth';
/*import { QUERY_EVENT } from '../utils/queries';*/

const SingleEvent = (props) => {
    const { id: eventId } = useParams();

    const { loading, data } = useQuery(QUERY_EVENT, {
        variables: { id: eventId },
    });

    const event = data?.event || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="card mb-3 col-6">
                <div className="card-header">
                    <p>{event.name}</p>
                </div>
                <div className="card-body row">
                    <DateTime className="form-control" />
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            Select Department(s)
                        </button>
                        <div className="dropdown-menu">
                            <DepartmentList />
                        </div>
                    </div>
                    <select className="form-select" aria-label="Default select example">
                        <option selected>Completion Level</option>
                        <option value="1">Not Started</option>
                        <option value="2">In Progress</option>
                        <option value="3">Completed</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SingleEvent;
