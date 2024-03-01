import React, { useRef, useState } from "react";
import axios from "axios";
import { getMinDate, validDate } from "../utils/DateHandling";
import ReservationAlertMessageComp from "./ReservationAlertMessageComp";

const ReservationComponent = (restaurant) => {
  const [reservationMessage, setReservationMessage] = useState({
    status: "",
    message: "",
  });
  const [reservation, setReservation] = useState({
    email: "",
    seats: 0,
    when: "",
    notes: "",
  });
  const [invalidInput, setInvalidInput] = useState({
    email: false,
    seats: false,
    when: false,
    notes: false,
  });
  const formRef = useRef(null);

  const addReservation = async () => {
    console.log(validateData());
    if (!validateData()) {
      const existingReservation = await checkExistingReservation();
      console.log(existingReservation);
      console.log(reservationMessage);
      if (!existingReservation) {
        axios
          .post(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${restaurant.restaurant.data.id}/message`,
            reservation
          )
          .then((response) => {
            // console.log(response.data);
            if (response.status === 201) {
              setReservationMessage({
                status: "hold",
                message:
                  "You're reservation is sended correctly! currently is in HOLD status, await the restaurant confirmation.",
              });
            } else {
              setReservationMessage({ status: "", message: "" });
            }
          })
          .catch((err) => console.error(err));
      }
      setReservation({ email: "", seats: 0, when: "", notes: "" });
    }
  };

  const checkExistingReservation = async () => {
    try {
      const response = await axios.get(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${restaurant.restaurant.data.id}/message`
      );
      let index = response.data.findIndex(
        (res) =>
          res.name === reservation.name &&
          res.when === reservation.when &&
          res.status !== "REFUSED"
      );
      if (index !== -1) {
        let responseStatus = response.data[index].status;
        switch (responseStatus) {
          case "HOLD":
            setReservationMessage({
              status: "hold",
              message:
                "You have already made a reservation, currently is in HOLD status, await the restaurant confirmation.",
            });
            break;
          case "REFUSED":
            setReservationMessage({
              status: "refused",
              message:
                "You have already made a reservation, the reservation have been rejected from the restaurant.",
            });
            break;
          case "ACCEPTED":
            setReservationMessage({
              status: "accepted",
              message:
                "You have already made a reservation, the reservation have been accepted from the restaurant, have a nice experience.",
            });
            break;
          default:
            console.log("no status match");
            return true;
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
    console.log(reservation);
    addReservation().finally(() => {
      formRef.current.reset();
      setInvalidInput({
        email: false,
        seats: false,
        when: false,
        notes: false,
      });
      setReservation({ email: "", seats: 0, when: "", notes: "" });
    });
  };

  const validateData = () => {
    if (reservation) {
      let result = false;

      let errors = {
        email: false,
        seats: false,
        when: false,
        notes: false,
      };

      errors = { email: false, seats: false, when: false, notes: false };

      Object.keys(reservation).forEach((key) => {
        switch (key) {
          case "email": {
            if (
              reservation.email.length <= 5 ||
              reservation.email.indexOf("@") === -1 ||
              reservation.email.indexOf(".") === -1
            ) {
              console.log(
                reservation.email.length <= 5,
                reservation.email.indexOf("@") === -1,
                reservation.email.indexOf(".") === -1
              );
              errors = { ...errors, email: true };
              result = true;
            }
            break;
          }
          case "seats": {
            if (
              reservation.seats > restaurant.free_seats ||
              reservation.seats === 0 ||
              !reservation.seats
            ) {
              console.log(
                reservation.seats > restaurant.free_seats,
                reservation.seats === 0,
                !reservation.seats
              );
              errors = { ...errors, seats: true };
              result = true;
            }
            break;
          }
          case "when": {
            // console.log(!validDate(reservation.when));
            // console.log(reservation.when);
            if (!validDate(reservation.when)) {
              errors = { ...errors, when: true };
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
      if (result) {
        setInvalidInput({
          email: errors.email,
          seats: errors.seats,
          when: errors.when,
          notes: errors.notes,
        });
      }
      console.log(invalidInput, errors);

      return result;
    } else return true;
  };

  const handleChange = (evt) => {
    switch (evt.target.name) {
      case "email": {
        if (evt.target.value.length > 2) {
          setReservation({ ...reservation, email: evt.target.value });
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
          <label htmlFor="guest_email">Email</label>
          <input
            type="email"
            id="guest_email"
            name="email"
            className={`bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent ${
              invalidInput.email ? "border-2 border-red-500 text-red-500" : ""
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
      <ReservationAlertMessageComp
        reservationMessageObj={reservationMessage}
        setReservationMessageClbk={(data) => {
          setReservationMessage(data);
        }}
      />
    </form>
  );
};

export default ReservationComponent;
