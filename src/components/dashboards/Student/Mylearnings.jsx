import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";
import { Book, BookOpen, Play } from "lucide-react";

export default function MyLearnings() {
  const userId = useSelector(state => state.auth.user?.id);
  const { data: enrollment } = useGetStudentEnrolledCoursesQuery(userId);
  const enrollments = enrollment?.data;
  const navigate = useNavigate();

  return (
    <div className="tw-w-full">
      <motion.div
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <div className="tw-bg-white tw-rounded-xl tw-shadow-sm tw-border">
          {/* Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-p-5 tw-border-b">
            <div className="tw-flex tw-items-center tw-gap-3">
              <div className="tw-w-10 tw-h-10 tw-rounded-lg tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
                <Book className="tw-text-blue-600" />
              </div>
              <div>
                <h3 className="tw-text-lg tw-font-semibold">My Learning</h3>
                <p className="tw-text-sm tw-text-gray-500">
                  Continue your learning journey
                </p>
              </div>
            </div>

            {enrollments?.length > 0 && (
              <button
                onClick={() => navigate("mycourses")}
                className="tw-text-sm tw-font-medium tw-text-blue-600 hover:tw-underline"
              >
                View All
              </button>
            )}
          </div>

          {/* Content */}
          <div className="tw-p-5">
            {enrollments?.length > 0 ? (
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
                {enrollments.slice(0, 3).map(enrollment => (
                  <div
                    key={enrollment._id}
                    className="tw-border tw-rounded-xl tw-overflow-hidden tw-flex tw-flex-col"
                  >
                    {/* Thumbnail */}
                    <div className="tw-relative tw-h-40 tw-bg-gray-100">
                      <img
                        src={enrollment.course?.thumbnail || "/default-course.jpg"}
                        alt={enrollment.course?.name}
                        className="tw-w-full tw-h-full tw-object-cover"
                      />
                      <span className="tw-absolute tw-top-2 tw-left-2 tw-bg-black/70 tw-text-white tw-text-xs tw-px-2 tw-py-1 tw-rounded">
                        {enrollment.course?.category}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="tw-p-4 tw-flex-1">
                      <h4 className="tw-font-semibold tw-text-sm tw-line-clamp-2">
                        {enrollment.course?.name}
                      </h4>
                      <p className="tw-text-xs tw-text-gray-500 tw-mt-1">
                        By {enrollment.course?.instructor}
                      </p>

                      {/* Progress */}
                      <div className="tw-mt-4">
                        <div className="tw-flex tw-justify-between tw-text-xs tw-mb-1">
                          <span className="tw-text-gray-500">
                            Your progress
                          </span>
                          <span className="tw-font-medium">
                            {enrollment.progress}%
                          </span>
                        </div>

                        <div className="tw-h-2 tw-bg-gray-200 tw-rounded-full tw-overflow-hidden">
                          <div
                            className="tw-h-full tw-bg-blue-600"
                            style={{ width: `${enrollment.progress}%` }}
                          />
                        </div>

                        <p className="tw-mt-2 tw-text-xs tw-text-gray-500">
                          {enrollment.completedLessons?.length} of{" "}
                          {enrollment.course?.totalLessons} lessons completed
                        </p>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="tw-p-4 tw-border-t">
                      <button
                        onClick={() =>
                          navigate(`/learn/${enrollment.courseId}`)
                        }
                        className="
                          tw-w-full
                          tw-flex
                          tw-items-center
                          tw-justify-center
                          tw-gap-2
                          tw-bg-blue-600
                          hover:tw-bg-blue-700
                          tw-text-white
                          tw-text-sm
                          tw-font-medium
                          tw-py-2.5
                          tw-rounded-lg
                        "
                      >
                        {enrollment.progress > 0 ? "Continue" : "Start"} Learning
                        <Play size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-py-16 tw-text-center">
                <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
                  <BookOpen className="tw-text-gray-400" size={28} />
                </div>
                <h4 className="tw-mt-4 tw-font-semibold">
                  No courses yet
                </h4>
                <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                  Enroll in your first course to start learning
                </p>
                <button
                  onClick={() => navigate("browsercourses")}
                  className="
                    tw-mt-4
                    tw-bg-blue-600
                    hover:tw-bg-blue-700
                    tw-text-white
                    tw-text-sm
                    tw-font-medium
                    tw-px-5
                    tw-py-2.5
                    tw-rounded-lg
                  "
                >
                  Browse Courses
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
  