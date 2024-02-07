import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = (prev) => {
    setIsMenuOpen(!prev);

    document.body.classList.toggle("no-scroll");
  };

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.classList.remove("no-scroll");
  }, []);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-5 px-3 relative">
        <div
          id="logo-wrapper"
          className="flex items-center gap-2"
        >
          <h2
            className="font-bold font-special text-4xl drop-shadow-lg text-light"
            id="app-logo"
          >
            Bistroo's
          </h2>
        </div>
        <div
          id="links"
          className="items-center gap-3 text-light hidden lg:flex"
        >
          <Link
            to="/"
            className="bg-transparent hover:bg-light text-light hover:text-primary px-5 py-2 text-lg rounded-lg transition-colors ease-in-out duration-200"
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className="bg-transparent hover:bg-light text-light hover:text-primary px-5 py-2 text-lg rounded-lg transition-colors ease-in-out duration-200"
          >
            Restaurants
          </Link>
          {/* TODO aggiungere verifica se l'utente ha effettuato il login, mostare altrimenti il SignIn */}
          <Link
            to="/me"
            className="bg-transparent hover:bg-light text-light hover:text-primary px-5 py-2 text-lg rounded-lg transition-colors ease-in-out duration-200"
          >
            User
          </Link>
        </div>
        <button
          className={
            isMenuOpen
              ? "bg-tertiary rounded-lg shadow-lg text-xl flex lg:hidden items-center justify-center py-1.5 px-3"
              : "bg-transparent text-2xl flex lg:hidden items-center justify-center py-1 px-3"
          }
          onClick={() => handleClick(isMenuOpen)}
        >
          {!isMenuOpen ? (
            <FontAwesomeIcon
              icon={faBars}
              className="text-light"
            />
          ) : (
            <FontAwesomeIcon
              icon={faX}
              className="text-red-800"
            />
          )}
        </button>
      </nav>
      <div
        className={
          isMenuOpen
            ? "absolute top-[80px] right-0 p-5 w-full h-screen bg-light shadow-lg"
            : "hidden"
        }
      >
        <div className="flex flex-col items-center justify-start gap-4">
          <Link
            to="/"
            className="w-full text-center bg-light hover:bg-primary text-primary hover:text-light px-5 py-1 rounded-lg transition-colors ease-in-out duration-200"
            onClick={() => handleClick(isMenuOpen)}
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className="w-full text-center bg-light hover:bg-primary text-primary hover:text-light px-5 py-1 rounded-lg transition-colors ease-in-out duration-200"
            onClick={() => handleClick(isMenuOpen)}
          >
            Restaurants
          </Link>
          {/* TODO aggiungere verifica se l'utente ha effettuato il login, mostare altrimenti il SignIn */}
          <Link
            to="/me"
            className="w-full text-center bg-light hover:bg-primary text-primary hover:text-light px-5 py-1 rounded-lg transition-colors ease-in-out duration-200"
            onClick={() => handleClick(isMenuOpen)}
          >
            User
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavbarComp;
