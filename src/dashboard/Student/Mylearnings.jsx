import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';
import {
  FiBookOpen,
  FiPlay,
  FiArrowRight,
  FiLayers
} from "react-icons/fi";
import { PiGraduationCapBold } from "react-icons/pi";

export default function MyLearnings() {

  const { data: enrollment } = useGetStudentEnrolledCoursesQuery({ type: "summary" });
  const enrollments = enrollment?.data || [];
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-white border border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between p-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
            <PiGraduationCapBold className="text-blue-600" size={24} />
          </div>
          <div>
            <div className="text-base font-bold text-slate-900">My Learning</div>
            <p className="text-xs md:text-sm text-slate-600">
              Pick up where you left off
            </p>
          </div>
        </div>

        {enrollments.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/student/mycourses")}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View all <FiArrowRight size={16} />
          </motion.button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-6">
        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {enrollments.slice(0, 3).map((course, idx) => {

              return (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.3 }}
                  whileHover={{ translateY: -8, scale: 1.03 }}
                  className="border border-slate-200 rounded-xl overflow-hidden flex flex-col hover:shadow-lg hover:border-blue-300 transition-all duration-300 bg-gradient-to-br from-slate-50 to-white"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                    <img
                      src={course.thumbnail || "/img/course-placeholder.jpg"}
                      alt={course.courseName}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />

                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-semibold">
                      {course.category || "Course"}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1">
                    <h4 className="font-bold text-sm line-clamp-2 text-slate-900">
                      {course.courseName}
                    </h4>

                    {course.batchName && (
                      <p className="text-xs text-slate-600 mt-2">
                        Batch: <span className="font-semibold">{course.batchName}</span>
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-3">
                      <FiLayers size={14} />
                      {course.duration || "Duration not available"}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="p-4 border-t border-slate-200">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        navigate(`/dashboard/student/mycourses/${course._id}`)
                      }
                      className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all shadow-md"
                    >
                      View Course
                      <FiPlay size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* ================= EMPTY STATE ================= */
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FiBookOpen className="text-gray-400" size={28} />
            </div>

            <h4 className="mt-4 font-semibold">
              You haven’t started learning yet
            </h4>

            <p className="text-sm text-gray-500 mt-1 max-w-xs">
              Explore our curated courses and kick-start your learning journey.
            </p>

            <button
              onClick={() => navigate("/dashboard/student/browsercourses")}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-6 py-2.5 rounded-lg"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}