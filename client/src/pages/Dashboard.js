import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import EventList from '../components/EventList';
import Auth from '../utils/auth';


const Dashboard = () => {


    return (
        <div>
            <div>
                <h2>
                    Users Admin Dashboard
                </h2>
            </div>

            <div>
                <div className="card mb-3">
                    <div className="card-header">
                        <p>Card Tester</p>
                    </div>
                    <div className="card-body row">
                        <form>
                            <div className="input-group date" id="datepicker">
                                <input type="date" className="form-control" id="date" />
                            </div>
                        </form>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Completion Level</option>
                            <option value="1">Not Started</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                        </select>
                        <select className="form-select" aria-label="Default select example">
                            <option selected>Select Manager</option>
                            <option value="1">Jimmy</option>
                            <option value="2">John</option>
                            <option value="3">Jamal</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;