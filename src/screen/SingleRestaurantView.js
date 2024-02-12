import React, { useEffect, useRef, useState } from "react";

// import dummyRestaurant from "../data/dummy";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleInfo,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LoadingComp from "../components/LoadingComp";

const SingleRestaurantView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState({});
  const location = useLocation();
  const formRef = useRef(null);
  const data = location.state;

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({
    data: {},
    gallery: [],
    menu: [],
  });
  const navigator = useNavigate();

  const checkIsFull = () => {
    // console.log(
    //   parseInt(restaurant.data.free_seats, 10) - reservation.seats <= 0
    // );

    return parseInt(restaurant.data.free_seats, 10) - reservation.seats <= 0;
  };

  const handleReset = () => {
    formRef.current.reset();
    setReservation({});
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    // TODO aggiungere invio dei dati alla dashboard del gestore
  };

  const handleChange = (evt) => {
    switch (evt.target.name) {
      case "name": {
        if (evt.target.value.length > 2) {
          setReservation({ ...reservation, name: evt.target.value });
        }
        break;
      }
      case "seats": {
        if (evt.target.value > 0) {
          setReservation({ ...reservation, seats: evt.target.value });
          checkIsFull();
        }
        break;
      }
      case "when": {
        setReservation({ ...reservation, when: evt.target.value });
        break;
      }
      case "notes": {
        if (evt.target.value.length > 2) {
          setReservation({ ...reservation, notes: evt.target.value });
        }
        break;
      }

      default:
        throw new Error("Not a valid input change!");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    if (data.seats) {
      setReservation({ ...reservation, seats: data.seats });
    }

    if (data.when) {
      setReservation({ ...reservation, when: data.when });
    }

    window.scrollTo(0, 0);
    const fetchRestaurant = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}`
          ),
          axios.get(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/gallery`
          ),
          axios.get(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/Menu`
          ),
        ]);
        setRestaurant({
          data: { ...res1.data },
          gallery: [...res2.data],
          menu: [...res3.data],
        });
      } catch (err) {
        console.error(err);
        navigator("/error");
      } finally {
        setIsLoading(false);
        checkIsFull();
      }
    };

    fetchRestaurant();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto px-3 min-h-screen">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-center justify-center gap-10">
            <div className="flex flex-col lg:flex-row items-center gap-3 py-5 col-span-1 md:col-span-2">
              <div
                className="min-w-36 aspect-square rounded-full overflow-hidden ring ring-secondary"
                style={{
                  backgroundImage: `url(${restaurant.data.profile_img.src})`,
                  backgroundPosition: `center`,
                  backgroundSize: `cover`,
                }}
              ></div>
              <div className="flex flex-col-reverse md:flex-row items-end md:items-start justify-between gap-5 w-full">
                <div className="flex flex-col items-end md:items-start justify-start gap-5 md:gap-1 w-full">
                  <h1 className="text-4xl font-bold border-b-2 border-secondary px-3 w-full md:w-max text-end md:text-start">
                    {restaurant.data.name}
                  </h1>
                  <div className="px-3 py-2 text-end md:text-start">
                    {restaurant.data.address +
                      ", " +
                      restaurant.data.city +
                      ", " +
                      restaurant.data.country}
                  </div>
                  <div className="flex items-start justify-end md:justify-start gap-3 flex-wrap p-3">
                    {restaurant.data.type.map((type, index) => {
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
                  onClick={() => navigator("/restaurants")}
                  className="bg-accent px-5 py-2 rounded-lg text-light shadow-md font-semibold uppercase hover:bg-primary hover:scale-105 transition-all ease-in-out duration-200"
                >
                  Back
                </button>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-3xl shadow-lg">
              <img
                src={restaurant.data.about_img.src}
                alt={restaurant.data.about_img.alt}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3 font-special text-primary">
                About us
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: restaurant.data.description,
                }}
                className=" text-justify leading-7 text-xl"
              />
            </div>
          </div>
          <section className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 bg-tertiary px-5 pt-5 pb-10 md:py-10 md:pb-20 md:px-10 rounded-3xl my-10 shadow-lg">
            <div className="col-span-1 md:col-span-2 flex justify-center items-center pb-2 mb-5">
              <h2 className="text-3xl font-bold border-b-2 border-secondary px-10 py-3 font-special text-primary">
                Menu
              </h2>
            </div>
            {restaurant.menu.map((dish, index) => {
              return (
                <div
                  key={index}
                  className="border-b-2 border-secondary p-3 flex items-start justify-between"
                >
                  <div className="flex flex-col items-start justify-start gap-2">
                    <h4 className="text-xl font-bold capitalize">
                      {dish.name}
                    </h4>
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
          <section className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 items-center justify-center gap-10 py-10">
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
                  {restaurant.data.openings.map((day, index) => {
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
            <form
              className="col-span-1 lg:col-span-2 bg-secondary text-light shadow-lg rounded-3xl p-5 md:p-10 h-max"
              onSubmit={handleSubmit}
              ref={formRef}
            >
              {/* TODO form per la prenotazione */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-5 md:mb-0">
                <h2 className="font-special font-light text-3xl mb-5">
                  Reserve your table
                </h2>
                <span className="bg-accent text-light px-8 py-2 rounded-lg flex items-center gap-2">
                  {checkIsFull() ? (
                    <FontAwesomeIcon
                      icon={faCircleExclamation}
                      className="text-xl"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="text-xl"
                    />
                  )}
                  {checkIsFull() ? "Full" : "Reservation avaliable"}
                </span>
              </div>
              <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
                <div className="flex flex-col items-start justify-start h-full gap-1">
                  <label htmlFor="guest_fullname">Full Name</label>
                  <input
                    type="text"
                    id="guest_fullname"
                    name="name"
                    className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                    // value={reservation.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-1">
                  <label htmlFor="guest_number">Number of guests</label>
                  <input
                    type="number"
                    id="guest_number"
                    min={1}
                    step={1}
                    name="seats"
                    // value={reservation.seats}
                    defaultValue={reservation.seats}
                    max={restaurant.data.max_seats}
                    className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-1">
                  <label htmlFor="reservation_date">When</label>
                  <div className="flex item-end gap-2 w-full">
                    <input
                      type="datetime-local"
                      id="reservation_date"
                      name="when"
                      step={1800}
                      // value={reservation.when}
                      defaultValue={reservation.when}
                      className="bg-light px-5 py-2 rounded-lg text-dark w-full"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start justify-start h-full gap-1">
                  <label htmlFor="notes">Notes</label>
                  <textarea
                    name="notes"
                    id="notes"
                    className="w-full rounded-lg text-dark bg-light py-2 px-5"
                    onChange={handleChange}
                    rows="1"
                    // value={reservation.notes}
                  ></textarea>
                </div>
                <div className="flex items-end justify-end gap-5 col-span-1 md:col-span-2">
                  <button
                    type="button"
                    className="bg-light text-dark px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-accent px-8 py-2 rounded-lg flex items-center gap-3 col-span-1 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 disabled:ring-2 disabled:ring-accent disabled:bg-light disabled:text-accent disabled:hover:scale-100"
                    disabled={checkIsFull()}
                  >
                    {checkIsFull() ? "Restaurant full" : "Reserve"}
                  </button>
                </div>
              </div>
            </form>
          </section>
          <section className="py-10">
            <div className="flex items-center justify-center w-full mb-10">
              <h2 className="text-3xl font-bold border-b-2 border-secondary px-10 py-3 font-special text-primary w-max">
                Gallery
              </h2>
            </div>
            {restaurant.gallery.map((pic, index) => {
              return (
                <div
                  key={index}
                  className={
                    index % 2 === 0
                      ? "flex flex-col xl:flex-row items-center md:justify-center gap-10 my-10 xl:my-0"
                      : "flex flex-col xl:flex-row-reverse items-center md:justify-center gap-10 my-10 xl:my-0"
                  }
                >
                  <img
                    src={pic.src}
                    alt={pic.alt}
                    className="my-5"
                  />
                  <div className="flex items-center justify-center">
                    <p className="text-center font-bold text-xl leading-10 italic max-w-[600px]">
                      <FontAwesomeIcon
                        icon={faQuoteLeft}
                        className="text-accent text-3xl px-3"
                      />
                      {pic.caption}
                      <FontAwesomeIcon
                        icon={faQuoteRight}
                        className="text-accent text-3xl px-3"
                      />
                    </p>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      ) : (
        <LoadingComp />
      )}
    </>
  );
};

export default SingleRestaurantView;
