import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Tailwind here


import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import Store from './store/store';

import { Toaster } from 'react-hot-toast';

import { Outlet } from "react-router-dom";

// Public Pages
import HomePage from './components/HomePage';
import AboutUs from './components/AboutUs';
import ContactUs from './components/Contact';
import Trainings from './components/Trainings';
import ManPower from './components/ManPower';
import Consultancy from './components/ConsultantService';
import CourseDetail from './components/CoursesDetails';
import Login from './components/Login';
import Signup from './components/Signup';
import ErrorPage from './components/ErrorPage';

// Dashboard (Student)
import Dashboard from './components/dashboards/Dashboard';
import Maindashboard from './components/dashboards/MainDashboard';


// Dashboard (Admin)
import AssignStudents from './components/dashboards/Admin/StudentsManagement';
import UnassignedStudents from './components/dashboards/Admin/UnassignedStudents';
import AssignedStudents from './components/dashboards/Admin/AssignedStudents';
import Courses from './components/dashboards/Admin/Addcourse/Courses';
import AddAdmin from './components/dashboards/Admin/AddAdmin/AddAdmin';
import EmailVerification from './utils/EmailVerification';
import CourseList from './components/dashboards/Student/CoursesList';
import ForgotPassword from './components/Forgotpassword';
import BatchList from './components/dashboards/Admin/Batchs/AllBatchs';
import ChangePassword from './components/ChangePassword';
import CourseDetails from './components/dashboards/Student/CourseCatelogDetails';
import BookOneOnOne from './components/dashboards/Student/BookOneToOneSession';
import ClassResources from './components/dashboards/Student/ClassResources';
import MyCertificates from './components/dashboards/Student/Certifications';
import AskQuestions from './components/dashboards/Student/AskQuestions';

import SettingsPage from './components/dashboards/Student/Settings';
import LiveClasses, { SchedulePage } from './components/dashboards/Student/Schedule';
import CourseCatalog from './components/dashboards/Student/CourseCatelog';
import AdminLiveClasses from './components/dashboards/Admin/LiveClass/LiveClassManagement';
import useAuthCheck from './hooks/useAuthCheck';
import AppLayout from './App';
import GetApp from './components/Get_App';
import Services from './components/Services';
import ServiceDetails from './components/ServicesDetails';
import ScrollToTop from './utils/ScrollToTop';
import StudentsTable from './components/dashboards/Admin/UserCreation/AllStudentTable';
import { Privacy, Refund, Terms, KnowledgeBase ,Forums,SystemStatus, AffiliatesProgram } from './components/Sections/AllTermsPolicy';
import AdminPaymentsTable from './components/dashboards/Admin/Payments/TransactionTable';
import Internship from './components/Sections/Internship/Internship';
import PaymentSuccess from './components/Sections/Internship/PaymentSuccessPage';

// Create a layout component for pages that need the full App structure


// Create a minimal layout for auth pages that don't need navbar/chat
const AuthLayout = () => (
  <>
    <ScrollToTop />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, // Uses navbar, chat, etc.
    children: [
      { path: '/', element: <HomePage /> },
      { path: 'trainings', element: <Trainings /> },
     
      { path: 'trainings/:category/:courseId?', element: <CourseDetail /> },
      { path: 'services', element: <Services /> },
      { path: 'services/:serviceName', element: <ServiceDetails /> },
      { path: 'contact-us', element: <ContactUs /> },
      { path: 'about-us', element: <AboutUs /> },
      { path: 'man-power', element: <ManPower /> },
      { path: 'Consultancy', element: <Consultancy /> },
      { path: 'login', element: <Login /> },
      { path: 'sign-up', element: <Signup /> },
      { path: 'dcm-app', element: <GetApp /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'refund', element: <Refund /> },
      { path: 'terms', element: <Terms /> },
      {
        path: '/knowledge-base',
        element: <KnowledgeBase/>
      },
      {
        path: '/forums',
        element: <Forums />
      },
  
        { path: '*', element: <ErrorPage /> },
    ]
  },
  {
    path: '/',
    element: <AuthLayout />, // No navbar, no chat - just toast
    children: [
      { path: 'password-reset', element: <ForgotPassword /> },
       { path: 'internships', element: <Internship /> },
       { path: 'internships/payment-success', element: <PaymentSuccess /> },
      { path: 'reset-password', element: <ChangePassword /> },
      { path: 'verify-email', element: <EmailVerification /> },
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: '', element: <Maindashboard /> },
      { path: "browsercourses", element: <CourseCatalog /> },

      { path: 'settings', element: <SettingsPage /> },
      { path: 'live-session', element: <LiveClasses /> },
      { path: 'my-certificates', element: <MyCertificates /> },
      { path: 'ask-questions', element: <AskQuestions /> },
      { path: 'class-resources', element: <ClassResources /> },
      { path: 'allcourses', element: <CourseList /> },
      { path: 'book-session', element: <BookOneOnOne /> },
      { path: 'course/details', element: <CourseDetails /> },


      // Admin routes
      { path: 'addadmin', element: <AddAdmin /> },
      {
        path: 'students',
        element: <AssignStudents />,
        children: [
          { path: '', element: <StudentsTable /> },
          { path: 'unassigned', element: <UnassignedStudents /> },
          { path: 'assigned', element: <AssignedStudents /> }
        ]
      },
      {
        path:'payments',
        element:<AdminPaymentsTable/>,
      },
      {
        path: 'courses',
        element: <Courses />,
      },
      { path: 'zoom', element: <AdminLiveClasses /> },
      {
        path: 'batchs',
        element: <BatchList />,
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Toaster />

      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();