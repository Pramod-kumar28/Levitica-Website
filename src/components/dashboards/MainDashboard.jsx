import { useSelector } from "react-redux";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentDashboard from "./Student/StudentDashboard";
import Loader from "./common/Loader";


const Maindashboard = () => {
   const role = useSelector(state=>state.auth.user?.role)
   const loading = useSelector(state=>state.auth.loading)
    
    

  
return (
    
        <div>
            {
                loading ? (
                    <div>
                        {/* You can style this div or use a spinner component */}
                      <Loader message={"checking details"}/>
                    </div>
                ) : (
                    role === 'student' ? (
                        <StudentDashboard />
                    ) : (
                        <AdminDashboard />
                        
                    )
                )
            }
        </div>
  
); 
}

export default Maindashboard;
