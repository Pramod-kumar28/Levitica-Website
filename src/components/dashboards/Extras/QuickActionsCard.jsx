import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FiBox,
  FiBook,
  FiCreditCard,
  FiUserPlus,
} from "react-icons/fi";

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const actions = [
    { label: "Create Batch", icon: FiBox, onClick: () => navigate("batchs") },
    { label: "Create Course", icon: FiBook, onClick: () => navigate("courses") },
    { label: "Payments", icon: FiCreditCard, onClick: () => navigate("payments") },
    {
      label: "Assign Batch",
      icon: FiUserPlus,
      onClick: () => navigate("students/unassigned"),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-sm"
    >
      <h3 className="tw-text-lg tw-font-semibold tw-text-slate-900 tw-mb-4">
        Quick Actions
      </h3>

      <div className="tw-grid tw-grid-cols-2 tw-gap-3">
        {actions.map((a, i) => (
          <button
            key={i}
            onClick={a.onClick}
            className="tw-flex tw-items-center tw-gap-2 tw-rounded-xl tw-border tw-border-slate-200 tw-bg-slate-50 tw-p-3 tw-text-sm tw-font-medium tw-text-slate-700 hover:tw-bg-indigo-50 hover:tw-text-indigo-700 tw-transition"
          >
            <a.icon />
            {a.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickActionsCard;
