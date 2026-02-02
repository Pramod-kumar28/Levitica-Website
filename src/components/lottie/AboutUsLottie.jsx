import React from "react";
import Lottie from "lottie-react";
import aboutUsAnimation from "./aboutus.json";

const AboutUsLottie = ({
  className = "",
  loop = true,
  autoplay = true,
}) => {
  return (
    <div className={`tw-w-full tw-flex tw-justify-center ${className}`}>
      <div className="tw-w-full tw-max-w-md md:tw-max-w-lg lg:tw-max-w-xl">
        <Lottie
          animationData={aboutUsAnimation}
          loop={loop}
          autoplay={autoplay}
          className="tw-w-full tw-h-auto"
        />
      </div>
    </div>
  );
};

export default AboutUsLottie;
