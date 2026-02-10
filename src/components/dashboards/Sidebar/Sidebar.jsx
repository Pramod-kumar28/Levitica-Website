import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../Admin/Modals/ModalContext";
import {
  FaHome,
  FaBookOpen,
  FaVideo,
  FaComments,
  FaUsers,
  FaLayerGroup,
  FaUserPlus,
  FaCreditCard,
  FaCog,
  FaCertificate,
} from "react-icons/fa";




const Sidebar = ({ isOpen }) => {

  const role = useSelector((state) => state.auth.user?.role);
  const { modalType } = useModal();
  if (modalType) return null;

const menu = [
  {
    label: "Dashboard",
    icon: <FaHome size={20} />,
    path: "/dashboard",
    roles: ["student", "admin"],
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
    label: "Ask Questions",
    icon: <FaComments size={20} />,
    path: "/dashboard/student/ask-questions",
    roles: ["student"],
  },
  {
    label: "Settings",
    icon: <FaCog size={20} />,
    path: "/dashboard/student/settings",
    roles: ["student"],
  },

  {
    label: "Students",
    icon: <FaUsers size={20} />,
    path: "/dashboard/admin/students",
    roles: ["admin"],
  },
  {
    label: "Courses",
    icon: <FaBookOpen size={20} />,
    path: "/dashboard/admin/courses",
    roles: ["admin"],
  },
  {
    label: "Payments",
    icon: <FaCreditCard size={20} />,
    path: "/dashboard/admin/payments",
    roles: ["admin"],
  },
  {
    label: "Live Classes",
    icon: <FaVideo size={20} />,
    path: "/dashboard/admin/zoom",
    roles: ["admin"],
  },
  {
    label: "Batches",
    icon: <FaLayerGroup size={20} />,
    path: "/dashboard/admin/batchs",
    roles: ["admin"],
  },
  {
    label: "Internships",
    icon: <FaCertificate size={20} />,
    path: "/dashboard/admin/internships",
    roles: ["admin"],
  },
  {
    label: "Add Admin",
    icon: <FaUserPlus size={20} />,
    path: "/dashboard/admin/addadmin",
    roles: ["admin"],
  },
].filter((item) => item.roles.includes(role));

  return (
    <aside
      className={`
        tw-fixed lg:tw-static
        tw-top-20 tw-left-0
        tw-z-40
        tw-h-[calc(100vh-5rem)]
        ${isOpen ? "tw-w-64" : "tw-w-20"}
        tw-transition-all tw-duration-300

        tw-bg-gradient-to-b
        tw-from-blue-900/70
        tw-to-indigo-900/70
        tw-backdrop-blur-xl
        tw-border-r tw-border-white/10
        tw-shadow-[0_0_30px_rgba(59,130,246,0.25)]
      `}
    >
      <nav className="tw-p-3 tw-space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/dashboard"}
            className={({ isActive }) => `
              tw-group tw-flex tw-items-center tw-gap-3
              tw-rounded-xl tw-px-3 tw-py-2.5
              tw-text-sm tw-font-medium tw-transition-all
              ${
                isActive
                  ? "tw-bg-white/20 tw-text-white"
                  : "tw-text-blue-100 hover:tw-bg-white/10 hover:tw-text-white"
              }
            `}
          >
            <span className="
              tw-flex tw-items-center tw-justify-center
              tw-w-9 tw-h-9
              tw-rounded-lg
              tw-bg-white/10
              group-hover:tw-bg-white/20
            ">
              {item.icon}
            </span>

            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};


export default Sidebar;
