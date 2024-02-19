import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faQuoteLeft,
  faQuoteRight,
  faStarHalfStroke,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import LoadingComp from "../components/LoadingComp";
import AOS from "aos";
import ReservationComponent from "../components/ReservationComponent";

const SingleRestaurantView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewSended, setIsReviewSended] = useState(false);
  const [review, setReview] = useState({
    name: "",
    description: "",
    rating: 0,
  });
  const reviewRef = useRef(null);

  const { id } = useParams();

  const [restaurant, setRestaurant] = useState({
    data: {},
    gallery: [],
    menu: [],
  });
  const navigator = useNavigate();
  const avg_rating = () => {
    let result = 0;
    if (restaurant.reviews.length > 0) {
      restaurant.reviews.forEach((rev) => {
        result += rev.rating;
      });

      return result / restaurant.reviews.length;
    }
    return 0;
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

  const handleReviewReset = () => {
    reviewRef.current.reset();
    // setReservation({});
  };

  const handleReviewSubmit = (evt) => {
    evt.preventDefault();
    evt.stopPropagation();

    if ((review.name.length !== 0, review.rating > 0)) {
      addReview();
    }
  };

  const addReview = async () => {
    axios
      .post(
        `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/review`,
        review
      )
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
      .finally(() => {
        reviewRef.current.reset();
        setIsReviewSended(true);
        setTimeout(() => {
          navigator(0);
        }, 1500);
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

  useEffect(() => {
    AOS.refresh();
    setIsLoading(true);

    window.scrollTo(0, 0);
    const fetchRestaurant = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}`
          ),
          axios.get(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/gallery`
          ),
          axios.get(
            `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/Menu`
          ),
        ]);
        // console.log(await fetchReviews());
        let reviewsData = await fetchReviews();
        // console.log(reviewsData);
        setRestaurant({
          data: { ...res1.data },
          gallery: [...res2.data],
          menu: [...res3.data],
          reviews: [...reviewsData],
        });
      } catch (err) {
        console.error(err);
        navigator("/error");
      } finally {
        setIsLoading(false);
      }
    };
    const fetchReviews = async () => {
      let res = await axios
        .get(
          `https://65c3642539055e7482c0c4ba.mockapi.io/api/v1/Restaurant/${id}/review`
        )
        .then((response) => {
          return response.data;
        })
        .catch((err) => {
          console.error(err);
          return [];
        });

      return res;
    };

    fetchRestaurant();
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto px-3 min-h-screen">
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 items-center justify-center gap-10">
            <div className="flex flex-col lg:flex-row items-center gap-3 py-5 col-span-1 md:col-span-2">
              <div
                className="min-w-36 aspect-square rounded-full overflow-hidden ring ring-secondary"
                style={{
                  backgroundImage: `url(${restaurant.data.profile_img.src})`,
                  backgroundPosition: `center`,
                  backgroundSize: `cover`,
                }}
              ></div>
              <div className="flex flex-col-reverse md:flex-row items-end md:items-start justify-between gap-5 w-full">
                <div className="flex flex-col items-end md:items-start justify-start gap-5 md:gap-1 w-full">
                  <h1 className="text-4xl font-bold border-b-2 border-secondary px-3 w-full md:w-max text-end md:text-start">
                    {restaurant.data.name}
                  </h1>
                  <div className="px-3 py-2 text-end md:text-start">
                    {restaurant.data.address +
                      ", " +
                      restaurant.data.city +
                      ", " +
                      restaurant.data.country}
                  </div>
                  <div className="flex items-center justify-start flex-row-reverse gap-5 lg:gap-10 flex-wrap">
                    <div className="flex items-start justify-end md:justify-start gap-3 flex-wrap">
                      {restaurant.data.type.map((type, index) => {
                        return (
                          <span
                            key={index}
                            className="bg-primary px-3 py-1 rounded-lg text-light"
                          >
                            {type}
                          </span>
                        );
                      })}
                    </div>
                    <div className="bg-tertiary rounded-xl px-5 py-2 shadow-lg">
                      {formattedRatingDesktop(avg_rating())}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigator("/restaurants")}
                  className="bg-accent px-5 py-2 rounded-lg text-light shadow-md font-semibold uppercase hover:bg-primary hover:scale-105 transition-all ease-in-out duration-200"
                >
                  Back
                </button>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-3xl shadow-lg">
              <img
                src={restaurant.data.about_img.src}
                alt={restaurant.data.about_img.alt}
                className="object-cover h-full w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-3 font-special text-primary">
                About us
              </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: restaurant.data.description,
                }}
                className=" text-justify leading-7 text-xl"
              />
            </div>
          </div>
          <section
            className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-5 bg-tertiary px-5 pt-5 pb-10 md:py-10 md:pb-20 md:px-10 rounded-3xl my-10 shadow-lg"
            data-aos="fade-up"
          >
            <div className="col-span-1 md:col-span-2 flex justify-center items-center pb-2 mb-5">
              <h2 className="text-3xl font-bold border-b-2 border-secondary px-10 py-3 font-special text-primary">
                Menu
              </h2>
            </div>
            {restaurant.menu.map((dish, index) => {
              return (
                <div
                  key={index}
                  className="border-b-2 border-secondary p-3 flex items-start justify-between"
                >
                  <div className="flex flex-col items-start justify-start gap-2">
                    <h4 className="text-xl font-bold capitalize">
                      {dish.name}
                    </h4>
                    <div className="w-max bg-accent text-light px-3 py-1 rounded-lg capitalize">
                      {dish.category}
                    </div>
                    <small>{dish.description}</small>
                  </div>
                  <div className="text-2xl font-bold">{dish.price}€</div>
                </div>
              );
            })}
          </section>
          <section
            className="grid grid-flow-row grid-cols-1 lg:grid-cols-3 items-center justify-center gap-10 py-10"
            data-aos="fade-up"
          >
            <div className="col-span-1 lg:col-span-1">
              <h2 className="text-3xl font-bold pb-5 text-center font-special text-primary">
                Openings
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-secondary">
                    <th className="text-xl font-light p-2">Day</th>
                    <th className="text-xl font-light p-2">Lunch</th>
                    <th className="text-xl font-light p-2">Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurant.data.openings.map((day, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-start ps-5 pe-10 py-2 border-e-2 border-secondary">
                          {day.day}
                        </td>
                        <td className="text-center px-5 py-2">
                          {day.lunch.start === "-1"
                            ? "closed"
                            : day.lunch.start + " - " + day.lunch.end}
                        </td>
                        <td className="text-center px-5 py-2">
                          {day.dinner.start === "-1"
                            ? "closed"
                            : day.dinner.start + " - " + day.dinner.end}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <ReservationComponent
              restaurant={restaurant.data}
              id={id}
            />
          </section>
          {restaurant.gallery.length > 0 && (
            <section className="py-10">
              <div className="flex items-center justify-center w-full mb-10">
                <h2 className="text-3xl font-bold border-b-2 border-secondary px-10 py-3 font-special text-primary w-max">
                  Gallery
                </h2>
              </div>
              {restaurant.gallery.map((pic, index) => {
                return (
                  <div
                    key={index}
                    className={
                      index % 2 === 0
                        ? "flex flex-col xl:flex-row items-center md:justify-center gap-10 my-10 xl:my-0"
                        : "flex flex-col xl:flex-row-reverse items-center md:justify-center gap-10 my-10 xl:my-0"
                    }
                    data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}
                    data-aos-offset={100 * index}
                  >
                    <div className="my-5 h-[500px] rounded-3xl overflow-hidden shadow-lg">
                      <img
                        src={pic.src}
                        alt={pic.alt}
                        className="object-cover h-full"
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-center font-bold text-xl leading-10 italic max-w-[600px]">
                        <FontAwesomeIcon
                          icon={faQuoteLeft}
                          className="text-accent text-3xl px-3"
                        />
                        {pic.caption}
                        <FontAwesomeIcon
                          icon={faQuoteRight}
                          className="text-accent text-3xl px-3"
                        />
                      </p>
                    </div>
                  </div>
                );
              })}
            </section>
          )}
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
                {restaurant.reviews.length > 0 ? (
                  restaurant.reviews.map((rev) => {
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
                          <small className="font-semibold italic">
                            @{rev.name}
                          </small>
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
        </div>
      ) : (
        <LoadingComp />
      )}
    </>
  );
};

export default SingleRestaurantView;
