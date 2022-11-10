import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import i from "../../assets/images/i.png";

import Auth from "../../utils/auth";

const Header = (props) => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    // <Carousel variant="dark">
    <header className="mb-4 py-2 flex-row header align-center">
      <div className="header">
        <Link to="/">
          <h1>
            <span id="in">in</span>Vent
          </h1>
        </Link>
      </div>
      <div className="container flex-row justify-space-between-lg justify-flex-end align-left">
        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link className="navigation" to="/">
                Events
              </Link>{" "}
              ||{" "}
              <Link className="navigation" to="/spaces">
                Spaces
              </Link>{" "}
              ||{" "}
              <Link className="navigation" to="/departments">
                Departments
              </Link>{" "}
              ||{" "}
              <Link className="navigation" to="/gettingstarted">
                Help
              </Link>{" "}
              ||{" "}
              <a className="navigation" href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link className="navigation" to="/login">
                Login
              </Link>{" "}
              ||{" "}
              <Link className="navigation" to="/signup">
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
    // </Carousel>
  );
};

export default Header;
