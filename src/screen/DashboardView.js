import React, { useEffect } from "react";
// import dummyRestaurant from "../data/dummy";
import RestaurantCardComp from "../components/RestaurantCardComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faGear,
  faLifeRing,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Flag from "react-flagkit";

const DashboardView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="dashboard-bg relative">
      <div className="absolute z-[1] top-0 left-0 h-full w-full backdrop-blur-md"></div>
      <div className="container mx-auto py-5 px-3 min-h-[90vh] relative top-0 z-[2]">
        {/* <header>
        <h1 className="text-4xl font-special text-end">
          <span className="font-base font-bold text-accent">Luca</span>'s
          Dashboard
        </h1>
      </header>
      <main className="grid grid-flow-row items-center justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10 h-full">
        <section className="px-5 lg:px-10 py-5 bg-light border-2 border-secondary rounded-xl shadow-lg col-span-1 lg:col-span-2 ">
          <h2 className="text-3xl font-light mb-3 border-b-2 border-secondary px-5 py-3 font-special text-primary">
            Your restaurants
          </h2>
          <div className="h-[100vh] lg:h-[50vh] overflow-y-auto px-1">
            <RestaurantCardComp
              id={dummyRestaurant.id}
              type={dummyRestaurant.type}
              name={dummyRestaurant.name}
              src={dummyRestaurant.profile_img.src}
              alt={dummyRestaurant.profile_img.alt}
              fulladdress={dummyRestaurant.city}
            />
          </div>
        </section>
        <section className="px-5 lg:px-10 py-5 bg-light border-2 border-secondary rounded-xl shadow-lg col-span-1">
          <h2 className="text-3xl font-light mb-3 border-b-2 border-secondary px-5 py-3 font-special text-primary">
            Messages
          </h2>
          <div className="flex flex-col items-start justify-start gap-3 h-[100vh] lg:h-[50vh] overflow-y-auto">
            {dummyMsgs.map((msg, index) => {
              return (
                <div
                  key={index}
                  className="bg-tertiary px-5 py-2 rounded-lg w-full flex items-center justify-between"
                >
                  <h5 className="font-semibold">
                    {msg.guest_fullname} x
                    <span className="text-xl font-bold">
                      {msg.guest_number}
                    </span>
                  </h5>
                  <div className="flex flex-col items-end">
                    {msg.notes && (
                      <span className="flex items-center gap-2 text-accent">
                        Note
                        <FontAwesomeIcon icon={faCircleExclamation} />
                      </span>
                    )}
                    <span className="font-bold">{msg.reservation_hour}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <div className="px-5 lg:px-10 py-5 bg-light border-2 border-secondary rounded-xl shadow-lg col-span-1 min-h-[20vh]">
          <h2 className="text-3xl font-light mb-3 border-b-2 border-secondary px-5 py-3 font-special text-primary">
            User
          </h2>
          <div className="flex items-center justify-center gap-5">
            <button className="bg-accent px-5 py-2 rounded-lg text-light shadow-md font-semibold uppercase flex items-center gap-3">
              <FontAwesomeIcon icon={faRightFromBracket} />
              Logout
            </button>
            <button className="bg-accent px-5 py-2 rounded-lg text-light shadow-md font-semibold uppercase flex items-center gap-3">
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit
            </button>
          </div>
        </div>
        <div className="px-5 lg:px-10 py-5 bg-light border-2 border-secondary rounded-xl shadow-lg col-span-1 lg:col-span-2 min-h-[20vh]">
          <h2 className="text-3xl font-light mb-3 border-b-2 border-secondary px-5 py-3 font-special text-primary">
            Action
          </h2>
          <div className="flex items-center justify-center gap-5">
            <button className="bg-accent px-5 py-2 rounded-lg text-light shadow-md font-semibold uppercase flex items-center gap-3">
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit Menu
            </button>
          </div>
        </div>
      </main>
      <footer></footer> */}
        <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-primary p-5 rounded-2xl min-h-[86vh] shadow-lg flex flex-col items-center justify-between">
            <nav className="w-full">
              <h1 className="text-4xl font-special text-end text-secondary pb-3 border-b-[3px] border-secondary">
                <span className="font-base font-bold text-light">Luca</span>'s
                Dashboard
              </h1>
              <ul className="flex flex-col items-center justify-start w-full gap-3 py-5">
                <li className="w-full">
                  <Link
                    to={"/"}
                    className="bg-primary text-light px-5 py-2 text-center inline-block w-full rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    Menu's
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to={"/"}
                    className="bg-primary text-light px-5 py-2 text-center inline-block w-full rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    Bookings
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to={"/"}
                    className="bg-primary text-light px-5 py-2 text-center inline-block w-full rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    Reviews
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to={"/"}
                    className="bg-primary text-light px-5 py-2 text-center inline-block w-full rounded-xl hover:bg-tertiary hover:text-primary transition-colors duration-200 ease-in-out"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
            </nav>
            <footer className="w-full">
              <ul className="flex items-start justify-center flex-wrap gap-2 w-full">
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-primary px-5 py-2 rounded-lg text-light hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                  >
                    <FontAwesomeIcon icon={faLifeRing} />
                    <span className="pb-0">Help</span>
                  </button>
                </li>
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-primary px-5 py-2 rounded-lg text-light hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                  >
                    <FontAwesomeIcon icon={faGear} />
                    <span className="pb-0">User Settings</span>
                  </button>
                </li>
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-tertiary px-5 py-2 rounded-lg text-dark hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                  >
                    <Flag country="GB" />
                    <span className="pb-0">English</span>
                  </button>
                </li>
                <li className="w-max">
                  <button
                    type="button"
                    className="bg-tertiary px-5 py-2 rounded-lg text-dark hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 flex items-center gap-2 uppercase"
                  >
                    <span className="pb-0">Logout</span>
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                      className="text-secondary"
                    />
                  </button>
                </li>
              </ul>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
