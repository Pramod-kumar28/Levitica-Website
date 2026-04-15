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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-3"
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 w-fit">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          <Sparkles size={14} />
          Welcome Back
        </span>
      </div>

      {/* Greeting */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        Hi{" "}
        <span className="text-primary">
          {user?.name || "Learner"}
        </span>
        👋
      </h1>

      {/* Subtext */}
      <p className="text-sm md:text-base text-muted-foreground">
        {roleMessage[role] ||
          "Manage your account and explore new opportunities."}
      </p>
    </motion.div>
  );
};

export default WelcomeScreen;