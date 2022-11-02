import React from 'react';

function Navigation(props) {
  const tabs = [
    'Home',
    'Create a new event',
    'Manage Spaces',
    'Manage Departments',
    'Log Out',
  ];
  return (
    <ul className="nav">
      {tabs.map((tab) => (
        <li className="nav-item" key={tab}>
          <a
            href={'#' + tab.toLowerCase()}
            onClick={() => props.handlePageChange(tab)}
            className={
              props.currentPage === tab ? 'nav-link active' : 'nav-link'
            }
          >
            {tab}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Navigation;
