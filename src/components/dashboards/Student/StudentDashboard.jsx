import CourseAdsCarousel from "../Ads/CourseAds";
import MyLearnings from "./Mylearnings";
import QuickActionCards from "./QuickActions";
import WelcomeScreen from "./WelcomeScreen";

const StudentDashboard = () => {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 sm:tw-gap-8 md:tw-gap-10">
      <WelcomeScreen />
      <CourseAdsCarousel />
      <MyLearnings />
      <QuickActionCards />
    </div>
  );
};

export default StudentDashboard;