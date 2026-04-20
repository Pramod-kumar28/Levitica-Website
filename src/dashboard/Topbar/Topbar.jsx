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
    backdrop-blur-md
    border-b
    shadow-sm
    flex items-center justify-between
    px-4
    z-50
    transition-all duration-300 ease-in-out
    ${isOpen ? 'left-64' : 'left-20'}
    max-lg:left-0
    ${theme === 'dark'
      ? 'bg-slate-800/95 border-slate-700 text-white'
      : 'bg-white/95 border-gray-200 text-slate-900'
    }
  `}

    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded transition-colors ${
            theme === 'dark'
              ? 'hover:bg-slate-700'
              : 'hover:bg-gray-100'
          }`}
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
          className={`p-2 rounded-lg transition-colors ${
            theme === 'dark'
              ? 'hover:bg-slate-700'
              : 'hover:bg-gray-100'
          }`}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <FiMoon size={20} className={theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} />
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
          <div className={`absolute top-16 right-4 border rounded-xl shadow-lg z-50 min-w-[160px] transition-colors ${
            theme === 'dark'
              ? 'bg-slate-700 border-slate-600'
              : 'bg-white border-gray-200'
          }`}>
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
                setOpen(false);
              }}
              className={`flex items-center gap-2 px-5 py-3 w-full text-left rounded-xl transition-all ${
                theme === 'dark'
                  ? 'text-red-400 hover:bg-red-950/40'
                  : 'text-red-600 hover:bg-red-50'
              }`}
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