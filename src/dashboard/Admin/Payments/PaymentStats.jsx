import { FiTrendingUp, FiDollarSign, FiCheck } from "react-icons/fi";

const PaymentStatsCards = ({ stats }) => {
  const cards = [
    {
      icon: FiTrendingUp,
      label: "Total Payments",
      value: stats.total,
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: FiDollarSign,
      label: "Total Revenue",
      value: `₹${stats.totalRevenue.toLocaleString()}`,
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: FiCheck,
      label: "Paid Payments",
      value: stats.paidCount || 0,
      gradient: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ${card.bgLight} border border-opacity-10 border-gray-300`}
          >
            {/* Gradient Background */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full -mr-12 -mt-12`}
              style={{ transform: "translate(30%, -30%)" }}
            ></div>

            <div className="relative p-6 sm:p-8">
              {/* Icon */}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${card.gradient} shadow-lg mb-4`}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
              </div>

              {/* Label */}
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-2 tracking-wide uppercase">
                {card.label}
              </p>

              {/* Value */}
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                {card.value}
              </h3>

              {/* Trend Indicator */}
              <div className="flex items-center gap-2">
                <div className={`h-1 w-12 bg-gradient-to-r ${card.gradient} rounded-full`}></div>
                <span className={`text-xs font-semibold ${card.textColor}`}>Active</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentStatsCards;
