import { motion } from "framer-motion";
import {
  BookOpen,
  Layers,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";
import { Link } from "react-router-dom";

/* ================= CARD ================= */
const EnrolledCourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="
        tw-bg-white
        tw-border
        tw-p-4
        tw-rounded-xl
        tw-shadow-sm
        hover:tw-shadow-md
        tw-transition
        tw-flex
        tw-flex-col
        tw-overflow-hidden
      "
    >
      {/* Thumbnail */}
      <div className="tw-h-44 tw-bg-gray-100 tw-overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="tw-w-full tw-h-full tw-object-cover hover:tw-scale-105 tw-transition-transform tw-duration-300"
          />
        ) : (
          <div className="tw-flex tw-items-center tw-justify-center tw-h-full tw-text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Header */}
      <div className="tw-my-3 tw-border-b tw-flex tw-items-start tw-justify-between">
        <div>
          <h3 className="tw-font-semibold tw-m-0 tw-text-gray-900 tw-line-clamp-1">
            {course.courseName}
          </h3>

          <div className="tw-mt-1">
            {course.batchName ? (
              <span className="tw-inline-flex tw-items-center tw-gap-1 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium tw-bg-blue-100 tw-text-blue-700 tw-rounded-full">
                Batch: {course.batchName}
              </span>
            ) : (
              <span className="tw-inline-flex tw-items-center tw-gap-1 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-medium tw-bg-yellow-100 tw-text-yellow-700 tw-rounded-full">
                Batch Not Assigned Yet
              </span>
            )}
          </div>
        </div>

        {course.completed && (
          <span className="tw-flex tw-items-center tw-gap-1 tw-text-green-600 tw-text-xs tw-font-medium">
            <CheckCircle size={16} />
            Completed
          </span>
        )}
      </div>

      {/* Body */}
      <div className=" tw-flex-1">
        <p className="tw-text-sm tw-text-gray-500 tw-line-clamp-3">
          {course.shortDescription || "No description available."}
        </p>

        {/* Meta */}
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-4 tw-mt-4 tw-text-xs tw-text-gray-500">
          <span className="tw-flex tw-items-center tw-gap-1">
            <Layers size={14} />
            {course.category || "General"}
          </span>

          <span className="tw-flex tw-items-center tw-gap-1">
            <Clock size={14} />
            {course.duration || "Flexible"}
          </span>
        </div>

        {/* Enrolled Date */}
        <p className="tw-text-[11px] tw-text-gray-900 tw-my-3">
          Enrolled on{" "}
          {new Date(course.enrolledAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action */}
      <div className=" tw-border-t">
        <Link
          to={`${course._id}`}
          className="
            tw-w-full
            tw-flex
            tw-items-center
            tw-justify-center
            tw-gap-2
            tw-bg-blue-600
            hover:tw-bg-blue-700
            hover:tw-scale-105
            hover:tw-shadow-md
            hover:tw-text-white
            tw-transition
            tw-text-white
            tw-text-sm
            tw-font-medium
            tw-py-2.5
            tw-rounded-lg
          "
        >
          Go to Course
          <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

/* ================= GRID ================= */
const EnrolledCoursesGrid = ({ courses }) => {
  return (
    <div className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6 tw-mt-10">
      {courses.map((course, index) => (
        <EnrolledCourseCard
          key={index}   // since no _id returned
          course={course}
          index={index}
        />
      ))}
    </div>
  );
};

/* ================= MAIN ================= */
const MyCourseList = () => {
  const {
    data: enrolledSummaryData,
    isLoading,
  } = useGetStudentEnrolledCoursesQuery({ type: "summary" });

  // 🚀 IMPORTANT: backend already returns flat structure
  const enrolledCourses = enrolledSummaryData?.data || [];

  return (
    <div className="tw-max-w-7xl tw-mx-auto tw-px-4 tw-py-6">
      {/* Header */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="tw-text-center"
      >
        <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-text-gray-900">
          My <span className="tw-text-blue-600">Courses</span>
        </h1>
        <p className="tw-mt-2 tw-text-gray-500 tw-max-w-xl tw-mx-auto">
          Access all the courses you are currently enrolled in
        </p>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="tw-flex tw-justify-center tw-mt-12">
          <p className="tw-text-gray-500">Loading your courses…</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && enrolledCourses.length === 0 && (
        <div className="tw-flex tw-flex-col tw-items-center tw-mt-16">
          <div className="tw-w-16 tw-h-16 tw-rounded-full tw-bg-gray-100 tw-flex tw-items-center tw-justify-center">
            <BookOpen size={28} className="tw-text-gray-400" />
          </div>
          <h3 className="tw-mt-4 tw-font-semibold">
            No courses enrolled
          </h3>
          <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
            Browse courses and start learning today
          </p>
        </div>
      )}

      {/* Grid */}
      {!isLoading && enrolledCourses.length > 0 && (
        <EnrolledCoursesGrid courses={enrolledCourses} />
      )}
    </div>
  );
};

export default MyCourseList;