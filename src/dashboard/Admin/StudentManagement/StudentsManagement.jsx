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
    <div className="space-y-6 p-4">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <FiUsers className="text-blue-600" />
            Student Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage students, course assignments, and batch allocation
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-2 rounded-full">
          <FiShield />
          Admin Panel
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="flex flex-wrap gap-2 border-b p-6">
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
                    px-4 py-2
                    rounded-lg
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
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
        <div className="px-7">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AssignStudents;
