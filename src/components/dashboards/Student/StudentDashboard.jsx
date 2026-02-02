
import CourseAdsCarousel from "../Ads/CourseAds";
import MyLearnings from "./Mylearnings";
import QuickActionCards from "./QuickActions";
import WelcomeScreen from "./WelcomeScreen";




const StudentDashboard = () => {
  return (
    <>
      <div className>
        <WelcomeScreen />
        <CourseAdsCarousel />
        <MyLearnings />
        <QuickActionCards />
      </div>

    </>
  );
}

export default StudentDashboard;