import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ProfileSidebar from './ProfileSideBar';

import { useSelector } from 'react-redux';
import { Download, Eye } from 'lucide-react';


const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(false);

  // Sample user data
 ;const {user}=useSelector(state=>state.auth)
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab user={user} />;
      case 'account':
        return <AccountTab user={user} />;
     
      case 'security':
        return <SecurityTab user={user} />;
     
      default:
        return <ProfileTab user={user} />;
    }
  };

  return (
<div >

    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-content">
        <ProfileSidebar 
          user={user} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <div className="settings-main">
          {renderTabContent()}
        </div>
      </div>

     
    </div>
</div>
  );
};



const ProfileTab = ({ user }) => {
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
    
    
      timezone: user?.timezone
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      bio: Yup.string().max(500, 'Bio must be 500 characters or less'),
      expertise: Yup.string(),
      timezone: Yup.string().required('Timezone is required')
    }),
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        alert('Profile updated successfully!');
        setSubmitting(false);
      }, 1000);
    },
  });



  return (
    <div className="tab-content">
      <h2>Profile Information</h2>
      <p className="tab-description">Update your personal information and bio</p>
      
      <form onSubmit={formik.handleSubmit} className="settings-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.name}
              className={formik.touched.name && formik.errors.name ? 'error' : ''}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error-message">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values?.email}
              className={formik.touched.email && formik.errors.email ? 'error' : ''}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn-outline">
            Cancel
          </button>
        </div>
      </form>

      
    </div>
  );
};

// Account Tab Component
const AccountTab = ({ user }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAccountDeletion = () => {
    setIsDeleting(true);
    setTimeout(() => {
      alert('Account deletion request submitted. We will contact you within 24 hours.');
      setIsDeleting(false);
    }, 1500);
  };

  return (
    <div className="tab-content">
      <h2>Account Settings</h2>
      <p className="tab-description">Manage your account preferences</p>

      <div className="account-sections">
        <div className="account-section">
          <h3>Account Type</h3>
          <div className="account-type">
            <div className="type-badge student">Student Account</div>
            <p>You have access to all course materials and live sessions.</p>
          </div>
        </div>

        <div className="account-section">
          <h3>Data & Privacy</h3>
          <div className="privacy-options">
            <button className="privacy-btn">
              <Download />
              Download Your Data
            </button>
            <button className="privacy-btn">
              <Eye />
              View Privacy Policy
            </button>
          </div>
        </div>

        <div className="account-section danger-zone">
          <h3>Danger Zone</h3>
          <div className="danger-actions">
            <div className="danger-action">
              <h4>Deactivate Account</h4>
              <p>Temporarily disable your account. You can reactivate it later.</p>
              <button className="btn-warning btn">Deactivate Account</button>
            </div>
            
            <div className="danger-action">
              <h4>Delete Account</h4>
              <p>Permanently delete your account and all associated data. This action cannot be undone.</p>
              <button 
                className="btn-danger btn"
                onClick={handleAccountDeletion}
                disabled={isDeleting}
              >
                {isDeleting ? 'Processing...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};


// Security Tab Component
const SecurityTab = ({ user }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('New password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Please confirm your password')
    }),
    onSubmit: (values, { setSubmitting, resetForm }) => {
      setTimeout(() => {
        console.log(values)
        alert('Password changed successfully!');
        setSubmitting(false);
        resetForm();
        setShowChangePassword(false);
      }, 1000);
    },
  });

  return (
    <div className="tab-content">
      <h2>Security Settings</h2>
      <p className="tab-description">Manage your account security and password</p>

        <div className="security-section">
          <h3>Password</h3>
          {!showChangePassword ? (
            <div className="security-option">
              <div className="option-info">
              
                <p>It's recommended to change your password regularly</p>
              </div>
              <button 
                className="btn-primary"
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </button>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="password-form">
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.currentPassword}
                  className={formik.touched.currentPassword && formik.errors.currentPassword ? 'error' : ''}
                />
                {formik.touched.currentPassword && formik.errors.currentPassword ? (
                  <div className="error-message">{formik.errors.currentPassword}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newPassword}
                  className={formik.touched.newPassword && formik.errors.newPassword ? 'error' : ''}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="error-message">{formik.errors.newPassword}</div>
                ) : null}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="error-message">{formik.errors.confirmPassword}</div>
                ) : null}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary" disabled={formik.isSubmitting}>
                  {formik.isSubmitting ? 'Changing...' : 'Change Password'}
                </button>
                <button 
                  type="button" 
                  className="btn-outline"
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

   
  );
};





export default SettingsPage;