import MentorTable from "./MentorTable";
import { useTheme } from '@/context/ThemeContext';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { FiUsers, FiBookOpen, FiAward, FiBriefcase, FiCalendar, FiUserCheck, FiUserPlus } from 'react-icons/fi';
import { motion } from "framer-motion";

const MentorManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { openModal } = useModal();

  return (
    <div className={`min-h-screen py-6 px-4`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Premium Header */}
        <div className={`p-2`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="min-w-0">
              <h1 className={`text-2xl sm:text-3xl md:text-3xl font-bold line-clamp-2 ${isDark ? 'text-white' : 'text-midnight_text'
                }`}>
                Mentor Management
              </h1>
              <p className={`text-sm flex items-center gap-2 mt-1 text-gray`}>
                <FiUsers className="h-4 w-4" />
                Manage mentor profiles, expertise, and assignments
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(MODAL_TYPES.ADD_EDIT_MENTOR, { mode: "add" })}
              className="w-full sm:w-auto flex items-center btn-primary justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              <FiUserPlus className="w-4 h-4" /> Add Mentor Profile
            </motion.button>

          </div>
        </div>



        {/* Mentor Table */}
        <MentorTable />
      </div>
    </div>
  );
};

export default MentorManagement;