import { LogOut, Settings, ShieldAlert, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/authSlice";
import { useDispatch } from "react-redux";
import { FaRupeeSign } from "react-icons/fa6";

const ProfileSidebar = ({ user, activeTab, onTabChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const menuItems = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "payments", label: "Payments History", icon: <FaRupeeSign size={18} /> },
    { id: "security", label: "Security", icon: <ShieldAlert size={18} /> },
  ];

  return (
    <aside className="tw-w-full tw-flex tw-flex-col tw-bg-white tw-rounded-2xl tw-shadow-sm tw-border">

      {/* Profile Header */}
   {/* Profile Header */}
<div className="tw-relative tw-w-full tw-h-40 tw-rounded-t-2xl tw-overflow-hidden tw-bg-gradient-to-br tw-from-blue-50 tw-to-white">

  {user?.image ? (
    <img
      src={user.image}
      alt={user?.name || "User"}
      className="tw-w-full tw-h-full tw-object-cover"
    />
  ) : (
    <div className="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-blue-600 tw-to-indigo-600 tw-text-white tw-text-5xl tw-font-semibold">
      {user?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>
  )}

  {/* Overlay for readability */}
  <div className="tw-absolute tw-inset-0 tw-bg-black/30"></div>

  {/* User Info */}
  <div className="tw-absolute tw-bottom-4 tw-left-4 tw-text-white">
    <h2 className="tw-text-lg tw-font-semibold">
      {user?.name || "User"}
    </h2>

    <span className="tw-inline-block tw-mt-1 tw-text-[11px] tw-font-medium tw-px-2 tw-py-0.5 tw-rounded-full tw-bg-white/20">
      {user?.role || "Student"}
    </span>
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
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
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
