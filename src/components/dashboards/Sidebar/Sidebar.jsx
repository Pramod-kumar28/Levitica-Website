import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useModal } from '../Admin/Modals/ModalContext';
import {
  Home,
  BookOpen,
  Video,
  MessageSquare,
  Users,
  Layers,
  UserPlus,
  FileText,
  Award
} from 'lucide-react';

const Sidebar = ({ isOpen, currentPath }) => {
  const navigate = useNavigate();
  const userRole = useSelector(state => state.auth.user?.role);
  const { modalType } = useModal();


  if (modalType) return null;

  const commonMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'home', path: '/dashboard', roles: ['student', 'admin', 'instructor'] }
  ];

  const studentMenuItems = [
    { id: 'courses', label: 'Courses', icon: 'book', path: '/dashboard/browsercourses', roles: ['student'] },
    { id: 'live-sessions', label: 'Live Sessions', icon: 'video', path: '/dashboard/live-session', roles: ['student'] },
    { id: 'certificates', label: 'My Certificates', icon: 'award', path: '/dashboard/my-certificates', roles: ['student'] },
    { id: 'questions', label: 'Feedback', icon: 'message', path: '/dashboard/ask-questions', roles: ['student'] }
  ];

  const adminMenuItems = [
    { id: 'students', label: 'Student Management', icon: 'users', path: '/dashboard/students', roles: ['admin'] },
    { id: 'courses-admin', label: 'Course Management', icon: 'book', path: '/dashboard/courses', roles: ['admin'] },
    { id: 'live-admin', label: 'Live Sessions', icon: 'video', path: '/dashboard/zoom', roles: ['admin'] },
    { id: 'batches', label: 'Batch Management', icon: 'layers', path: '/dashboard/batchs', roles: ['admin'] },
    { id: 'add-admin', label: 'Add Admin', icon: 'user-plus', path: '/dashboard/addadmin', roles: ['admin'] }
  ];

  const instructorMenuItems = [
    { id: 'instructor-courses', label: 'My Courses', icon: 'book', path: '/dashboard/instructor-courses', roles: ['instructor'] },
    { id: 'instructor-sessions', label: 'My Sessions', icon: 'video', path: '/dashboard/instructor-sessions', roles: ['instructor'] }
  ];

  const menuItems = [
    ...commonMenuItems,
    ...studentMenuItems,
    ...adminMenuItems,
    ...instructorMenuItems
  ].filter(item => item.roles.includes(userRole));

  const isActive = path => currentPath === path;

  const getIcon = (name) => {
    const props = { size: 20 };
    switch (name) {
      case 'award': return <Award {...props} />;
      case 'book': return <BookOpen {...props} />;
      case 'video': return <Video {...props} />;
      case 'message': return <MessageSquare {...props} />;
      case 'users': return <Users {...props} />;
      case 'layers': return <Layers {...props} />;
      case 'user-plus': return <UserPlus {...props} />;
      case 'file': return <FileText {...props} />;
      default: return <Home {...props} />;
    }
  };

  return (
    <aside
      className={`
        tw-h-screen
        tw-bg-white
        tw-border-r
        tw-transition-all
        tw-duration-300
        ${isOpen ? 'tw-w-64' : 'tw-w-16'}
      `}
    >
      <nav className="tw-flex tw-flex-col tw-gap-1 tw-p-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              tw-flex
              tw-items-center
              tw-gap-3
              tw-rounded-lg
              tw-px-3
              tw-py-2
              tw-text-sm
              tw-font-medium
              tw-transition
              tw-whitespace-nowrap
              ${
                isActive(item.path)
                  ? 'tw-bg-blue-100 tw-text-blue-600'
                  : 'tw-text-gray-600 hover:tw-bg-gray-100'
              }
            `}
          >
            <span className="tw-flex-shrink-0">
              {getIcon(item.icon)}
            </span>

            {isOpen && (
              <span className="tw-truncate">
                {item.label}
              </span>
            )}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
