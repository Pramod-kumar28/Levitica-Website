import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaCalendarAlt, FaBookOpen, FaArrowRight } from "react-icons/fa";
import { FiZap } from "react-icons/fi";

const QuickActionCards = () => {
  const navigate = useNavigate();

const quickActions = [
  {
    title: "Join Live Class",
    desc: "Attend your scheduled live sessions instantly",
    icon: FaVideo,
    action: () => navigate("live-session"),
    gradient: "bg-gradient-to-r from-blue-600 to-indigo-700",
    cardBg: "bg-gradient-to-br from-blue-100 to-indigo-100",
    cardBorder: "border-blue-400 hover:border-blue-600",
  },
  {
    title: "Upcoming Classes",
    desc: "Check your upcoming class schedule",
    icon: FaCalendarAlt,
    action: () => navigate("live-session"),

    gradient: "bg-gradient-to-r from-indigo-600 to-purple-700",
    cardBg: "bg-gradient-to-br from-indigo-100 to-purple-100",
    cardBorder: "border-purple-400 hover:border-purple-600",
  },
  {
    title: "My Courses",
    desc: "Access and manage all your enrolled courses",
    icon: FaBookOpen,
    action: () => navigate("/dashboard/student/mycourses"),

    gradient: "bg-gradient-to-r from-emerald-600 to-teal-700",
    cardBg: "bg-gradient-to-br from-emerald-100 to-teal-100",
    cardBorder: "border-emerald-400 hover:border-emerald-600",
  },
];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl p-6 transition-all duration-300 border shadow-lg hover:shadow-xl bg-white border-slate-200"
    >
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <FiZap className="w-5 h-5 text-blue-600" />
        <div>
          <h3 className="text-base font-bold uppercase tracking-wide text-blue-600">Quick Actions</h3>
          <p className="text-xs text-gray-500">Manage your learning activities faster</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {quickActions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ translateY: -8, scale: 1.03 }}
              className={`group relative rounded-xl border ${item.cardBorder} ${item.cardBg} p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
              onClick={item.action}
            >
              {/* Icon */}
              <div
                className={`
                  w-12 h-12
                  rounded-xl
                  flex items-center justify-center
                  text-white
                  ${item.gradient}
                  shadow-md
                  group-hover:shadow-lg
                  transition-all duration-300
                `}
              >
                <Icon size={20} />
              </div>

              {/* Content */}
              <div className="mt-4">
                <h4 className="text-sm font-bold text-slate-900">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  {item.desc}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                Open
                <FaArrowRight
                  size={12}
                  className="ml-2 transition-transform group-hover:translate-x-1"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActionCards;