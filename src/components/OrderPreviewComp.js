import {
  faCircleCheck,
  faCircleXmark,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const OrderPreviewComp = (data) => {
  const { name, address, city, description, done, id } = data.data;
  return (
    <div
      className="bg-light rounded-xl px-5 py-3 w-full flex items-center justify-between ring-2 ring-transparent hover:ring-accent hover:cursor-pointer text-dark hover:text-accent transition-all ease-in-out duration-200"
      key={id}
    >
      <div>
        <h5 className="font-bold capitalize text-lg">@{name}</h5>
        <small>{address + ", " + city}</small>
      </div>
      <div>
        {done ? (
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-2xl text-green-500"
          />
        ) : (
          <FontAwesomeIcon
            icon={faHourglassHalf}
            className="text-2xl text-yellow-500"
          />
        )}
      </div>
    </div>
  );
};

export default OrderPreviewComp;
