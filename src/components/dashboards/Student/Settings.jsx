import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Eye, EyeOff, Lock, Download, User, Mail, AlertTriangle, Trash2 } from "lucide-react";

import ProfileSidebar from './ProfileSideBar';
import { useChangePasswordMutation } from '../../../Services/authService';


import { Settings } from "lucide-react";
import toast from 'react-hot-toast';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useSelector((state) => state.auth);

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab user={user} />;
      case "account":
        return <AccountTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="tw-min-h-screen tw-bg-gray-50">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-6 tw-py-10">

        {/* Header */}
        <div className="tw-mb-10">
          <div className="tw-flex tw-items-center tw-gap-3">
            <div className="tw-bg-blue-100 tw-text-blue-600 tw-p-2 tw-rounded-lg">
              <Settings size={20} />
            </div>
            <h1 className="tw-text-3xl tw-font-semibold">Account Settings</h1>
          </div>
          <p className="tw-text-gray-500 tw-mt-2 tw-text-sm">
            Manage your profile, security, and account preferences.
          </p>
        </div>

        {/* Main Layout */}
        <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-[280px_1fr] tw-gap-8">

          {/* Sidebar */}
          <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-p-4 tw-h-fit lg:tw-sticky lg:tw-top-8">
            <ProfileSidebar
              user={user}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          </div>

          {/* Content Card */}
          <div className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm tw-p-8 tw-transition-all tw-duration-300">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};



