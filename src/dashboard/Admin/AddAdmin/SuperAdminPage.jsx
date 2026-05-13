import CreateAdminForm from "./CreateAdminForm";
import AdminTable from "./AdminTable";
import { useTheme } from '@/context/ThemeContext';
import { FiShield, FiUsers, FiBook, FiLayers, FiUserCheck } from 'react-icons/fi';
import { motion } from "framer-motion";

const SuperAdminPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen py-6 px-4 `}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Premium Header */}
        <div className={`px-2`}>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="min-w-0">
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2 ${
                isDark ? 'text-white' : 'text-midnight_text'
              }`}>
                Super Admin Controls
              </h1>
              <p className={`text-sm flex items-center gap-2 mt-1 text-gray`}>
                <FiShield className="h-4 w-4" />
                Manage administrator accounts and permissions
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Create Admin Form */}
          <CreateAdminForm />

          {/* Admin Capabilities Card */}
          <div className={`rounded-xl border shadow-property overflow-hidden ${
            isDark
              ? 'bg-semidark border-dark_border'
              : 'bg-white border-border'
          }`}>
            {/* Header */}
            <div className={`p-4 sm:p-5 border-b ${
              isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
            }`}>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <FiUserCheck className="h-5 w-5 text-white" />
                </div>
                <div className="min-w-0">
                  <h2 className={`text-base font-bold ${
                    isDark ? 'text-white' : 'text-midnight_text'
                  }`}>
                    Admin Capabilities
                  </h2>
                  <p className={`text-xs text-gray mt-0.5`}>
                    Permissions granted to admin users
                  </p>
                </div>
              </div>
            </div>

            {/* Permissions List */}
            <div className="p-5 space-y-3">
              {[
                { icon: FiUsers, label: 'Manage students', color: 'primary' },
                { icon: FiBook, label: 'Create & manage courses', color: 'primary' },
                { icon: FiLayers, label: 'Assign students to batches', color: 'primary' },
                { icon: FiShield, label: 'View system reports', color: 'primary' },
              ].map(({ icon: Icon, label }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-200 ${
                    isDark
                      ? 'border-dark_border bg-darklight hover:border-primary/50'
                      : 'border-border bg-light hover:border-primary/50'
                  }`}
                >
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-primary/20' : 'bg-primary/10'
                  }`}>
                    <Icon className={`h-4 w-4 text-primary`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Footer Note */}
            <div className={`p-3 border-t text-center text-xs ${
              isDark ? 'border-dark_border bg-darklight text-gray' : 'border-border bg-light text-gray'
            }`}>
              Admins have full access to manage courses, batches, and students
            </div>
          </div>
        </div>

        {/* Admin Table */}
        <AdminTable />
      </div>
    </div>
  );
};

export default SuperAdminPage;