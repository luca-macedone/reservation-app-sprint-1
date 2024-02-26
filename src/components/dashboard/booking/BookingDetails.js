import React, { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../../screen/dashboard/BookingsView";
import { formattedDate } from "../../../utils/DateHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCircleCheck,
  faSpinner,
  faUserGroup,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const BookingDetails = () => {
  const message = useContext(BookingContext);
  const { data } = message;
  // console.log(data);
  const [isPatching, setIsPatching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [messageData, setMessageData] = useState(null);

  useEffect(() => {
    if (data) {
      setMessageData(data);
    }

    setIsLoading(false);
  }, [data]);

  const patchBooking = async (_newData) => {
    const url = new URL("https://65c3642539055e7482c0c4ba.mockapi.io/api/v1");
    axios({
      method: "put",
      url: `${url}/message/${data.id}`,
      data: _newData,
    })
      .then((res) => console.log(res.data.status))
      .catch((err) => console.error(err))
      .finally(() => {
        setMessageData({ ...messageData, status: _newData.status });
        setIsPatching(false);
      });
  };

  const handleClick = (evt) => {
    setIsPatching(true);
    // console.log(evt.target.value);
    // console.log(data);
    let newData = {};
    if (evt.target.value === "accept-btn") {
      newData = { ...messageData, status: "ACCEPTED" };
    } else {
      newData = { ...messageData, status: "REFUSED" };
    }

    patchBooking(newData);
  };

  return (
    <>
      {!isLoading ? (
        messageData ? (
          <div className="col-span-1 lg:col-span-2 bg-tertiary p-2 rounded-tr-xl h-full lg:h-[550px] rounded-xl lg:rounded-none flex flex-col">
            <div className="h-full flex flex-col gap-5">
              <h5 className=" text-secondary text-xl px-5 py-2.5 bg-light rounded-t-lg lg:rounded-none lg:rounded-tr-lg border-b-2 border-secondary">
                {messageData.email}
              </h5>
              <div className="flex flex-col justify-between gap-5 px-5 pb-5 lg:px-10 lg:pb-10 pt-5 h-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-0 justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faUserGroup}
                        className="text-xl"
                      />
                      Table
                    </span>
                    <strong className="text-xl">x{messageData.seats}</strong>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="text-xl"
                      />
                      When
                    </span>
                    <span className="text-xl">
                      {formattedDate(messageData.when)}
                    </span>
                  </div>
                </div>
                <p className="p-5 bg-light h-full rounded-2xl">
                  {messageData.notes}
                </p>
                <div className="flex items-center justify-end gap-3 mt-5">
                  <button
                    className="bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200 disabled:bg-light disabled:text-dark disabled:ring-dark disabled:ring-1"
                    onClick={handleClick}
                    value="accept-btn"
                    disabled={isPatching || messageData.status === "ACCEPTED"}
                  >
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="me-2"
                    />
                    Accept
                  </button>
                  <button
                    className="bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200 disabled:bg-light disabled:text-dark disabled:ring-dark disabled:ring-1"
                    onClick={handleClick}
                    value="refuse-btn"
                    disabled={isPatching || messageData.status === "REFUSED"}
                  >
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="me-2"
                    />
                    Refuse
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-1 lg:col-span-2 bg-tertiary p-2 lg:rounded-tr-xl h-full lg:h-[550px] flex flex-col justify-start rounded-xl lg:rounded-b-none">
            <h5 className="font-special text-secondary text-2xl px-5 py-2.5 bg-light rounded-tr-lg border-b-2 border-secondary">
              Details
            </h5>
            <h6 className="text-center h-[200px] px-5 py-2 mt-3">
              No message to be load.
            </h6>
          </div>
        )
      ) : (
        <div className="h-max lg:h-[600px] min-w-full bg-tertiary rounded-tr-xl font-special flex flex-col items-center text-primary justify-center col-span-1 lg:col-span-2">
          <h3 className="text-2xl">Loading</h3>
          <FontAwesomeIcon
            icon={faSpinner}
            className="text-xl animate-spin"
          />
        </div>
      )}
    </>
  );
};

export default BookingDetails;
