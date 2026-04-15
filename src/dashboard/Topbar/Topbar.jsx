import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '@/features/authSlice';
import CartIcon from '@/dashboard/Student/Cart/CartIcon';
import { FiMenu, FiChevronDown, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useSidebarStore } from '@/dashboard/Sidebar/useSidebarStore';
import { useTheme } from '@/context/ThemeContext';  

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`
    fixed top-0 right-0
    h-[70px]
    bg-base-100/95 backdrop-blur-md
    text-base-content
    border-b border-base-300
    shadow-sm
    flex items-center justify-between
    px-4
    z-50
    transition-all duration-300 ease-in-out
    ${isOpen ? 'left-64' : 'left-20'}
    max-lg:left-0
  `}

    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded hover:bg-base-200 transition-colors"
        >
          <FiMenu size={22} />
        </button>

        <img
          src="/img/leviticalogo.png"
          alt="Levitica Logo"
          className="h-14 md:h-12"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {user?.role === "student" && <CartIcon />}

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-base-200 transition-colors"
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <FiMoon size={20} className="text-base-content" />
          ) : (
            <FiSun size={20} className="text-yellow-400" />
          )}
        </button>

        {/* User dropdown */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary text-primary-content">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name || "User"}
                className="w-full h-full object-cover"
              />
            ) : (
              <span>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>
          <FiChevronDown size={14} />
        </button>

        {open && (
          <div className="absolute top-16 right-4 bg-base-100 border border-base-200 rounded-xl shadow-lg z-50 min-w-[160px]">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
                setOpen(false);
              }}
              className="flex items-center gap-2 px-5 py-3 text-error hover:bg-error/10 w-full text-left rounded-xl transition-all"
            >
              <FiLogOut size={16} /> Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;