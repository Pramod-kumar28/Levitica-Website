import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../Admin/Modals/ModalContext";
import {
  Home,
  BookOpen,
  Video,
  MessageSquare,
  Users,
  Layers,
  UserPlus,
  Award,
  CreditCard,
  Settings,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
  const role = useSelector((state) => state.auth.user?.role);
  const { modalType } = useModal();

  if (modalType) return null;

  const menu = [
    { label: "Dashboard", icon: <Home size={20} />, path: "/dashboard", roles: ["student", "admin"] },

    { label: "Browse Courses", icon: <BookOpen size={20} />, path: "/dashboard/student/browsercourses", roles: ["student"] },
    { label: "My Courses", icon: <BookOpen size={20} />, path: "/dashboard/student/mycourses", roles: ["student"] },
    { label: "Live Sessions", icon: <Video size={20} />, path: "/dashboard/student/live-session", roles: ["student"] },
    { label: "Ask Questions", icon: <MessageSquare size={20} />, path: "/dashboard/student/ask-questions", roles: ["student"] },
    { label: "Settings", icon: <Settings size={20} />, path: "/dashboard/student/settings", roles: ["student"] },

    { label: "Students", icon: <Users size={20} />, path: "/dashboard/admin/students", roles: ["admin"] },
    { label: "Courses", icon: <BookOpen size={20} />, path: "/dashboard/admin/courses", roles: ["admin"] },
    { label: "Payments", icon: <CreditCard size={20} />, path: "/dashboard/admin/payments", roles: ["admin"] },
    { label: "Live Classes", icon: <Video size={20} />, path: "/dashboard/admin/zoom", roles: ["admin"] },
    { label: "Batches", icon: <Layers size={20} />, path: "/dashboard/admin/batchs", roles: ["admin"] },
    { label: "Add Admin", icon: <UserPlus size={20} />, path: "/dashboard/admin/addadmin", roles: ["admin"] },
  ].filter((item) => item.roles.includes(role));

  return (
    <aside
      className={`
    tw-fixed lg:tw-static
    tw-top-20 tw-left-0
    tw-z-40
    tw-h-[calc(100vh-4rem)]
    tw-bg-white
    tw-border-r
    tw-transition-all
    tw-duration-300
    ${isOpen ? "tw-w-64" : "tw-w-0"}
  `}
    >




      {/* MENU */}
      <nav className="tw-p-2 tw-space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}   // 👈 IMPORTANT
            className={({ isActive }) =>
              `
      tw-flex tw-items-center tw-gap-3
      tw-rounded-lg tw-px-3 tw-py-2
      tw-text-sm tw-font-medium
      ${isActive
                ? "tw-bg-blue-100 tw-text-blue-600"
                : "tw-text-gray-600 hover:tw-bg-gray-100"
              }
    `
            }
          >
            {item.icon}
            {isOpen && <span>{item.label}</span>}
          </NavLink>

        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
