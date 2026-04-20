import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from "lucide-react";
import { FiSettings, FiLock, FiAlertCircle, FiCheckCircle, FiX, FiSave } from "react-icons/fi";

import ProfileSidebar from './ProfileSideBar';
import { useChangePasswordMutation } from '@/Services/authService';
import toast from 'react-hot-toast';

import ProfileTab from '@/dashboard/common/ProfileTab';
import PaymentTab from './PaymentHistory';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useSelector((state) => state.auth);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user}/>;
      case "payments":
        return <PaymentTab/>;
      case "security":
        return <SecurityTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="">
      <div className="max-w-7xl mx-auto py-6 sm:py-10">

        {/* Premium Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
              <FiSettings className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Account Settings</h1>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Manage your profile, security, and account preferences.
              </p>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 sm:gap-8">

          {/* Sidebar */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-4 sm:p-6 h-fit lg:sticky lg:top-8">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content Card */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};







const SecurityTab = () => {
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Minimum 8 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values, { resetForm, setSubmitting, setErrors }) => {
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }).unwrap();
        
        toast.success("Password changed successfully");

        resetForm();
        setShow(false);
      } catch (err) {
        setErrors({
          currentPassword: err?.data?.message || "Something went wrong",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputClass =
    "w-full border border-slate-300 rounded-xl px-4 sm:px-5 py-3 sm:py-3 text-sm bg-slate-50 placeholder-slate-500 transition focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 hover:border-slate-400";

  const errorClass = "text-rose-600 text-sm mt-2 flex items-center gap-1.5 font-medium";

  return (
    <div className="max-w-md space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
            <FiLock className="h-5 w-5 text-red-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Security Settings
          </h2>
        </div>
        <p className="text-slate-600 text-sm">
          Keep your account secure by updating your password regularly
        </p>
      </div>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3.5 sm:py-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition duration-200"
        >
          <FiLock className="h-5 w-5" />
          Change Password
        </button>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-5 sm:space-y-6 shadow-lg"
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your current password"
                {...formik.getFieldProps('currentPassword')}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-500 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <p className={errorClass}>
                  <FiAlertCircle className="h-4 w-4" />
                  {formik.errors.currentPassword}
                </p>
              )}
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              New Password
            </label>
            <input
              type="password"
              placeholder="Create a new password (8+ characters)"
              {...formik.getFieldProps('newPassword')}
              className={inputClass}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className={errorClass}>
                <FiAlertCircle className="h-4 w-4" />
                {formik.errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your new password"
              {...formik.getFieldProps('confirmPassword')}
              className={inputClass}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className={errorClass}>
                  <FiAlertCircle className="h-4 w-4" />
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 text-white py-3 sm:py-3.5 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg"
            >
              <FiSave className="h-4.5 w-4.5" />
              {isLoading ? "Updating..." : "Update Password"}
            </button>

            <button
              type="button"
              onClick={() => setShow(false)}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-100 py-3 sm:py-3.5 rounded-xl text-sm font-semibold text-slate-700 transition"
            >
              <FiX className="h-4.5 w-4.5" />
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SettingsPage;