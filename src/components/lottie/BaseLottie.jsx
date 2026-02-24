import Lottie from "lottie-react";

const BaseLottie = ({
  animationData,
  isActive = false,
  className = "",
  loop = true,
}) => {
  return (
    <Lottie
      animationData={animationData}
      loop={loop && isActive}
      autoplay={isActive}
      className={className}
    />
  );
};

export default BaseLottie;
