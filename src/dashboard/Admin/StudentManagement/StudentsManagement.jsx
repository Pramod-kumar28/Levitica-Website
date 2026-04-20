import { Outlet, NavLink, useMatch } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiShield,
} from "react-icons/fi";
import { useTheme } from "@/context/ThemeContext";

const AssignStudents = () => {
  const { theme } = useTheme();
  const matchAll = useMatch("/dashboard/admin/students");
  const matchUnassigned = useMatch("/dashboard/admin/students/unassigned");
  const matchAssigned = useMatch("/dashboard/admin/students/assigned");

  const tabs = [
    {
      path: "",
      label: "All Students",
      icon: FiUsers,
      active: !!matchAll,
    },
    {
      path: "unassigned",
      label: "Unassigned",
      icon: FiUserX,
      active: !!matchUnassigned,
    },
    {
      path: "assigned",
      label: "Assigned",
      icon: FiUserCheck,
      active: !!matchAssigned,
    },
  ];

  const isDark = theme === "dark";

  return (
    <div className={`space-y-4 md:space-y-6 p-3 sm:p-4 md:p-8 min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'
    }`}>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className={`p-2 sm:p-2.5 rounded-xl shadow-lg transition-colors ${
              isDark
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                : 'bg-gradient-to-br from-blue-600 to-indigo-600'
            }`}>
              <FiUsers className="text-white" size={24} />
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r transition-colors ${
              isDark
                ? 'from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent'
                : 'from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'
            }`}>
              Student Management
            </h2>
          </div>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'} mt-2`}>
            Manage students, course assignments, and batch allocation
          </p>
        </div>

        <div className={`inline-flex items-center gap-2 text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-3 rounded-full shadow-lg hover:shadow-xl transition-all ${
          isDark
            ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600'
        }`}>
          <FiShield size={16} />
          Admin Panel
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className={`rounded-2xl border shadow-lg overflow-hidden transition-colors ${
        isDark
          ? 'bg-slate-800/80 backdrop-blur-md border-slate-700/40'
          : 'bg-white/80 backdrop-blur-md border-white/40'
      }`}>
        <div className={`flex flex-wrap gap-1 border-b p-3 sm:p-4 md:p-6 transition-colors ${
          isDark
            ? 'border-slate-700 bg-gradient-to-r from-slate-800 via-slate-700/30 to-slate-800'
            : 'border-slate-200 bg-gradient-to-r from-white via-blue-50/30 to-white'
        }`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === ""}
                className={({ isActive }) =>
                  `
                    flex items-center gap-2
                    px-3 sm:px-5 py-2 sm:py-2.5
                    rounded-lg
                    text-xs sm:text-sm font-semibold
                    transition duration-300
                    ${
                      isActive
                        ? isDark
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-700/50 hover:text-slate-50'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `
                }
              >
                <Icon size={18} />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden text-xs">{tab.label.split(' ')[0]}</span>
              </NavLink>
            );
          })}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-3 sm:px-6 md:px-8 py-4 sm:py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AssignStudents;
