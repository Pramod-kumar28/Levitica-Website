import React, {
  useState,
  createContext,
  useContext,
  Suspense
} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Sidebar from './Sidebar/Sidebar';
import Topbar from './Topbar/Topbar';
import Loader from './common/Loader';
import QuickActions from './Extras/QuickActions';
import ScrollToTop from '../../utils/ScrollToTop';
import useAuthCheck from '../../hooks/useAuthCheck';
import { ModalProvider } from './Admin/Modals/ModalContext';

// Theme Context
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const DashboardLayout = () => {
  const { isChecking } = useAuthCheck();
  const role = useSelector(state => state.auth.user?.role);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');

  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ModalProvider>
        <div className="tw-h-screen tw-w-full tw-bg-gray-50 tw-flex tw-flex-col">

          {/* Topbar */}
          <Topbar
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            currentPath={location.pathname}
          />

          {!isChecking && (
            <div className="tw-flex tw-flex-1 tw-overflow-hidden">

              {/* Sidebar */}
              <Sidebar
                isOpen={isSidebarOpen}
                currentPath={location.pathname}
              />

              {/* Main Content Area */}
              <main
                className={`
                  tw-flex-1
                  tw-overflow-y-auto
                  tw-p-4
                  tw-transition-all
                  tw-duration-300
                `}
              >
                <Suspense fallback={<Loader message="Loading module..." />}>
                  <ScrollToTop />
                  <Outlet />

                  {role === 'admin' && (
                    <div className="tw-fixed tw-bottom-6 tw-right-6">
                      <QuickActions />
                    </div>
                  )}
                </Suspense>
              </main>

            </div>
          )}
        </div>
      </ModalProvider>
    </ThemeContext.Provider>
  );
};

export default DashboardLayout;
