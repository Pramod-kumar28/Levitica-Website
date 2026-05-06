import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Sparkles, Zap, TrendingUp } from "lucide-react";

const WelcomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const roleMessage = {
    student: "Let's continue building your skills and career",
    admin: "Here's an overview of today's platform activity",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-3 lg:px-4 lg:py-2"
    >

      {/* Greeting */}
      <h1 className="
        text-2xl md:text-3xl font-bold
        text-midnight_text dark:text-white
        flex items-center gap-2
      ">
        Hi{" "}
        <span className="text-primary">
          {user?.name || "Learner"}
        </span>

        <span className="inline-flex">
          <Sparkles size={22} className="text-primary" />
        </span>
      </h1>

      {/* Subtext */}
      <p className="
        text-sm md:text-base
        text-gray
        flex items-center gap-2
      ">
        {role === "student" && (
          <Zap size={16} className="text-primary" />
        )}

        {role === "admin" && (
          <TrendingUp size={16} className="text-primary" />
        )}

        {roleMessage[role] ||
          "Manage your account and explore new opportunities."}
      </p>

    </motion.div>
  );
};

export default WelcomeScreen;