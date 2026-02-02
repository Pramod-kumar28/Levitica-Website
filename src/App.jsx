
import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

// Layouts
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ScrollToTop from './utils/ScrollToTop';

// Public pages
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/Contact';
import Trainings from './components/Trainings';

import CourseDetail from './components/CoursesDetails';
import Services from './components/Services';
import ServiceDetails from './components/ServicesDetails';
import GetApp from './components/Get_App';
import ErrorPage from './components/ErrorPage';

// Auth
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/Forgotpassword';
import ChangePassword from './components/ChangePassword';
import EmailVerification from './utils/EmailVerification';

// Dashboard


// Student
import CourseCatalog from './components/dashboards/Student/CourseCatelog';
import CourseDetails from './components/dashboards/Student/CourseCatelogDetails';
import LiveClasses from './components/dashboards/Student/LiveClasses';
import ClassResources from './components/dashboards/Student/ClassResources';

import AskQuestions from './components/dashboards/Student/AskQuestions';
import BookOneOnOne from './components/dashboards/Student/BookOneToOneSession';
import SettingsPage from './components/dashboards/Student/Settings';

// Admin
import AssignStudents from './components/dashboards/Admin/StudentManagement/StudentsManagement';
import StudentsTable from './components/dashboards/Admin/StudentManagement/AllStudentTable';
import UnassignedStudents from './components/dashboards/Admin/StudentManagement/UnassignedStudents';
import AssignedStudents from './components/dashboards/Admin/StudentManagement/AssignedStudents';
import AddAdmin from './components/dashboards/Admin/AddAdmin/AddAdmin';
import AdminLiveClasses from './components/dashboards/Admin/LiveClass/LiveClassManagement';
import AdminPaymentsTable from './components/dashboards/Admin/Payments/TransactionTable';
import AdminDashboard from './components/dashboards/Admin/AdminDashboard';
import CoursesManagement from './components/dashboards/Admin/CourseManagement/CoursesManagement';
import BatchManagement from './components/dashboards/Admin/Batchs/BatchManagement';

// Other
import Internship from './components/Sections/Internship/Internship';
import PaymentSuccess from './components/Sections/Internship/PaymentSuccessPage';
import { Privacy, Refund, Terms, KnowledgeBase, Forums } from './components/Sections/AllTermsPolicy';
import DashboardLayout from './components/dashboards/Dashboard';
import DashboardIndex from './protectedRoutes/DashboardIndex';
import ProtectedRoute from './protectedRoutes/ProtechedRoutes';
import StudentDashboard from './components/dashboards/Student/StudentDashboard';
import MyCourseList from './components/dashboards/Student/MyCoursesList';

/* ---------------- Layout wrappers ---------------- */

const AppLayout = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <Outlet />
    <Footer />

  </>
);


const AuthLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const NoFooterLayout = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <Outlet />
  </>
);

/* ---------------- Router ---------------- */

const AppRouter = () => {
  return (
    <Routes>

      {/* Main public layout */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="trainings" element={<Trainings />} />
        <Route path="trainings/:category/:courseId?" element={<CourseDetail />} />
        <Route path="services" element={<Services />} />
        <Route path="services/:serviceName" element={<ServiceDetails />} />
        <Route path="contact-us" element={<ContactUs />} />
        <Route path="about-us" element={<AboutUs />} />

        <Route path="dcm-app" element={<GetApp />} />

        <Route path="privacy" element={<Privacy />} />
        <Route path="refund" element={<Refund />} />
        <Route path="terms" element={<Terms />} />
        <Route path="knowledge-base" element={<KnowledgeBase />} />
        <Route path="forums" element={<Forums />} />

        <Route path="*" element={<ErrorPage />} />
      </Route>

      {/* Login / Signup (navbar only) */}
      <Route element={<NoFooterLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
      </Route>

      {/* Auth-only pages */}
      <Route element={<AuthLayout />}>
        <Route path="password-reset" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ChangePassword />} />
        <Route path="verify-email" element={<EmailVerification />} />
        <Route path="internships" element={<Internship />} />
        <Route path="internships/payment-success" element={<PaymentSuccess />} />
      </Route>

      <Route path="dashboard" element={<ProtectedRoute />}>
        {/* Decide role */}
        <Route index element={<DashboardIndex />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="student"
          element={
            <ProtectedRoute allowedRoles={["student"]} />
          }
        >
          <Route element={<DashboardLayout />}>
            <Route index element={<StudentDashboard />} />
            <Route path="browsercourses" element={<CourseCatalog />} />
            <Route path="mycourses" element={<MyCourseList />} />
            <Route path="course/details" element={<CourseDetails />} />
            <Route path="live-session" element={<LiveClasses />} />
            <Route path="class-resources" element={<ClassResources />} />
        
            <Route path="ask-questions" element={<AskQuestions />} />
            <Route path="book-session" element={<BookOneOnOne />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        {/* ================= ADMIN ================= */}
        <Route
          path="admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]} />
          }
        >
          <Route element={<DashboardLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="addadmin" element={<AddAdmin />} />
            <Route path="payments" element={<AdminPaymentsTable />} />
            <Route path="courses" element={<CoursesManagement />} />
            <Route path="zoom" element={<AdminLiveClasses />} />
            <Route path="batchs" element={<BatchManagement />} />

            <Route path="students" element={<AssignStudents />}>
              <Route index element={<StudentsTable />} />
              <Route path="unassigned" element={<UnassignedStudents />} />
              <Route path="assigned" element={<AssignedStudents />} />
            </Route>
          </Route>
        </Route>
      </Route>



    </Routes>
  );
};

export default AppRouter;
