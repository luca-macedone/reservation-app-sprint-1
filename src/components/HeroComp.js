import React from "react";

const HeroComp = () => {
  return (
    <section
      className="relative"
      id="hero"
    >
      <img
        src="https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Hero image"
        className="h-full w-full object-cover object-top absolute top-0 left-0 right-0 z-0"
      />
      <div className="z-10 w-full backdrop-blur-sm">
        <div className="container flex-col gap-5 flex items-center justify-center min-h-[50vh] md:min-h-[90vh] mx-auto">
          <h1 className="text-4xl md:text-5xl font-semibold text-light drop-shadow-lg">
            Welcome to
            <span className="bg-logo-gradient bg-clip-text text-transparent font-special ms-3">
              Bistroo's
            </span>
          </h1>
          <p className="font-semibold text-light">
            Find Your Table for Any Occasion – Reserve in Seconds!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroComp;
