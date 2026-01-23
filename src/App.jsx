
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import Footer from "./components/Footer";
const AppLayout = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <Outlet />
    <Footer/>
    
  </>
);

export default AppLayout