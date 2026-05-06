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

    try {
      await resetPassword({ email, rspd, newPassword }).unwrap();
      toast.success("Password changed successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      toast.error(err?.data?.message || "Failed to change password");
    }
  };

  return (
    <section className="pt-40 pb-32 bg-light dark:bg-darkmode">

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="flex justify-center items-center text-center">

          {/* CARD */}
          <div className="max-w-lg w-full bg-white dark:bg-semidark px-8 py-14 sm:px-12 md:px-16 rounded-lg shadow-property">

            {/* LOGO */}
            <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
              <img src="/img/leviticalogo.png" className="mx-auto" />
            </div>

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-midnight_text dark:text-white">
                Change Password
              </h2>
              <p className="text-gray mt-2">
                Enter your new password below
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 text-left">

              {/* NEW PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2 text-midnight_text dark:text-white">
                  New Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    className="w-full pl-12 pr-12 py-3 rounded-md border border-border dark:border-dark_border bg-transparent text-midnight_text dark:text-white outline-none focus:border-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray hover:text-primary"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="block text-sm font-medium mb-2 text-midnight_text dark:text-white">
                  Confirm Password
                </label>

                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" />

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-12 pr-4 py-3 rounded-md border border-border dark:border-dark_border bg-transparent text-midnight_text dark:text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
              >
                {isLoading ? "Changing..." : "Change Password"}
              </button>

              {/* LINK */}
              <p className="text-center text-sm text-gray">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:underline">
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