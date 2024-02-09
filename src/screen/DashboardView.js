import React, { useEffect } from "react";
import dummyRestaurant from "../data/dummy";
import RestaurantCardComp from "../components/RestaurantCardComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faPenToSquare,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const dummyMsgs = [
  {
    guest_fullname: "Mario Rossi",
    guest_number: 2,
    reservation_hour: "19:00",
    notes: "Allergico alle noccioline",
  },
  {
    guest_fullname: "Luca Bianchi",
    guest_number: 4,
    reservation_hour: "20:00",
    notes: "Preferenza per tavolo vicino alla finestra",
  },
  {
    guest_fullname: "Sofia Verdi",
    guest_number: 3,
    reservation_hour: "21:00",
    notes: null,
  },
  {
    guest_fullname: "Anna Neri",
    guest_number: 2,
    reservation_hour: "19:30",
    notes: "Vegetariana",
  },
  {
    guest_fullname: "Giorgio Gialli",
    guest_number: 5,
    reservation_hour: "20:30",
    notes: "Una sedia per bambino",
  },
  {
    guest_fullname: "Claudia Marrone",
    guest_number: 6,
    reservation_hour: "21:30",
    notes: null,
  },
  {
    guest_fullname: "Federico Blu",
    guest_number: 2,
    reservation_hour: "19:45",
    notes: "Allergico al glutine",
  },
  {
    guest_fullname: "Elena Grigi",
    guest_number: 4,
    reservation_hour: "20:15",
    notes: null,
  },
  {
    guest_fullname: "Marco Viola",
    guest_number: 3,
    reservation_hour: "21:15",
    notes: "Anniversario di matrimonio",
  },
  {
    guest_fullname: "Serena Rossi",
    guest_number: 2,
    reservation_hour: "19:15",
    notes: "Tavolo lontano dalla porta",
  },
];

const DashboardView = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto py-5 px-3 min-h-[90vh]">
      <header>
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
            {/* TODO list of restaurants */}
            <RestaurantCardComp
              id={dummyRestaurant.id}
              type={dummyRestaurant.type}
              name={dummyRestaurant.name}
              src={dummyRestaurant.profile_img.src}
              alt={dummyRestaurant.profile_img.alt}
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
            {/* <button className="bg-accent px-5 py-2 rounded-lg text-light shadow-md font-semibold uppercase flex items-center gap-3">
              Edit
            </button> */}
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
};

export default DashboardView;
