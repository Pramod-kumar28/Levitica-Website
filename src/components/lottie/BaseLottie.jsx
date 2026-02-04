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
      renderer="canvas"   // 🔥 BIG performance win
      className={className}
    />
  );
};

export default BaseLottie;
