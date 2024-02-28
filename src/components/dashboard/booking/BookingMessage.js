import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClock,
  faEye,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { formattedDate } from "../../../utils/DateHandling";

const BookingMessage = ({
  id,
  email,
  seats,
  when,
  status,
  handleChildClick,
}) => {
  // console.log(useContext(BookingContext))
  // const data = useContext(BookingContext);
  // console.log(data);

  const showMessage = () => {
    handleChildClick(id);
  };

  return (
    <div
      className="bg-light rounded-xl px-5 py-3 w-full flex flex-col text-dark"
      key={id}
    >
      <div className="flex items-center justify-between flex-wrap">
        <h5 className="font-bold  flex items-end gap-1 italic w-full lg:w-max justify-between lg:justify-start">
          {email}
          <span className="font-light lowercase flex items-end gap-1 not-italic">
            x<strong className="text-lg font-bold">{seats}</strong>
          </span>
        </h5>
        <div className="hidden lg:inline-flex">{formattedDate(when)}</div>
      </div>
      <div className="bg-tertiary rounded-xl px-3 py-2 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <FontAwesomeIcon
            icon={
              status === "HOLD"
                ? faClock
                : status === "ACCEPTED"
                ? faCircleCheck
                : status === "REFUSED"
                ? faXmarkCircle
                : ""
            }
            className="text-2xl"
          />
          {status === "HOLD"
            ? "Hold"
            : status === "ACCEPTED"
            ? "Accepted"
            : status === "REFUSED"
            ? "Refused"
            : ""}
        </span>
        <button
          className="bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200"
          onClick={() => showMessage()}
        >
          <FontAwesomeIcon
            icon={faEye}
            className="me-2"
          />
          Show
        </button>
      </div>
    </div>
  );
};

export default BookingMessage;
