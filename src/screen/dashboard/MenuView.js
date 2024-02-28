import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faEye,
  faPenToSquare,
  faPlus,
  faTrash,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const MenuView = () => {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [isNewDishFormOpen, setIsNewDishFormOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(-1);
  const [newDish, setNewDish] = useState({
    name: "",
    price: "",
    category: [],
    description: "",
  });
  const newDishCategoryInput = useRef(null);
  const [menu, setMenu] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [types, setTypes] = useState([]);

  const showSelectedMenu = async (_id) => {
    setActiveMenu(_id);
    await axios
      .get(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${_id}/Menu`
      )
      .then((response) => {
        // console.log(response.data);
        // if (response.status === "200") {
        setMenu(response.data);
        // }
      })
      .catch((err) => {
        console.log(err);
        setMenu([]);
      })
      .finally(() => {
        setIsVisibleMenu(true);
        setIsLoadingMenu(false);
        setIsNewDishFormOpen(false);
      });
  };

  const toggleNewDishForm = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    setIsNewDishFormOpen((prev) => {
      return !prev;
    });
  };

  const addNewDishCategory = () => {
    // console.log(newDishCategoryInput.current.value);
    let value = newDishCategoryInput.current.value;
    let resultArray = value.split(" ").filter(Boolean);
    // console.log(resultArray);
    setNewDish({ ...newDish, category: resultArray });
    // let res = newDishCategoryInput.current.value;
  };

  const handleNewDishFormSubmit = async (_id) => {
    // console.log(newDish);
    // let newMenu = [...menu, newDish];
    // let newMenu = [].push(newDish);
    // console.log(newMenu);
    await axios
      .post(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${_id}/Menu`,
        newDish
      )
      .then((response) => {
        if (response.status === 201) {
          // menu.push(newDish);
          let res = [...menu, newDish];
          setMenu(res);
        }
        // console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteDish = async (_id) => {
    await axios
      .delete(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${activeMenu}/Menu/${_id}`,
        newDish
      )
      .then((response) => {
        if (response.status === 200) {
          let res = menu.filter((dish) => dish.id !== _id);
          // console.log(res);
          setMenu(res);
        }
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (evt) => {
    let name = evt.target.name;
    let value = evt.target.value;
    switch (name) {
      case "new-dish-name":
        if (value.length > 2) {
          setNewDish({ ...newDish, name: value });
        }
        break;
      case "new-dish-description":
        if (value.length > 3) {
          setNewDish({ ...newDish, description: value });
        }
        break;
      case "new-dish-price":
        if (value > 0) {
          setNewDish({ ...newDish, price: value });
        }
        break;
      // case "new-dish-category":
      //   debouncedUpdateCategory(evt.target.value);
      //   // setNewDish({ ...newDish, category: categoryArray });
      //   break;
      default:
        console.log("input name no match");
    }
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
    setMenu([]);
    setIsVisibleMenu(false);
    setIsLoadingRestaurants(true);
    fetchData();
  }, []);
  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 h-full overflow-hidden mt-8 lg:mt-0">
      <section className="h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 mt-5 lg:mt-0 text-end">
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
        <div className="hidden lg:inline-flex bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-xl lg:rounded-none lg:rounded-br-xl">
          <div className="h-full w-full overflow-x-hidden overflow-y-auto flex flex-col items-start justify-start gap-4 px-5 py-4">
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
        <h2 className="font-special text-secondary text-3xl mb-3 text-end">
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
                <form
                  className={`bg-secondary grid grid-flow-row grid-cols-1 lg:grid-cols-3 gap-3 transition-all ease-in-out duration-200 ${
                    isNewDishFormOpen
                      ? "w-full p-5 rounded-3xl"
                      : "w-max rounded-xl"
                  }`}
                  onSubmit={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }}
                >
                  <button
                    className={`text-light col-span-1 hover:scale-105 transition-all ease-in-out duration-200 lg:col-span-3 w-max font-bold flex items-center gap-2 ${
                      isNewDishFormOpen
                        ? "px-3 py-2 hover:bg-light hover:text-secondary rounded-xl"
                        : "px-5 py-3"
                    }`}
                    type="button"
                    onClick={toggleNewDishForm}
                  >
                    {isNewDishFormOpen ? (
                      <>
                        <FontAwesomeIcon
                          icon={faX}
                          className="text-xl"
                        />
                        <span>Close</span>
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-xl"
                        />
                        <span>Add a dish</span>
                      </>
                    )}
                  </button>
                  {isNewDishFormOpen && (
                    <>
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
                          onChange={handleChange}
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
                          min={0}
                          step={0.1}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex flex-col items-start gap-1">
                        <label
                          htmlFor="new-dish-category"
                          className="text-light"
                        >
                          Category
                        </label>
                        <div className="relative w-full flex items-center">
                          <input
                            type="text"
                            id="new-dish-category"
                            className="bg-light px-5 py-2 rounded-l-lg text-dark w-full focus:outline-accent"
                            name="new-dish-category"
                            list="types"
                            ref={newDishCategoryInput}
                          />
                          <button
                            className="bg-accent px-2 py-2 rounded-r-lg text-light hover:bg-light hover:text-accent transition-all ease-in-out duration-200"
                            onClick={addNewDishCategory}
                            type="button"
                          >
                            Insert
                          </button>
                        </div>
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
                      <div className="flex flex-col col-span-1 lg:col-span-2 items-start justify-start h-full gap-1">
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
                          onChange={handleChange}
                          rows="2"
                          // value={reservation.notes}
                        ></textarea>
                      </div>
                      <div className="flex items-end flex-col justify-end flex-wrap gap-2">
                        <button
                          type="button"
                          className="bg-light text-dark ring-2 ring-transparent px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary transition-all ease-in-out duration-200 hover:ring-accent"
                          // onClick={handleBookingReset}
                        >
                          Reset
                        </button>
                        <button
                          type="submit"
                          className="bg-accent text-light ring-2 ring-transparent px-8 py-2 rounded-lg flex items-center gap-2 col-span-1 hover:bg-light hover:text-primary transition-all ease-in-out duration-200 disabled:ring-2 disabled:ring-accent disabled:bg-light disabled:text-accent disabled:hover:scale-100 hover:ring-accent"
                          onClick={() => handleNewDishFormSubmit(activeMenu)}
                        >
                          <FontAwesomeIcon
                            icon={faPlus}
                            className="text-xl"
                          />
                          <span>Add</span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
                {menu.length > 0 ? (
                  menu.map((dish) => {
                    return (
                      <div
                        key={dish.id}
                        className="w-full"
                      >
                        <div className="w-full flex items-center justify-end">
                          <div className="w-max flex items-center justify-end gap-3 bg-light px-3 pt-3 rounded-t-2xl">
                            <button className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200">
                              <FontAwesomeIcon
                                icon={faPenToSquare}
                                className="me-2"
                              />
                              Edit
                            </button>
                            {/* TODO: add patch call to modify the dish of the menu */}
                            <button
                              className="bg-accent text-light ring-2 ring-accent hover:bg-light hover:text-accent rounded-lg px-4 py-2 transition-all ease-in-out duration-200"
                              onClick={() => handleDeleteDish(dish.id)}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="me-2"
                              />
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="p-5 bg-light rounded-3xl rounded-tr-none w-full flex flex-col items-start gap-2">
                          <div className="flex items-start flex-col-reverse justify-between w-full">
                            <div className="flex items-start justify-between w-full">
                              <div>
                                <h6 className="font-semibold border-b-2 mb-2 border-secondary w-max px-3">
                                  {dish.name}
                                </h6>
                                <p className="text-sm px-3">
                                  {dish.description}
                                </p>
                              </div>
                              <div className="text-nowrap pe-3">
                                {dish.price} €
                              </div>
                            </div>
                          </div>
                          <div className="px-3 flex items-center gap-2 flex-wrap">
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
                      </div>
                    );
                  })
                ) : (
                  <h6 className="text-center px-5 py-3.5 text-lg font-bold bg-light w-full rounded-xl text-danger">
                    Empty menu
                  </h6>
                )}
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
