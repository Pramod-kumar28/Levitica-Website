import BaseLottie from "./BaseLottie";
import marketingAnimation from "./marketing.json";

const MarketingLottie = ({ isActive }) => {
  return (
    <BaseLottie
      animationData={marketingAnimation}
      isActive={isActive}
      className="tw-w-full tw-max-w-md"
    />
  );
};

export default MarketingLottie;
