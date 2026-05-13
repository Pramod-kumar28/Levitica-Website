import CourseAdsCarousel from '@/dashboard/Ads/CourseAds';
import MyLearnings from "./Mylearnings";
import QuickActionCards from "./QuickActions";
import WelcomeScreen from "./WelcomeScreen";
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FiTrendingUp, FiBookOpen } from 'react-icons/fi';

const StudentDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen transition-all">

      <div className="py-6 px-4">
        <div className="max-w-7xl mx-auto">

          {/* ===== WELCOME ===== */}
          <WelcomeScreen />

          {/* ===== CAROUSEL ===== */}
          <motion.div
            className="
              
            "
          >
            <CourseAdsCarousel />
          </motion.div>

          {/* ===== QUICK ACTIONS ===== */}
          <QuickActionCards />

          {/* ===== MY LEARNINGS ===== */}
          {/* <MyLearnings /> */}

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;