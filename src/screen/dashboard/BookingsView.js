import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
// import LoadingComp from "../../components/LoadingComp";
import BookingMessage from "../../components/dashboard/booking/BookingMessage";
import BookingDetails from "../../components/dashboard/booking/BookingDetails";
// import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faClock,
  faEye,
  faEyeSlash,
  faFilter,
  faFilterCircleXmark,
  faInbox,
  faSpinner,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export const BookingContext = createContext();

const BookingsView = () => {
  const [bookingList, setBookingList] = useState([]);
  const [filteredBookingList, setFilteredBookingList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inboxFilter, setInboxFilter] = useState("HOLD");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState({
    loading: true,
    data: null,
  });
  const [bookingAnalytics, setBookingAnalytics] = useState({
    hold: 0,
    accepted: 0,
    refused: 0,
  });
  // const location = useLocation();

  const fetchList = async () => {
    const url = new URL("https://65c3642539055e7482c0c4ba.mockapi.io/api/v1");
    try {
      const response = await axios.get(`${url}/message`);
      setBookingList(response.data);
      setActiveMessage((prevState) => ({
        ...prevState,
        loading: false,
        data: response.data[0] || null,
      }));
      fetchStatus(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const handleInboxFilter = (evt) => {
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

  const filterInboxMessages = (data) => {
    const res = data.filter((msg) => msg.status === inboxFilter);
    // console.log(res);
    setFilteredBookingList(res);
  };

  const toggleFilterMenu = (_prev) => {
    setIsFilterMenuOpen(!_prev);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchList().then((data) => {
      filterInboxMessages(data);
      setIsLoading(false);
    });
  }, [inboxFilter]);

  return (
    <div className="h-full flex flex-col overflow-hidden pb-10 lg:pb-0">
      <h2 className="font-special text-secondary text-3xl text-end mb-3 mt-5 lg:mt-0">
        Bookings
      </h2>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 h-full overflow-hidden gap-2.5 lg:gap-0 relative">
        {/* MODALE FILTRI MOBILE */}
        {isFilterMenuOpen && (
          <div className="absolute top-0 left-0 p-2 bg-tertiary rounded-xl w-full h-[300px]">
            <div className="items-start justify-start gap-5 w-full flex flex-col">
              <h4 className="font-special text-secondary text-3xl bg-light border-b-2 border-secondary px-5 py-2 w-full rounded-t-md flex items-center justify-between ">
                <div>
                  <FontAwesomeIcon
                    icon={faInbox}
                    className="text-3xl me-2"
                  />
                  Inbox
                </div>

                <button
                  className="text-lg bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200"
                  onClick={() => toggleFilterMenu(isFilterMenuOpen)}
                >
                  <FontAwesomeIcon icon={faFilterCircleXmark} />
                </button>
              </h4>

              <div className="flex items-center w-full justify-between gap-2 h-full">
                <div className="flex items-center bg-light px-5 py-2.5 rounded-2xl gap-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="text-xl text-primary"
                    />
                    <span className="text-nowrap">On Hold</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {bookingAnalytics.hold}
                  </span>
                </div>
                <div className="w-max flex">
                  <label
                    htmlFor="hold-filter"
                    className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-max flex items-center justify-center gap-2"
                    style={{
                      borderColor: inboxFilter === "HOLD" && "#FF4C31",
                      color: inboxFilter === "HOLD" && "#FF4C31",
                    }}
                  >
                    {inboxFilter === "HOLD" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-xl"
                        />
                        Showing
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-xl"
                        />
                        Show
                      </>
                    )}
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
              <div className="flex items-center w-full justify-between gap-2 h-full">
                <div className="flex items-center bg-light px-5 py-2.5 rounded-2xl gap-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-xl text-primary"
                    />
                    <span className="text-primary text-nowrap">Accepted</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {bookingAnalytics.accepted}
                  </span>
                </div>
                <div className="w-max flex">
                  <label
                    htmlFor="accept-filter"
                    className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-max flex items-center justify-center gap-2"
                    style={{
                      borderColor: inboxFilter === "ACCEPTED" && "#FF4C31",
                      color: inboxFilter === "ACCEPTED" && "#FF4C31",
                    }}
                  >
                    {inboxFilter === "ACCEPTED" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-xl"
                        />
                        Showing
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-xl"
                        />
                        Show
                      </>
                    )}
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
              <div className="flex items-center w-full justify-between gap-2">
                <div className="flex items-center bg-light px-5 py-2.5 rounded-2xl gap-4">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      className="text-xl text-primary"
                    />
                    <span className="text-primary">Refused</span>
                  </div>
                  <span className="text-xl font-semibold">
                    {bookingAnalytics.refused}
                  </span>
                </div>
                <div className="w-max flex">
                  <label
                    htmlFor="refuse-filter"
                    className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-max flex items-center justify-center gap-2"
                    style={{
                      borderColor: inboxFilter === "REFUSED" && "#FF4C31",
                      color: inboxFilter === "REFUSED" && "#FF4C31",
                    }}
                  >
                    {inboxFilter === "REFUSED" ? (
                      <>
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-xl"
                        />
                        Showing
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-xl"
                        />
                        Show
                      </>
                    )}
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
        )}
        <div className="h-[300px] lg:h-full row-span-1 lg:row-span-2 overflow-y-scroll p-2 flex flex-col gap-3 bg-tertiary rounded-xl lg:rounded-l-2xl">
          <h4 className="font-special text-secondary text-3xl px-5 py-2 bg-light rounded-t-lg lg:rounded-none lg:rounded-tl-lg border-b-2 border-secondary flex items-center justify-between">
            <div>
              <FontAwesomeIcon
                icon={faInbox}
                className="text-3xl me-2"
              />
              Inbox
            </div>
            <button
              className="text-lg bg-accent text-light px-3 py-1 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200 lg:hidden"
              onClick={() => toggleFilterMenu(isFilterMenuOpen)}
            >
              <FontAwesomeIcon icon={faFilter} />
            </button>
          </h4>
          {!isLoading ? (
            filteredBookingList.length > 0 ? (
              filteredBookingList.map((message) => {
                return (
                  <BookingMessage
                    key={message.id}
                    {...message}
                    handleChildClick={(_id) => {
                      let result = bookingList.find((msg) => msg.id === _id);
                      setActiveMessage({ loading: false, data: result });
                    }}
                  />
                );
              })
            ) : (
              <h6 className="text-center px-5 py-2">No messages here.</h6>
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
        </div>
        <BookingContext.Provider value={activeMessage}>
          <BookingDetails />
        </BookingContext.Provider>
        <div className="col-span-1 lg:col-span-2 bg-tertiary p-5 rounded-xl rounded-t-none lg:rounded-br-xl h-full hidden lg:flex items-center justify-between border-t-2 border-secondary">
          <div className="items-start justify-start gap-5 w-full flex">
            <div className="flex flex-col gap-2 w-max h-full">
              <div className="flex items-center flex-col bg-light px-5 py-2.5 rounded-2xl gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-3xl text-primary"
                  />
                  <span className="text-primary text-nowrap">On Hold</span>
                </div>
                <span className="text-3xl font-semibold">
                  {bookingAnalytics.hold}
                </span>
              </div>
              <div className="w-full flex">
                <label
                  htmlFor="hold-filter"
                  className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-full flex items-center justify-center gap-2"
                  style={{
                    borderColor: inboxFilter === "HOLD" && "#FF4C31",
                    color: inboxFilter === "HOLD" && "#FF4C31",
                  }}
                >
                  {inboxFilter === "HOLD" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-xl"
                      />
                      Showing
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-xl"
                      />
                      Show
                    </>
                  )}
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
            <div className="flex flex-col gap-2 w-max h-full">
              <div className="flex items-center flex-col bg-light px-5 py-2.5 rounded-2xl gap-4">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-3xl text-primary"
                  />
                  <span className="font-special text-primary text-nowrap">
                    Accepted
                  </span>
                </div>
                <span className="text-3xl font-semibold">
                  {bookingAnalytics.accepted}
                </span>
              </div>
              <div className="w-full flex">
                <label
                  htmlFor="accept-filter"
                  className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-full flex items-center justify-center gap-2"
                  style={{
                    borderColor: inboxFilter === "ACCEPTED" && "#FF4C31",
                    color: inboxFilter === "ACCEPTED" && "#FF4C31",
                  }}
                >
                  {inboxFilter === "ACCEPTED" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-xl"
                      />
                      Showing
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-xl"
                      />
                      Show
                    </>
                  )}
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
                  className="px-5 py-2 bg-light rounded-lg border-2 border-transparent transition-all ease-in-out duration-200 w-full flex items-center justify-center gap-2"
                  style={{
                    borderColor: inboxFilter === "REFUSED" && "#FF4C31",
                    color: inboxFilter === "REFUSED" && "#FF4C31",
                  }}
                >
                  {inboxFilter === "REFUSED" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faEyeSlash}
                        className="text-xl"
                      />
                      Showing
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon
                        icon={faEye}
                        className="text-xl"
                      />
                      Show
                    </>
                  )}
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
            <div className="bg-light rounded-2xl px-5 py-3 w-full text-sm h-[150px] overflow-y-auto">
              Small description about what you can do on this page <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingsView;
