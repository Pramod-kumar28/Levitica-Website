import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaCalendarAlt, FaBookOpen, FaArrowRight } from "react-icons/fa";

const QuickActionCards = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Join Live Class",
      desc: "Attend your scheduled live sessions instantly",
      icon: FaVideo,
      action: () => navigate("live-session"),
      gradient: "bg-gradient-to-r from-blue-500 to-indigo-600",
    },
    {
      title: "Upcoming Classes",
      desc: "Check your upcoming class schedule",
      icon: FaCalendarAlt,
      action: () => navigate("live-session"),
      gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    },
    {
      title: "My Courses",
      desc: "Access and manage all your enrolled courses",
      icon: FaBookOpen,
      action: () => navigate("/dashboard/student/mycourses"),
      gradient: "bg-gradient-to-r from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="py-10">
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b">
          <h3 className="text-xl font-semibold text-gray-900">
            Quick Actions
          </h3>
          <p className="text-sm text-gray-500">
            Manage your learning activities faster
          </p>
        </div>

        {/* Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -6 }}
                  className="
                    group
                    relative
                    rounded-2xl
                    border
                    bg-gray-50
                    hover:bg-white
                    p-6
                    transition
                    hover:shadow-xl
                    cursor-pointer
                  "
                  onClick={item.action}
                >
                  {/* Icon */}
                  <div
                    className={`
                      w-14 h-14
                      rounded-xl
                      flex items-center justify-center
                      text-white
                      ${item.gradient}
                      shadow-md
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <div className="mt-5">
                    <h4 className="text-base font-semibold text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-5 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                    Open
                    <FaArrowRight
                      size={14}
                      className="ml-2 transition-transform group-hover:translate-x-1"
                    />
                  </div>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-100 transition" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards;