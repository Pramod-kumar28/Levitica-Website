import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Eye, EyeOff, Lock, Settings } from "lucide-react";

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
      <div className="max-w-7xl mx-auto   py-6 sm:py-10">

        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-blue-100 text-blue-600 p-1.5 sm:p-2 rounded-lg">
              <Settings size={18} className="sm:size-5" />
            </div>
            <div className="text-2xl sm:text-3xl text-black font-semibold">Account Settings</div>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">
            Manage your profile, security, and account preferences.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 sm:gap-8">

          {/* Sidebar */}
          <div className="bg-white border rounded-2xl shadow-sm p-3 sm:p-4 h-fit lg:sticky lg:top-8">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content Card */}
          <div className="bg-white border rounded-2xl shadow-sm p-4 sm:p-6 md:p-8 transition-all duration-300">
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
    "w-full border border-gray-300 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200";

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <div className="max-w-md space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
          <Lock size={16} className="sm:size-[18px]" /> Security
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Update your account password
        </p>
      </div>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm shadow-sm hover:shadow-md transition duration-200"
        >
          Change Password
        </button>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="bg-gray-50 border rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-4 sm:space-y-5 shadow-sm"
        >
          {/* Current Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              {...formik.getFieldProps('currentPassword')}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 sm:top-2.5 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={14} className="sm:size-[18px]" /> : <Eye size={14} className="sm:size-[18px]" />}
            </button>
            {formik.touched.currentPassword &&
              formik.errors.currentPassword && (
                <p className={errorClass}>
                  {formik.errors.currentPassword}
                </p>
              )}
          </div>

          {/* New Password */}
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...formik.getFieldProps('newPassword')}
              className={inputClass}
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <p className={errorClass}>{formik.errors.newPassword}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              {...formik.getFieldProps('confirmPassword')}
              className={inputClass}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className={errorClass}>
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 sm:gap-3 pt-1 sm:pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition"
            >
              {isLoading ? "Changing..." : "Update Password"}
            </button>

            <button
              type="button"
              onClick={() => setShow(false)}
              className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SettingsPage;