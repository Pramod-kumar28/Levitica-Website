import { motion } from "framer-motion";
import {
  BookOpen,
  Layers,
  Clock,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';
import { Link } from "react-router-dom";

/* ================= CARD ================= */
const EnrolledCourseCard = ({ course, index }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      className="
        bg-white
        border
        p-4
        rounded-xl
        shadow-sm
        hover:shadow-md
        transition
        flex
        flex-col
        overflow-hidden
      "
    >
      {/* Thumbnail */}
      <div className="h-44 bg-gray-100 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Header */}
      <div className="my-3 border-b flex items-start justify-between">
        <div>
          <h4 className="font-semibold m-0 text-gray-900 line-clamp-1">
            {course.courseName}
          </h4>

          <div className="mt-1">
            {course.batchName ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                Batch: {course.batchName}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                Batch Not Assigned Yet
              </span>
            )}
          </div>
        </div>

        {course.completed && (
          <span className="flex items-center gap-1 text-green-600 text-xs font-medium">
            <CheckCircle size={16} />
            Completed
          </span>
        )}
      </div>

      {/* Body */}
      <div className=" flex-1">
        <p className="text-sm text-gray-500 line-clamp-3">
          {course.shortDescription || "No description available."}
        </p>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Layers size={14} />
            {course.category || "General"}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} />
            {course.duration || "Flexible"}
          </span>
        </div>

        {/* Enrolled Date */}
        <p className="text-[11px] text-gray-900 my-3">
          Enrolled on{" "}
          {new Date(course.enrolledAt).toLocaleDateString()}
        </p>
      </div>

      {/* Action */}
      <div className=" border-t">
        <Link
          to={`${course._id}`}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            hover:scale-105
            hover:shadow-md
            hover:text-white
            transition
            text-white
            text-sm
            font-medium
            py-2.5
            rounded-lg
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
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
    <div className="max-w-7xl mx-auto md:px-4 px-1 py-6">
      {/* Header */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          My <span className="text-blue-600">Courses</span>
        </h1>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Access all the courses you are currently enrolled in
        </p>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center mt-12">
          <p className="text-gray-500">Loading your courses…</p>
        </div>
      )}

      {/* Empty */}
      {!isLoading && enrolledCourses.length === 0 && (
        <div className="flex flex-col items-center mt-16">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
            <BookOpen size={28} className="text-gray-400" />
          </div>
          <h3 className="mt-4 font-semibold">
            No courses enrolled
          </h3>
          <p className="text-sm text-gray-500 mt-1">
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