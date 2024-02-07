import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const FooterComp = () => {
  return (
    <div className="container mx-auto text-light py-[60px] flex-col md:flex-row flex items-center md:items-start justify-between gap-10 md:px-3">
      <div
        id="logo-wrapper"
        className="flex flex-col items-center md:items-start gap-2"
      >
        <h2
          className="font-bold font-special text-4xl drop-shadow-lg text-primary"
          id="app-logo"
        >
          Bistroo's
        </h2>
        <small className="flex items-center gap-2 text-[.75rem]">
          Copyright
          <FontAwesomeIcon icon={faCopyright} />
          by{" "}
          <Link
            to="/"
            className="hover:text-primary text-light transition-colors ease-in-out duration-200"
          >
            Bistroo's
          </Link>
          , 2024
        </small>
      </div>
      <nav>
        <ul className="flex flex-col items-center md:items-end">
          <li>
            <Link
              to="/"
              className="hover:text-primary text-light transition-colors ease-in-out duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/restaurants"
              className="hover:text-primary text-light transition-colors ease-in-out duration-200"
            >
              Restaurants
            </Link>
          </li>
          <li>
            <Link
              to="/me"
              className="hover:text-primary text-light transition-colors ease-in-out duration-200"
            >
              User
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default FooterComp;
