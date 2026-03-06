import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Eye, EyeOff, Lock, Download, User, Mail, AlertTriangle, Trash2 } from "lucide-react";

import ProfileSidebar from './ProfileSideBar';
import { useChangePasswordMutation } from '../../../Services/authService';
import { Settings } from "lucide-react";
import toast from 'react-hot-toast';

import ProfileTab from '../common/ProfileTab';
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
      <div className="tw-max-w-7xl tw-mx-auto   tw-py-6 sm:tw-py-10">

        {/* Header */}
        <div className="tw-mb-6 sm:tw-mb-10">
          <div className="tw-flex tw-items-center tw-gap-2 sm:tw-gap-3">
            <div className="tw-bg-blue-100 tw-text-blue-600 tw-p-1.5 sm:tw-p-2 tw-rounded-lg">
              <Settings size={18} className="sm:tw-size-5" />
            </div>
            <div className="tw-text-2xl sm:tw-text-3xl tw-text-black tw-font-semibold">Account Settings</div>
          </div>
          <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500 tw-mt-1 sm:tw-mt-2">
            Manage your profile, security, and account preferences.
          </p>
        </div>

        {/* Main Layout */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[280px_1fr] tw-gap-4 sm:tw-gap-8">

          {/* Sidebar */}
          <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-p-3 sm:tw-p-4 tw-h-fit lg:tw-sticky lg:tw-top-8">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content Card */}
          <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-p-4 sm:tw-p-6 md:tw-p-8 tw-transition-all tw-duration-300">
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
    "tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-3 sm:tw-px-4 tw-py-2 sm:tw-py-2.5 tw-text-xs sm:tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-transition tw-duration-200";

  const errorClass = "tw-text-red-500 tw-text-xs tw-mt-1";

  return (
    <div className="tw-max-w-md tw-space-y-4 sm:tw-space-y-6">
      <div>
        <h2 className="tw-text-base sm:tw-text-lg tw-font-semibold tw-flex tw-items-center tw-gap-2">
          <Lock size={16} className="sm:tw-size-[18px]" /> Security
        </h2>
        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500">
          Update your account password
        </p>
      </div>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-4 sm:tw-px-6 tw-py-2 sm:tw-py-2.5 tw-rounded-lg tw-text-xs sm:tw-text-sm tw-shadow-sm hover:tw-shadow-md tw-transition tw-duration-200"
        >
          Change Password
        </button>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="tw-bg-gray-50 tw-border tw-rounded-lg sm:tw-rounded-xl tw-p-4 sm:tw-p-6 tw-space-y-4 sm:tw-space-y-5 tw-shadow-sm"
        >
          {/* Current Password */}
          <div className="tw-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Current Password"
              {...formik.getFieldProps('currentPassword')}
              className={inputClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="tw-absolute tw-right-3 tw-top-2 sm:tw-top-2.5 tw-text-gray-500 hover:tw-text-black"
            >
              {showPassword ? <EyeOff size={14} className="sm:tw-size-[18px]" /> : <Eye size={14} className="sm:tw-size-[18px]" />}
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
          <div className="tw-flex tw-gap-2 sm:tw-gap-3 tw-pt-1 sm:tw-pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="tw-flex-1 tw-bg-blue-600 hover:tw-bg-blue-700 disabled:tw-opacity-60 tw-text-white tw-py-2 sm:tw-py-2.5 tw-rounded-lg tw-text-xs sm:tw-text-sm tw-transition"
            >
              {isLoading ? "Changing..." : "Update Password"}
            </button>

            <button
              type="button"
              onClick={() => setShow(false)}
              className="tw-flex-1 tw-border tw-border-gray-300 hover:tw-bg-gray-100 tw-py-2 sm:tw-py-2.5 tw-rounded-lg tw-text-xs sm:tw-text-sm tw-transition"
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