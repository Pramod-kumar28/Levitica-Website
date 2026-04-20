import QuickActionsCard from '@/dashboard/Extras/QuickActionsCard';
import StatCard from '@/dashboard/Extras/StatCard';
import { useGetStatsQuery } from '@/Services/admin/statsService';
import UserCreationForm from "./UserCreation/UserCreationForm";
import CourseAdsCarousel from '@/dashboard/Ads/CourseAds';
import WelcomeScreen from '@/dashboard/Student/WelcomeScreen';
import StatsCharts from '@/dashboard/Extras/StatsCharts';
import { useTheme } from '@/context/ThemeContext';
import { FiUsers, FiBook, FiGrid, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const { data: stats, isLoading, error } = useGetStatsQuery();

  const {
    verifiedUsers = 0,
    batches = 0,
    enrollments = 0,
    courses = 0,
  } = stats?.data || {};

  const statsData = [
    { 
      label: "Verified Users", 
      count: verifiedUsers, 
      icon: FiUsers,
      gradient: isDark 
        ? 'from-blue-600/30 to-blue-900/30' 
        : 'from-blue-50 to-blue-100',
      borderColor: 'border-l-4 border-l-blue-500',
      iconColor: isDark ? 'text-blue-400' : 'text-blue-600',
      textColor: isDark ? 'text-blue-300' : 'text-blue-700'
    },
    { 
      label: "Courses", 
      count: courses, 
      icon: FiBook,
      gradient: isDark 
        ? 'from-purple-600/30 to-purple-900/30' 
        : 'from-purple-50 to-purple-100',
      borderColor: 'border-l-4 border-l-purple-500',
      iconColor: isDark ? 'text-purple-400' : 'text-purple-600',
      textColor: isDark ? 'text-purple-300' : 'text-purple-700'
    },
    { 
      label: "Batches", 
      count: batches, 
      icon: FiGrid,
      gradient: isDark 
        ? 'from-emerald-600/30 to-emerald-900/30' 
        : 'from-emerald-50 to-emerald-100',
      borderColor: 'border-l-4 border-l-emerald-500',
      iconColor: isDark ? 'text-emerald-400' : 'text-emerald-600',
      textColor: isDark ? 'text-emerald-300' : 'text-emerald-700'
    },
    { 
      label: "Enrollments", 
      count: enrollments, 
      icon: FiTrendingUp,
      gradient: isDark 
        ? 'from-orange-600/30 to-orange-900/30' 
        : 'from-orange-50 to-orange-100',
      borderColor: 'border-l-4 border-l-orange-500',
      iconColor: isDark ? 'text-orange-400' : 'text-orange-600',
      textColor: isDark ? 'text-orange-300' : 'text-orange-700'
    },
  ];

  if (isLoading) {
    return (
      <div className={`flex h-[80vh] items-center justify-center transition-colors ${
        isDark ? 'bg-slate-900' : 'bg-white'
      }`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className={`h-12 w-12 rounded-full border-4 transition-colors ${
            isDark 
              ? 'border-slate-700 border-t-blue-400' 
              : 'border-slate-200 border-t-blue-500'
          }`}
        ></motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-6 rounded-lg transition-colors ${
        isDark
          ? 'bg-red-900/20 border border-red-800 text-red-200'
          : 'bg-red-50 border border-red-200 text-red-700'
      }`}>
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
    <div className={`min-h-screen transition-colors ${
      isDark ? 'bg-slate-900' : 'bg-slate-50'
    }`}>
      <div className="space-y-8 pb-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full space-y-8">
        
          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2"
          >
            <div>
              <WelcomeScreen />
            </div>
            <div className="flex gap-3 flex-wrap">
              <button className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 shadow-lg ${
                isDark
                  ? 'bg-violet-600/80 hover:bg-violet-500 text-white shadow-violet-500/30'
                  : 'bg-violet-500 hover:bg-violet-600 text-white shadow-violet-500/30'
              }`}>
                📊 Generate Report
              </button>
              <button className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105 shadow-lg ${
                isDark
                  ? 'bg-cyan-600/80 hover:bg-cyan-500 text-white shadow-cyan-500/30'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white shadow-cyan-500/30'
              }`}>
                ⚙️ System Settings
              </button>
            </div>
          </motion.div>

          {/* ===== PROMO CAROUSEL ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border ${
              isDark 
                ? 'bg-slate-800 border-slate-700' 
                : 'bg-white border-slate-200'
            }`}
          >
            <CourseAdsCarousel />
          </motion.div>

          {/* ===== STATS GRID ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {statsData.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ translateY: -8, scale: 1.03 }}
                className={`rounded-xl p-6 ${stat.borderColor} transition-all duration-300 bg-gradient-to-br ${stat.gradient} shadow-lg hover:shadow-2xl cursor-pointer border ${
                  isDark
                    ? 'border-slate-700'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className={`text-xs font-bold uppercase tracking-wide opacity-80 ${
                      stat.textColor
                    }`}>
                      {stat.label}
                    </p>
                    <p className={`text-4xl font-bold mt-3 ${
                      isDark ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {stat.count.toLocaleString()}
                    </p>
                  </div>
                  {stat.icon && (
                    <stat.icon className={`h-11 w-11 opacity-60 ${
                      stat.iconColor
                    }`} />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ===== MAIN CONTENT GRID ===== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className={`lg:col-span-1 rounded-xl p-6 transition-all duration-300 border shadow-lg hover:shadow-xl ${
                isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-2xl">⚡</span>
                <h3 className={`text-sm font-bold uppercase tracking-wide ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Quick Actions
                </h3>
              </div>
              <QuickActionsCard />
            </motion.div>

            {/* Analytics & Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className={`lg:col-span-2 rounded-xl p-6 transition-all duration-300 border shadow-lg hover:shadow-xl ${
                isDark
                  ? 'bg-slate-800 border-slate-700'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  <h2 className={`text-base font-bold ${
                    isDark ? 'text-slate-100' : 'text-slate-900'
                  }`}>
                    Growth Analytics
                  </h2>
                </div>
                <select className={`text-xs font-semibold rounded-lg px-3 py-2 transition-colors border ${
                  isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-200 focus:border-cyan-400'
                    : 'bg-slate-100 border-slate-300 text-slate-900 focus:border-cyan-500'
                } focus:outline-none focus:ring-2 focus:ring-cyan-400/50`}>
                  <option>Last 30 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
              <div className={`h-56 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark ? 'bg-slate-700/40' : 'bg-slate-100'
              }`}>
                <p className={`text-sm font-medium ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  📈 Chart Analytics Coming Soon
                </p>
              </div>
            </motion.div>
          </div>

          {/* ===== USER CREATION & ADDITIONAL SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            className={`rounded-xl p-6 transition-all duration-300 border shadow-lg hover:shadow-xl ${
              isDark
                ? 'bg-slate-800 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔐</span>
              <h2 className={`text-base font-bold ${
                isDark ? 'text-emerald-400' : 'text-emerald-600'
              }`}>
                Identity Hub
              </h2>
            </div>
            <p className={`text-sm mb-5 font-medium ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Provision new administrative or student accounts instantly.
            </p>
            <UserCreationForm key={isDark} theme={isDark} />
            <div className={`text-xs text-center mt-5 px-3 py-2 rounded-lg font-bold tracking-wide inline-block w-full ${
              isDark 
                ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50' 
                : 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            }`}>
              ✓ Secure Entry • Encrypted Session
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;