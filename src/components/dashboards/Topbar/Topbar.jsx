import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../Dashboard';
import CartIcon from '../Student/CartIcon';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../features/authSlice';

// Import Lucide React icons
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

const Topbar = ({ isSidebarOpen, toggleSidebar, currentPath }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleClick = () => {
    navigate('settings');
    setShowUserMenu(false);
  };

  // Dummy notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'info',
      title: 'New Course Available',
      message: 'Web Development Bootcamp 2024 is now available for enrollment',
      time: '2 min ago',
      read: false,
      icon: <Info size={16} />
    },
    {
      id: 2,
      type: 'warning',
      title: 'Live Session Starting',
      message: 'React Advanced Patterns starts in 15 minutes',
      time: '10 min ago',
      read: false,
      icon: <Clock size={16} />
    },
    {
      id: 3,
      type: 'success',
      title: 'Assignment Graded',
      message: 'Your JavaScript Fundamentals assignment has been graded',
      time: '1 hour ago',
      read: true,
      icon: <CheckCircle size={16} />
    },
    {
      id: 4,
      type: 'alert',
      title: 'System Maintenance',
      message: 'Scheduled maintenance this Sunday from 2-4 AM',
      time: '3 hours ago',
      read: true,
      icon: <AlertCircle size={16} />
    },
    // { 
    //   id: 5, 
    //   type: 'info',
    //   title: 'New Feature Released', 
    //   message: 'Check out the new progress tracking dashboard', 
    //   time: '1 day ago', 
    //   read: true,
    //   icon: <Info size={16} />
    // }
  ]);

  const { user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (notificationId) => {
    setNotifications(notifications.map(n =>
      n.id === notificationId ? { ...n, read: true } : n
    ));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} className="text-success" />;
      case 'warning':
        return <Clock size={16} className="text-warning" />;
      case 'alert':
        return <AlertCircle size={16} className="text-error" />;
      default:
        return <Info size={16} className="text-primary" />;
    }
  };

  return (
    <div className="dashboard-app-container">
      <div className="topbar">
        <div className="topbar-left">
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          <div className="logo-container">
            <NavLink to="/dashboard" className="text-decoration-none">
              <img
                src="/img/dcmlogotransperent.png"
                alt="App Logo"
                className="topbar-logo"
              />
            </NavLink>
          </div>
        </div>

        <div className="topbar-right">
          <div className="topbar-actions">
            <button className="theme-toggle btn" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>

            {user?.role === "student" && <CartIcon />}

            {/* Notifications Menu */}
            <div className="notifications">
              <button
                className="notification-btn btn"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
              >
                <Bell size={24} />
                {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    {unreadCount > 0 && (
                      <button
                        className="mark-all-read-btn"
                        onClick={markAllAsRead}
                      >
                        <CheckCheck size={16} />
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="empty-notifications">
                        <Bell size={32} className="text-muted" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`notification-item ${!notification.read ? 'unread' : ''}`}
                        >
                          <div className="notification-icon">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="notification-content">
                            <div className="notification-title">
                              {notification.title}
                            </div>
                            <div className="notification-message">
                              {notification.message}
                            </div>
                            <div className="notification-time">
                              {notification.time}
                            </div>
                          </div>
                          <div className="notification-actions">
                            {!notification.read && (
                              <button
                                className="mark-read-btn"
                                onClick={() => markAsRead(notification.id)}
                                title="Mark as read"
                              >
                                <CheckCircle size={14} />
                              </button>
                            )}
                            <button
                              className="delete-btn"
                              onClick={() => deleteNotification(notification.id)}
                              title="Delete notification"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="notification-footer">
                    <button
                      className="view-all-btn"
                      onClick={() => navigate('/notifications')}
                    >
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="user-menu">
              <button
                className="user-btn btn"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
              >
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt={user?.name} />
                  ) : (
                    <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                  )}
                </div>
                <span className="text-dark">{user?.name}</span>
                <ChevronDown size={16} />
              </button>

              {showUserMenu && (
                <div className="user-dropdown">
                  <div className="user-info">
                    <div className="user-avatar large">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} />
                      ) : (
                        <span>{user?.name?.charAt(0)?.toUpperCase()}</span>
                      )}
                    </div>
                    <div className="user-details">
                      <h4>{user?.name}</h4>
                      <p>{user?.email}</p>
                      <span className="user-role">{user?.role}</span>
                    </div>
                  </div>

                  <div className="dropdown-items ">
                    <button onClick={handleClick}>
                      <User size={16} />
                      <span>Profile</span>
                    </button>
                    <button onClick={handleClick}>
                      <Settings size={16} />
                      <span>Settings</span>
                    </button>
                    <button onClick={() => navigate('/help')}>
                      <HelpCircle size={16} />
                      <span>Help & Support</span>
                    </button>
                  </div>

                  <div className="dropdown-footer">
                    <button onClick={handleLogout} className="logout-btn">
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for closing dropdowns when clicking outside */}
      {(showUserMenu || showNotifications) && (
        <div
          className="dropdown-overlay"
          onClick={() => {
            setShowUserMenu(false);
            setShowNotifications(false);
          }}
        />
      )}

    
    </div>
  );
};

export default Topbar;