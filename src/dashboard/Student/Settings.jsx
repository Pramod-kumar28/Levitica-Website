import React, { useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Eye, EyeOff } from "lucide-react";
import { FiSettings, FiLock, FiAlertCircle, FiCheckCircle, FiX, FiSave } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';

import ProfileSidebar from './ProfileSideBar';
import { useChangePasswordMutation } from '@/Services/authService';
import toast from 'react-hot-toast';

import ProfileTab from '@/dashboard/common/ProfileTab';
import PaymentTab from './PaymentHistory';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
    <div className={`min-h-screen py-6 px-4`}>
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">

        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`px-2`}
        >
          <div className="flex items-center gap-4">
            <div>
              <h1 className={`text-3xl sm:text-4xl font-bold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                Account Settings
              </h1>
              <p className={`text-sm sm:text-base flex items-center gap-2 text-gray`}>
                <FiSettings className="w-4 h-4 text-primary" />
                Manage your profile, security, and account preferences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 sm:gap-8">

          {/* Sidebar */}
          <div className={`${isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'} border rounded-2xl shadow-property p-4 sm:p-6 h-fit lg:sticky lg:top-8`}>
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isDark={isDark}
            />
          </div>

          {/* Content Card */}
          <div className={`${isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'} border rounded-2xl shadow-property p-6 sm:p-8`}>
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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

  const inputClass = isDark
    ? "w-full border border-dark_border rounded-xl px-4 sm:px-5 py-3 sm:py-3 text-sm bg-darklight placeholder-gray text-white transition focus:bg-darklight/80 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 hover:border-primary/50"
    : "w-full border border-border rounded-xl px-4 sm:px-5 py-3 sm:py-3 text-sm bg-light placeholder-gray transition focus:bg-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/50";

  const errorClass = isDark
    ? "text-rose-400 text-sm mt-2 flex items-center gap-1.5 font-medium"
    : "text-rose-600 text-sm mt-2 flex items-center gap-1.5 font-medium";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary/20' : 'bg-primary/10'}`}>
            <FiLock className={`h-5 w-5 text-primary`} />
          </div>
          <h2 className={`text-xl sm:text-2xl font-bold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
            Security Settings
          </h2>
        </div>
        <p className={`text-sm text-gray`}>
          Keep your account secure by updating your password regularly
        </p>
      </div>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary text-white px-6 py-3.5 sm:py-4 rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition duration-200"
        >
          <FiLock className="h-5 w-5" />
          Change Password
        </button>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className={` p-6 sm:p-8 space-y-5 sm:space-y-6`}
        >
          {/* Current Password */}
          <div className="space-y-2">
            <label className={`text-sm font-semibold ${isDark ? 'text-gray' : 'text-midnight_text'}`}>
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
                className={`absolute right-4 top-3.5 transition text-gray hover:text-primary`}
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
            <label className={`text-sm font-semibold ${isDark ? 'text-gray' : 'text-midnight_text'}`}>
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
            <label className={`text-sm font-semibold ${isDark ? 'text-gray' : 'text-midnight_text'}`}>
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

          {/* Password Requirements */}
          <div className={`p-4 rounded-xl ${isDark ? 'bg-darkmode border-dark_border' : 'bg-section border-border'} border`}>
            <p className={`text-xs font-semibold mb-2 text-primary`}>Password Requirements:</p>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-2 text-xs text-gray">
                <FiCheckCircle className="h-3 w-3 text-primary" />
                Minimum 8 characters
              </li>
              <li className="flex items-center gap-2 text-xs text-gray">
                <FiCheckCircle className="h-3 w-3 text-primary" />
                Use a mix of letters, numbers, and symbols
              </li>
              <li className="flex items-center gap-2 text-xs text-gray">
                <FiCheckCircle className="h-3 w-3 text-primary" />
                Don't use common words or patterns
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className={`flex gap-3 pt-4 border-t ${isDark ? 'border-dark_border' : 'border-border'}`}>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary disabled:opacity-60 text-white py-3 sm:py-3.5 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg"
            >
              <FiSave className="h-4.5 w-4.5" />
              {isLoading ? "Updating..." : "Update Password"}
            </button>

            <button
              type="button"
              onClick={() => setShow(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl text-sm font-semibold transition ${
                isDark
                  ? 'border-2 border-dark_border hover:border-primary hover:bg-darklight text-gray hover:text-white'
                  : 'border-2 border-border hover:border-primary hover:bg-light text-gray hover:text-midnight_text'
              }`}
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