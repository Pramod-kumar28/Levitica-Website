import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";
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
      className="tw-bg-white tw-border tw-rounded-2xl tw-shadow-sm"
    >
      {/* ================= HEADER ================= */}
      <div className="tw-flex tw-items-center tw-justify-between tw-p-5 tw-border-b">
        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-w-11 tw-h-11 tw-rounded-xl tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
            <PiGraduationCapBold className="tw-text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="tw-text-lg tw-font-semibold">My Learning</h3>
            <p className="tw-text-sm tw-text-gray-500">
              Pick up where you left off
            </p>
          </div>
        </div>

        {enrollments.length > 0 && (
          <button
            onClick={() => navigate("/dashboard/student/mycourses")}
            className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline"
          >
            View all <FiArrowRight size={14} />
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="tw-p-5">
        {enrollments.length > 0 ? (
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
            {enrollments.slice(0, 3).map((course) => {

              return (
                <motion.div
                  key={course._id}
                  whileHover={{ y: -4 }}
                  className="tw-border tw-border-gray-200 tw-rounded-xl tw-overflow-hidden tw-flex tw-flex-col hover:tw-shadow-md tw-transition"
                >
                  {/* Thumbnail */}
                  <div className="tw-relative tw-h-40 tw-bg-gray-100">
                    <img
                      src={course.thumbnail || "/img/course-placeholder.jpg"}
                      alt={course.courseName}
                      loading="lazy"
                      className="tw-w-full tw-h-full tw-object-cover"
                    />

                    <span className="tw-absolute tw-top-2 tw-left-2 tw-bg-black/70 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded-full">
                      {course.category || "Course"}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="tw-p-4 tw-flex-1">
                    <h4 className="tw-font-semibold tw-text-sm tw-line-clamp-2">
                      {course.courseName}
                    </h4>

                    {course.batchName && (
                      <p className="tw-text-xs tw-text-gray-400 tw-mt-1">
                        Batch: {course.batchName}
                      </p>
                    )}

                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-xs tw-text-gray-500 tw-mt-2">
                      <FiLayers size={14} />
                      {course.duration || "Duration not available"}
                    </div>
                  </div>

                  {/* Action */}
                  <div className="tw-p-4 tw-border-t">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/student/mycourses/${course._id}`)
                      }
                      className="tw-w-full tw-flex tw-items-center tw-justify-center tw-gap-2 tw-text-sm tw-font-medium tw-py-2.5 tw-rounded-lg tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white"
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
          <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-16 tw-text-center">
            <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
              <FiBookOpen className="tw-text-gray-400" size={28} />
            </div>

            <h4 className="tw-mt-4 tw-font-semibold">
              You haven’t started learning yet
            </h4>

            <p className="tw-text-sm tw-text-gray-500 tw-mt-1 tw-max-w-xs">
              Explore our curated courses and kick-start your learning journey.
            </p>

            <button
              onClick={() => navigate("/dashboard/student/browsercourses")}
              className="tw-mt-5 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-text-sm tw-font-medium tw-px-6 tw-py-2.5 tw-rounded-lg"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
}