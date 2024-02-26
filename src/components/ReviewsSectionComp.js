import {
  faCheckCircle,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useRef, useState } from "react";
import { formattedRatingDesktop } from "../utils/ReviewsHandling";
import axios from "axios";
import { ReviewsContext } from "../screen/SingleRestaurantView";

const ReviewsSectionComp = ({ id, pushReviewClbk }) => {
  const [review, setReview] = useState({
    name: "",
    description: "",
    rating: 0,
  });
  // const navigator = useNavigate();

  const reviews = useContext(ReviewsContext);
  const reviewRef = useRef(null);
  const [isReviewSended, setIsReviewSended] = useState(false);
  const handleReviewReset = () => {
    reviewRef.current.reset();
  };

  const handleReviewSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if ((review.name.length !== 0, review.rating > 0)) {
      addReview();
    }
  };

  const addReview = async () => {
    // console.log(id);
    axios
      .post(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/review`,
        review
      )
      .then((response) => {
        if (response.status === 201) {
          pushReviewClbk(review);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        reviewRef.current.reset();
        setIsReviewSended(true);
      });
  };

  const handleChange = (evt) => {
    switch (evt.target.name) {
      case "review_name": {
        if (evt.target.value.length > 2) {
          setReview({ ...review, name: evt.target.value });
        }
        break;
      }
      case "rate": {
        if (evt.target.value) {
          setReview({ ...review, rating: evt.target.value * 10 });
        }
        break;
      }
      case "review_description": {
        if (evt.target.value.length > 2) {
          setReview({ ...review, description: evt.target.value });
        }
        break;
      }

      default:
        throw new Error("Not a valid input change!");
    }
  };

  return (
    <section
      className="py-10"
      data-aos="fade-up"
    >
      <div className="flex items-center justify-center w-full mb-10">
        <h2 className="text-3xl font-bold border-b-2 border-secondary px-10 py-3 font-special text-primary w-max">
          Reviews
        </h2>
      </div>
      <div className="flex flex-col lg:flex-row items-start justify-between gap-5 w-full">
        <form
          className="col-span-1 lg:col-span-2 bg-secondary text-light shadow-lg rounded-3xl p-5 md:p-10 h-max w-full"
          onSubmit={handleReviewSubmit}
          ref={reviewRef}
        >
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-5 md:mb-0">
            <h2 className="font-special font-light text-3xl mb-5">
              Review the restaurant
            </h2>
          </div>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 justify-center items-center">
            <div className="flex flex-col items-start justify-start h-full gap-1">
              <label htmlFor="review_name">Name</label>
              <input
                type="text"
                id="review_name"
                name="review_name"
                className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
                // value={reservation.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-start justify-start h-full gap-1">
              <label htmlFor="review_rating">Rating</label>
              <input
                type="number"
                id="review_rating"
                step="0.5"
                name="rate"
                max="19"
                min="0"
                className="bg-light px-5 py-2 rounded-lg text-dark w-full focus:outline-accent"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col items-start justify-start h-full gap-1">
              <label htmlFor="review_description">Description</label>
              <textarea
                name="review_description"
                id="review_description"
                className="rounded-lg text-dark bg-light py-2 px-5 focus:outline-accent w-full"
                onChange={handleChange}
                rows="1"
                // value={reservation.notes}
              ></textarea>
            </div>
            <div className="h-full flex items-end justify-end gap-5">
              <button
                type="button"
                className="bg-light text-dark px-3 py-2 rounded-lg flex items-center gap-3 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
                onClick={handleReviewReset}
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-accent px-8 py-2 rounded-lg flex items-center gap-3 col-span-1 hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200 disabled:ring-2 disabled:ring-accent disabled:bg-light disabled:text-accent disabled:hover:scale-100"
              >
                Submit
              </button>
            </div>
          </div>
          {isReviewSended && (
            <div className="bg-light text-accent px-5 ring-2 ring-accent py-2 mt-4 rounded-xl">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 me-2 text-xl"
              />
              Your review is been submitted successfully!
            </div>
          )}
        </form>
        <div className="w-full bg-tertiary p-5 rounded-3xl shadow-lg">
          {reviews.length > 0 ? (
            reviews.map((rev) => {
              return (
                <div
                  key={rev.id}
                  className="flex flex-col items-center md:justify-center my-10 w-full"
                  data-aos="fade-up"
                >
                  <div className="flex flex-col items-center justify-center w-full">
                    <div className="py-3">
                      {formattedRatingDesktop(rev.rating)}
                    </div>
                    {rev.description.length > 0 && (
                      <p className="text-center font-bold text-xl leading-10 italic max-w-[800px]">
                        <FontAwesomeIcon
                          icon={faQuoteLeft}
                          className="text-accent text-3xl px-3"
                        />
                        {rev.description}
                        <FontAwesomeIcon
                          icon={faQuoteRight}
                          className="text-accent text-3xl px-3"
                        />
                      </p>
                    )}
                    <small className="font-semibold italic">@{rev.name}</small>
                  </div>
                </div>
              );
            })
          ) : (
            <h2 className="text-dark text-xl text-center col-span-1 md:col-span-2 lg:col-span-3 py-10 text-wrap">
              No reviews yet,
              <br />
              <strong className="font-special font-light text-3xl">
                be the first!
              </strong>
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSectionComp;