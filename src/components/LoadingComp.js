import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const LoadingComp = () => {
  return (
    <div className="container mx-auto px-3 py-5 min-h-screen flex items-center justify-center">
      <div className="animate text-4xl text-primary font-special flex flex-col items-center justify-center gap-5">
        <h1>Loading</h1>
        <FontAwesomeIcon
          icon={faSpinner}
          className="animate-spin"
        />
      </div>
    </div>
  );
};

export default LoadingComp;
