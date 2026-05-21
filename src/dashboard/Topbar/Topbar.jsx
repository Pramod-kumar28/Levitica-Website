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
        fixed top-0 left-0 w-full
        h-[70px]
        backdrop-blur-md
        flex items-center justify-between
        px-4 md:px-6
        z-50
        transition-all duration-300

        bg-white dark:bg-darklight
        text-midnight_text dark:text-white

        border-b border-border dark:border-dark_border
        shadow-property
      `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="
            p-2 rounded-lg
            transition-colors
            hover:bg-lightgray
            dark:hover:bg-semidark
          "
        >
          <FiMenu size={22} />
        </button>

        {/* Logo */}
        <img
          src="/img/leviticalogo.png"
          alt="Levitica Logo"
          className="h-10 md:h-11 object-contain rounded-md"
        />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">

        {user?.role === "student" && <CartIcon />}

        {/* THEME SWITCH */}
        <button
          onClick={toggleTheme}
          className="
            p-2 rounded-lg
            flex items-center justify-center
            transition-all duration-200

            bg-light hover:bg-lightgray
            text-midnight_text

            dark:bg-semidark dark:text-yellow-400 dark:hover:bg-darklight
          "
          title="Toggle Theme"
        >
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>

        {/* USER */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="
            w-8 h-8 rounded-full overflow-hidden
            flex items-center justify-center
            bg-primary text-white
          ">
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

        {/* DROPDOWN */}
        {open && (
          <div className="
            absolute top-16 right-4
            min-w-[160px]
            rounded-xl
            border border-border dark:border-dark_border
            bg-white dark:bg-semidark
            shadow-deatail_shadow
            overflow-hidden
          ">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
                setOpen(false);
              }}
              className="
                flex items-center gap-2
                px-5 py-3 w-full text-left
                btn-delete
                transition-all
              "
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;