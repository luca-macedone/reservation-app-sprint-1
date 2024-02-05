import React from "react";
import HeroComp from "../components/HeroComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
  const navigator = useNavigate();
  return (
    <>
      <HeroComp />
      <section className="container mx-auto px-3 py-10 mt-10">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-5">
          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="flex flex-col items-center gap-5">
              <FontAwesomeIcon
                icon={faMap}
                className="h-12 text-primary text-center"
              />
              <h2 className="text-2xl font-semibold text-primary">
                Discover new restaurants
              </h2>
            </div>
            <p className="max-w-96 text-center md:text-start">
              Embark on a culinary quest. Your next favorite dish is just a
              search away.
            </p>
            <div className="w-full flex items-center justify-center md:justify-start mt-5">
              <button
                type="button"
                onClick={() => navigator("/restaurants")}
                className="bg-accent px-5 py-2 rounded-lg text-light shadow-lg"
              >
                Your next experience is here
              </button>
            </div>
          </div>
          <img
            src="https://images.pexels.com/photos/4870430/pexels-photo-4870430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Conversation's around the table"
            className="max-h-96 max-w-96 object-contain rounded-xl shadow-lg"
          />
        </div>
      </section>
      <section className="container mx-auto px-3 py-10 mt-10">
        <div className="flex flex-col md:flex-row-reverse items-center justify-center gap-10 md:gap-5">
          <div className="flex flex-col items-center md:items-start gap-8">
            <div className="flex flex-col items-center gap-5">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="h-12 text-primary text-center"
              />
              <h2 className="text-2xl font-semibold text-primary">
                Quick book your table
              </h2>
            </div>
            <p className="max-w-96 text-center md:text-start">
              Seize the moment, reserve your spot. Because the best
              conversations happen around the table.
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Conversation's around the table"
            className="max-h-96 max-w-96 object-contain rounded-xl shadow-lg"
          />
        </div>
      </section>
    </>
  );
};

export default HomeView;
