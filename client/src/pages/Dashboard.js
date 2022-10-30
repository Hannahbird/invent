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
                    <div class="card-header">
                        <form className="row">
                            <div className="input-group date" id="datepicker">
                                <input type="text" className="form-control" id="date" />
                                <span className="input-group-append">
                                    <span className="input-group-text bg-light d-block">
                                        <i className="fa fa-calendar"></i>
                                    </span>
                                </span>
                            </div>
                        </form>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Select Progress
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Not Started</a></li>
                                <li><a className="dropdown-item" href="#">In Progress</a></li>
                                <li><a className="dropdown-item" href="#">Completed</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;