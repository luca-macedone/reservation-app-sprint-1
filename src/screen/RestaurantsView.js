import {
  faArrowRotateLeft,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer, useState } from "react";
import RestaurantCardComp from "../components/RestaurantCardComp";
import axios from "axios";
import restaurantReducer from "../utils/RestaurantReducer";
import LoadingComp from "../components/LoadingComp";
// import dummyRestaurant from "../data/dummy";

const RestaurantsView = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [types, setTypes] = useState([]);
  const [selectedTypeValue, setSelectedTypeValue] = useState("all");
  const [state, dispatch] = useReducer(restaurantReducer, {
    data: [],
  });

  useEffect(() => {
    setSelectedTypeValue("all");
    const fetchRestaurants = async () => {
      let url = new URL(
        "https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant"
      );
      let res;
      await axios
        .get(url)
        .then((response) => {
          console.log(response);
          if (response.data) {
            setRestaurants(response.data);
            setFilteredRestaurants(response.data);
            state.data = response.data;
            res = response.data;
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoading(false);
        });

      return res;
    };

    const fetchTypes = (fetchedRestaurants) => {
      let result = [];
      result = fetchedRestaurants.flatMap((res) => res.type);

      const filteredResult = [...new Set(result)];
      setTypes(filteredResult);
      setIsLoadingTypes(false);
    };

    setTypes([]);
    setIsLoading(true);
    setIsLoadingTypes(true);
    fetchRestaurants().then((response) => {
      if (response.length > 0) {
        fetchTypes(response);
      }
    });
  }, []);

  const handleTypeFilter = (evt) => {
    setSelectedTypeValue(evt.target.value);
  };

  const filterResults = () => {
    setIsLoading(true);

    if (selectedTypeValue !== "all") {
      const data = restaurants.filter((elem) =>
        elem.type.includes(selectedTypeValue)
      );
      setFilteredRestaurants(data);
    } else {
      setFilteredRestaurants(restaurants);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="container mx-auto py-5 min-h-screen px-3">
        <section className="relative overflow-hidden rounded-3xl shadow-lg">
          <picture>
            <img
              sizes="(max-width: 1125px) 100vw, 1125px"
              srcSet="
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
            <form
              action=""
              className="bg-secondary text-light p-5 rounded-xl shadow-lg w-full grid grid-flow-row items-end gap-3 mt-[100px] grid-cols-1 md:grid-cols-3"
            >
              <h1 className="text-2xl font-bold text-light drop-shadow-lg col-span-1 md:col-span-3">
                Seach your next
                <span className="font-special font-light capitalize ms-3 text-3xl">
                  Experience
                </span>
              </h1>
              <div className="flex flex-col items-start gap-1">
                {/* TODO change the input to a select of options, maybe with multiple selection */}
                <label htmlFor="food-type">Food type</label>
                {!isLoadingTypes ? (
                  <select
                    id="food-type"
                    className="bg-light px-5 py-2.5 rounded-lg text-dark w-full"
                    onChange={handleTypeFilter}
                    value={selectedTypeValue}
                  >
                    <option value="all">All</option>
                    {types.map((t, i) => {
                      return (
                        <option
                          key={i}
                          value={t}
                        >
                          {t}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <div className="relative w-full">
                    <input
                      type="text"
                      id="food-type"
                      className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                      disabled
                    />
                    {isLoading && (
                      <span className="absolute top-2.5 right-2 z-10">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin text-dark text-xl"
                        />
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="where">Where</label>
                <input
                  type="text"
                  id="where"
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
              <div className="flex items-center justify-end gap-3">
                <button
                  type="reset"
                  className="bg-light text-dark px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
                >
                  <FontAwesomeIcon icon={faArrowRotateLeft} />
                  Reset
                </button>
                <button
                  type="submit"
                  className="bg-accent px-8 py-2 rounded-lg flex items-center gap-3 col-span-1 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    filterResults();
                  }}
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
            <span className="font-special text-4xl p-2">
              {restaurants.length}
            </span>{" "}
            Result
          </h2>
          {!isLoading ? (
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
              {/* {selectedTypeValue !== "all" ? (
                <small>NOT ALL</small>
              ) : (
                <small>ALL</small>
              )} */}
              {selectedTypeValue !== "all" ? (
                <>
                  {filteredRestaurants.lenght > 0 ? (
                    filteredRestaurants.map((res) => {
                      return (
                        <RestaurantCardComp
                          key={res.id}
                          id={res.id}
                          src={res.profile_img.src}
                          alt={res.profile_img.alt}
                          name={res.name}
                          type={res.type}
                        />
                      );
                    })
                  ) : (
                    <h2 className="text-dark font-semibold text-center col-span-1 md:col-span-2 lg:col-span-3 py-10">
                      No restaurants here yet! <br /> Stay tuned..
                    </h2>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  {restaurants.length > 0 ? (
                    restaurants.map((res) => {
                      return (
                        <RestaurantCardComp
                          key={res.id}
                          id={res.id}
                          src={res.profile_img.src}
                          alt={res.profile_img.alt}
                          name={res.name}
                          type={res.type}
                        />
                      );
                    })
                  ) : (
                    <h2 className="text-dark font-semibold text-center col-span-1 md:col-span-2 lg:col-span-3 py-10">
                      No restaurants here yet! <br /> Stay tuned..
                    </h2>
                  )}
                </>
              )}
            </div>
          ) : (
            <LoadingComp />
          )}
        </section>
      </div>
    </>
  );
};

export default RestaurantsView;
