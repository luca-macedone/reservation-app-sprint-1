import React from "react";
import {
  formattedRatingDesktop,
  formattedRatingMobile,
} from "../utils/ReviewsHandling";

const ReviewPreviewComp = (data) => {
  const { name, rating, id } = data.data;

  return (
    <div
      className="bg-light rounded-xl px-5 py-3 w-full flex items-center justify-between ring-2 ring-transparent hover:ring-accent hover:cursor-pointer text-dark hover:text-accent transition-all ease-in-out duration-200"
      key={id}
    >
      <h5 className="font-bold capitalize text-lg">@{name}</h5>
      <div className="hidden lg:inline-flex">
        {formattedRatingDesktop(rating)}
      </div>
      <div className="lg:hidden">{formattedRatingMobile(rating)}</div>
    </div>
  );
};

export default ReviewPreviewComp;
