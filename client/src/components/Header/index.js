import React, { useState } from 'react';
import Home from '../../pages/Home';
import DepartmentList from '../DepartmentList';
import Navigation from '../Navigation';

const Header = () => {
  //state of the current page
  const [currentPage, handlePageChange] = useState('Home');

  const renderPage = () => {
    //switch statement that will return the appropriate component of the 'current Page'
    switch (currentPage) {
      case 'Home': {
        return <Home />;
      }
      case 'Manage Departments': {
        return <DepartmentList />;
      }
      default:
        return <Home />;
    }
  };
  return (
    <header className="mb-4 py-2 flex-row align-center">
      <div className="container header flex-row justify-space-between-lg justify-center align-left">
        <h1>InVent</h1>
      </div>
      <div>
        <Navigation
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
        <div>
          {
            // Render the component returned by 'renderPage()'
            renderPage()
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
