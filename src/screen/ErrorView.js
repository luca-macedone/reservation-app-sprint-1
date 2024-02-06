import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorView = () => {
  const navigator = useNavigate();
  return (
    <div
      className="min-h-screen grid justify-center items-center relative"
      id="404"
    >
      <picture>
        <img
          sizes="(max-width: 1125px) 100vw, 1125px"
          srcset="
      /images/notfound/notfound_lramd6_c_scale,w_200.webp 200w,
      /images/notfound/notfound_lramd6_c_scale,w_623.webp 623w,
      /images/notfound/notfound_lramd6_c_scale,w_1083.webp 1083w,
      /images/notfound/notfound_lramd6_c_scale,w_1125.webp 1125w"
          src="/images/notfound/notfound_lramd6_c_scale,w_1125.webp"
          alt="not found bg"
          className="absolute h-full w-full top-0 left-0 z-0 object-cover"
        />
      </picture>
      <div className="absolute z-10 h-full w-full backdrop-blur-md flex items-center justify-center top-0 left-0">
        <div className="flex flex-col gap-5 items-center">
          <div className="bg-tertiary rounded-2xl shadow-lg flex flex-col items-center justify-center px-10 pb-10">
            <h1 className="text-[90px] font-special text-secondary">404</h1>
            <h2 className="text-3xl font-special text-secondary">Not Found</h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigator("/")}
              className="bg-accent text-light rounded-2xl shadow-lg px-10 py-2"
            >
              Home
            </button>
            <button
              onClick={() => navigator("/restaurants")}
              className="bg-accent text-light rounded-2xl shadow-lg px-10 py-2"
            >
              Restaurants
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorView;
