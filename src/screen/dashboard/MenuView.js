import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faEye,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const MenuView = () => {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);

  const [menu, setMenu] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [types, setTypes] = useState([]);

  const showSelectedMenu = async (_id) => {
    await axios
      .get(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${_id}/Menu`
      )
      .then((response) => {
        // console.log(response.data);
        setMenu(response.data);
      })
      .finally(() => {
        setIsVisibleMenu(true);
        setIsLoadingMenu(false);
      });
  };

  useEffect(() => {
    const fetchTypes = (fetchedRestaurants) => {
      let result = [];
      result = fetchedRestaurants.flatMap((res) => res.type);

      const filteredResult = [...new Set(result)];
      setTypes(filteredResult);
    };

    const fetchData = async () => {
      const baseUrl =
        "https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant";
      await axios
        .get(baseUrl)
        .then((response) => {
          // console.log(response.data);
          setRestaurants(response.data);
          fetchTypes(response.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoadingRestaurants(false);
        });
    };

    setIsVisibleMenu(false);
    setIsLoadingRestaurants(true);
    fetchData();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
      <section className="h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 mt-5 lg:mt-0">
          Your Restaurants
        </h2>
        <div className="lg:hidden bg-tertiary rounded-3xl p-5 h-full mb-5">
          {isLoadingRestaurants ? (
            <h2>Loading</h2>
          ) : (
            <select
              id="restaurants-mobile-selector"
              className="bg-light px-3 py-2 w-full rounded-md text-dark"
            >
              {restaurants.map((rest) => {
                return (
                  <option
                    key={rest.id}
                    value={rest.id}
                  >
                    {rest.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="hidden lg:inline-flex bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-bl-xl">
          <div className="h-full overflow-y-auto flex flex-col items-start justify-start gap-4 px-5 py-4">
            {isLoadingRestaurants ? (
              <LoadingComp />
            ) : (
              restaurants.map((rest) => {
                return (
                  <div
                    key={rest.id}
                    className="bg-light px-5 py-3 rounded-3xl w-full flex flex-col lg:flex-row items-start lg:items-center justify-start gap-3"
                  >
                    <div
                      className="min-w-10 md:w-16  aspect-square rounded-full overflow-hidden ring ring-secondary"
                      style={{
                        backgroundImage: `url(${rest.profile_img.src})`,
                        backgroundPosition: `center`,
                        backgroundSize: `cover`,
                      }}
                    />
                    <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between flex-wrap lg:flex-nowrap gap-3 lg:gap-0 w-full">
                      <div className="flex flex-col flex-wrap gap-1 w-full">
                        <h5 className="border-b-2 border-secondary w-max px-2 text-wrap">
                          {rest.name}
                        </h5>
                        <small className="text-wrap px-2">
                          {rest.address +
                            ", " +
                            rest.city +
                            ", " +
                            rest.country}
                        </small>
                      </div>
                      <button
                        className="bg-accent text-light px-5 py-2 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200"
                        onClick={() => showSelectedMenu(rest.id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <section className="h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 flex flex-col">
          Menu
        </h2>
        <div className="bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-bl-xl">
          <div className="px-5 py-3 rounded-3xl w-full flex flex-col items-start justify-start gap-3 h-full overflow-y-auto">
            {!isVisibleMenu ? (
              <h2 className="font-special flex items-center gap-2 text-2xl mt-6">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                Choose the restaurant.
              </h2>
            ) : !isLoadingMenu ? (
              <>
                <form className="bg-secondary p-5 w-full rounded-3xl grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-3">
                  <h3 className="text-light font-special col-span-1 lg:col-span-2">
                    Add a new dish
                  </h3>
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="new-dish-name"
                      className="text-light"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="new-dish-name"
                      className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
                      name="new-dish-name"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="new-dish-price"
                      className="text-light"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="new-dish-price"
                      className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
                      name="new-dish-price"
                      // onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <label
                      htmlFor="new-dish-category"
                      className="text-light"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      id="new-dish-category"
                      className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
                      name="new-dish-category"
                      list="types"
                      // onChange={handleChange}
                    />
                    <datalist id="types">
                      {!isLoadingMenu &&
                        types.map((t, index) => {
                          return (
                            <option
                              key={index}
                              value={t}
                            >
                              {t}
                            </option>
                          );
                        })}
                    </datalist>
                  </div>
                  <div className="flex items-end justify-end gap-2">
                    <button
                      type="button"
                      className="bg-light text-dark ring-2 ring-transparent px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 hover:ring-accent"
                      // onClick={handleBookingReset}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="bg-accent text-light ring-2 ring-transparent px-8 py-2 rounded-lg flex items-center gap-3 col-span-1 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 disabled:ring-2 disabled:ring-accent disabled:bg-light disabled:text-accent disabled:hover:scale-100 hover:ring-accent"
                    >
                      Add
                    </button>
                    {/* TODO: add post call to add the new dish to the menu */}
                  </div>
                  <div className="flex flex-col items-start justify-start h-full gap-1">
                    <label
                      htmlFor="new-dish-description"
                      className="text-light"
                    >
                      Description
                    </label>
                    <textarea
                      name="new-dish-description"
                      id="new-dish-description"
                      className="w-full rounded-lg text-dark bg-light py-2 px-5 focus:outline-accent"
                      // onChange={handleChange}
                      rows="2"
                      // value={reservation.notes}
                    ></textarea>
                  </div>
                </form>
                {menu.map((dish) => {
                  return (
                    <div
                      key={dish.id}
                      className="p-5 bg-light rounded-3xl w-full flex flex-col items-start gap-2"
                    >
                      <div className="flex items-start flex-col-reverse justify-between w-full">
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <h6 className="font-semibold border-b-2 mb-2 border-secondary w-max px-3">
                              {dish.name}
                            </h6>
                            <p className="text-sm px-3">{dish.description}</p>
                          </div>
                          <div className="text-nowrap pe-3">{dish.price} €</div>
                        </div>
                        <div className="flex items-center justify-end w-full gap-3 mb-3 bg-tertiary rounded-xl py-2 px-3">
                          <button className="px-4 py-2 text-red-500 bg-tertiary rounded-lg ring-2 ring-transparent hover:bg-light hover:ring-accent hover:text-accent transition-all ease-in-out duration-200">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="me-2"
                            />
                            Delete
                          </button>
                          {/* TODO: add delete call to remove the dish from the menu */}
                          <button className="px-4 py-2 text-blue-500 bg-tertiary rounded-lg ring-2 ring-transparent hover:bg-light hover:ring-accent hover:text-accent transition-all ease-in-out duration-200">
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="me-2"
                            />
                            Edit
                          </button>
                          {/* TODO: add patch call to modify the dish of the menu */}
                        </div>
                      </div>
                      <div className="px-3 flex items-center flex-wrap">
                        {dish.category.map((c, index) => {
                          return (
                            <span
                              className="bg-primary text-light px-3 py-1 rounded-2xl"
                              key={index}
                            >
                              {c}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <LoadingComp />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenuView;
