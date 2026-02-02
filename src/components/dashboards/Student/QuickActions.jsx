import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Video,
  Calendar,
  UserCheck,
  FileText,
  MessageSquare,
  Award,
  ArrowRight,
} from "lucide-react";

const QuickActionCards = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Join Live Class",
      desc: "Attend your scheduled live sessions instantly",
      icon: Video,
      action: () => navigate("live-session"),
      color: "tw-bg-blue-500",
    },
    {
      title: "Upcoming Classes",
      desc: "Check your upcoming class schedule",
      icon: Calendar,
      action: () => navigate("live-session"),
      color: "tw-bg-indigo-500",
    },
    {
      title: "1-on-1 Session",
      desc: "Book personalized mentor sessions",
      icon: UserCheck,
      action: () => navigate("book-session"),
      color: "tw-bg-purple-500",
    },
    {
      title: "Class Resources",
      desc: "Access notes, recordings & assignments",
      icon: FileText,
      action: () => navigate("class-resources"),
      color: "tw-bg-emerald-500",
    },
    {
      title: "Ask Questions",
      desc: "Clear your doubts with instructors",
      icon: MessageSquare,
      action: () => navigate("ask-questions"),
      color: "tw-bg-orange-500",
    },
    {
      title: "Certificates",
      desc: "View & download your certificates",
      icon: Award,
      action: () => navigate("my-certificates"),
      color: "tw-bg-pink-500",
    },
  ];

  return (
    <div className="tw-py-12  ">
      <div className="tw-bg-white tw-rounded-xl tw-border tw-shadow-sm">
        {/* Header */}
        <div className="tw-p-5 tw-border-b">
          <h3 className="tw-text-lg tw-font-semibold tw-text-gray-900">
            Quick Actions
          </h3>
          <p className="tw-text-sm tw-text-gray-500">
            Manage your learning activities faster
          </p>
        </div>

        {/* Grid */}
        <div className="tw-p-5">
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-5">
            {quickActions.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.08, duration: 0.4 }}
                className="tw-group tw-border tw-rounded-xl tw-p-4 hover:tw-shadow-md tw-transition"
              >
                {/* Icon */}
                <div
                  className={`
                  tw-w-12 tw-h-12
                  tw-rounded-lg
                  tw-flex tw-items-center tw-justify-center
                  tw-text-white
                  ${item.color}
                `}
                >
                  <item.icon size={22} />
                </div>

                {/* Content */}
                <div className="tw-mt-4">
                  <h4 className="tw-font-semibold tw-text-gray-900">
                    {item.title}
                  </h4>
                  <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                    {item.desc}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={item.action}
                  className="
                  tw-mt-4
                  tw-flex tw-items-center tw-gap-2
                  tw-text-sm tw-font-medium
                  tw-text-blue-600
                  hover:tw-text-blue-700
                "
                >
                  Take Action
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionCards;
