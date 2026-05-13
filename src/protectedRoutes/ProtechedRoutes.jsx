import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from '@/dashboard/common/Loader';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, authChecked } = useSelector(
    (state) => state.auth
  );
  console.log("ProtectedRoute - auth state:", { user, isAuthenticated, authChecked });

  // ⛔ WAIT — auth not restored yet
  if (!authChecked) {
    return <Loader message="checking auth"/>
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute