import React from "react";

import dummyRestaurant from "../data/dummy";

const SingleRestaurantView = ({ match }) => {
  const {
    name,
    description,
    type,
    max_seats,
    free_seats,
    profile_img,
    about_img,
    gallery,
    menu,
  } = dummyRestaurant;
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
            <div>
              <h1 className="text-4xl font-bold border-b-2 border-secondary px-3">
                {name}
              </h1>
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
          </div>
          <div className="w-full overflow-hidden rounded-3xl shadow-lg">
            <img
              src={about_img.src}
              alt={about_img.alt}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">About us</h2>
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
                  <div className="w-max bg-primary text-light px-3 py-1 rounded-lg capitalize">
                    {dish.category}
                  </div>
                  <small>{dish.description}</small>
                </div>
                <div className="text-2xl font-bold">{dish.price}€</div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

export default SingleRestaurantView;
