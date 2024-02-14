import React from "react";
import { DateTime } from "luxon";

const MessagePreviewComp = (data) => {
  // console.log(data.data);
  const { name, seats, when, id } = data.data;

  const formattedData = (time) => {
    // console.log(time);
    const parsedTime = DateTime.fromMillis(time);
    // console.log(parsedTime);
    return parsedTime.toLocaleString(DateTime.DATETIME_MED);
    // return parsedTime.toString();
  };
  return (
    <div
      className="bg-light rounded-xl px-5 py-3 w-full flex items-center justify-between ring-2 ring-transparent hover:ring-accent hover:cursor-pointer text-dark hover:text-accent transition-all ease-in-out duration-200"
      key={id}
    >
      <h5 className="font-bold capitalize text-lg flex items-end gap-1 italic w-full lg:w-max justify-between lg:justify-start">
        {name}
        <span className="font-light lowercase flex items-end gap-1 not-italic">
          x<strong className="text-2xl font-bold">{seats}</strong>
        </span>
      </h5>
      <div className="hidden lg:inline-flex">{formattedData(when)}</div>
    </div>
  );
};

export default MessagePreviewComp;
