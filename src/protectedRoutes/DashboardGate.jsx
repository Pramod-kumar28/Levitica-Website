// components/auth/DashboardGate.jsx
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from '@/dashboard/common/Loader';
import AuthBootstrap from "./AuthRestore";

const DashboardGate = () => {
  const { authChecked } = useSelector((state) => state.auth);
 

  return (
    <>
      
      <AuthBootstrap />

      {/*  Showing loader until auth is checked */}
      {!authChecked ? (
        <Loader message="Restoring session..." />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default DashboardGate;
