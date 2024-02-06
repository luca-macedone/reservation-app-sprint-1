import React from "react";

import dummyRestaurant from "../data/dummy";
import { useNavigate } from "react-router-dom";

const SingleRestaurantView = ({ match }) => {
  const {
    name,
    description,
    type,
    address,
    city,
    country,
    max_seats,
    free_seats,
    profile_img,
    about_img,
    gallery,
    openings,
    menu,
  } = dummyRestaurant;
  const navigator = useNavigate();
  return (
    <>
      <div className="container mx-auto px-3 min-h-screen">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-center justify-center gap-10">
          <div className="flex items-center gap-3 py-5 col-span-1 md:col-span-2">
            <div className="h-36 aspect-square rounded-full overflow-hidden ring ring-secondary">
              <img
                src={profile_img.src}
                alt={profile_img.alt}
                className="object-cover h-full object-center"
              />
            </div>
            <div className="flex items-start justify-between w-full">
              <div>
                <h1 className="text-4xl font-bold border-b-2 border-secondary px-3">
                  {name}
                </h1>
                <div className="px-3 py-2">
                  {address + ", " + city + ", " + country}
                </div>
                <div className="flex items-center gap-3 flex-wrap p-3">
                  {type.map((type, index) => {
                    return (
                      <span
                        key={index}
                        className="bg-primary px-3 py-1 rounded-lg text-light"
                      >
                        {type}
                      </span>
                    );
                  })}
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigator(-1)}
                className="bg-accent px-5 py-2 rounded-lg text-xl text-light shadow-md font-semibold uppercase"
              >
                Back
              </button>
            </div>
          </div>
          <div className="w-full overflow-hidden rounded-3xl shadow-lg">
            <img
              src={about_img.src}
              alt={about_img.alt}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-3 font-special text-primary">
              About us
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: description }}
              className=" text-justify leading-7 text-xl"
            />
          </div>
        </div>
        <section className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 bg-tertiary py-10 pb-20 px-10 rounded-3xl my-10 shadow-lg">
          <div className="col-span-1 md:col-span-2 flex justify-center items-center pb-2 mb-5">
            <h2 className="text-3xl font-bold border-b-2 border-secondary px-10 py-3 font-special text-primary">
              Menu
            </h2>
          </div>
          {menu.map((dish, index) => {
            return (
              <div
                key={index}
                className="border-b-2 border-secondary p-3 flex items-start justify-between"
              >
                <div className="flex flex-col items-start justify-start gap-2">
                  <h4 className="text-xl font-bold capitalize">{dish.name}</h4>
                  <div className="w-max bg-accent text-light px-3 py-1 rounded-lg capitalize">
                    {dish.category}
                  </div>
                  <small>{dish.description}</small>
                </div>
                <div className="text-2xl font-bold">{dish.price}€</div>
              </div>
            );
          })}
        </section>
        <section className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 items-start justify-center gap-5 py-10">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-3xl font-bold pb-5 text-center font-special text-primary">
              Openings
            </h2>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-secondary">
                  <th className="text-xl font-light p-2">Day</th>
                  <th className="text-xl font-light p-2">Lunch</th>
                  <th className="text-xl font-light p-2">Dinner</th>
                </tr>
              </thead>
              <tbody>
                {openings.map((day, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-start ps-5 pe-10 py-2 border-e-2 border-secondary">
                        {day.day}
                      </td>
                      <td className="text-center px-5 py-2">
                        {day.lunch.start === "-1"
                          ? "closed"
                          : day.lunch.start + " - " + day.lunch.end}
                      </td>
                      <td className="text-center px-5 py-2">
                        {day.dinner.start === "-1"
                          ? "closed"
                          : day.dinner.start + " - " + day.dinner.end}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <form className="col-span-1 lg:col-span-2">
            {/* TODO form per la prenotazione */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            quibusdam molestias voluptatem, culpa quis nobis sed velit? Rerum
            voluptate perferendis numquam. Sequi, provident iusto esse modi nemo
            sed voluptatibus consequuntur.
          </form>
        </section>
        <section className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-10">
          {gallery.map((pic, index) => {
            return (
              <>
                <img
                  key={index + "-pic"}
                  src={pic.src}
                  alt={pic.alt}
                  className="shadow-lg"
                />
                <div
                  key={index + "-caption"}
                  className="flex items-center justify-center"
                >
                  <p className="text-center font-bold text-xl">{pic.caption}</p>
                </div>
              </>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default SingleRestaurantView;
