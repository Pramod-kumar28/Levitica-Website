import QuickActionsCard from "../Extras/QuickActionsCard";
import StatCard from "../Extras/StatCard";

import { useGetStatsQuery } from "../../../Services/admin/statsService";
import UserCreationForm from "./UserCreation/UserCreationForm";
import CourseAdsCarousel from "../Ads/CourseAds";
import WelcomeScreen from "../Student/WelcomeScreen";
import UserTable from "./UserCreation/UserManagement";
import StudentsTable from "./StudentManagement/AllStudentTable";

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useGetStatsQuery();

  // Provide default values while data is loading or undefined
  const { verifiedUsers = 0, batches = 0, enrollments = 0, courses = 0 } = stats?.data || {};

  const statsData = [
    { icon: "👥", label: " Verified Users", count: verifiedUsers, color: "primary" },
    { icon: "📚", label: "Courses", count: courses, color: "success" },
    { icon: "📦", label: "Batches", count: batches, color: "warning" },
    { icon: "📝", label: "Enrolled User", count: enrollments, color: "info" },
  ];

  // Optional: Show loading state
  if (isLoading) {
    return (
      <div className="container my-4">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Optional: Show error state
  if (error) {
    return (
      <div className="container my-4">
        <div className="alert alert-danger" role="alert">
          Error loading dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <WelcomeScreen />
      <CourseAdsCarousel />

      {/* --- Stats Row --- */}
      <div className="row">
        <div className="col-md-5 my-5">
          <QuickActionsCard />
        </div>

        <div className="col-md-6">
          <div className="row">
            {statsData.map((stat, idx) => (
              <div key={idx} className="col-12 col-sm-6 col-lg-6 my-5">
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-5">
<h4 className="text-center">Quick Access to Create A New User</h4>
      <UserCreationForm />
      </div>
     
        
            
    </div>
  );
};

export default AdminDashboard;