import React from "react";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-3 px-3 md:px-0">
        <div
          id="logo-wrapper"
          className="flex items-center gap-2"
        >
          <h2
            className="font-bold font-special text-2xl drop-shadow-lg text-light"
            id="app-logo"
          >
            Bistroo's
          </h2>
        </div>
        <div
          id="links"
          className="flex items-center gap-3 text-light"
        >
          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/me">User</Link>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
