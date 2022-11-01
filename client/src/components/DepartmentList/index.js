import React from 'react';
import { QUERY_COMPANY_DEPTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const DepartmentList = ({ departments }) => {
    if (!departments.length) {
        return;
    }

    const { loading, data } = useQuery(QUERY_COMPANY_DEPTS);

    if (loading) {
        return <div>Loading...</div>
    };

    /*const departments = data?.departments || [];*/

    return (
        <div>
            {departments &&
                departments.map(department => (
                    <button key={department._id} className="dropdown-item" type="button">
                        <input type="checkbox" />{department.name}
                    </button>
                ))}
        </div>
    )
}

export default DepartmentList;