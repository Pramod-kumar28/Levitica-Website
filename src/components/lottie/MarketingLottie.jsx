import Lottie from "lottie-react";
import marketingAnimation from "./marketing.json";

const MarketingLottie = () => {
  return (
    <Lottie
      animationData={marketingAnimation}
      loop
      className="tw-w-full tw-max-w-md"
    />
  );
};

export default MarketingLottie;
