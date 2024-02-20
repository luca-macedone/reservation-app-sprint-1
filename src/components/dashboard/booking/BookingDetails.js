import React, { useContext, useEffect, useState } from "react";
import { BookingContext } from "../../../screen/dashboard/BookingsView";
import { formattedDate } from "../../../utils/DateHandling";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
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
      setIsLoading(false);
    }
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
      {!isLoading && messageData ? (
        <div className="col-span-1 lg:col-span-2 bg-tertiary p-5 lg:p-10 rounded-xl h-[530px] flex flex-col border-2 border-secondary">
          <div className="h-full flex flex-col gap-5">
            <div className="flex flex-col gap-5">
              <h5>{messageData.name}</h5>
              <span>{messageData.seats}</span>
              <span>{formattedDate(messageData.when)}</span>
            </div>
            <p className="p-5 bg-light h-full rounded-2xl">
              {messageData.notes}
            </p>
          </div>
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
      ) : (
        <div className="h-full">loading</div>
      )}
    </>
  );
};

export default BookingDetails;
