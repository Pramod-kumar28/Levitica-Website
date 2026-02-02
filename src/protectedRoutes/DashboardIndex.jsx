import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const DashboardIndex = () => {
  const role = useSelector((state) => state.auth.user?.role);

  if (role === "admin") {
    return <Navigate to="admin" replace />;
  }

  return <Navigate to="student" replace />;
};

export default DashboardIndex;
