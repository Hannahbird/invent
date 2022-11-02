import React from 'react';
import { QUERY_COMPANY_DEPTS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

const DepartmentList = () => {

    /*const { loading, data } = useQuery(QUERY_COMPANY_DEPTS);*/

    //if (loading) {
    //    return <div>Loading...</div>
    //};

    const data = [{ _id: 1, deptName: "Finance" }, { _id: 2, deptName: "IT" }];

    return (
        <div className="dropdown-menu">
            <button className="dropdown-item" type="button">
                <input type="checkbox" />IT
            </button>
            {/*{data.map(department => {*/}
            {/*    <button key={department._id} className="dropdown-item" type="button">*/}
            {/*        <input type="checkbox" />{department.deptName}*/}
            {/*    </button>*/}
            {/*})}*/}
        </div>
    )
}

export default DepartmentList;