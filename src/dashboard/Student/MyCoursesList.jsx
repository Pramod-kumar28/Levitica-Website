import { motion } from "framer-motion";
import {
  BookOpen,
  Layers,
  Clock,
  ArrowRight,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { useGetStudentEnrolledCoursesQuery } from '@/Services/student/enrollFormServices';
import { Link } from "react-router-dom";
import { useTheme } from '@/context/ThemeContext';

/* ================= CARD ================= */
const EnrolledCourseCard = ({ course, index }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      className={`rounded-2xl border shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col group ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-gray-200'
      }`}
    >
      {/* Thumbnail */}
      <div className={`h-48 overflow-hidden relative ${
        isDark ? 'bg-slate-700' : 'bg-gray-100'
      }`}>
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className={`flex items-center justify-center h-full ${
            isDark ? 'text-slate-500' : 'text-gray-400'
          }`}>
            <BookOpen size={40} />
          </div>
        )}

        {/* Overlay Badge */}
        {course.completed && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
              <CheckCircle size={14} className="fill-current" />
              Completed
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        {/* Title */}
        <h3 className={`font-bold text-base sm:text-lg line-clamp-2 mb-2 ${
          isDark ? 'text-slate-100' : 'text-gray-900'
        }`}>
          {course.courseName}
        </h3>

        {/* Batch Badge */}
        <div className="mb-3">
          {course.batchName ? (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
              isDark
                ? 'bg-slate-700 border-slate-600 text-blue-400'
                : 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-200 text-blue-700'
            }`}>
              Batch: {course.batchName}
            </span>
          ) : (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
              isDark
                ? 'bg-slate-700 border-slate-600 text-amber-400'
                : 'bg-gradient-to-r from-yellow-100 to-yellow-50 border-yellow-200 text-yellow-700'
            }`}>
              Batch Not Assigned
            </span>
          )}
        </div>

        {/* Description */}
        <p className={`text-xs sm:text-sm line-clamp-2 mb-3 flex-1 ${
          isDark ? 'text-slate-400' : 'text-gray-600'
        }`}>
          {course.shortDescription || "No description available."}
        </p>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className={`flex items-center gap-1.5 rounded-lg p-2 ${
            isDark ? 'bg-slate-700' : 'bg-purple-50'
          }`}>
            <Layers size={14} className={`flex-shrink-0 ${
              isDark ? 'text-purple-400' : 'text-purple-600'
            }`} />
            <span className={`text-xs font-medium truncate ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>{course.category || "General"}</span>
          </div>

          <div className={`flex items-center gap-1.5 rounded-lg p-2 ${
            isDark ? 'bg-slate-700' : 'bg-green-50'
          }`}>
            <Clock size={14} className={`flex-shrink-0 ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`} />
            <span className={`text-xs font-medium truncate ${
              isDark ? 'text-slate-300' : 'text-gray-700'
            }`}>{course.duration || "Flexible"}</span>
          </div>
        </div>

        {/* Enrolled Date */}
        <p className={`text-xs mb-3 pt-3 ${
          isDark
            ? 'text-slate-400 border-t border-slate-700'
            : 'text-gray-600 border-t border-gray-100'
        }`}>
          Enrolled <span className={`font-semibold ${
            isDark ? 'text-slate-200' : 'text-gray-900'
          }`}>
            {new Date(course.enrolledAt).toLocaleDateString('en-IN', { 
              month: 'short', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </span>
        </p>

        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            to={`${course._id}`}
            className={`w-full flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold py-2.5 rounded-lg transition shadow-md hover:shadow-lg ${
              isDark
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white'
                : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white'
            }`}
          >
            Go to Course
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ================= GRID ================= */
const EnrolledCoursesGrid = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const {
    data: enrolledSummaryData,
    isLoading,
  } = useGetStudentEnrolledCoursesQuery({ type: "summary" });

  // 🚀 IMPORTANT: backend already returns flat structure
  const enrolledCourses = enrolledSummaryData?.data || [];

  return (
    <div className={`min-h-screen p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 ${
      isDark ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* ===== Page Header with Gradient ===== */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg ${
          isDark
            ? 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800'
            : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1 flex items-center gap-2">
              <TrendingUp className="w-8 h-8" />
              My Courses
            </h1>
            <p className={`text-sm sm:text-base ${
              isDark ? 'text-slate-300' : 'text-blue-100'
            }`}>
              Access all the courses you are currently enrolled in
            </p>
          </div>
          {!isLoading && enrolledCourses.length > 0 && (
            <div className={`backdrop-blur rounded-lg px-4 py-2 ${
              isDark ? 'bg-slate-700/50' : 'bg-white/20'
            }`}>
              <p className="text-white font-semibold text-lg">{enrolledCourses.length}</p>
              <p className={`text-xs ${
                isDark ? 'text-slate-300' : 'text-blue-100'
              }`}>Courses</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center mt-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your courses…</p>
          </div>
        </div>
      )}

      {/* Empty */}
      {!isLoading && enrolledCourses.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center mt-16"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            isDark
              ? 'bg-gradient-to-br from-slate-700 to-slate-600'
              : 'bg-gradient-to-br from-blue-100 to-cyan-100'
          }`}>
            <BookOpen size={28} className={isDark ? 'text-indigo-400' : 'text-blue-600'} />
          </div>
          <h3 className={`mt-4 font-semibold text-lg ${
            isDark ? 'text-slate-200' : 'text-gray-900'
          }`}>
            No courses enrolled yet
          </h3>
          <p className={`text-sm mt-1 ${
            isDark ? 'text-slate-400' : 'text-gray-500'
          }`}>
            Browse courses and start your learning journey today
          </p>
        </motion.div>
      )}

      {/* Grid */}
      {!isLoading && enrolledCourses.length > 0 && (
        <EnrolledCoursesGrid courses={enrolledCourses} />
      )}
    </div>
  );
};

export default MyCourseList;