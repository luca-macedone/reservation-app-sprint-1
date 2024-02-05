import React from "react";
import { Link } from "react-router-dom";

const RestaurantCardComp = ({ id, src, alt, name, type }) => {
  return (
    <Link
      to={`/restaurants/${id}`}
      className="shadow-lg p-5 rounded-2xl flex items-center gap-3 bg-tertiary"
      key={id}
    >
      <div className="h-20 aspect-square rounded-full overflow-hidden ring ring-secondary">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-semibold border-b-2 border-secondary">{name}</h3>
        <div className="text-xs flex items-start flex-wrap gap-2 py-2">
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
    </Link>
  );
};

export default RestaurantCardComp;
