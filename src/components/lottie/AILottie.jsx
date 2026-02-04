import Lottie from "lottie-react";
import aiAnimation from "./ai.json";

const AILottie = () => {
  return (
    <Lottie
      animationData={aiAnimation}
      loop
      className="tw-w-full tw-max-w-md"
    />
  );
};

export default AILottie;
