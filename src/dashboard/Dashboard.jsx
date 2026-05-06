import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import Loader from "./common/Loader";
import ScrollToTop from "@/utils/ScrollToTop";
import { ModalProvider } from "./Admin/Modals/ModalContext";
import { useSidebarStore } from "./Sidebar/useSidebarStore";

const DashboardLayout = () => {
  const { isOpen } = useSidebarStore();

  return (
    <ModalProvider>
      <div className="min-h-screen dark:bg-darkmode bg-herobg/15">
        
        {/* SIDEBAR */}
        <Sidebar />

        {/* TOPBAR */}
        <Topbar />

        {/* MAIN CONTENT */}
        <main
          className={`
            pt-[70px]
            min-h-screen
            transition-all duration-300 ease-in-out

             dark:bg-darkmode

            ${isOpen ? 'lg:ml-64' : 'lg:ml-20'}
          `}
        >
          <div className="min-h-[calc(100vh-120px)]">
            <Suspense fallback={<Loader message="Loading module..." />}>
              <ScrollToTop />
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </ModalProvider>
  );
};

export default DashboardLayout;