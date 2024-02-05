import {
  faArrowRotateLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React from "react";
import RestaurantCardComp from "../components/RestaurantCardComp";

const dummyRestaurant = {
  id: 0,
  name: "Route 66 - American Diner",
  description: "lorem ipsum dolor amet",
  type: ["American", "Hamburger"],
  max_seats: 82,
  free_seats: 28,
  img: {
    src: "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    alt: "dummy",
  },
  menu: [
    {
      name: "Classic Cheeseburger",
      description:
        "A juicy beef patty topped with melted cheese, lettuce, tomato, and our special sauce, served on a toasted bun.",
      price: 5.99,
      category: "Burgers",
    },
    {
      name: "Crispy Chicken Sandwich",
      description:
        "Crispy fried chicken breast with pickles and mayo on a soft bun.",
      price: 6.49,
      category: "Sandwiches",
    },
    {
      name: "Veggie Burger",
      description:
        "A delicious, plant-based patty topped with avocado, lettuce, tomato, and vegan mayo, served on a whole grain bun.",
      price: 7.99,
      category: "Burgers",
    },
    {
      name: "Large Fries",
      description: "A generous portion of our signature crispy, golden fries.",
      price: 2.99,
      category: "Sides",
    },
    {
      name: "Chocolate Milkshake",
      description:
        "Rich and creamy chocolate milkshake, topped with whipped cream and a cherry.",
      price: 3.99,
      category: "Beverages",
    },
    {
      name: "Caesar Salad",
      description:
        "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing.",
      price: 5.49,
      category: "Salads",
    },
  ],
};

const RestaurantsView = () => {
  return (
    <>
      <div className="container mx-auto py-5 min-h-screen px-3">
        <section className="relative overflow-hidden rounded-3xl shadow-lg">
          <picture>
            <img
              sizes="(max-width: 1125px) 100vw, 1125px"
              srcset="
                /images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_200.jpg 200w,
                /images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_542.jpg 542w,
                /images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_787.jpg 787w,
                /images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_972.jpg 972w,
                /images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_1096.jpg 1096w,
                /images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_1125.jpg 1125w"
              src="/images/search-bg/pexels-photo-1850600_mucwjd_c_scale,w_1125.jpg"
              alt=""
              className="absolute z-0 object-cover object-bottom top-0 left-0 right-0 w-full h-full"
            />
          </picture>
          <div className="z-10 relative w-full backdrop-blur-sm p-5">
            <h1 className="text-2xl py-5 font-bold text-secondary">
              Seach your next
              <span className="font-special font-light capitalize ms-3 text-3xl">
                Experience
              </span>
            </h1>
            <form
              action=""
              className="bg-secondary text-light p-5 rounded-xl shadow-lg w-full grid grid-flow-row items-end gap-3 grid-cols-1 md:grid-cols-3"
            >
              <div className="flex flex-col items-start gap-1">
                {/* TODO change the input to a select of options, maybe with multiple selection */}
                <label htmlFor="food-type">Food type</label>
                <input
                  type="text"
                  id="food-type"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="day-filter">When</label>
                <input
                  type="date"
                  id="day-filter"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="hour-filter">Hour</label>
                <input
                  type="time"
                  id="hour-filter"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="seats-filter">Seats</label>
                <input
                  type="number"
                  id="seats-filter"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                  min={1}
                  step={1}
                  defaultValue={1}
                />
              </div>
              <div className="flex items-center justify-end gap-3 col-span-2">
                <button
                  type="reset"
                  className="bg-light text-dark px-3 py-2 rounded-lg flex items-center gap-3"
                >
                  <FontAwesomeIcon icon={faArrowRotateLeft} />
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-accent px-8 py-2 rounded-lg flex items-center gap-3 col-span-1"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold mt-6 border-b-2 border-primary">
            <span className="font-special text-4xl p-2">1</span> Result
          </h2>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
            {/* list of restaurants */}
            <RestaurantCardComp
              id={dummyRestaurant.id}
              type={dummyRestaurant.type}
              name={dummyRestaurant.name}
              src={dummyRestaurant.img.src}
              alt={dummyRestaurant.img.alt}
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default RestaurantsView;
