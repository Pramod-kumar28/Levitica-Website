import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/authSlice";
import CartIcon from "../Student/Cart/CartIcon";
import { FiMenu, FiChevronDown, FiLogOut } from "react-icons/fi";
import { useSidebarStore } from "../Sidebar/useSidebarStore";

const Topbar = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { toggleSidebar } = useSidebarStore();

  return (
    <header className="tw-h-20 tw-bg-white tw-fixed tw-w-full tw-border-b tw-shadow-lg tw-flex tw-items-center tw-justify-between tw-px-4 tw-z-50">
      {/* LEFT */}
      <div className="tw-flex tw-items-center tw-gap-3">
        <button
          onClick={toggleSidebar}
          className="tw-p-2 tw-rounded hover:tw-bg-gray-100"
        >
          <FiMenu size={22} />
        </button>

        <img
          src="/img/dcmlogotransperent.png"
          alt="DCM"
          className="tw-h-32 md:tw-h-32"
        />
      </div>

      {/* RIGHT */}
      <div className="tw-flex tw-items-center tw-gap-4">
        {user?.role === "student" && <CartIcon />}


        <button
          onClick={() => setOpen(!open)}
          className="tw-flex tw-items-center tw-gap-2"
        >
          <div className="tw-w-8 tw-h-8 tw-rounded-full tw-overflow-hidden tw-flex tw-items-center tw-justify-center tw-bg-blue-600 tw-text-white">
            {user?.image ? (
              <img
                src={user.image}
                alt={user?.name || "User"}
                className="tw-w-full tw-h-full tw-object-cover"
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
          <div className="tw-absolute tw-top-16 tw-right-4 tw-bg-white tw-border tw-rounded-lg tw-shadow-md">
            <button
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
              className="tw-flex tw-items-center tw-gap-2 tw-px-4 tw-py-2 tw-text-red-600 hover:tw-bg-red-50"
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