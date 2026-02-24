import { LogOut, Settings, ShieldAlert, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileSidebar = ({ user, activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "account", label: "Account Settings", icon: <Settings size={18} /> },
    { id: "security", label: "Security", icon: <ShieldAlert size={18} /> },
  ];

  return (
    <aside className="tw-w-full tw-flex tw-flex-col tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border">

      {/* Profile Header */}
      <div className="tw-p-6 tw-border-b tw-bg-gradient-to-br tw-from-blue-50 tw-to-white tw-rounded-t-2xl">
        <div className="tw-flex tw-items-center tw-gap-4">

          {/* Avatar */}
          <div className="tw-w-16 tw-h-16 tw-aspect-square tw-rounded-full tw-overflow-hidden tw-bg-gradient-to-br tw-from-blue-600 tw-to-indigo-600 tw-text-white tw-flex tw-items-center tw-justify-center tw-text-4xl tw-font-semibold tw-shadow-lg">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="tw-w-full tw-h-full tw-object-cover"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>


          {/* User Info */}
          <div className="tw-space-y-1">

            <span className="tw-inline-block tw-text-[11px] tw-font-medium tw-px-2 tw-py-0.5 tw-rounded-full tw-bg-blue-100 tw-text-blue-700">
              {user?.role || "Student"}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="tw-flex-1 tw-p-4 tw-space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                tw-w-full
                tw-flex
                tw-items-center
                tw-gap-3
                tw-px-4
                tw-py-3
                tw-rounded-xl
                tw-text-sm
                tw-font-medium
                tw-transition-all
                tw-duration-200
                ${isActive
                  ? "tw-bg-blue-600 tw-text-white tw-shadow-sm"
                  : "tw-text-gray-600 hover:tw-bg-gray-100 hover:tw-text-black"
                }
              `}
            >
              <span
                className={`tw-transition ${isActive ? "tw-text-white" : "tw-text-gray-500"
                  }`}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="tw-p-4 tw-border-t">
        <button
          onClick={() => navigate("/logout")}
          className="
            tw-w-full
            tw-flex
            tw-items-center
            tw-justify-center
            tw-gap-2
            tw-text-sm
            tw-font-medium
            tw-text-red-600
            hover:tw-bg-red-50
            tw-py-3
            tw-rounded-xl
            tw-transition
          "
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
