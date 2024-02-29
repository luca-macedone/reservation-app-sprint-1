import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadingComp from "../../components/LoadingComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowAltCircleLeft,
  faArrowAltCircleUp,
  faArrowDownWideShort,
  faArrowUpShortWide,
  faEye,
  faFilterCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  avg_rating,
  formattedRatingDesktop,
  formattedRatingMobile,
} from "../../utils/ReviewsHandling";
import { useLocation } from "react-router-dom";

const ReviewView = () => {
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(true);
  const [isLoadingReview, setIsLoadingReview] = useState(true);
  const [isVisibleReview, setIsVisibleReview] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [reviewFIlter, setReviewFIlter] = useState("no-filter");
  const [review, setReview] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();
  const id = location.state?.id;

  const showSelectedReview = async (_id) => {
    setIsVisibleReview(false);
    setIsLoadingReview(true);
    await axios
      .get(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${_id}/review`
      )
      .then((response) => {
        // console.log(response.data);
        setReview(response.data);
        setFilteredReviews(response.data);
        setReviewFIlter("no-filter");
      })
      .finally(() => {
        setIsVisibleReview(true);
        setIsLoadingReview(false);
      });
  };

  const handleFilter = (evt) => {
    // console.log(evt.target.value);
    let result = [];
    switch (evt.currentTarget.value) {
      case "no-filter":
        result = [...review];
        setReviewFIlter("no-filter");
        break;
      case "best-first-filter":
        result = [...review].sort((rev1, rev2) => {
          if (rev1.rating > rev2.rating) return -1;
          else if (rev1.rating < rev2.rating) return 1;

          return 0;
        });
        setFilteredReviews(result);
        setReviewFIlter("best-first-filter");
        // console.log(result);
        break;
      case "worst-first-filter":
        result = [...review].sort((rev1, rev2) => {
          if (rev1.rating > rev2.rating) return 1;
          else if (rev1.rating < rev2.rating) return -1;

          return 0;
        });
        setFilteredReviews(result);
        setReviewFIlter("worst-first-filter");
        // console.log(result);
        break;
      default:
        // throw new Error("action unmatched");
        console.log("missed action");
    }
    setFilteredReviews(result);
  };

  const setActiveRestaurant = (evt) => {
    if (!isLoadingRestaurants) {
      showSelectedReview(evt.currentTarget.value);
      // console.log(evt.currentTarget.value);
    }
    // console.log(evt.currentTarget.value);
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
          if (id) {
            showSelectedReview(id);
          } else {
            showSelectedReview(response.data[0].id);
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          setIsLoadingRestaurants(false);
        });
    };

    setFilteredReviews([...review]);
    setIsVisibleReview(false);
    setIsLoadingRestaurants(true);
    fetchData();
  }, []);

  return (
    <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 h-max lg:h-full overflow-hidden mt-8 lg:mt-0">
      <section className="h-max lg:h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 mt-5 lg:mt-0 text-end">
          Your Reviews
        </h2>
        <div className="lg:hidden bg-tertiary rounded-3xl p-5 h-full mb-5">
          {isLoadingRestaurants ? (
            <h2>Loading</h2>
          ) : (
            <>
              <select
                id="restaurants-mobile-selector"
                className="bg-light px-3 py-2 w-full rounded-lg text-dark ring-2 ring-secondary focus:outline-none focus:ring-accent"
                defaultValue={restaurants[0]?.id}
                onChange={setActiveRestaurant}
              >
                {restaurants.map((rest) => {
                  return (
                    <option
                      key={rest.id}
                      value={rest.id}
                      className=""
                    >
                      {rest.name}
                    </option>
                  );
                })}
              </select>
              <small className="py-3 font-semibold text-secondary">
                Choose the restaurant here
              </small>
            </>
          )}
        </div>
        <div className="hidden lg:inline-flex bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-b-xl lg:rounded-none lg:rounded-bl-xl">
          <div className="h-full w-full overflow-y-scroll flex flex-col items-start justify-start gap-4 px-5 py-4">
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
      <section className="h-max lg:h-full overflow-hidden flex flex-col">
        <h2 className="font-special text-secondary text-3xl mb-3 text-end">
          Reviews
        </h2>
        <div className="bg-tertiary border-t-2 border-secondary h-full overflow-hidden rounded-bl-xl flex flex-col">
          {isVisibleReview && (
            <div className="w-full flex flex-col items-end justify-start gap-5 px-5 lg:pe-9 py-4">
              <div className="bg-light border-b-2 border-secondary px-5 py-3 rounded-t-xl font-special text-xl flex items-center justify-between w-full">
                Average Score{" "}
                <span>{formattedRatingDesktop(avg_rating(review))}</span>
              </div>
              <div className="bg-accent rounded-xl p-1 flex items-center gap-1 w-max">
                <button
                  className={`px-5 py-2 rounded-lg hover:bg-light hover:text-accent transition-all ease-in-out duration-200 ${
                    reviewFIlter === "no-filter"
                      ? "bg-tertiary text-accent"
                      : "bg-accent text-light"
                  }`}
                  title="Default Sort"
                  value="no-filter"
                  onClick={handleFilter}
                >
                  <FontAwesomeIcon icon={faFilterCircleXmark} />
                </button>
                <button
                  className={` px-5 py-2 rounded-lg hover:bg-light hover:text-accent transition-all ease-in-out duration-200 ${
                    reviewFIlter === "best-first-filter"
                      ? "bg-tertiary text-accent"
                      : "bg-accent text-light"
                  }`}
                  title="Best-first Sort"
                  value="best-first-filter"
                  onClick={handleFilter}
                >
                  <FontAwesomeIcon icon={faArrowDownWideShort} />
                </button>
                <button
                  className={`px-5 py-2 rounded-lg hover:bg-light hover:text-accent transition-all ease-in-out duration-200 ${
                    reviewFIlter === "worst-first-filter"
                      ? "bg-tertiary text-accent"
                      : "bg-accent text-light"
                  }`}
                  title="Worst-first Sort"
                  value="worst-first-filter"
                  onClick={handleFilter}
                >
                  <FontAwesomeIcon icon={faArrowUpShortWide} />
                </button>
              </div>
            </div>
          )}
          <div className="px-5 py-3 rounded-3xl w-full flex flex-col items-start justify-start gap-3 h-full overflow-y-auto">
            {!isVisibleReview ? (
              <h2 className="font-special flex items-center gap-2 text-2xl py-6 lg:mt-6 px-5">
                <FontAwesomeIcon
                  icon={faArrowAltCircleLeft}
                  className="hidden lg:inline-flex"
                />
                <FontAwesomeIcon
                  icon={faArrowAltCircleUp}
                  className="lg:hidden"
                />
                Choose the restaurant.
              </h2>
            ) : !isLoadingReview ? (
              <>
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((rev) => {
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
                  })
                ) : (
                  <h6 className="text-center px-5 py-3.5 text-lg font-bold bg-light w-full rounded-xl text-danger">
                    No reviews here yet.
                  </h6>
                )}
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
