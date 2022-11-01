import React from 'react';

const DepartmentList = ({ departments }) => {
    if (!departments.length) {
        return;
    }

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