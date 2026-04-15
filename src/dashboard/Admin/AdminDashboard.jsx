import QuickActionsCard from '@/dashboard/Extras/QuickActionsCard';
import StatCard from '@/dashboard/Extras/StatCard';
import { useGetStatsQuery } from '@/Services/admin/statsService';
import UserCreationForm from "./UserCreation/UserCreationForm";
import CourseAdsCarousel from '@/dashboard/Ads/CourseAds';
import WelcomeScreen from '@/dashboard/Student/WelcomeScreen';
import StatsCharts from '@/dashboard/Extras/StatsCharts';

const AdminDashboard = () => {
  const { data: stats, isLoading, error } = useGetStatsQuery();

  const {
    verifiedUsers = 0,
    batches = 0,
    enrollments = 0,
    courses = 0,
  } = stats?.data || {};

  const statsData = [
    { label: "Verified Users", count: verifiedUsers, color: "border-l-primary" },
    { label: "Courses", count: courses, color: "border-l-accent" },
    { label: "Batches", count: batches, color: "border-l-success" },
    { label: "Enrollments", count: enrollments, color: "border-l-info" },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-pro border-error/50 bg-error/5 p-6 text-error animate-fade-in">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h3 className="font-bold">System Error</h3>
            <p className="text-sm opacity-80">Failed to sync dashboard metrics. Please refresh.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 min-h-screen pb-12 animate-fade-in">
      
      {/* ===== Header Area ===== */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <WelcomeScreen />
        </div>
        <div className="flex gap-3">
          <button className="btn-outline text-xs">Generate Report</button>
          <button className="btn-primary text-xs">System Settings</button>
        </div>
      </div>

      {/* ===== Promo Section ===== */}
      <div className="rounded-3xl overflow-hidden shadow-2xl shadow-primary/5">
        <CourseAdsCarousel />
      </div>

      {/* ===== Top Insight Section ===== */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Quick Actions - Glass Style */}
        <div className="xl:col-span-4 card-pro glass-glow flex flex-col justify-center">
          <h3 className="text-sm font-black uppercase tracking-widest text-muted mb-4">Command Center</h3>
          <QuickActionsCard />
        </div>

        {/* Stats Grid - Using our Dynamic Colors */}
        <div className="xl:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`card-pro border-l-4 ${stat.color} hover:scale-[1.02] transition-transform cursor-default`}
            >
              <StatCard {...stat} />
            </div>
          ))}
        </div>
      </div>

      {/* ===== Analytics Section ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-pro glass-glow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black tracking-tight">Growth Analytics</h2>
            <select className="bg-accent/50 border-none rounded-lg text-xs font-bold p-2 focus:ring-2 ring-primary/20 outline-none">
              <option>Last 30 Days</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <StatsCharts data={statsData} />
        </div>

        {/* ===== Quick User Creation ===== */}
        <div className="card-pro bg-gradient-to-b from-card to-accent/10">
          <h2 className="text-xl font-black tracking-tight mb-2">Identity Hub</h2>
          <p className="text-muted text-sm mb-6">Provision new administrative or student accounts instantly.</p>
          <UserCreationForm />
          <p className="text-[10px] text-muted text-center mt-6 uppercase tracking-widest opacity-50">
            Secure Entry • Encrypted Session
          </p>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;