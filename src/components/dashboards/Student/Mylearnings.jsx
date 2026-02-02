import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";
import {
  BookOpen,
  Play,
  ArrowRight,
  GraduationCap,
  Layers
} from "lucide-react";

export default function MyLearnings() {
  const userId = useSelector((state) => state.auth.user?.id);
  const { data: enrollment } = useGetStudentEnrolledCoursesQuery(userId);
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
            <GraduationCap className="tw-text-blue-600" />
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
            onClick={() => navigate("allcourses")}
            className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline"
          >
            View all <ArrowRight size={14} />
          </button>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="tw-p-5">
        {enrollments.length > 0 ? (
          <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
            {enrollments.slice(0, 3).map((enrollment) => {
              const progress = enrollment.progress || 0;
              const isStarted = progress > 0;

              return (
                <motion.div
                  key={enrollment._id}
                  whileHover={{ y: -4 }}
                  className="tw-border tw-rounded-xl tw-overflow-hidden tw-flex tw-flex-col hover:tw-shadow-md tw-transition"
                >
                  {/* Thumbnail */}
                  <div className="tw-relative tw-h-40 tw-bg-gray-100">
                    <img
                      src={
                        enrollment.course?.thumbnail ||
                        "/img/course-placeholder.jpg"
                      }
                      alt={enrollment.course?.name}
                      className="tw-w-full tw-h-full tw-object-cover"
                    />

                    <span className="tw-absolute tw-top-2 tw-left-2 tw-bg-black/70 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded-full">
                      {enrollment.course?.category || "Course"}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="tw-p-4 tw-flex-1">
                    <h4 className="tw-font-semibold tw-text-sm tw-line-clamp-2">
                      {enrollment.course?.name}
                    </h4>

                    <div className="tw-flex tw-items-center tw-gap-2 tw-text-xs tw-text-gray-500 tw-mt-1">
                      <Layers size={14} />
                      {enrollment.completedLessons?.length || 0} /{" "}
                      {enrollment.course?.totalLessons || 0} lessons
                    </div>

                    {/* Progress */}
                    <div className="tw-mt-4">
                      <div className="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                        <span className="tw-text-gray-500">Progress</span>
                        <span className="tw-font-medium">{progress}%</span>
                      </div>

                      <div className="tw-h-2 tw-bg-gray-200 tw-rounded-full tw-overflow-hidden">
                        <div
                          className="tw-h-full tw-bg-blue-600 tw-transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="tw-p-4 tw-border-t">
                    <button
                      onClick={() =>
                        navigate(`/learn/${enrollment.courseId}`)
                      }
                      className={`
                        tw-w-full
                        tw-flex tw-items-center tw-justify-center tw-gap-2
                        tw-text-sm tw-font-medium
                        tw-py-2.5 tw-rounded-lg
                        ${
                          isStarted
                            ? "tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white"
                            : "tw-bg-emerald-600 hover:tw-bg-emerald-700 tw-text-white"
                        }
                      `}
                    >
                      {isStarted ? "Continue Learning" : "Start Learning"}
                      <Play size={16} />
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
              <BookOpen className="tw-text-gray-400" size={28} />
            </div>

            <h4 className="tw-mt-4 tw-font-semibold">
              You haven’t started learning yet
            </h4>

            <p className="tw-text-sm tw-text-gray-500 tw-mt-1 tw-max-w-xs">
              Explore our curated courses and kick-start your learning journey.
            </p>

            <button
              onClick={() => navigate("browsercourses")}
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
