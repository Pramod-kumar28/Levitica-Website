import { motion } from "framer-motion";
import {
  BookOpen,
  Layers,
  Clock,
  ArrowRight,
} from "lucide-react";

import { useGetStudentEnrolledCoursesQuery } from "../../../Services/student/enrollFormServices";
import { Link } from "react-router-dom";

/* ================= COURSE CARD ================= */
const EnrolledCourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="
        tw-bg-white
        tw-border
        tw-rounded-xl
        tw-shadow-sm
        hover:tw-shadow-md
        tw-transition
        tw-flex
        tw-flex-col
      "
    >
      {/* Header */}
      <div className="tw-p-4 tw-border-b tw-flex tw-items-center tw-gap-3">
        <div className="tw-w-10 tw-h-10 tw-rounded-lg tw-bg-blue-100 tw-flex tw-items-center tw-justify-center">
          <BookOpen className="tw-text-blue-600" size={20} />
        </div>
        <h3 className="tw-font-semibold tw-text-gray-900 tw-line-clamp-1">
          {course.name}
        </h3>
      </div>

      {/* Body */}
      <div className="tw-p-4 tw-flex-1">
        <p className="tw-text-sm tw-text-gray-500 tw-line-clamp-3">
          {course.description || "No description available for this course."}
        </p>

        {/* Meta */}
        <div className="tw-flex tw-items-center tw-gap-4 tw-mt-4 tw-text-xs tw-text-gray-500">
          <span className="tw-flex tw-items-center tw-gap-1">
            <Layers size={14} />
            {course.category || "General"}
          </span>
          <span className="tw-flex tw-items-center tw-gap-1">
            <Clock size={14} />
            {course.duration || "Flexible"}
          </span>
        </div>
      </div>

      {/* Action */}
      <div className="tw-p-4 tw-border-t">
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
          key={course._id}
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
  console.log(enrolledSummaryData, 'iam enrolledcourse')
  const enrolledCourses =
    enrolledSummaryData?.data?.map(item => ({
      ...item.course,            // flatten course
      progress: item.progress,
      completed: item.completed,
      enrolledAt: item.enrolledAt
    })) || [];


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
