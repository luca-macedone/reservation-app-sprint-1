import React, { useContext } from "react";
import { BookingContext } from "../../../screen/dashboard/BookingsView";
import { formattedDate } from "../../../utils/DateHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

const BookingDetails = () => {
  const message = useContext(BookingContext);
  const { data } = message;
  return (
    <>
      {!message.loading ? (
        <div className="col-span-1 lg:col-span-2 bg-tertiary p-5 lg:p-10 rounded-xl h-[530px]">
          <div className="">
            <div>
              <h5>{data.name}</h5>
              <span>{data.seats}</span>
              <span>{formattedDate(data.when)}</span>
            </div>
            <p>{data.notes}</p>
          </div>
          <div>
            <button className="bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="me-2"
              />
              Accept
            </button>
            <button className="bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200">
              <FontAwesomeIcon
                icon={faXmarkCircle}
                className="me-2"
              />
              Refuse
            </button>
          </div>
        </div>
      ) : (
        <div className="h-full">loading</div>
      )}
    </>
  );
};

export default BookingDetails;
