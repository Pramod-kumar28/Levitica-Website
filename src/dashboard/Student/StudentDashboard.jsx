import CourseAdsCarousel from '@/dashboard/Ads/CourseAds';
import MyLearnings from "./Mylearnings";
import QuickActionCards from "./QuickActions";
import WelcomeScreen from "./WelcomeScreen";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTheme } from '@/context/ThemeContext';
import { FiTrendingUp, FiBarChart2, FiBookOpen } from 'react-icons/fi';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-all ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="space-y-8 pb-16 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">
        
          {/* ===== HEADER ===== */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 transition-all duration-300 shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500'
            }`}
          >
            <div>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 transition-all ${
                isDark ? 'text-slate-100' : 'text-white'
              }`}>
                Welcome, {user?.name || 'Learner'}!
              </h1>
              <p className={`text-xs sm:text-sm flex items-center gap-2 transition-all ${
                isDark ? 'text-slate-300' : 'text-blue-100'
              }`}>
                <FiTrendingUp className="w-4 h-4" />
                Continue your learning journey
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3 flex-wrap">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-lg flex items-center gap-2 ${
                  isDark
                    ? 'bg-white/10 hover:bg-white/20 text-slate-100'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
              >
                <FiBookOpen className="w-4 h-4" /> 
                My Courses
              </motion.button>
            </div>
          </motion.div>

          {/* ===== WELCOME SECTION ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <WelcomeScreen />
          </motion.div>

          {/* ===== PROMO CAROUSEL ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border ${
              isDark
                ? 'bg-slate-800 border-slate-700 shadow-slate-900/30'
                : 'bg-white border-slate-200 shadow-slate-200/50'
            }`}
          >
            <CourseAdsCarousel />
          </motion.div>

          {/* ===== QUICK ACTIONS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <QuickActionCards />
          </motion.div>

          {/* ===== MY LEARNINGS ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <MyLearnings />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;