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
      gradient: "tw-bg-gradient-to-r tw-from-blue-500 tw-to-indigo-600",
    },
    {
      title: "Upcoming Classes",
      desc: "Check your upcoming class schedule",
      icon: FaCalendarAlt,
      action: () => navigate("live-session"),
      gradient: "tw-bg-gradient-to-r tw-from-indigo-500 tw-to-purple-600",
    },
    {
      title: "My Courses",
      desc: "Access and manage all your enrolled courses",
      icon: FaBookOpen,
      action: () => navigate("/dashboard/student/mycourses"),
      gradient: "tw-bg-gradient-to-r tw-from-emerald-500 tw-to-teal-600",
    },
  ];

  return (
    <div className="tw-py-10">
      <div className="tw-bg-white tw-rounded-2xl tw-border tw-shadow-sm tw-overflow-hidden">
        
        {/* Header */}
        <div className="tw-p-6 tw-border-b">
          <h3 className="tw-text-xl tw-font-semibold tw-text-gray-900">
            Quick Actions
          </h3>
          <p className="tw-text-sm tw-text-gray-500">
            Manage your learning activities faster
          </p>
        </div>

        {/* Grid */}
        <div className="tw-p-6">
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
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
                    tw-group
                    tw-relative
                    tw-rounded-2xl
                    tw-border
                    tw-bg-gray-50
                    hover:tw-bg-white
                    tw-p-6
                    tw-transition
                    hover:tw-shadow-xl
                    tw-cursor-pointer
                  "
                  onClick={item.action}
                >
                  {/* Icon */}
                  <div
                    className={`
                      tw-w-14 tw-h-14
                      tw-rounded-xl
                      tw-flex tw-items-center tw-justify-center
                      tw-text-white
                      ${item.gradient}
                      tw-shadow-md
                    `}
                  >
                    <Icon size={22} />
                  </div>

                  {/* Content */}
                  <div className="tw-mt-5">
                    <h4 className="tw-text-base tw-font-semibold tw-text-gray-900">
                      {item.title}
                    </h4>
                    <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                      {item.desc}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="tw-mt-5 tw-flex tw-items-center tw-text-sm tw-font-medium tw-text-blue-600 group-hover:tw-text-blue-700">
                    Open
                    <FaArrowRight
                      size={14}
                      className="tw-ml-2 tw-transition-transform group-hover:tw-translate-x-1"
                    />
                  </div>

                  {/* Hover Glow */}
                  <div className="tw-absolute tw-inset-0 tw-rounded-2xl tw-ring-1 tw-ring-transparent group-hover:tw-ring-blue-100 tw-transition" />
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