import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useModal } from "../Admin/Modals/ModalContext";
import { useSidebarStore } from "./useSidebarStore";
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
  const role = useSelector((state) => state.auth.user?.role);
  const { modalType } = useModal();
  console.log("User Role in Sidebar:", role);


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
      roles: ["admin", 'superadmin'],
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
          className="lg:tw-hidden tw-fixed tw-inset-0 tw-bg-black/40 tw-z-30"
        />
      )}
      <aside
        className={`
    tw-fixed
    lg:tw-static
    tw-top-20
    tw-left-0
    tw-h-[calc(100vh-5rem)]
    tw-z-40
    tw-transition-all tw-duration-300 tw-ease-in-out

    /* Desktop */
    lg:tw-translate-x-0
    ${isOpen ? "lg:tw-w-64" : "lg:tw-w-20"}

    /* Mobile */
    ${isOpen ? "tw-translate-x-0" : "-tw-translate-x-full"}
    tw-w-64

    tw-bg-gradient-to-b
    tw-from-blue-900/80
    tw-to-indigo-900/80
    tw-backdrop-blur-xl
    tw-border-r tw-border-white/10
    tw-shadow-xl
    tw-overflow-y-auto
  `}
      >
        <nav className="tw-p-3 tw-space-y-2">
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
    tw-group tw-flex tw-items-center tw-gap-3
    tw-rounded-xl tw-px-3 tw-py-2.5
    tw-text-sm tw-font-medium tw-transition-all
    ${isActive
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
      </aside></>
  );
};

export default Sidebar;