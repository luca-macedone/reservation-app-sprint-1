import {
  faCircleCheck,
  faCircleExclamation,
  faCircleInfo,
  faX,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ReservationAlertMessageComp = ({
  reservationMessageObj,
  setReservationMessageClbk,
}) => {
  // console.log(reservationMessageObj);
  return (
    <>
      {reservationMessageObj.status !== "" && (
        <div
          className="bg-light p-5 mt-5 rounded-xl border-4 shadow-lg font-semibold flex items-start justify-between"
          style={{
            color:
              reservationMessageObj.status === "error"
                ? "#780000"
                : reservationMessageObj.status === "hold"
                ? "#a2d2ff"
                : reservationMessageObj.status === "refused"
                ? "#c1121f"
                : reservationMessageObj.status === "accepted"
                ? "#2a9d8f"
                : "",
            borderColor:
              reservationMessageObj.status === "error"
                ? "#780000"
                : reservationMessageObj.status === "hold"
                ? "#a2d2ff"
                : reservationMessageObj.status === "refused"
                ? "#c1121f"
                : reservationMessageObj.status === "accepted"
                ? "#2a9d8f"
                : "",
          }}
        >
          <p className="flex items-start">
            {reservationMessageObj.status === "error" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faCircleExclamation}
                  className="text-2xl"
                />
                ERROR:
              </strong>
            ) : reservationMessageObj.status === "hold" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="text-2xl"
                />
                INFO:
              </strong>
            ) : reservationMessageObj.status === "refused" ? (
              <strong className="font-bold text-xl items-center gap-2 me-2 inline-flex">
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  className="text-2xl"
                />
                CANCELED:
              </strong>
            ) : reservationMessageObj.status === "accepted" ? (
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
            {reservationMessageObj.message}
          </p>
          <button
            className="border-2 hover:scale-105 px-5 py-2 rounded-xl hover:bg-tertiary transition-all ease-in-out duration-200"
            style={{
              borderColor:
                reservationMessageObj.status === "error"
                  ? "#780000"
                  : reservationMessageObj.status === "hold"
                  ? "#a2d2ff"
                  : reservationMessageObj.status === "accepted"
                  ? "#2a9d8f"
                  : "",
            }}
            onClick={() => {
              setReservationMessageClbk({ status: "", message: "" });
            }}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      )}
    </>
  );
};

export default ReservationAlertMessageComp;
