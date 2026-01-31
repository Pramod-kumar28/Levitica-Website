import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const WelcomeScreen = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="tw-space-y-2"
    >
      <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">
        Welcome back,{" "}
        <span className="tw-bg-gradient-to-r tw-from-purple-500 tw-to-pink-500 tw-bg-clip-text tw-text-transparent">
          {user?.name || "Learner"}
        </span>
        !
      </h1>

      {user?.role === "student" && (
        <p className="tw-text-gray-600 tw-text-sm">
          Continue your learning journey and track your progress
        </p>
      )}
    </motion.div>
  );
};

export default WelcomeScreen;
