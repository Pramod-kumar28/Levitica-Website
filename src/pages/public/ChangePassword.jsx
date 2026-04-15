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
    <div className="main">
      <section className="hero-section full-screen gray-light-bg">
        <div className="w-full min-h-screen grid lg:grid-cols-2">

          {/* LEFT IMAGE */}
          <div
            className="hidden lg:block relative bg-cover bg-center"
            style={{ backgroundImage: "url('/img/slider-img-1.jpg')" }}
          >
            <div className="absolute inset-0 gradient-overlay" />
          </div>

          {/* RIGHT FORM */}
          <div className="flex items-center justify-center px-6 md:px-12">
            <div className="w-full max-w-md">

              <h1 className="text-3xl font-bold text-center mb-2">
                Change Password
              </h1>

              <p className="text-center text-slate-500 mb-8">
                Enter your new password below
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* NEW PASSWORD (with toggle) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    New Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 border rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* CONFIRM PASSWORD (no toggle) */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Confirm Password
                  </label>

                  <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-lg
                                 focus:outline-none focus:tw:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700
                             text-white font-semibold py-3 rounded-lg
                             transition disabled:opacity-60"
                >
                  {isLoading ? "Changing..." : "Change Password"}
                </button>

                <p className="text-center text-sm text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                  >
                    Log in
                  </Link>
                </p>

              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ChangePassword;