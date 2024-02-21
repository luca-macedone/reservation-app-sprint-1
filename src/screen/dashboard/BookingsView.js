import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";
import BookingMessage from "../../components/dashboard/booking/BookingMessage";
import BookingDetails from "../../components/dashboard/booking/BookingDetails";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClock,
  faEye,
  faInbox,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export const BookingContext = createContext();

const BookingsView = () => {
  const [bookingList, setBookingList] = useState([]);
  const [filteredBookingList, setFilteredBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inboxFilter, setInboxFilter] = useState("HOLD");
  const [activeMessage, setActiveMessage] = useState({
    loading: true,
    data: null,
  });
  const [bookingAnalytics, setBookingAnalytics] = useState({
    hold: 0,
    accepted: 0,
    refused: 0,
  });
  const location = useLocation();

  const fetchList = async () => {
    const url = new URL("https://65c3642539055e7482c0c4ba.mockapi.io/api/v1");
    await axios
      .get(`${url}/message`)
      .then((response) => {
        // console.log(response.data);
        // console.log(location.state);
        setBookingList(response.data);
        // setFilteredBookingList(response.data);
        if (!location.state) {
          // console.log(response.data);
          let res = response.data[0];
          // setActiveMessage({ ...activeMessage, data: res });
          setActiveMessage((prevState) => ({ loading: false, data: res }));
        } else {
          let res = response.data.find((item) => item.id === location.state.id);
          // setActiveMessage({ ...activeMessage, data: res });
          setActiveMessage((prevState) => ({ loading: false, data: res }));
        }
        fetchStatus(response.data);
      })
      .catch((err) => console.error(err));
  };

  const handleInboxFilter = (evt) => {
    console.log(evt.target.value);
    setInboxFilter(evt.target.value);
  };

  const fetchStatus = (_data) => {
    let result = { hold: 0, accepted: 0, refused: 0 };
    _data.forEach((msg) => {
      switch (msg.status) {
        case "HOLD":
          result.hold++;
          break;
        case "ACCEPTED":
          result.accepted++;
          break;
        case "REFUSED":
          result.refused++;
          break;

        default:
          throw new Error("Message status not recognised");
      }
    });

    setBookingAnalytics(result);
  };

  const filterInboxMessages = async () => {
    const res = await bookingList.filter((msg) => msg.status === inboxFilter);
    console.log(res);
    setFilteredBookingList(res);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchList().finally(() => {
      // console.log(activeMessage);
      setIsLoading(false);
      filterInboxMessages();
      // setActiveMessage({ ...activeMessage, loading: false });
      // setActiveMessage(prevState => ({loading: false, data: res}))
    });
  }, [inboxFilter]);

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h2 className="font-special text-secondary text-3xl text-end mb-3 mt-5 lg:mt-0">
        Bookings
      </h2>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 h-full overflow-hidden gap-0">
        <div className="h-full row-span-1 lg:row-span-2 overflow-y-auto p-2 flex flex-col gap-3 bg-tertiary rounded-l-2xl">
          <h4 className="font-special text-secondary text-3xl px-5 py-2 bg-light rounded-tl-lg border-b-2 border-secondary">
            <FontAwesomeIcon
              icon={faInbox}
              className="text-3xl me-2"
            />
            Inbox
          </h4>
          {!isLoading ? (
            filteredBookingList.map((message) => {
              return (
                <BookingMessage
                  key={message.id}
                  {...message}
                  handleChildClick={(_id) => {
                    // console.log("test", _id);
                    let result = bookingList.find((msg) => msg.id === _id);
                    setActiveMessage({ loading: false, data: result });
                  }}
                />
              );
            })
          ) : (
            <LoadingComp />
          )}
        </div>
        <BookingContext.Provider value={activeMessage}>
          <BookingDetails />
        </BookingContext.Provider>
        <div className="col-span-1 lg:col-span-2 bg-tertiary p-5 rounded-br-xl h-full flex items-center justify-between">
          <div className="flex items-center justify-start gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-col bg-light px-5 py-2.5 rounded-2xl gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-3xl text-primary"
                  />
                  <span className="font-special text-primary">On Hold</span>
                </div>
                <span className="text-3xl font-semibold">
                  {bookingAnalytics.hold}
                </span>
              </div>
              <div className="w-full flex">
                <label
                  htmlFor="hold-filter"
                  className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-full text-center"
                  style={{
                    borderColor: inboxFilter === "HOLD" && "#FF4C31",
                    color: inboxFilter === "HOLD" && "#FF4C31",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="me-2"
                  />
                  Show
                  <input
                    className="hidden"
                    type="radio"
                    name="inbox-filter"
                    id="hold-filter"
                    onChange={handleInboxFilter}
                    value="HOLD"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-col bg-light px-5 py-2.5 rounded-2xl gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-3xl text-primary"
                  />
                  <span className="font-special text-primary">Accepted</span>
                </div>
                <span className="text-3xl font-semibold">
                  {bookingAnalytics.accepted}
                </span>
              </div>
              <div className="w-full flex">
                <label
                  htmlFor="accept-filter"
                  className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-full text-center"
                  style={{
                    borderColor: inboxFilter === "ACCEPTED" && "#FF4C31",
                    color: inboxFilter === "ACCEPTED" && "#FF4C31",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="me-2"
                  />
                  Show
                  <input
                    className="hidden"
                    type="radio"
                    name="inbox-filter"
                    id="accept-filter"
                    onChange={handleInboxFilter}
                    value="ACCEPTED"
                  />
                </label>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center flex-col bg-light px-5 py-2.5 rounded-2xl gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    className="text-3xl text-primary"
                  />
                  <span className="font-special text-primary">Refused</span>
                </div>
                <span className="text-3xl font-semibold">
                  {bookingAnalytics.refused}
                </span>
              </div>
              <div className="w-full flex">
                <label
                  htmlFor="refuse-filter"
                  className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-full text-center"
                  style={{
                    borderColor: inboxFilter === "REFUSED" && "#FF4C31",
                    color: inboxFilter === "REFUSED" && "#FF4C31",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="me-2"
                  />
                  Show
                  <input
                    className="hidden"
                    type="radio"
                    name="inbox-filter"
                    id="refuse-filter"
                    onChange={handleInboxFilter}
                    value="REFUSED"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsView;
