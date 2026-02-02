import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Sparkles } from "lucide-react";

const WelcomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const roleMessage = {
    student: "Let’s continue building your skills and career 🚀",
    admin: "Here’s an overview of today’s platform activity 📊",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="tw-flex tw-flex-col tw-gap-2"
    >
      {/* Badge */}
      <div className="tw-inline-flex tw-items-center tw-gap-2 tw-w-fit tw-rounded-full tw-bg-gradient-to-r tw-from-indigo-500/10 tw-to-pink-500/10 tw-px-3 tw-py-1">
        <Sparkles size={14} className="tw-text-pink-500" />
        <span className="tw-text-xs tw-font-medium tw-text-indigo-600">
          Welcome Back
        </span>
      </div>

      {/* Greeting */}
      <h1 className="tw-text-2xl md:tw-text-3xl tw-font-bold tw-text-gray-900">
        Hi{" "}
        <span className="tw-bg-gradient-to-r tw-from-indigo-500 tw-to-pink-500 tw-bg-clip-text tw-text-transparent">
          {user?.name || "Learner"}
        </span>
        👋
      </h1>

      {/* Subtext */}
      <p className="tw-text-sm md:tw-text-base tw-text-gray-600">
        {roleMessage[role] ||
          "Manage your account and explore new opportunities."}
      </p>
    </motion.div>
  );
};

export default WelcomeScreen;
