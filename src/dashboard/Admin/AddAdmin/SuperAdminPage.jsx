import CreateAdminForm from "./CreateAdminForm";
import AdminTable from "./AdminTable";
import { useTheme } from '@/context/ThemeContext';
import { FiShield, FiUsers, FiBook, FiLayers, FiUserCheck } from 'react-icons/fi';


const SuperAdminPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 sm:space-y-8 py-4 sm:py-6 transition-colors ${isDark ? 'bg-slate-900 min-h-screen' : ''}`}>
      {/* Premium Header */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-lg sm:rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0`}>
            <FiShield className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold line-clamp-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Super Admin Controls
            </h1>
            <p className={`text-xs sm:text-sm mt-1 line-clamp-2 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Manage administrator accounts and permissions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <CreateAdminForm />

        <div className={`rounded-2xl border shadow-lg overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'border-slate-200 bg-white'}`}>
          {/* Premium Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                <FiUserCheck className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  Admin Capabilities
                </h2>
                <p className="text-xs sm:text-sm text-purple-100 mt-0.5 truncate">
                  Permissions granted to admin users
                </p>
              </div>
            </div>
          </div>

          <div className={`space-y-2 sm:space-y-3 p-4 sm:p-6 md:p-8 ${isDark ? 'bg-slate-800' : ''}`}>
            {[
              { icon: FiUsers, label: 'Manage students' },
              { icon: FiBook, label: 'Create & manage courses' },
              { icon: FiLayers, label: 'Assign students to batches' },
              { icon: FiShield, label: 'View system reports' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className={`flex items-center gap-3 sm:gap-4 rounded-lg sm:rounded-xl border p-3 sm:p-4 hover:shadow-md transition group ${isDark ? 'border-slate-700 bg-slate-700/50 hover:border-slate-600' : 'border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 hover:border-indigo-300'}`}
              >
                <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg flex items-center justify-center transition flex-shrink-0 ${isDark ? 'bg-indigo-950 group-hover:bg-indigo-900' : 'bg-indigo-100 group-hover:bg-indigo-200'}`}>
                  <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <span className={`text-xs sm:text-sm font-medium truncate ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Admin Table */}
      <AdminTable />
    </div>
  );
};

export default SuperAdminPage;