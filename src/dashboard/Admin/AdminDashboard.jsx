import QuickActionsCard from '@/dashboard/Extras/QuickActionsCard';
import StatCard from '@/dashboard/Extras/StatCard';
import { useGetStatsQuery } from '@/Services/admin/statsService';
import UserCreationForm from "./UserCreation/UserCreationForm";
import CourseAdsCarousel from '@/dashboard/Ads/CourseAds';
import WelcomeScreen from '@/dashboard/Student/WelcomeScreen';
import StatsCharts from '@/dashboard/Extras/StatsCharts';
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="flex h-[60vh] items-center justify-center text-muted-foreground/70">
        Loading dashboard…
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-6 text-destructive">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="space-y-10 min-h-screen text-foreground">

      {/* ===== Welcome + Ads ===== */}
      <WelcomeScreen />
      <CourseAdsCarousel />

      {/* ===== Top Section ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Quick Actions */}
        <Card className="overflow-hidden">
          <CardContent className="p-5">
            <QuickActionsCard />
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-2 gap-4">
          {statsData.map((stat, idx) => (
            <div key={idx}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Charts Section ===== */}
      <Card>
        <CardContent className="p-5">
          <StatsCharts data={statsData} />
        </CardContent>
      </Card>

      {/* ===== User Creation ===== */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">
            Quick User Creation
          </h2>
          <UserCreationForm />
        </CardContent>
      </Card>

    </div>
  );
};

export default AdminDashboard;