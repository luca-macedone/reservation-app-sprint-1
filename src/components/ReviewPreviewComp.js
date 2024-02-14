import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ReviewPreviewComp = (data) => {
  const { name, rating, id } = data.data;

  const formattedRatingMobile = (_rating) => {
    const res = Math.floor(_rating / 10);
    console.log(res);
    return (
      <div className="flex items-start gap-1">
        <FontAwesomeIcon
          icon={faStarSolid}
          className="text-accent"
        />
        x{res}
      </div>
    );
  };

  const formattedRatingDesktop = (_rating) => {
    // const maxStars = 10;
    let stars = [];

    for (let i = 1; i <= 100; i += 10) {
      if (i < _rating && i + 1 > _rating) {
        // console.log(i, " v ", _rating, "half");
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarHalfStroke}
            className="me-1 text-accent"
          />
        );
      } else if (i <= _rating) {
        // console.log(i, " v ", _rating, "full");
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarSolid}
            className="me-1 text-accent"
          />
        );
      } else {
        // console.log(i, " v ", _rating, "empty");
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={faStarRegular}
            className="me-1 text-accent"
          />
        );
      }
    }

    return stars;
  };
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
