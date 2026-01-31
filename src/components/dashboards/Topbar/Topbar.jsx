import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../Dashboard';
import CartIcon from '../Student/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/authSlice';

import {
  Menu,
  X,
  Sun,
  Moon,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Info,
  CheckCheck
} from 'lucide-react';

const Topbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const { user } = useSelector(state => state.auth);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Course Available',
      message: 'Web Development Bootcamp 2024 is now available',
      time: '2 min ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Live Session Starting',
      message: 'React Advanced Patterns starts in 15 minutes',
      time: '10 min ago',
      read: false
    },
    {
      id: 3,
      type: 'success',
      title: 'Assignment Graded',
      message: 'JavaScript Fundamentals assignment graded',
      time: '1 hour ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () =>
    setNotifications(n => n.map(x => ({ ...x, read: true })));

  const markAsRead = id =>
    setNotifications(n =>
      n.map(x => (x.id === id ? { ...x, read: true } : x))
    );

  const deleteNotification = id =>
    setNotifications(n => n.filter(x => x.id !== id));

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const getIcon = type => {
    const base = 'tw-text-gray-500';
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="tw-text-green-500" />;
      case 'warning':
        return <Clock size={16} className="tw-text-yellow-500" />;
      case 'alert':
        return <AlertCircle size={16} className="tw-text-red-500" />;
      default:
        return <Info size={16} className={base} />;
    }
  };

  return (
    <>
      <header className="tw-h-16 tw-bg-white tw-border-b tw-flex tw-items-center tw-justify-between tw-px-4">
        {/* LEFT */}
        <div className="tw-flex tw-items-center tw-gap-4">
          <button
            onClick={toggleSidebar}
            className="tw-p-2 tw-rounded hover:tw-bg-gray-100"
          >
            {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <NavLink to="/dashboard">
            <img
              src="/img/dcmlogotransperent.png"
              alt="Logo"
              className="tw-h-32"
            />
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className="tw-flex tw-items-center tw-gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="tw-p-2 tw-rounded hover:tw-bg-gray-100"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Cart */}
          {user?.role === 'student' && <CartIcon />}

          {/* Notifications */}
          <div className="tw-relative">
            <button
              onClick={() => {
                setShowNotifications(v => !v);
                setShowUserMenu(false);
              }}
              className="tw-relative tw-p-2 tw-rounded hover:tw-bg-gray-100"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="tw-absolute -tw-top-1 -tw-right-1 tw-bg-red-500 tw-text-white tw-text-xs tw-rounded-full tw-w-5 tw-h-5 tw-flex tw-items-center tw-justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-80 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-50">
                <div className="tw-flex tw-items-center tw-justify-between tw-p-3 tw-border-b">
                  <h4 className="tw-font-semibold">Notifications</h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="tw-text-sm tw-text-blue-600 hover:tw-underline tw-flex tw-items-center tw-gap-1"
                    >
                      <CheckCheck size={14} />
                      Mark all
                    </button>
                  )}
                </div>

                <div className="tw-max-h-80 tw-overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="tw-p-6 tw-text-center tw-text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`tw-flex tw-gap-3 tw-p-3 tw-border-b ${
                          !n.read ? 'tw-bg-blue-50' : ''
                        }`}
                      >
                        {getIcon(n.type)}
                        <div className="tw-flex-1">
                          <p className="tw-font-medium">{n.title}</p>
                          <p className="tw-text-sm tw-text-gray-600">
                            {n.message}
                          </p>
                          <p className="tw-text-xs tw-text-gray-400">
                            {n.time}
                          </p>
                        </div>
                        <div className="tw-flex tw-flex-col tw-gap-1">
                          {!n.read && (
                            <button onClick={() => markAsRead(n.id)}>
                              <CheckCircle size={14} />
                            </button>
                          )}
                          <button onClick={() => deleteNotification(n.id)}>
                            <X size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <button
                  onClick={() => navigate('/notifications')}
                  className="tw-w-full tw-text-center tw-p-2 tw-text-sm tw-text-blue-600 hover:tw-bg-gray-50"
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="tw-relative">
            <button
              onClick={() => {
                setShowUserMenu(v => !v);
                setShowNotifications(false);
              }}
              className="tw-flex tw-items-center tw-gap-2 tw-p-2 tw-rounded hover:tw-bg-gray-100"
            >
              <div className="tw-w-8 tw-h-8 tw-rounded-full tw-bg-blue-600 tw-text-white tw-flex tw-items-center tw-justify-center">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="tw-text-sm tw-font-medium">
                {user?.name}
              </span>
              <ChevronDown size={14} />
            </button>

            {showUserMenu && (
              <div className="tw-absolute tw-right-0 tw-mt-2 tw-w-56 tw-bg-white tw-border tw-rounded-lg tw-shadow-lg tw-z-50">
                <div className="tw-p-3 tw-border-b">
                  <p className="tw-font-semibold">{user?.name}</p>
                  <p className="tw-text-xs tw-text-gray-500">
                    {user?.email}
                  </p>
                </div>

                <div className="tw-flex tw-flex-col">
                  <button className="tw-menu-btn" onClick={() => navigate('settings')}>
                    <Settings size={16} /> Settings
                  </button>
                  <button className="tw-menu-btn" onClick={() => navigate('/help')}>
                    <HelpCircle size={16} /> Help
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="tw-flex tw-items-center tw-gap-2 tw-p-3 tw-text-red-600 hover:tw-bg-red-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {(showUserMenu || showNotifications) && (
        <div
          className="tw-fixed tw-inset-0 tw-z-40"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}
    </>
  );
};

export default Topbar;
