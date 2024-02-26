import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faEye } from "@fortawesome/free-solid-svg-icons";
import {
  avg_rating,
  formattedRatingDesktop,
  formattedRatingMobile,
} from "../../utils/ReviewsHandling";

const ReviewView = () => {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [isVisibleReview, setIsVisibleReview] = useState(false);

  const [review, setReview] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const showSelectedReview = async (_id) => {
    await axios
      .get(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${_id}/review`
      )
      .then((response) => {
        // console.log(response.data);
        setReview(response.data);
      })
      .finally(() => {
        setIsVisibleReview(true);
        setIsLoadingReview(false);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const baseUrl =
        "https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant";
      await axios
        .get(baseUrl)
        .then((response) => {
          // console.log(response.data);
          setRestaurants(response.data);
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoadingRestaurants(false);
        });
    };

    setIsVisibleReview(false);
    setIsLoadingRestaurants(true);
    fetchData();
  }, []);

  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
      <section className="h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 mt-5 lg:mt-0">
          Your Reviews
        </h2>
        <div className="lg:hidden bg-tertiary rounded-3xl p-5 h-full mb-5">
          {isLoadingRestaurants ? (
            <h2>Loading</h2>
          ) : (
            <select
              id="restaurants-mobile-selector"
              className="bg-light px-3 py-2 w-full rounded-md text-dark"
            >
              {restaurants.map((rest) => {
                return (
                  <option
                    key={rest.id}
                    value={rest.id}
                  >
                    {rest.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>
        <div className="hidden lg:inline-flex bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-bl-xl">
          <div className="h-full w-full overflow-y-auto flex flex-col items-start justify-start gap-4 px-5 py-4">
            {isLoadingRestaurants ? (
              <LoadingComp />
            ) : (
              restaurants.map((rest) => {
                return (
                  <div
                    key={rest.id}
                    className="bg-light px-5 py-3 rounded-3xl w-full flex flex-col lg:flex-row items-start lg:items-center justify-start gap-3"
                  >
                    <div
                      className="min-w-10 md:w-16  aspect-square rounded-full overflow-hidden ring ring-secondary"
                      style={{
                        backgroundImage: `url(${rest.profile_img.src})`,
                        backgroundPosition: `center`,
                        backgroundSize: `cover`,
                      }}
                    />
                    <div className="flex flex-col lg:flex-row items-end lg:items-center justify-between flex-wrap lg:flex-nowrap gap-3 lg:gap-0 w-full">
                      <div className="flex flex-col flex-wrap gap-1 w-full">
                        <h5 className="border-b-2 border-secondary w-max px-2 text-wrap">
                          {rest.name}
                        </h5>
                        <small className="text-wrap px-2">
                          {rest.address +
                            ", " +
                            rest.city +
                            ", " +
                            rest.country}
                        </small>
                      </div>

                      <button
                        className="bg-accent text-light px-5 py-2 rounded-xl ring-2 ring-transparent hover:bg-light hover:text-accent hover:ring-accent transition-all ease-in-out duration-200"
                        onClick={() => showSelectedReview(rest.id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
      <section className="h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 flex flex-col">
          Reviews
        </h2>
        <div className="bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-bl-xl">
          {isVisibleReview && (
            <div className="bg-light border-2 border-secondary px-5 py-3 rounded-xl mx-5 my-2 font-special text-xl flex items-center justify-between">
              Score <span>{formattedRatingDesktop(avg_rating(review))}</span>
            </div>
          )}
          <div className="px-5 py-3 rounded-3xl w-full flex flex-col items-start justify-start gap-3 h-full overflow-y-auto">
            {!isVisibleReview ? (
              <h2 className="font-special flex items-center gap-2 text-2xl mt-6">
                <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                Choose the restaurant.
              </h2>
            ) : !isLoadingReview ? (
              <>
                {review.map((rev) => {
                  return (
                    <div
                      key={rev.id}
                      className="p-5 bg-light rounded-3xl w-full flex flex-col items-start gap-2"
                    >
                      <div className="flex items-start flex-col-reverse justify-between w-full">
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <h6 className="font-semibold border-b-2 mb-2 border-secondary w-max px-3">
                              {rev.name}
                            </h6>
                            <p className="text-sm px-3">{rev.description}</p>
                          </div>
                          <div className="text-nowrap pe-3">
                            {/* {rev.rating} */}
                            <div className="hidden lg:block">
                              {formattedRatingDesktop(rev.rating)}
                            </div>
                            <div className="lg:hidden block">
                              {formattedRatingMobile(rev.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <LoadingComp />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReviewView;
