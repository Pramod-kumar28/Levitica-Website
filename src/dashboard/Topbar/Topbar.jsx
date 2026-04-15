import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from '@/features/authSlice';
import CartIcon from '@/dashboard/Student/Cart/CartIcon';
import { FiMenu, FiChevronDown, FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import { useSidebarStore } from '@/dashboard/Sidebar/useSidebarStore';
import { useTheme } from '@/context/ThemeContext';
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, toggleSidebar } = useSidebarStore();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`
    fixed top-0 right-0
    h-[70px]
    bg-background/95 backdrop-blur-md
    text-foreground
    border-b border-border
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
          className="p-2 rounded hover:bg-muted transition-colors"
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
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
        >
          {theme === "light" ? (
            <FiMoon size={20} className="text-muted-foreground" />
          ) : (
            <FiSun size={20} className="text-yellow-400" />
          )}
        </Button>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary text-primary-foreground">
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
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              className="text-destructive focus:text-destructive"
            >
              <FiLogOut size={16} className="mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Topbar;