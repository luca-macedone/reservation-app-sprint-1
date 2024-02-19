import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import {
  faCheckCircle,
  faCircleExclamation,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { DateTime } from "luxon";

const ReservationComponent = (restaurant, id) => {
  const [reservationStatus, setReservationStatus] = useState({
    isReserved: false,
    message: "",
  });
  const [reservation, setReservation] = useState({
    name: "",
    seats: 1,
    when: "",
    notes: "",
  });
  const formRef = useRef(null);

  const formattedDate = (time) => {
    // console.log(time);
    const parsedTime = DateTime.fromISO(time);
    // console.log(parsedTime);
    return parsedTime.toLocaleString(DateTime.DATETIME_MED);
    // return parsedTime.toString();
  };

  const addReservation = async () => {
    axios
      .post(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/message`,
        reservation
      )
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setReservationStatus({
          isReserved: true,
          message: `You table is reserved for ${formattedDate(
            reservation.when
          )} x ${reservation.seats} ${
            reservation.seats > 1 ? "guests" : "guest"
          }. Enjoy the experience`,
        });

        formRef.current.reset();
      });
  };

  const handleBookingReset = () => {
    formRef.current.reset();
    setReservation({});
  };

  const handleBookingSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if ((reservation.name.length !== 0, !checkIsFull())) {
      addReservation();
    }
  };

  const checkIsFull = () => {
    return parseInt(restaurant.restaurant.data.free_seats, 10) - reservation.seats <= 0;
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
          // checkIsFull();
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
        throw new Error("Action not permitted!");
    }
  };

  useEffect(() => {
    setReservationStatus({
      isReserved: false,
      message: "",
    });
    // console.log(restaurant.restaurant.data.free_seats);
  }, []);
  return (
    <form
      className="col-span-1 lg:col-span-2 bg-secondary text-light shadow-lg rounded-3xl p-5 md:p-10 h-max"
      onSubmit={handleBookingSubmit}
      ref={formRef}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-5 md:mb-0">
        <h2 className="font-special font-light text-3xl mb-5">
          Reserve your table
        </h2>
        <span className="bg-accent text-light px-8 py-2 rounded-lg flex items-center gap-2 transition-all ease-in-out duration-200">
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
          {parseInt(restaurant.restaurant.data.free_seats, 10) <= 0
            ? "Full"
            : "Reservation avaliable"}
        </span>
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
        <div className="flex flex-col items-start justify-start h-full gap-1">
          <label htmlFor="guest_fullname">Full Name</label>
          <input
            type="text"
            id="guest_fullname"
            name="name"
            className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
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
            // defaultValue={reservation.seats}
            max={restaurant.restaurant.data.free_seats}
            className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start justify-start row-span-1 lg:row-span-2 h-full gap-1">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            className="w-full rounded-lg text-dark bg-light py-2 px-5 focus:outline-accent"
            onChange={handleChange}
            rows="3"
            // value={reservation.notes}
          ></textarea>
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
              // defaultValue={reservation.when}
              className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-end justify-end gap-5">
          <button
            type="button"
            className="bg-light text-dark px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
            onClick={handleBookingReset}
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-accent px-8 py-2 rounded-lg flex items-center gap-3 col-span-1 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 disabled:ring-2 disabled:ring-accent disabled:bg-light disabled:text-accent disabled:hover:scale-100"
            disabled={parseInt(restaurant.restaurant.data.free_seats, 10) <= 0}
          >
            {parseInt(restaurant.restaurant.data.free_seats, 10) <= 0
              ? "Restaurant full"
              : "Reserve"}
          </button>
        </div>
      </div>

      {reservationStatus.isReserved && (
        <div className="bg-light text-accent px-5 ring-2 ring-accent py-2 mt-4 rounded-xl">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-500 me-2 text-xl"
          />
          {reservationStatus.message}
        </div>
      )}
    </form>
  );
};

export default ReservationComponent;
