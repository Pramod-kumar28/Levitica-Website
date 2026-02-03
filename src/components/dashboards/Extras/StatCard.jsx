import { motion } from "framer-motion";

const toneMap = {
  indigo: "tw-text-indigo-600 tw-bg-indigo-50",
  emerald: "tw-text-emerald-600 tw-bg-emerald-50",
  amber: "tw-text-amber-600 tw-bg-amber-50",
  blue: "tw-text-blue-600 tw-bg-blue-50",
};

const StatCard = ({ label, count, tone }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-p-4 tw-shadow-sm"
  >
    <div
      className={`tw-inline-flex tw-rounded-lg tw-px-3 tw-py-1 tw-text-sm tw-font-semibold ${toneMap[tone]}`}
    >
      {label}
    </div>
    <div className="tw-mt-3 tw-text-3xl tw-font-bold tw-text-slate-900">
      {count}
    </div>
  </motion.div>
);

export default StatCard;
