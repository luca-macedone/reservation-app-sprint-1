import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {
  faBars,
  faBox,
  faCompass,
  faFile,
  faInbox,
  faRightFromBracket,
  faStar,
  faTableColumns,
  faUser,
  faX,
  faCircleQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Flag from "react-flagkit";

const DashboardView = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigator = useNavigate();

  const navigateToUser = () => {
    navigator("/dashboard/me");
  };

  const navigateToHelp = () => {
    navigator("/dashboard/help");
  };

  const handleClick = (prev) => {
    setIsMenuOpen(!prev);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="dashboard-bg relative">
      <div className="absolute z-[1] top-0 left-0 h-screen w-full backdrop-blur-md"></div>
      <div className="lg:p-5 relative h-screen top-0 z-[2]">
        <div className="grid grid-flow-row grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 h-full">
          {/* SIDEBAR MENU */}
          <div className="hidden lg:flex bg-primary p-5 lg:rounded-2xl lg:shadow-lg flex-col items-center justify-between">
            <nav className="w-full">
              <h1 className="text-4xl font-special text-end text-secondary pb-3 border-b-[3px] border-secondary hidden lg:block">
                <span className="font-base font-bold text-light">Luca</span>'s
                Dashboard
              </h1>
              <ul className="flex flex-col items-center justify-start w-full gap-3 py-5">
                <li className="w-full flex items-center justify-center">
                  <Link
                    to={"/"}
                    className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faCompass}
                      className="text-3xl"
                    />
                    <span className="hidden lg:inline-flex">Home</span>
                  </Link>
                </li>
                <li className="w-full flex items-center justify-center">
                  <Link
                    to={"/dashboard"}
                    className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faTableColumns}
                      className="text-3xl"
                    />
                    <span className="hidden lg:inline-flex">Dashboard</span>
                  </Link>
                </li>
                <li className="w-full flex items-center justify-center">
                  <Link
                    to={"/dashboard/menu"}
                    className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faFile}
                      className="text-3xl"
                    />
                    <span className="hidden lg:inline-flex">Menu's</span>
                  </Link>
                </li>
                <li className="w-full flex items-center justify-center">
                  <Link
                    to={"/dashboard/bookings"}
                    className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faInbox}
                      className="text-3xl"
                    />
                    <span className="hidden lg:inline-flex">Bookings</span>
                  </Link>
                </li>
                <li className="w-full flex items-center justify-center">
                  <Link
                    to={"/dashboard/reviews"}
                    className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faStar}
                      className="text-3xl"
                    />
                    <span className="hidden lg:inline-flex">Reviews</span>
                  </Link>
                </li>
                {/* <li className="w-full flex items-center justify-center">
                  <Link
                    to={"/dashboard/orders"}
                    className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    <FontAwesomeIcon
                      icon={faBox}
                      className="text-3xl"
                    />
                    <span className="hidden lg:inline-flex">Orders</span>
                  </Link>
                </li> */}
              </ul>
            </nav>
            <footer className="w-full">
              <ul className="flex flex-col lg:flex-row items-center lg:items-start justify-center flex-wrap gap-2 w-full">
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-primary px-5 py-2 rounded-lg text-light hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                    onClick={navigateToHelp}
                  >
                    <FontAwesomeIcon icon={faCircleQuestion} />
                    <span className="pb-0 hidden lg:inline-flex">Help</span>
                  </button>
                </li>
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-primary px-5 py-2 rounded-lg text-light hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                    onClick={navigateToUser}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span className="pb-0 hidden lg:inline-flex">
                      User Settings
                    </span>
                  </button>
                </li>
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-tertiary px-5 py-2 rounded-lg text-dark hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                  >
                    <Flag country="GB" />
                    <span className="pb-0 hidden lg:inline-flex">English</span>
                  </button>
                </li>
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-tertiary px-5 py-2 rounded-lg text-dark hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                  >
                    <span className="pb-0 hidden lg:inline-flex">Logout</span>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="text-secondary"
                    />
                  </button>
                </li>
              </ul>
            </footer>
          </div>
          <div className="col-span-3 md:col-span-4 lg:col-span-4 lg:h-[96vh] w-full bg-light lg:rounded-2xl lg:shadow-lg p-5 lg:p-10">
            <nav className="w-full flex lg:hidden items-center justify-between bg-primary px-3 py-2 rounded-xl shadow-lg">
              <h1 className="text-2xl font-special text-end text-secondary">
                <span className="font-base font-bold text-light">Luca</span>'s
                Dashboard
              </h1>
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
            <Outlet />
            <div
              className={
                isMenuOpen
                  ? "absolute top-[70px] right-0 left-0 mx-auto p-5 w-[90%] bg-light rounded-b-3xl shadow-xl"
                  : "hidden"
              }
            >
              <div className="">
                <ul className="flex flex-col items-center justify-start gap-4">
                  <li className="w-full flex items-center justify-center">
                    <Link
                      to={"/"}
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={() => handleClick(isMenuOpen)}
                    >
                      <FontAwesomeIcon
                        icon={faCompass}
                        className="text-3xl"
                      />
                      <span className="">Home</span>
                    </Link>
                  </li>
                  <li className="w-full flex items-center justify-center">
                    <Link
                      to={"/dashboard"}
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={() => handleClick(isMenuOpen)}
                    >
                      <FontAwesomeIcon
                        icon={faTableColumns}
                        className="text-3xl"
                      />
                      <span className="">Dashboard</span>
                    </Link>
                  </li>
                  <li className="w-full flex items-center justify-center">
                    <Link
                      to={"/dashboard/menu"}
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={() => handleClick(isMenuOpen)}
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-3xl"
                      />
                      <span className="">Menu's</span>
                    </Link>
                  </li>
                  <li className="w-full flex items-center justify-center">
                    <Link
                      to={"/dashboard/bookings"}
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={() => handleClick(isMenuOpen)}
                    >
                      <FontAwesomeIcon
                        icon={faInbox}
                        className="text-3xl"
                      />
                      <span className="">Bookings</span>
                    </Link>
                  </li>
                  <li className="w-full flex items-center justify-center">
                    <Link
                      to={"/dashboard/reviews"}
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={() => handleClick(isMenuOpen)}
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-3xl"
                      />
                      <span className="">Reviews</span>
                    </Link>
                  </li>
                  <li className="w-full flex items-center justify-center">
                    <Link
                      to={"/dashboard/orders"}
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={() => handleClick(isMenuOpen)}
                    >
                      <FontAwesomeIcon
                        icon={faBox}
                        className="text-3xl"
                      />
                      <span className="">Orders</span>
                    </Link>
                  </li>
                  <li className="w-full">
                    <button
                      type="button"
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={navigateToHelp}
                    >
                      <FontAwesomeIcon icon={faCircleQuestion} />
                      <span className="pb-0">Help</span>
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      type="button"
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                      onClick={navigateToUser}
                    >
                      <FontAwesomeIcon icon={faUser} />
                      <span className="pb-0">User Settings</span>
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      type="button"
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                    >
                      <Flag country="GB" />
                      <span className="pb-0">English</span>
                    </button>
                  </li>
                  <li className="w-full">
                    <button
                      type="button"
                      className="bg-primary text-light px-5 py-2 w-full flex items-center justify-center lg:justify-between gap-3 rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                    >
                      <span className="pb-0">Logout</span>
                      <FontAwesomeIcon
                        icon={faRightFromBracket}
                        className="text-secondary"
                      />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
