import { LogOut, Settings, ShieldAlert, User } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSidebar = ({ user, activeTab, onTabChange }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: 'user' },
    { id: 'account', label: 'Account Settings', icon: 'settings' },
    { id: 'security', label: 'Security', icon: 'shield' },
  ];

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'user':
        return <User size={18} />;
      case 'settings':
        return <Settings size={18} />;
      case 'shield':
        return <ShieldAlert size={18} />;
      default:
        return <User size={18} />;
    }
  };

  return (
    <aside className="tw-w-full md:tw-w-64 tw-bg-white tw-border tw-rounded-xl tw-flex tw-flex-col">
      {/* Header */}
      <div className="tw-p-5 tw-border-b">
        <div className="tw-flex tw-items-center tw-gap-4">
          <div className="tw-w-14 tw-h-14 tw-rounded-full tw-bg-blue-600 tw-text-white tw-flex tw-items-center tw-justify-center tw-text-xl tw-font-semibold">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="tw-w-full tw-h-full tw-object-cover tw-rounded-full"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || 'U'
            )}
          </div>

          <div>
            <h3 className="tw-font-semibold tw-text-sm">
              {user?.name || 'User Name'}
            </h3>
            <p className="tw-text-xs tw-text-gray-500">
              {user?.email || 'user@example.com'}
            </p>
            <span className="tw-inline-block tw-mt-1 tw-text-xs tw-font-medium tw-text-blue-600">
              {user?.role || 'Student'}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="tw-flex-1 tw-p-2 tw-space-y-1">
        {menuItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                tw-w-full
                tw-flex
                tw-items-center
                tw-gap-3
                tw-px-4
                tw-py-2.5
                tw-rounded-lg
                tw-text-sm
                tw-transition
                ${
                  isActive
                    ? 'tw-bg-blue-100 tw-text-blue-700'
                    : 'tw-text-gray-600 hover:tw-bg-gray-100'
                }
              `}
            >
              <span className="tw-flex-shrink-0">
                {getIconComponent(item.icon)}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="tw-p-4 tw-border-t">
        <button
          onClick={() => navigate('/logout')}
          className="
            tw-w-full
            tw-flex
            tw-items-center
            tw-justify-center
            tw-gap-2
            tw-text-sm
            tw-font-medium
            tw-text-red-600
            hover:tw-bg-red-50
            tw-py-2.5
            tw-rounded-lg
          "
        >
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
