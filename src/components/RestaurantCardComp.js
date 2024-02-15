import {
  faCalendar,
  faLocationPin,
  faMapPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const RestaurantCardComp = ({
  id,
  src,
  alt,
  name,
  fulladdress,
  type,
  data,
}) => {
  return (
    <Link
      data-aos="fade-up"
      to={`/restaurants/${id}`}
      state={{ when: data?.when, seats: data?.seats }}
      className="shadow-lg p-5 rounded-2xl flex items-center gap-3 bg-tertiary transition-all ease-in-out duration-200 w-full restaurant-card relative"
      key={id}
    >
      <div
        className="min-w-14 md:w-20  aspect-square rounded-full overflow-hidden ring ring-secondary"
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: `center`,
          backgroundSize: `cover`,
        }}
      >
        {/* <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        /> */}
      </div>
      <div className=" flex items-center justify-between gap-4 w-full">
        <div className="w-full">
          <h3 className="font-semibold border-b-2 border-secondary w-max max-w-full text-wrap">
            {name}
          </h3>
          <div className="flex items-start flex-wrap justify-start gap-3 pt-2">
            <small className="flex items-center gap-2 py-1">
              <FontAwesomeIcon
                icon={faLocationPin}
                className="text-primary text-xl"
              />
              {fulladdress}
            </small>
            <div className="text-xs flex items-start flex-wrap gap-2 pb-2">
              {type.map((t, index) => {
                return (
                  <span
                    key={index}
                    className="bg-primary text-light px-2 py-1 rounded-md"
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="text-accent text-opacity-[10%] flex items-center justify-center h-full absolute z-0 right-8 top-0">
        <FontAwesomeIcon
          icon={faCalendar}
          className="text-[50px] rotate-[-20deg] restaurant-card-icon transition-all ease-in-out duration-200"
        />
      </div>
    </Link>
  );
};

export default RestaurantCardComp;
