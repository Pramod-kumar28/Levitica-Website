import AdminTable from "./AdminTable";
import { useTheme } from '@/context/ThemeContext';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { FiShield, FiUsers, FiUserPlus } from 'react-icons/fi';
import { motion } from "framer-motion";

const SuperAdminPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { openModal } = useModal();

  return (
    <div className={`min-h-screen py-6 px-4`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Premium Header */}
        <div className="p-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
            <div className="min-w-0">
              <h1 className={`text-2xl sm:text-3xl md:text-3xl font-bold line-clamp-2 ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                Admin Management
              </h1>
              <p className={`text-sm flex items-center gap-2 mt-1 text-gray`}>
                <FiUsers className="h-4 w-4 flex-shrink-0" />
                <span>Manage admin profiles and permissions</span>
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => openModal(MODAL_TYPES.ADD_EDIT_ADMIN, { mode: "add" })}
              className="w-full sm:w-auto flex items-center btn-primary justify-center gap-2 rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold shadow-md hover:shadow-lg"
            >
              <FiUserPlus className="w-4 h-4" />
              <span>Add Admin Profile</span>
            </motion.button>
          </div>
        </div>

        {/* Admin Table */}
        <AdminTable />
      </div>
    </div>
  );
};

export default SuperAdminPage;