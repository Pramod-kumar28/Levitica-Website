import BaseLottie from "./BaseLottie";
import aboutUsAnimation from "./aboutus.json";

const AboutUsLottie = ({ className = "" }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className={`tw-w-full tw-flex tw-justify-center ${className}`}>
      <div className="tw-w-full tw-max-w-md md:tw-max-w-lg lg:tw-max-w-xl">
        <BaseLottie
          animationData={aboutUsAnimation}
          isActive={!isMobile}
          className="tw-w-full tw-h-auto"
        />
      </div>
    </div>
  );
};

export default AboutUsLottie;
