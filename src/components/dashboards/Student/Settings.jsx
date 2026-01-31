import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { Download, Eye } from 'lucide-react';
import ProfileSidebar from './ProfileSideBar';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useSelector(state => state.auth);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={user} />;
      case 'account':
        return <AccountTab />;
      case 'security':
        return <SecurityTab />;
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-8">
      {/* Header */}
      <div className="tw-mb-8">
        <h1 className="tw-text-2xl tw-font-bold">Settings</h1>
        <p className="tw-text-sm tw-text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Layout */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-[260px_1fr] tw-gap-6">
        <ProfileSidebar
          user={user}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="tw-bg-white tw-border tw-rounded-xl tw-p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

const ProfileTab = ({ user }) => {
  const formik = useFormik({
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
        alert('Profile updated successfully!');
        setSubmitting(false);
      }, 1000);
    },
  });

  const input =
    'tw-w-full tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-outline-none';

  return (
    <>
      <h2 className="tw-text-lg tw-font-semibold">Profile Information</h2>
      <p className="tw-text-sm tw-text-gray-500 tw-mb-6">
        Update your personal information
      </p>

      <form onSubmit={formik.handleSubmit} className="tw-space-y-5">
        <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-gap-4">
          <div>
            <label className="tw-text-sm tw-font-medium">Full Name</label>
            <input {...formik.getFieldProps('name')} className={input} />
          </div>

          <div>
            <label className="tw-text-sm tw-font-medium">Email</label>
            <input {...formik.getFieldProps('email')} className={input} />
          </div>
        </div>

        <div className="tw-flex tw-gap-3">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-5 tw-py-2 tw-rounded-lg"
          >
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>

          <button
            type="button"
            className="tw-border tw-px-5 tw-py-2 tw-rounded-lg hover:tw-bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};


const AccountTab = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      alert('Account deletion request submitted');
      setIsDeleting(false);
    }, 1500);
  };

  return (
    <>
      <h2 className="tw-text-lg tw-font-semibold">Account Settings</h2>
      <p className="tw-text-sm tw-text-gray-500 tw-mb-6">
        Manage your account preferences
      </p>

      {/* Data */}
      <div className="tw-space-y-4">
        <div className="tw-border tw-rounded-lg tw-p-4">
          <h3 className="tw-font-medium">Data & Privacy</h3>
          <div className="tw-flex tw-gap-3 tw-mt-3">
            <button className="tw-flex tw-items-center tw-gap-2 tw-border tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-gray-100">
              <Download size={16} /> Download Data
            </button>
            <button className="tw-flex tw-items-center tw-gap-2 tw-border tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-gray-100">
              <Eye size={16} /> Privacy Policy
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="tw-border tw-border-red-200 tw-rounded-lg tw-p-4">
          <h3 className="tw-font-medium tw-text-black-600">Danger Zone</h3>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="tw-mt-4 tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-px-5 tw-py-2 tw-rounded-lg"
          >
            {isDeleting ? 'Processing...' : 'Delete Account'}
          </button>
        </div>
      </div>
    </>
  );
};


const SecurityTab = () => {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required(),
      newPassword: Yup.string().min(8).required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword')], 'Passwords must match')
        .required(),
    }),
    onSubmit: (values, { resetForm }) => {
      setTimeout(() => {
        alert('Password changed');
        resetForm();
        setShow(false);
      }, 1000);
    },
  });

  const input =
    'tw-w-full tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm';

  return (
    <>
      <h2 className="tw-text-lg tw-font-semibold">Security</h2>
      <p className="tw-text-sm tw-text-gray-500 tw-mb-6">
        Manage your password
      </p>

      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-5 tw-py-2 tw-rounded-lg"
        >
          Change Password
        </button>
      ) : (
        <form onSubmit={formik.handleSubmit} className="tw-space-y-4">
          <input
            placeholder="Current Password"
            type="password"
            {...formik.getFieldProps('currentPassword')}
            className={input}
          />
          <input
            placeholder="New Password"
            type="password"
            {...formik.getFieldProps('newPassword')}
            className={input}
          />
          <input
            placeholder="Confirm Password"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            className={input}
          />

          <div className="tw-flex tw-gap-3">
            <button
              type="submit"
              className="tw-bg-blue-600 tw-text-white tw-px-5 tw-py-2 tw-rounded-lg"
            >
              Change Password
            </button>
            <button
              type="button"
              onClick={() => setShow(false)}
              className="tw-border tw-px-5 tw-py-2 tw-rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default SettingsPage;
