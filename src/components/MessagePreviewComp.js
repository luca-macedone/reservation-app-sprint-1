import React from "react";
import { formattedDate } from "../utils/DateHandling";
import { useNavigate } from "react-router-dom";

const MessagePreviewComp = (data) => {
  // console.log(data.data);
  const { email, seats, when, id } = data.data;
  const navigator = useNavigate();
  // console.log(when);

  const handleClick = () => {
    navigator("/dashboard/bookings", { state: { id: id } });
  };
  return (
    <button
      className="bg-light rounded-xl px-5 py-3 w-full flex items-center justify-between ring-2 ring-transparent hover:ring-accent hover:cursor-pointer text-dark hover:text-accent transition-all ease-in-out duration-200"
      key={id}
      onClick={handleClick}
    >
      <h5 className="font-bold capitalize text-lg flex items-end gap-1 italic w-full lg:w-max justify-between lg:justify-start">
        {email}
        <span className="font-light lowercase flex items-end gap-1 not-italic">
          x<strong className="text-2xl font-bold">{seats}</strong>
        </span>
      </h5>
      <div className="hidden lg:inline-flex">{formattedDate(when)}</div>
    </button>
  );
};

export default MessagePreviewComp;
