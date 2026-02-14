import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import Loader from "./common/Loader";
import ScrollToTop from "../../utils/ScrollToTop";
import { ModalProvider } from "./Admin/Modals/ModalContext";

const DashboardLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <ModalProvider>
      <div className="tw-h-screen tw-bg-gray-100 tw-flex tw-flex-col">
        {/* ================= TOPBAR (FULL WIDTH) ================= */}
        <Topbar
          toggleSidebar={() => setIsSidebarOpen((v) => !v)}
        />

        {/* ================= BODY ================= */}
        <div className="tw-flex tw-flex-1 tw-relative tw-pt-20 tw-h-screen">
          {/* SIDEBAR (NON-SCROLLING) */}
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* MOBILE OVERLAY */}
          {isSidebarOpen && (
            <div
              className="tw-fixed tw-inset-0 tw-bg-black/40 tw-z-30 lg:tw-hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* MAIN CONTENT (SCROLLS) */}
          <main className="tw-flex-1 tw-overflow-y-auto tw-p-6">
            <Suspense fallback={<Loader message="Loading module..." />}>
              <ScrollToTop />
              <Outlet />
            </Suspense>
          </main>
        </div>

      </div>
    </ModalProvider>
  );
};




export default DashboardLayout;
