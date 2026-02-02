import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useResetPasswordMutation } from "../Services/authService";
import ErrorPage from "./ErrorPage";
import { FaLock } from "react-icons/fa";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const rspd = searchParams.get("rspd");
  const email = searchParams.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
        <div className="tw-w-full tw-min-h-screen tw-grid lg:tw-grid-cols-2">

          {/* LEFT IMAGE */}
          <div
            className="tw-hidden lg:tw-block tw-relative tw-bg-cover tw-bg-center"
            style={{ backgroundImage: "url('/img/slider-img-1.jpg')" }}
          >
            <div className="tw-absolute tw-inset-0 gradient-overlay" />

            <div className="tw-relative tw-h-full tw-flex tw-items-center tw-px-16">
              <div className="tw-text-white tw-max-w-lg">
                <h2 className="tw-text-3xl tw-font-bold tw-mb-4">
                  Change Your Password
                </h2>
                <p className="tw-text-white/90 tw-leading-relaxed">
                  Choose a strong password to keep your account secure and protected.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="tw-flex tw-items-center tw-justify-center tw-px-6 md:tw-px-12">
            <div className="tw-w-full tw-max-w-md">

              <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-2">
                Change Password
              </h1>

              <p className="tw-text-center tw-text-slate-500 tw-mb-8">
                Enter your new password below
              </p>

              <form onSubmit={handleSubmit} className="tw-space-y-6">

                {/* NEW PASSWORD */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                    New Password
                  </label>
                  <div className="tw-relative">
                    <FaLock className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400" />
                    <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="tw-w-full tw-pl-10 tw-pr-4 tw-py-3 tw-border tw-rounded-lg
                                 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
                    />
                  </div>
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                    Confirm Password
                  </label>
                  <div className="tw-relative">
                    <FaLock className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400" />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="tw-w-full tw-pl-10 tw-pr-4 tw-py-3 tw-border tw-rounded-lg
                                 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="tw-w-full tw-bg-blue-600 hover:tw-bg-blue-700
                             tw-text-white tw-font-semibold tw-py-3 tw-rounded-lg
                             tw-transition disabled:tw-opacity-60"
                >
                  {isLoading ? "Changing..." : "Change Password"}
                </button>

                {/* LINK */}
                <p className="tw-text-center tw-text-sm tw-text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="tw-text-blue-600 hover:tw-underline"
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
