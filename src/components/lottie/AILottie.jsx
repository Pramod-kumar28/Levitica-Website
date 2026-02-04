import BaseLottie from "./BaseLottie";
import aiAnimation from "./ai.json";

const AILottie = ({ isActive }) => {
  return (
    <BaseLottie
      animationData={aiAnimation}
      isActive={isActive}
      className="tw-w-full tw-max-w-md"
    />
  );
};

export default AILottie;
