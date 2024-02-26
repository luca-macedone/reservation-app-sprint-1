import {
  faStar as faStarSolid,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const avg_rating = (_reviews) => {
  let result = 0;
  if (_reviews.length > 0) {
    _reviews.forEach((rev) => {
      result += rev.rating;
    });

    return result / _reviews.length;
  }
  return 0;
};

export const formattedRatingDesktop = (_rating) => {
  // const maxStars = 10;
  let stars = [];
  let formatted_rate = _rating / 2;
  for (let i = 0; i < 50; i += 10) {
    if (i === formatted_rate) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarSolid}
          className="me-1 text-accent"
        />
      );
    } else if (i < formatted_rate && i + 10 > formatted_rate) {
      // console.log(i, " v ", _rating, "half");
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarHalfStroke}
          className="me-1 text-accent"
        />
      );
    } else if (i < formatted_rate) {
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

export const formattedRatingMobile = (_rating) => {
  const res = Math.floor(_rating / 10);
  // console.log(res);
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
