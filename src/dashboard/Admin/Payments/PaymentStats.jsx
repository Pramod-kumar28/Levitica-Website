import { FiTrendingUp, FiDollarSign, FiCheck } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';
import { motion } from "framer-motion";

const PaymentStatsCards = ({ stats }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cards = [
    {
      icon: FiTrendingUp,
      label: "Total Payments",
      value: stats.total,
      gradient: "from-primary to-skyBlue",
      bgLight: "bg-light",
      bgDark: "bg-darklight",
      textColor: "text-primary",
      textColorDark: "text-primary",
    },
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-light",
      bgDark: "bg-darklight",
      textColor: "text-emerald-600",
      textColorDark: "text-emerald-400",
    },
    {
      icon: FiCheck,
      label: "Paid Payments",
      value: stats.paidCount || 0,
      gradient: "from-purple-500 to-pink-500",
      bgLight: "bg-light",
      bgDark: "bg-darklight",
      textColor: "text-purple-600",
      textColorDark: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative overflow-hidden rounded-xl shadow-property hover:shadow-deatail_shadow transition-all duration-300 border ${
              isDark
                ? `${card.bgDark} border-dark_border hover:border-primary/50`
                : `${card.bgLight} border-border hover:border-primary/50`
            }`}
          >
            {/* Gradient Background Blob */}
            <div
              className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${card.gradient} ${
                isDark ? 'opacity-10' : 'opacity-5'
              } rounded-full -mr-12 -mt-12`}
              style={{ transform: "translate(30%, -30%)" }}
            ></div>

            <div className="relative p-5 sm:p-6">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4`}
              >
                <Icon className="h-5 w-5 text-white" />
              </div>

              {/* Label */}
              <p className={`text-xs font-medium mb-2 tracking-wide uppercase text-gray`}>
                {card.label}
              </p>

              {/* Value */}
              <h3 className={`text-2xl sm:text-3xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-midnight_text'
              }`}>
                {card.value}
              </h3>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2">
                <div className={`h-1 w-16 bg-gradient-to-r ${card.gradient} rounded-full`}></div>
                <span className={`text-xs font-semibold ${
                  isDark ? card.textColorDark : card.textColor
                }`}>
                  Current Period
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PaymentStatsCards;