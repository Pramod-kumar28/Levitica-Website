import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from '@/Services/authService';
import ErrorPage from "./ErrorPage";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const rspd = searchParams.get("rspd");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  if (!rspd || !email) {
    return <ErrorPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await resetPassword({ email, rspd, newPassword }).unwrap();
      toast.success("Password changed successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <section className="pt-40 pb-32 bg-light dark:bg-darkmode min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">

          {/* CARD */}
          <div className="max-w-lg w-full bg-white dark:bg-semidark px-8 py-14 sm:px-12 md:px-16 rounded-lg shadow-property transition-all duration-150">

            {/* LOGO */}
            <div className="mb-10 text-center">
              <div className="inline-block max-w-[160px]">
                <img src="/img/leviticalogo.png" alt="Logo" className="w-full h-auto" />
              </div>
            </div>

            {/* TITLE */}
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-midnight_text dark:text-light mb-2">
                Change Password
              </h2>
              <p className="text-gray dark:text-darkgray">
                Enter your new password below
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-left text-sm font-medium mb-2 text-midnight_text dark:text-light">
                  New Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray text-lg" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full pl-10 pr-12 py-2.5 rounded-lg border border-border dark:border-dark_border bg-transparent text-midnight_text dark:text-light placeholder:text-gray dark:placeholder:text-darkgray outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray hover:text-primary dark:hover:text-primary transition-colors duration-150"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-left text-sm font-medium mb-2 text-midnight_text dark:text-light">
                  Confirm Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray text-lg" />

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border dark:border-dark_border bg-transparent text-midnight_text dark:text-light placeholder:text-gray dark:placeholder:text-darkgray outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-150"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-secondary text-light font-semibold py-2.5 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {isLoading ? "Changing Password..." : "Change Password"}
              </button>

              {/* LINK */}
              <p className="text-center text-sm text-gray dark:text-darkgray">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:text-cyan transition-colors duration-150 font-medium">
                  Log in
                </Link>
              </p>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ChangePassword;