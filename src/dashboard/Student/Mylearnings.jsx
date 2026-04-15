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
      className="bg-white border rounded-2xl shadow-sm"
    >
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between p-5 border-b">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
            <PiGraduationCapBold className="text-blue-600" size={20} />
          </div>
          <div>
            <div className="text-lg text-black font-semibold">My Learning</div>
            <p className=" text-xs md:text-sm text-gray-500">
              Pick up where you left off
            </p>
          </div>
        </div>

        {enrollments.length > 0 && (
          <button
            onClick={() => navigate("/dashboard/student/mycourses")}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            View all <FiArrowRight size={14} />
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5">
        {enrollments.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrollments.slice(0, 3).map((course) => {

              return (
                <motion.div
                  key={course._id}
                  whileHover={{ y: -4 }}
                  className="border border-gray-200 rounded-xl overflow-hidden flex flex-col hover:shadow-md transition"
                >
                  {/* Thumbnail */}
                  <div className="relative h-40 bg-gray-100">
                    <img
                      src={course.thumbnail || "/img/course-placeholder.jpg"}
                      alt={course.courseName}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />

                    <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                      {course.category || "Course"}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex-1">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {course.courseName}
                    </h4>

                    {course.batchName && (
                      <p className="text-xs text-gray-400 mt-1">
                        Batch: {course.batchName}
                      </p>
                    )}

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <FiLayers size={14} />
                      {course.duration || "Duration not available"}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="p-4 border-t">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/student/mycourses/${course._id}`)
                      }
                      className="w-full flex items-center justify-center gap-2 text-sm font-medium py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Course
                      <FiPlay size={16} />
                    </button>
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