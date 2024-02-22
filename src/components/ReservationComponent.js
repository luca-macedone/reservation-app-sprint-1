import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import {
  faCircleCheck,
  // faCheckCircle,
  faCircleExclamation,
  faCircleInfo,
  faXmarkCircle,
  faX,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { getMinDate, validDate } from "../utils/DateHandling";

const ReservationComponent = (restaurant) => {
  const [reservationMessage, setReservationMessage] = useState({
    status: "",
    message: "",
  });
  const [reservation, setReservation] = useState({
    name: "",
    seats: 1,
    when: "",
    notes: "",
  });
  const [invalidInput, setInvalidInput] = useState({
    name: false,
    seats: false,
    when: false,
    notes: false,
  });
  const formRef = useRef(null);

  const addReservation = async () => {
    console.log(validateData());
    if (!validateData()) {
      const existingReservation = await checkExistingReservation();
      if (!existingReservation) {
        axios
          .post(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${restaurant.restaurant.data.id}/message`,
            reservation
          )
          .then((response) => {
            // console.log(response.data);
            setReservationMessage({ status: "", message: "" });
          })
          .catch((err) => console.error(err))
          .finally(() => {
            formRef.current.reset();
          });
      }
    }
  };

  const checkExistingReservation = async () => {
    try {
      const response = await axios.get(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${restaurant.restaurant.data.id}/message`
      );
      if (
        response.data.some(
          (res) =>
            res.name === reservation.name && res.when === reservation.when
        )
      ) {
        console.log(response.data[0].status);
        if (response.data[0].status === "HOLD") {
          setReservationMessage({
            status: "hold",
            message:
              "You have already made a reservation, currently is in HOLD status, await the restaurant confirmation.",
          });
        } else if (response.data[0].status === "REJECTED") {
          setReservationMessage({
            status: "rejected",
            message:
              "You have already made a reservation, the reservation have been rejected from the restaurant.",
          });
          // TODO rimuovere il messaggio da mockapi
        } else if (response.data[0].status === "ACCEPTED") {
          setReservationMessage({
            status: "accepted",
            message:
              "You have already made a reservation, the reservation have been accepted from the restaurant, have a nice experience.",
          });
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleBookingReset = () => {
    formRef.current.reset();
    setReservation({});
    setReservationMessage({ status: "", message: "" });
  };

  const handleBookingSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();
    // console.log(evt);

    if (reservation.name.length !== 0 && checkIsFull()) {
      addReservation();
      // console.log("sending");
    }
  };

  const checkIsFull = () => {
    return (
      parseInt(restaurant.restaurant.data.free_seats, 10) - reservation.seats <=
      0
    );
  };

  const validateData = () => {
    if (reservation) {
      let result = false;

      Object.keys(reservation).forEach((key) => {
        switch (key) {
          case "name": {
            if (reservation.name.length <= 2) {
              setInvalidInput({ ...invalidInput, name: true });
              result = true;
            }
            break;
          }
          case "seats": {
            if (reservation.seats >= restaurant.free_seats) {
              setInvalidInput({ ...invalidInput, seats: true });
              result = true;
            }
            break;
          }
          case "when": {
            if (validDate(reservation.when)) {
              setInvalidInput({ ...invalidInput, when: true });
              result = true;
            }
            break;
          }
          case "notes": {
            break;
          }
          default:
            throw new Error("Invalid key in the object.");
        }
      });

      return result;
    } else return true;
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
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
        <div className="flex flex-col items-start justify-start h-full gap-1">
          <label htmlFor="guest_fullname">Full Name</label>
          <input
            type="text"
            id="guest_fullname"
            name="name"
            className={`bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent ${
              invalidInput.name ? "border-2 border-red-500 text-red-500" : ""
            }`}
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
            max={restaurant.restaurant.data.free_seats}
            className={`bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent ${
              invalidInput.seats ? "border-2 border-red-500 text-red-500" : ""
            }`}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col items-start justify-start row-span-1 lg:row-span-2 h-full gap-1">
          <label htmlFor="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            className={`w-full rounded-lg text-dark bg-light py-2 px-5 focus:outline-accent ${
              invalidInput.notes ? "border-2 border-red-500 text-red-500" : ""
            }`}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <div className="flex flex-col items-start justify-start h-full gap-1">
          <label htmlFor="reservation_date">When</label>
          <div className="flex item-end gap-2 w-full">
            <input
              type="datetime-local"
              id="reservation_date"
              name="when"
              min={getMinDate()}
              step={1800}
              className={`bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent ${
                invalidInput.when ? "border-2 border-red-500 text-red-500" : ""
              }`}
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
            disabled={
              parseInt(restaurant.restaurant.data.free_seats, 10) <= 0 ||
              reservationMessage.status !== ""
            }
          >
            Reserve
          </button>
        </div>
      </div>
      {reservationMessage.status !== "" && (
        <div
          className="bg-light p-5 mt-5 rounded-xl border-2 shadow-lg font-semibold flex items-start justify-between"
          style={{
            color:
              reservationMessage.status === "error"
                ? "red"
                : reservationMessage.status === "hold"
                ? "#F27001"
                : reservationMessage.status === "refused"
                ? "orange"
                : reservationMessage.status === "accepted"
                ? "green"
                : "",
            borderColor:
              reservationMessage.status === "error"
                ? "red"
                : reservationMessage.status === "hold"
                ? "#F27001"
                : reservationMessage.status === "accepted"
                ? "green"
                : "",
          }}
        >
          <p className="flex items-start">
            {reservationMessage.status === "error" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-2xl"
                />
                ERROR:
              </strong>
            ) : reservationMessage.status === "hold" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="text-2xl"
                />
                INFO:
              </strong>
            ) : reservationMessage.status === "refused" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="text-2xl"
                />
                CANCELED:
              </strong>
            ) : reservationMessage.status === "accepted" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-2xl"
                />
                DONE:
              </strong>
            ) : (
              ""
            )}
            {reservationMessage.message}
          </p>
          <button
            className="border-2 px-5 py-2 rounded-xl hover:text-secondary hover:bg-tertiary transition-all ease-in-out duration-200"
            style={{
              borderColor:
                reservationMessage.status === "error"
                  ? "red"
                  : reservationMessage.status === "hold"
                  ? "#F27001"
                  : reservationMessage.status === "accepted"
                  ? "green"
                  : "",
            }}
            onClick={() => {
              setReservationMessage({ status: "", message: "" });
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      )}
    </form>
  );
};

export default ReservationComponent;
