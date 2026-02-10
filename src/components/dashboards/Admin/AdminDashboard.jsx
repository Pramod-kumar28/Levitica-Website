import QuickActionsCard from "../Extras/QuickActionsCard";
import StatCard from "../Extras/StatCard";
import { useGetStatsQuery } from "../../../Services/admin/statsService";
import UserCreationForm from "./UserCreation/UserCreationForm";
import CourseAdsCarousel from "../Ads/CourseAds";
import WelcomeScreen from "../Student/WelcomeScreen";
import StatsCharts from "../Extras/StatsCharts";

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useGetStatsQuery();

  const {
    verifiedUsers = 0,
    batches = 0,
    enrollments = 0,
    courses = 0,
  } = stats?.data || {};

  const statsData = [
    { label: "Verified Users", count: verifiedUsers },
    { label: "Courses", count: courses },
    { label: "Batches", count: batches },
    { label: "Enrollments", count: enrollments },
  ];

  if (isLoading) {
    return (
      <div className="tw-flex tw-h-[60vh] tw-items-center tw-justify-center tw-text-slate-500">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="tw-rounded-xl tw-border tw-border-rose-200 tw-bg-rose-50 tw-p-6 tw-text-rose-700">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="tw-space-y-10 tw-p-6 tw-bg-slate-50 tw-min-h-screen">
      <WelcomeScreen />
      <CourseAdsCarousel />

      {/* ===== Top Section ===== */}
      <div className="tw-grid tw-grid-cols-1 xl:tw-grid-cols-3 tw-gap-6">
        <QuickActionsCard />

        <div className="tw-grid tw-grid-cols-2 md:tw-grid-cols-4 xl:tw-grid-cols-2 tw-gap-4">
          {statsData.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </div>

      {/* ===== Charts Section ===== */}
      <StatsCharts data={statsData} />

      {/* ===== User Creation ===== */}
      <div className="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-sm">
        <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900 tw-mb-4">
          Quick User Creation
        </h2>
        <UserCreationForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
