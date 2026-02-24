import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar/Sidebar";
import Topbar from "./Topbar/Topbar";
import Loader from "./common/Loader";
import ScrollToTop from "../../utils/ScrollToTop";
import { ModalProvider } from "./Admin/Modals/ModalContext";

const DashboardLayout = () => {



  return (
    <ModalProvider>
      <div className="tw-h-screen tw-bg-gray-100 tw-flex tw-flex-col">
        {/* TOPBAR  */}
        <Topbar/>

        {/* BODY */}
        <div className="tw-flex tw-flex-1 tw-relative tw-pt-20 tw-h-screen">
          {/* SIDEBAR */}
          <Sidebar/>

         {/* MAIN CONTENT  */}
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
