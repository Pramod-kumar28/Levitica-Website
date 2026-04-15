import CourseAdsCarousel from '@/dashboard/Ads/CourseAds';
import MyLearnings from "./Mylearnings";
import QuickActionCards from "./QuickActions";
import WelcomeScreen from "./WelcomeScreen";

const StudentDashboard = () => {
  return (
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10">
      <WelcomeScreen />
      <CourseAdsCarousel />
      <MyLearnings />
      <QuickActionCards />
    </div>
  );
};

export default StudentDashboard;