import { Outlet, NavLink, useMatch } from "react-router-dom";
import {
  FiUsers,
  FiUserCheck,
  FiUserX,
  FiShield,
} from "react-icons/fi";

const AssignStudents = () => {
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

  return (
    <div className="tw-space-y-6 tw-p-4">
      {/* ================= HEADER ================= */}
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4">
        <div>
          <h2 className="tw-flex tw-items-center tw-gap-2 tw-text-2xl tw-font-bold tw-text-gray-800">
            <FiUsers className="tw-text-blue-600" />
            Student Management
          </h2>
          <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
            Manage students, course assignments, and batch allocation
          </p>
        </div>

        <div className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-blue-50 tw-text-blue-600 tw-text-sm tw-font-medium tw-px-4 tw-py-2 tw-rounded-full">
          <FiShield />
          Admin Panel
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="tw-bg-white tw-rounded-xl tw-border tw-shadow-sm">
        <div className="tw-flex tw-flex-wrap tw-gap-2 tw-border-b tw-p-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                end={tab.path === ""}
                className={({ isActive }) =>
                  `
                    tw-flex tw-items-center tw-gap-2
                    tw-px-4 tw-py-2
                    tw-rounded-lg
                    tw-text-sm tw-font-medium
                    tw-transition
                    ${
                      isActive
                        ? "tw-bg-blue-600 tw-text-white"
                        : "tw-text-gray-600 hover:tw-bg-gray-100"
                    }
                  `
                }
              >
                <Icon size={18} />
                {tab.label}
              </NavLink>
            );
          })}
        </div>

        {/* ================= CONTENT ================= */}
        <div className="tw-px-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AssignStudents;
