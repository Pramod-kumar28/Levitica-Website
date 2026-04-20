import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../Admin/Modals/ModalContext";
import { useSidebarStore } from "./useSidebarStore";
import { useTheme } from "@/context/ThemeContext";
import {
  FaHome,
  FaBookOpen,
  FaVideo,
  FaUsers,
  FaLayerGroup,
  FaUserPlus,
  FaCreditCard,
  FaCog,
  FaCertificate,
} from "react-icons/fa";

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const role = user?.role;
  const { modalType } = useModal();

  // Auto-close sidebar when screen resizes to mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    };
    window.addEventListener("resize", handleResize);
    // Also close on mount if already mobile
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [closeSidebar]);

  if (modalType) return null;

  const menu = [
    {
      label: "Dashboard",
      icon: <FaHome size={20} />,
      path: "/dashboard",
      roles: ["student", "admin", 'superadmin'],
    },
    {
      label: "Browse Courses",
      icon: <FaBookOpen size={20} />,
      path: "/dashboard/student/browsercourses",
      roles: ["student"],
    },
    {
      label: "My Courses",
      icon: <FaBookOpen size={20} />,
      path: "/dashboard/student/mycourses",
      roles: ["student"],
    },
    {
      label: "Live Sessions",
      icon: <FaVideo size={20} />,
      path: "/dashboard/student/live-session",
      roles: ["student"],
    },
    {
      label: "Settings",
      icon: <FaCog size={20} />,
      path: `/dashboard/student/settings`,
      roles: ["student"],
    },
    {
      label: "Students",
      icon: <FaUsers size={20} />,
      path: "/dashboard/admin/students",
      roles: ["admin", 'superadmin'],
    },
    {
      label: "Courses",
      icon: <FaBookOpen size={20} />,
      path: "/dashboard/admin/courses",
      roles: ["admin", 'superadmin'],
    },
    {
      label: "Batches",
      icon: <FaLayerGroup size={20} />,
      path: "/dashboard/admin/batchs",
      roles: ["admin", 'superadmin'],
    },
    {
      label: "Live Classes",
      icon: <FaVideo size={20} />,
      path: "/dashboard/admin/zoom",
      roles: ["admin", 'superadmin'],
    },
    {
      label: "Internships",
      icon: <FaCertificate size={20} />,
      path: "/dashboard/admin/internships",
      roles: ["admin", 'superadmin'],
    },
    {
      label: "Payments",
      icon: <FaCreditCard size={20} />,
      path: "/dashboard/admin/payments",
      roles: ['superadmin'],
    },
    {
      label: "Add Admin",
      icon: <FaUserPlus size={20} />,
      path: "/dashboard/admin/addadmin",
      roles: ["superadmin"],
    },
    {
      label: "Settings",
      icon: <FaCog size={20} />,
      path: `/dashboard/admin/settings`,
      roles: ['admin', "superadmin"],
    },
  ].filter((item) => item.roles.includes(role));

  return (
    <>
      {isOpen && (
        <div
          onClick={() => useSidebarStore.getState().closeSidebar()}
          className="lg:hidden fixed inset-0 bg-black/40 z-30"
        />
      )}
      <aside
        className={`
          fixed
          lg:fixed
          top-0
          left-0
          h-screen
          z-40
          transition-all duration-300 ease-in-out

          /* Desktop */
          lg:translate-x-0
          ${isOpen ? "lg:w-64" : "lg:w-20"}

          /* Mobile */
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          w-64

          bg-gradient-to-b
          ${isDark ? 'from-slate-800 to-slate-700' : 'from-blue-900 to-indigo-900'}
          shadow-xl
          flex flex-col
          overflow-hidden
        `}
      >
        {/* Fixed User Profile Section - No Scroll */}
        <div className={`shrink-0 px-3 pt-4 pb-3 border-b ${isDark ? 'border-slate-600' : 'border-white/10'} ${!isOpen && "flex justify-center"}`}>
          <div className={`flex items-center ${isOpen ? "gap-3" : "flex-col gap-1"}`}>
            <div className={`w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-white shrink-0 ring-2 ${
              isDark ? 'bg-slate-700 ring-slate-600' : 'bg-white/20 ring-white/30'
            }`}>
              {user?.image ? (
                <img
                  src={user.image}
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-bold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </span>
              )}
            </div>
            {isOpen && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {user?.name || "User"}
                </p>
                <p className={`text-[11px] capitalize ${isDark ? 'text-slate-400' : 'text-blue-200/80'}`}>{role}</p>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Navigation Area - Only this scrolls */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-2 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-transparent" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  closeSidebar();
                }
              }}
              className={({ isActive }) => `
                group flex items-center gap-3
                rounded-xl px-3 py-2.5
                text-sm font-medium transition-all
                ${isActive
                  ? isDark ? 'bg-slate-600 text-white' : 'bg-white/20 text-white'
                  : isDark ? 'text-slate-300 hover:bg-slate-700 hover:text-white' : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              <span className={`
                flex items-center justify-center
                w-9 h-9
                rounded-lg
                shrink-0
                ${isDark ? 'bg-slate-700 group-hover:bg-slate-600' : 'bg-white/10 group-hover:bg-white/20'}
              `}>
                {item.icon}
              </span>

              {isOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;