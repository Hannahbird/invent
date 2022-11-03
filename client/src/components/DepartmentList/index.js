import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_COMPANY_DEPTS } from '../../utils/queries';

const DepartmentList = () => {
    const { loading, data } = useQuery(QUERY_COMPANY_DEPTS);

    const departments = data?.departments || [];

    console.log(departments);

    if (loading) {
        return <div>Loading...</div>
    };

    if (!data.departments.length) {
        return <h3>No departments yet</h3>;
    }

    return (
        <div className="dropdown-menu">
            {departments &&
                departments.map(department => (
                <button key={department._id} className="dropdown-item" type="button">
                    <input type="checkbox" />{department.deptName}
                </button>
            ))}
        </div>
    )
}

export default DepartmentList;