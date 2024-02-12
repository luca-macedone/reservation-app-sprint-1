import {
  faArrowRotateLeft,
  faMagnifyingGlass,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useReducer, useRef, useState } from "react";
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
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(true);
  const [filterObj, setFilterObj] = useState({});
  const [reservationData, setReservationData] = useState({});
  const [selectedTypeValue, setSelectedTypeValue] = useState("all");
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedTypeValue("all");
    const fetchRestaurants = async () => {
      let url = new URL(
        "https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant"
      );
      let res;
      await axios
        .get(url)
        .then((response) => {
          // console.log(response);
          if (response.data) {
            setRestaurants(response.data);
            setFilteredRestaurants(response.data);
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
        fetchCities(response);
      }
    });
  }, []);

  const fetchCities = (fetchedRestaurants) => {
    let result = [];
    result = fetchedRestaurants.flatMap((res) => res.city);
    const filteredResult = [...new Set(result)];
    setCities(filteredResult);
    setIsLoadingCities(false);
  };

  const handleChange = (evt) => {
    console.log(evt.target.name);
    switch (evt.target.name) {
      case "where": {
        if (evt.target.value.length > 2) {
          setFilterObj({
            ...filterObj,
            city: evt.target.value,
          });
        } else {
          setFilterObj({
            ...filterObj,
            city: null,
          });
        }
        break;
      }
      case "type": {
        if (evt.target.value !== "all") {
          setFilterObj({
            ...filterObj,
            type: evt.target.value,
          });
        } else {
          setFilterObj({
            ...filterObj,
            type: null,
          });
        }
        setSelectedTypeValue(evt.target.value);
        break;
      }
      case "seats": {
        // console.log(evt.target.value);
        setReservationData({
          ...reservationData,
          seats: parseInt(evt.target.value, 10),
        });
        break;
      }
      case "when": {
        // console.log(evt.target.value);
        setReservationData({
          ...reservationData,
          when: evt.target.value,
        });
        break;
      }
      default:
        return;
    }
  };

  const handleReset = () => {
    setFilterObj({});
    setSelectedTypeValue("all");
    setFilteredRestaurants(restaurants);
    formRef.current.reset();
  };

  const filterResults = () => {
    setIsLoading(true);
    // console.log(filterObj);

    if (
      Object.keys(filterObj).forEach((key) => {
        if (filterObj[key] === null) {
          delete filterObj[key];
        }
      })
    );

    // console.log(filterObj);

    if (Object.keys(filterObj).length !== 0) {
      // se è presente almeno un filtro, eseguo il filtro dei dati
      let result;

      if ("type" in filterObj) {
        result = restaurants.filter((restaurant) =>
          restaurant.type.includes(filterObj.type)
        );
        // console.log(result);
        // delete filterObj["type"];

        result = result.filter((restaurant) => {
          return Object.keys(filterObj).every((key) => {
            if (key === "type") return true;

            return restaurant[key] === filterObj[key];
          });
        });
        // console.log(result);
        setFilteredRestaurants(result);
      } else {
        result = restaurants.filter((restaurant) => {
          return Object.keys(filterObj).every(
            (key) => restaurant[key] === filterObj[key]
          );
        });
        console.log(result);
        setFilteredRestaurants(result);
      }
    } else {
      // se i filtri sono vuoti allora stampo la lista completa
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
              ref={formRef}
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
                <label htmlFor="food-type">Food type</label>
                {!isLoadingTypes ? (
                  <select
                    id="food-type"
                    className="bg-light px-5 py-2.5 rounded-lg text-dark w-full"
                    onChange={handleChange}
                    value={selectedTypeValue}
                    name="type"
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
                  name="where"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                  onChange={handleChange}
                  list="cities"
                />
              </div>
              <datalist id="cities">
                {!isLoadingCities ? (
                  cities.map((city, index) => {
                    return (
                      <option
                        key={index}
                        value={city}
                      >
                        {city}
                      </option>
                    );
                  })
                ) : (
                  <option>Loading...</option>
                )}
              </datalist>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="day-filter">When</label>
                <input
                  type="datetime-local"
                  id="day-filter"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                  name="when"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="seats-filter">Seats</label>
                <input
                  type="number"
                  id="seats-filter"
                  className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                  name="seats"
                  min={1}
                  step={1}
                  defaultValue={1}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-end gap-3 col-span-1 md:col-span-2">
                <button
                  type="button"
                  className="bg-light text-dark px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
                  onClick={handleReset}
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
              {filteredRestaurants.length}
            </span>{" "}
            Result
          </h2>
          {!isLoading ? (
            <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5">
              {filteredRestaurants.length > 0 ? (
                filteredRestaurants.map((res) => {
                  return (
                    <RestaurantCardComp
                      key={res.id}
                      id={res.id}
                      src={res.profile_img.src}
                      alt={res.profile_img.alt}
                      name={res.name}
                      type={res.type}
                      data={{ ...reservationData }}
                    />
                  );
                })
              ) : (
                <>
                  <h2 className="text-dark text-xl text-center col-span-1 md:col-span-2 lg:col-span-3 py-10 text-wrap">
                    <strong className="font-special font-light text-3xl me-4">
                      No results found,
                    </strong>
                    <br />
                    try to expand the research
                  </h2>
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
