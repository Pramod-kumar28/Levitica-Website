import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiBox,
  FiBook,
  FiCreditCard,
  FiUserPlus,
  FiZap,
} from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';

const QuickActionsCard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const actions = [
    { label: "Create Batch", icon: FiBox, onClick: () => navigate("batchs"), color: "purple" },
    { label: "Create Course", icon: FiBook, onClick: () => navigate("courses"), color: "blue" },
    { label: "Payments", icon: FiCreditCard, onClick: () => navigate("payments"), color: "emerald" },
    { label: "Assign Batch", icon: FiUserPlus, onClick: () => navigate("students/unassigned"), color: "orange" },
  ];

  const getColorClasses = (color) => {
    switch(color) {
      case "purple":
        return isDark 
          ? "hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-purple-400"
          : "hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700";
      case "blue":
        return isDark 
          ? "hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          : "hover:border-primary/50 hover:bg-primary/10 hover:text-primary";
      case "emerald":
        return isDark 
          ? "hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400"
          : "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700";
      case "orange":
        return isDark 
          ? "hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
          : "hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700";
      default:
        return isDark 
          ? "hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          : "hover:border-primary/50 hover:bg-primary/10 hover:text-primary";
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={action.onClick}
            className={`group flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 ${
              isDark
                ? 'border-dark_border bg-darklight text-gray hover:shadow-md'
                : 'border-border bg-light text-gray hover:shadow-md'
            } ${getColorClasses(action.color)}`}
          >
            <div className={`p-2 rounded-lg transition-colors duration-200 ${
              isDark
                ? 'bg-darkmode group-hover:bg-transparent'
                : 'bg-white group-hover:bg-transparent'
            }`}>
              <action.icon className={`w-5 h-5 transition-colors duration-200 ${
                isDark ? 'text-gray group-hover:text-current' : 'text-gray group-hover:text-current'
              }`} />
            </div>
            <span className="text-xs font-medium">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;