const ProfileTab = ({ user }) => {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      timezone: user?.timezone || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email().required('Email is required'),
      timezone: Yup.string().required('Timezone is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
      }, 1000);
    },
  });

  const inputClass =
    "tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2.5 tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-transition tw-duration-200";

  const errorClass = "tw-text-red-500 tw-text-xs tw-mt-1";

  return (
    <div className="tw-max-w-2xl tw-space-y-8">
      {/* Header */}
      <div>
        <h2 className="tw-text-xl tw-font-semibold tw-flex tw-items-center tw-gap-2">
          <User size={18} /> Profile Information
        </h2>
        <p className="tw-text-sm tw-text-gray-500">
          Update your personal details and account information
        </p>
      </div>

      {/* Card */}
      <form
        onSubmit={formik.handleSubmit}
        className="tw-bg-gray-50 tw-border tw-rounded-2xl tw-p-8 tw-shadow-sm tw-space-y-6"
      >
        {/* Avatar Section */}
        <div className="tw-flex tw-items-center tw-gap-6">
          <div className="tw-w-20 tw-h-20 tw-rounded-full tw-bg-blue-100 tw-flex tw-items-center tw-justify-center tw-text-blue-600 tw-text-2xl tw-font-semibold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="tw-text-sm tw-font-medium">{user?.name}</p>
            <p className="tw-text-xs tw-text-gray-500">{user?.email}</p>
          </div>
        </div>

        {/* Fields */}
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-6">
          {/* Name */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-block tw-mb-1">
              Full Name
            </label>
            <input
              {...formik.getFieldProps('name')}
              className={inputClass}
              placeholder="Enter your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className={errorClass}>{formik.errors.name}</p>
            )}
          </div>

          {/* Email (Disabled) */}
          <div>
            <label className="tw-text-sm tw-font-medium tw-block tw-mb-1">
              Email Address
            </label>
            <div className="tw-relative">
              <input
                {...formik.getFieldProps('email')}
                disabled
                className={`${inputClass} tw-bg-gray-100 tw-text-gray-500 tw-cursor-not-allowed`}
              />
              <Mail
                size={16}
                className="tw-absolute tw-right-3 tw-top-3 tw-text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div>
          <label className="tw-text-sm tw-font-medium tw-block tw-mb-1">
            Timezone
          </label>
          <input
            {...formik.getFieldProps('timezone')}
            className={inputClass}
            placeholder="e.g. Asia/Kolkata"
          />
          {formik.touched.timezone && formik.errors.timezone && (
            <p className={errorClass}>{formik.errors.timezone}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="tw-flex tw-justify-end tw-gap-4 tw-pt-4">
          <button
            type="button"
            className="tw-border tw-border-gray-300 tw-px-6 tw-py-2.5 tw-rounded-lg hover:tw-bg-gray-100 tw-transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="tw-bg-blue-600 hover:tw-bg-blue-700 disabled:tw-opacity-60 tw-text-white tw-px-6 tw-py-2.5 tw-rounded-lg tw-shadow-sm hover:tw-shadow-md tw-transition"
          >
            {formik.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};





const AccountTab = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
    }, 1500);
  };

  return (
    <div className="tw-max-w-2xl tw-space-y-8">

      {/* Header */}
      <div>
        <h2 className="tw-text-xl tw-font-semibold">Account Settings</h2>
        <p className="tw-text-sm tw-text-gray-500">
          Manage your data, privacy, and account controls.
        </p>
      </div>

      {/* Data & Privacy Card */}
      <div className="tw-bg-gray-50 tw-border tw-rounded-2xl tw-p-6 tw-shadow-sm tw-space-y-5">
        <div className="tw-flex tw-items-center tw-gap-2">
          <Eye size={18} className="tw-text-blue-600" />
          <h3 className="tw-font-semibold">Data & Privacy</h3>
        </div>

        <p className="tw-text-sm tw-text-gray-500">
          Download your personal data or review our privacy policy.
        </p>

        <div className="tw-flex tw-flex-wrap tw-gap-4">
          <button className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-gray-300 tw-bg-white tw-px-5 tw-py-2.5 tw-rounded-xl hover:tw-bg-gray-100 tw-transition">
            <Download size={16} />
            Download Data
          </button>

          <button className="tw-flex tw-items-center tw-gap-2 tw-border tw-border-gray-300 tw-bg-white tw-px-5 tw-py-2.5 tw-rounded-xl hover:tw-bg-gray-100 tw-transition">
            <Eye size={16} />
            Privacy Policy
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-2xl tw-p-6 tw-shadow-sm tw-space-y-4">
        <div className="tw-flex tw-items-center tw-gap-2">
          <AlertTriangle size={18} className="tw-text-red-600" />
          <h3 className="tw-font-semibold tw-text-red-600">
            Danger Zone
          </h3>
        </div>

        <p className="tw-text-sm tw-text-red-500">
          Deleting your account is permanent and cannot be undone.
          All your data will be permanently removed.
        </p>

        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="tw-inline-flex tw-items-center tw-gap-2 tw-bg-red-600 hover:tw-bg-red-700 disabled:tw-opacity-60 tw-text-white tw-px-6 tw-py-2.5 tw-rounded-xl tw-shadow-sm hover:tw-shadow-md tw-transition"
        >
          <Trash2 size={16} />
          {isDeleting ? "Processing..." : "Delete Account"}
        </button>
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
    "tw-w-full tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-blue-500 tw-transition tw-duration-200";

  const errorClass = "tw-text-red-500 tw-text-xs tw-mt-1";

  return (
    <div className="tw-max-w-md tw-space-y-6">
      <div>
        <h2 className="tw-text-lg tw-font-semibold tw-flex tw-items-center tw-gap-2">
          <Lock size={18} /> Security
        </h2>
        <p className="tw-text-sm tw-text-gray-500">
          Update your account password
        </p>
      </div>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-6 tw-py-2.5 tw-rounded-lg tw-shadow-sm hover:tw-shadow-md tw-transition tw-duration-200"
        >
          Change Password
        </button>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="tw-bg-gray-50 tw-border tw-rounded-xl tw-p-6 tw-space-y-5 tw-shadow-sm"
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
              className="tw-absolute tw-right-3 tw-top-2.5 tw-text-gray-500 hover:tw-text-black"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
          <div className="tw-flex tw-gap-3 tw-pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="tw-flex-1 tw-bg-blue-600 hover:tw-bg-blue-700 disabled:tw-opacity-60 tw-text-white tw-py-2.5 tw-rounded-lg tw-transition"
            >
              {isLoading ? "Changing..." : "Update Password"}
            </button>

            <button
              type="button"
              onClick={() => setShow(false)}
              className="tw-flex-1 tw-border tw-border-gray-300 hover:tw-bg-gray-100 tw-py-2.5 tw-rounded-lg tw-transition"
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
