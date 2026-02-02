import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/dashboards/common/Loader";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  if (loading) return <Loader message="Checking access..." />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
