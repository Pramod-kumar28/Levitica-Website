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
      <div className="min-h-screen bg-background">
        {/* SIDEBAR — fixed floating on the left */}
        <Sidebar />

        {/* TOPBAR — fixed at top */}
        <Topbar />

        {/* MAIN CONTENT — scrolls under the fixed topbar */}
        <main
          className={`
            pt-[86px]
            px-4 lg:px-6
            pb-6
            min-h-screen
            transition-all duration-300 ease-in-out
            ${isOpen ? 'lg:ml-64' : 'lg:ml-20'}
          `}
        >
          <div className=" min-h-[calc(100vh-120px)]">
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