import React from "react";
import { useNavigate } from "react-router-dom";

const HeroComp = () => {
  const navigator = useNavigate();
  return (
    <section
      className="relative"
      id="hero"
    >
      <picture>
        <img
          sizes="(max-width: 1260px) 100vw, 1260px"
          srcset="
        /images/hero-bg/hero-background_vpvx2l_c_scale,w_200.webp 200w,
        /images/hero-bg/hero-background_vpvx2l_c_scale,w_677.webp 677w,
        /images/hero-bg/hero-background_vpvx2l_c_scale,w_944.webp 944w,
        /images/hero-bg/hero-background_vpvx2l_c_scale,w_1260.webp 1260w"
          src="/images/hero-bg/hero-background_vpvx2l_c_scale,w_1260.webp"
          alt="Hero bg"
          className="h-full w-full object-cover object-top absolute top-0 left-0 right-0 z-0"
        />
      </picture>
      <div className="z-10 relative w-full backdrop-blur-sm">
        <div className="container flex-col gap-5 flex items-center justify-center min-h-[50vh] md:min-h-[95vh] mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-light drop-shadow-lg text-center">
            Welcome to
            <span className="bg-logo-gradient bg-clip-text text-transparent font-special ms-3">
              Bistroo's
            </span>
          </h1>
          <p className="font-semibold text-light text-center">
            Find Your Table for Any Occasion – Reserve in Seconds!
          </p>
          <div className="w-full flex items-center justify-center mt-5">
            <button
              type="button"
              onClick={() => navigator("/restaurants")}
              className="bg-accent px-5 py-2 rounded-lg text-light shadow-lg hover:bg-light hover:text-primary hover:scale-105 transition-all ease-in-out duration-200"
            >
              Your next experience is here
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroComp;
