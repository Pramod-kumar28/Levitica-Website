import BaseLottie from "./BaseLottie";
import aboutUsAnimation from "./aboutus.json";

const AboutUsLottie = ({ className = "" }) => {
  const isMobile = window.innerWidth < 768;

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <BaseLottie
          animationData={aboutUsAnimation}
          isActive={!isMobile}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default AboutUsLottie;
