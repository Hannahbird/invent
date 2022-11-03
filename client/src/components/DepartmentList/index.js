import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMPANY_DEPTS } from '../../utils/queries';

const DepartmentList = ({ id }) => {
    const { loading, data } = useQuery(QUERY_COMPANY_DEPTS, {
        variables: { deptId: id }
    });

    const departments = data?.departments || {};

    if (loading) {
        return <div>Loading...</div>
    };

    if (!data.departments.length) {
        return <h3>No departments yet</h3>;
    }

    return (
        <div className="dropdown-menu">
            {departments.map(department => {
                <button key={department._id} className="dropdown-item" type="button">
                    <input type="checkbox" />{department.deptName}
                </button>
            })}
        </div>
    )
}

export default DepartmentList;