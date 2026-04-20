import {
  FaBook,
  FaClock,
  FaLayerGroup,
  FaPlayCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUsers,
  FaGift,
  FaMedal,
  FaChartLine,
  FaCertificate,
  FaRocket,
  FaListUl,
  FaCheck,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { motion } from 'framer-motion';
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetStudentEnrolledCoursedetailsQuery } from '@/Services/student/enrollFormServices';
import { useTheme } from '@/context/ThemeContext';

const StudentEnrolledCourseDetails = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { courseId } = useParams();
  const { data, isLoading } =
    useGetStudentEnrolledCoursedetailsQuery(courseId);
    
  
  const [expandedModules, setExpandedModules] = useState([]);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className={`w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4 ${
            isDark
              ? 'border-slate-600 border-t-indigo-500'
              : 'border-blue-200 border-t-blue-600'
          }`}></div>
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>Loading your course...</p>
        </div>
      </div>
    );

  const enrollment = data?.data;
  if (!enrollment) return null;

  const {
    course,
    batch,
    payment,
    enrolledAt,
    liveClasses,
  } = enrollment;

  const isFreeBonus = !payment || payment?.status === "free";

  // Toggle module expansion
  const toggleModule = (index) => {
    setExpandedModules(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Sample soft skills content (in real app, this would come from API)
  const softSkillsContent = [
    {
      title: "Communication Skills",
      description: "Master effective communication in technical environments",
      icon: <FaUsers className="text-purple-500" />,
    },
    {
      title: "Team Collaboration",
      description: "Learn agile practices and team coordination",
      icon: <FaUsers className="text-blue-500" />,
    },
    {
      title: "Problem Solving",
      description: "Develop analytical thinking and solution-oriented approach",
      icon: <FaChartLine className="text-green-500" />,
    },
    {
      title: "Interview Preparation",
      description: "Mock interviews and resume building workshops",
      icon: <FaMedal className="text-orange-500" />,
    },
  ];

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
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1 line-clamp-2">
              {course?.name}
            </h1>
            <p className={`text-sm sm:text-base flex items-center gap-2 ${
              isDark ? 'text-slate-300' : 'text-blue-100'
            }`}>
              <FaBook className="w-4 h-4" />
              Continue your learning journey
            </p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <span className={`text-xs font-bold px-3 py-2 rounded-full ${
              isDark
                ? 'bg-green-900/40 text-green-300'
                : 'bg-green-400 text-green-900'
            }`}>
              In Progress
            </span>
            {isFreeBonus && (
              <span className={`text-xs font-bold px-3 py-2 rounded-full ${
                isDark
                  ? 'bg-amber-900/40 text-amber-300'
                  : 'bg-amber-300 text-amber-900'
              }`}>
                Free Bonus
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* ===== Course Info Card ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`rounded-2xl border overflow-hidden shadow-sm hover:shadow-lg transition ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-1.5 ${
          isDark
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-500'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600'
        }`} />
        
        <div className="md:grid md:grid-cols-3 gap-0">
          {/* Image */}
          <div className="md:col-span-1 overflow-hidden">
            <img
              src={course?.thumbnail}
              alt={course?.name}
              className="w-full h-48 sm:h-56 md:h-full object-cover hover:scale-105 transition duration-300"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2 p-4 sm:p-6 lg:p-8">
            <div className="space-y-3 sm:space-y-4">
              {/* Description */}
              <p className={`text-xs sm:text-sm line-clamp-3 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                {course?.shortdescription}
              </p>

              {/* Meta Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className={`rounded-lg p-2 sm:p-3 ${
                  isDark ? 'bg-slate-700' : 'bg-blue-50'
                }`}>
                  <p className={`text-xs mb-1 ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}>Category</p>
                  <p className={`text-sm sm:text-base font-medium ${
                    isDark ? 'text-slate-200' : 'text-gray-900'
                  }`}>{course?.category}</p>
                </div>

                <div className={`rounded-lg p-2 sm:p-3 ${
                  isDark ? 'bg-slate-700' : 'bg-purple-50'
                }`}>
                  <p className={`text-xs mb-1 ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}>Duration</p>
                  <p className={`text-sm sm:text-base font-medium ${
                    isDark ? 'text-slate-200' : 'text-gray-900'
                  }`}>{course?.duration}</p>
                </div>

                <div className={`rounded-lg p-2 sm:p-3 ${
                  isDark ? 'bg-slate-700' : 'bg-green-50'
                }`}>
                  <p className={`text-xs mb-1 ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}>Price</p>
                  <p className={`text-sm sm:text-base font-medium ${
                    isDark ? 'text-slate-200' : 'text-gray-900'
                  }`}>
                    {isFreeBonus ? "Free" : `₹${payment?.amountInRupees}`}
                  </p>
                </div>
              </div>

              {/* Enrollment Info */}
              <div className={`flex flex-col gap-2 pt-2 ${
                isDark ? 'border-t border-slate-700' : 'border-t border-gray-100'
              }`}>
                <span className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  Enrolled on <span className={`font-semibold ${
                    isDark ? 'text-slate-200' : 'text-gray-900'
                  }`}>
                    {new Date(enrolledAt).toLocaleDateString('en-IN', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ===== Course Objectives ===== */}
      {course?.details?.objectives && course.details.objectives.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className={`h-1 rounded-full mb-4 ${
            isDark
              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
              : 'bg-gradient-to-r from-purple-600 to-pink-600'
          }`} />
          <h2 className={`text-base sm:text-xl font-semibold mb-4 flex items-center gap-2 ${
            isDark ? 'text-purple-400' : 'text-gray-900'
          }`}>
            <FaRocket className={isDark ? 'text-purple-400' : 'text-purple-600'} />
            What You'll Learn
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.details.objectives.map((objective, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`flex items-start gap-3 p-2 sm:p-3 rounded-lg transition ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <FaCheck className="text-green-500 mt-0.5 flex-shrink-0 text-sm" />
                <span className={`text-xs sm:text-sm ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>{objective}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ===== Course Requirements ===== */}
      {course?.details?.requirements && course.details.requirements.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className={`h-1 rounded-full mb-4 ${
            isDark
              ? 'bg-gradient-to-r from-orange-500 to-red-500'
              : 'bg-gradient-to-r from-orange-600 to-red-600'
          }`} />
          <h2 className={`text-base sm:text-xl font-semibold mb-4 flex items-center gap-2 ${
            isDark ? 'text-orange-400' : 'text-gray-900'
          }`}>
            <FaListUl className={isDark ? 'text-orange-400' : 'text-orange-600'} />
            Prerequisites
          </h2>
          <ul className="space-y-2">
            {course.details.requirements.map((requirement, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`flex items-start gap-3 p-2 sm:p-3 rounded-lg transition ${
                  isDark
                    ? 'bg-slate-700 hover:bg-slate-600'
                    : 'bg-orange-50 hover:bg-orange-100'
                }`}
              >
                <span className={`font-bold text-lg flex-shrink-0 ${
                  isDark ? 'text-orange-400' : 'text-orange-500'
                }`}>•</span>
                <span className={`text-xs sm:text-sm ${
                  isDark ? 'text-slate-300' : 'text-gray-700'
                }`}>{requirement}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* ===== Course Description ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-1 rounded-full mb-4 ${
          isDark
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
            : 'bg-gradient-to-r from-blue-600 to-cyan-600'
        }`} />
        <h2 className={`text-base sm:text-xl font-semibold mb-4 flex items-center gap-2 ${
          isDark ? 'text-blue-400' : 'text-gray-900'
        }`}>
          <FaBook className={isDark ? 'text-blue-400' : 'text-blue-600'} />
          Course Overview
        </h2>
        <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
          isDark ? 'text-slate-300' : 'text-gray-700'
        }`}>
          {course?.details?.description}
        </p>
      </motion.div>

      {/* ===== Curriculum ===== */}
      {course?.details?.curriculum && course.details.curriculum.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className={`h-1 rounded-full mb-4 ${
            isDark
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600'
          }`} />
          <h2 className={`text-base sm:text-xl font-semibold mb-4 flex items-center gap-2 ${
            isDark ? 'text-indigo-400' : 'text-gray-900'
          }`}>
            <FaBook className={isDark ? 'text-indigo-400' : 'text-indigo-600'} />
            Course Curriculum
          </h2>
          <div className="space-y-2">
            {course.details.curriculum.map((module, moduleIndex) => (
              <motion.div 
                key={module._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + moduleIndex * 0.05 }}
                className={`border rounded-lg overflow-hidden transition ${
                  isDark
                    ? 'border-slate-600 hover:border-indigo-500'
                    : 'border-gray-200 hover:border-indigo-300'
                }`}
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className={`w-full px-3 py-3 sm:px-4 sm:py-3.5 flex items-center justify-between transition-colors ${
                    isDark
                      ? 'bg-slate-700 hover:bg-slate-600'
                      : 'bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded ${
                      isDark
                        ? 'bg-indigo-900/40 text-indigo-300'
                        : 'text-indigo-600 bg-indigo-100'
                    }`}>
                      Module {moduleIndex + 1}
                    </span>
                    <span className={`text-xs sm:text-sm font-semibold truncate ${
                      isDark ? 'text-slate-200' : 'text-gray-800'
                    }`}>
                      {module.title}
                    </span>
                  </div>
                  <motion.span 
                    animate={{ rotate: expandedModules.includes(moduleIndex) ? 180 : 0 }}
                    className={isDark ? 'text-slate-400 flex-shrink-0' : 'text-gray-500 flex-shrink-0'}
                  >
                    {expandedModules.includes(moduleIndex) ? (
                      <FaChevronUp className="text-xs" />
                    ) : (
                      <FaChevronDown className="text-xs" />
                    )}
                  </motion.span>
                </button>

                {/* Module Sessions */}
                <motion.div
                  initial={false}
                  animate={{
                    height: expandedModules.includes(moduleIndex) ? "auto" : 0,
                    opacity: expandedModules.includes(moduleIndex) ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className={`px-3 py-3 sm:px-4 sm:py-3.5 space-y-2 border-t ${
                    isDark
                      ? 'bg-slate-700/50 border-slate-600'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    {module.sessions.map((session, sessionIndex) => (
                      <motion.div
                        key={session._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + sessionIndex * 0.05 }}
                        className={`flex items-center gap-3 p-2 rounded transition ${
                          isDark
                            ? 'bg-slate-700 hover:bg-slate-600'
                            : 'bg-white hover:bg-indigo-50'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          isDark ? 'bg-indigo-400' : 'bg-indigo-500'
                        }`}></div>
                        <span className={`text-xs sm:text-sm truncate ${
                          isDark ? 'text-slate-300' : 'text-gray-700'
                        }`}>{session.title}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ===== Batch Info ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-1 rounded-full mb-4 ${
          isDark
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
            : 'bg-gradient-to-r from-cyan-600 to-blue-600'
        }`} />
        <h2 className={`text-base sm:text-xl font-semibold flex items-center gap-2 mb-4 ${
          isDark ? 'text-cyan-400' : 'text-gray-900'
        }`}>
          <FaUsers className={isDark ? 'text-cyan-400' : 'text-cyan-600'} />
          Batch Information
        </h2>

        {batch ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Batch Name</p>
              <p className={`text-sm sm:text-base font-semibold truncate ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>{batch.batchName}</p>
            </div>

            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Status</p>
              <p className={`text-sm sm:text-base font-semibold capitalize ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>{batch.status}</p>
            </div>

            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Start Date</p>
              <p className={`text-sm sm:text-base font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>{batch.startDate ? new Date(batch.startDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : "TBA"}</p>
            </div>

            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>End Date</p>
              <p className={`text-sm sm:text-base font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>{batch.endDate ? new Date(batch.endDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) : "TBA"}</p>
            </div>
          </div>
        ) : (
          <div className={`text-xs sm:text-sm p-3 rounded-lg border ${
            isDark
              ? 'bg-amber-900/20 text-amber-300 border-amber-700/30'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            Batch not assigned yet. You will receive notification once assigned.
          </div>
        )}
      </motion.div>

      {/* ===== Live Classes ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-gray-200'
        }`}
      >
        <div className={`h-1 rounded-full mb-4 ${
          isDark
            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
            : 'bg-gradient-to-r from-green-600 to-emerald-600'
        }`} />
        <h2 className={`text-base sm:text-xl font-semibold flex items-center gap-2 mb-4 ${
          isDark ? 'text-green-400' : 'text-gray-900'
        }`}>
          <FaCalendarAlt className={isDark ? 'text-green-400' : 'text-green-600'} />
          Live Classes
        </h2>

        {liveClasses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveClasses.map((cls, index) => (
              <motion.div
                key={cls._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`rounded-xl border shadow-sm hover:shadow-md transition overflow-hidden group ${
                  isDark
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-white border-gray-200'
                }`}
              >
                {/* Status Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${
                  cls.status === 'completed' 
                    ? isDark ? 'from-slate-500 to-slate-600' : 'from-gray-500 to-gray-600'
                    : cls.status === 'ongoing'
                    ? 'from-red-500 to-red-600'
                    : 'from-amber-500 to-amber-600'
                }`} />

                <div className="p-4 sm:p-5">
                  {/* Title & Badge */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <h3 className={`font-semibold text-sm sm:text-base line-clamp-2 flex-1 ${
                      isDark ? 'text-slate-200' : 'text-gray-900'
                    }`}>
                      {cls.title}
                    </h3>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 ${
                      cls.status === 'completed'
                        ? isDark ? 'bg-slate-600 text-slate-300' : 'bg-gray-100 text-gray-700'
                        : cls.status === 'ongoing'
                        ? 'bg-red-100 text-red-700 animate-pulse'
                        : isDark ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {cls.status === 'completed' ? 'Completed' : cls.status === 'ongoing' ? 'Live' : 'Upcoming'}
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-2 mb-4">
                    <div className={`flex items-center gap-2 text-xs sm:text-sm rounded-lg p-2 ${
                      isDark
                        ? 'bg-slate-600 text-slate-300'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      <FaCalendarAlt className={`flex-shrink-0 ${
                        isDark ? 'text-slate-400' : 'text-gray-600'
                      }`} />
                      <span>
                        {new Date(cls.startTime).toLocaleDateString('en-IN', { 
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs sm:text-sm rounded-lg p-2 ${
                      isDark
                        ? 'bg-slate-600 text-slate-300'
                        : 'bg-gray-50 text-gray-700'
                    }`}>
                      <FaClock className={`flex-shrink-0 ${
                        isDark ? 'text-slate-400' : 'text-gray-600'
                      }`} />
                      <span>
                        {new Date(cls.startTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  {cls.status !== "completed" && cls.zoomJoinUrl ? (
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href={cls.zoomJoinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full block text-center rounded-lg text-white text-xs sm:text-sm font-semibold py-2.5 transition shadow-md hover:shadow-lg ${
                        isDark
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <FaPlayCircle className="w-3.5 h-3.5" />
                        Join Now
                      </span>
                    </motion.a>
                  ) : cls.status === "completed" ? (
                    <button
                      disabled
                      className={`w-full py-2.5 text-xs sm:text-sm font-semibold rounded-lg ${
                        isDark
                          ? 'text-slate-500 bg-slate-600'
                          : 'text-gray-500 bg-gray-100'
                      }`}
                    >
                      Class Ended
                    </button>
                  ) : (
                    <button
                      disabled
                      className={`w-full py-2.5 text-xs sm:text-sm font-semibold rounded-lg border ${
                        isDark
                          ? 'text-amber-300 bg-amber-900/20 border-amber-700/30'
                          : 'text-amber-700 bg-amber-50 border-amber-200'
                      }`}
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 ${
            isDark ? 'text-slate-400' : 'text-gray-600'
          }`}>
            <FaCalendarAlt className={`text-4xl mx-auto mb-3 ${
              isDark ? 'text-slate-600' : 'text-gray-300'
            }`} />
            <p className="text-sm sm:text-base">
              No live classes scheduled yet.
            </p>
          </div>
        )}
      </motion.div>

      {/* ===== Soft Skills Bonus ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
          isDark
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 border-slate-700'
            : 'bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border-purple-200'
        }`}
      >
        <div className={`h-1 rounded-full mb-4 ${
          isDark
            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
            : 'bg-gradient-to-r from-purple-600 to-pink-600'
        }`} />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4 gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-lg shadow-md ${
              isDark
                ? 'bg-gradient-to-br from-purple-600 to-pink-600'
                : 'bg-gradient-to-br from-purple-500 to-pink-500'
            }`}>
              <FaGift className="text-white text-lg" />
            </div>
            <div>
              <h3 className={`text-base sm:text-lg font-semibold ${
                isDark ? 'text-purple-300' : 'text-gray-900'
              }`}>
                Exclusive Soft Skills Training
              </h3>
              <p className={`text-xs mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>
                Free bonus with your technical course
              </p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0 shadow-md ${
            isDark
              ? 'bg-green-900/40 text-green-300'
              : 'bg-green-500 text-white'
          }`}>
            Complimentary
          </span>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          {softSkillsContent.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.05 }}
              className={`p-3 rounded-lg border transition ${
                isDark
                  ? 'bg-slate-700 border-slate-600 hover:border-purple-500 hover:shadow-md'
                  : 'bg-white border-gray-100 hover:border-purple-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-2.5 rounded-full ${
                  isDark ? 'bg-slate-600' : 'bg-gray-50'
                }`}>
                  {skill.icon}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-semibold line-clamp-2 ${
                    isDark ? 'text-slate-200' : 'text-gray-900'
                  }`}>
                    {skill.title}
                  </h4>
                  <p className={`text-xs mt-1 line-clamp-2 ${
                    isDark ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    {skill.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className={`flex flex-wrap items-center gap-3 pt-4 border-t ${
          isDark ? 'border-slate-600' : 'border-purple-200'
        }`}>
          <div className={`flex items-center gap-2 text-xs sm:text-sm ${
            isDark ? 'text-slate-300' : 'text-gray-700'
          }`}>
            <FaCertificate className={`text-lg ${
              isDark ? 'text-purple-400' : 'text-purple-500'
            }`} />
            <span className="font-medium">Certificate included</span>
          </div>
          <div className={`flex items-center gap-2 text-xs sm:text-sm ${
            isDark ? 'text-slate-300' : 'text-gray-700'
          }`}>
            <FaRocket className={`text-lg ${
              isDark ? 'text-purple-400' : 'text-purple-500'
            }`} />
            <span className="font-medium">Career booster</span>
          </div>
          <div className={`flex items-center gap-2 text-xs sm:text-sm ${
            isDark ? 'text-slate-300' : 'text-gray-700'
          }`}>
            <FaUsers className={`text-lg ${
              isDark ? 'text-purple-400' : 'text-purple-500'
            }`} />
            <span className="font-medium">Group workshops</span>
          </div>
        </div>
      </motion.div>

      {/* ===== Payment Info ===== */}
      {payment && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className={`rounded-2xl border p-4 sm:p-6 shadow-sm hover:shadow-lg transition ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className={`h-1 rounded-full mb-4 ${
            isDark
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
              : 'bg-gradient-to-r from-emerald-600 to-teal-600'
          }`} />
          <h2 className={`text-base sm:text-xl font-semibold mb-4 flex items-center gap-2 ${
            isDark ? 'text-emerald-400' : 'text-gray-900'
          }`}>
            <FaMoneyBillWave className={isDark ? 'text-emerald-400' : 'text-emerald-600'} />
            Payment Details
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Status</p>
              <p className={`text-sm sm:text-base font-semibold capitalize ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>{payment.status}</p>
            </div>

            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-sky-50 to-cyan-50 border-sky-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Amount</p>
              <p className={`text-sm sm:text-base font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>₹{payment.amountInRupees}</p>
            </div>

            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Mode</p>
              <p className={`text-sm sm:text-base font-semibold capitalize ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>{payment.paymentMode || 'N/A'}</p>
            </div>

            <div className={`p-3 rounded-lg border ${
              isDark
                ? 'bg-slate-700 border-slate-600'
                : 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100'
            }`}>
              <p className={`text-xs mb-1 font-medium ${
                isDark ? 'text-slate-400' : 'text-gray-600'
              }`}>Paid On</p>
              <p className={`text-sm sm:text-base font-semibold ${
                isDark ? 'text-slate-200' : 'text-gray-900'
              }`}>
                {new Date(payment.createdAt).toLocaleDateString('en-IN', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ===== Bonus Banner ===== */}
      {isFreeBonus && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className={`rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition ${
            isDark
              ? 'bg-gradient-to-r from-emerald-900/30 to-green-900/30 border border-emerald-700/50 text-emerald-100'
              : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-lg">
              <FaGift className="text-2xl" />
            </div>
            <div>
              <p className="font-bold text-base sm:text-lg">
                🎁 This course was provided as a complimentary bonus.
              </p>
              <p className="text-sm text-emerald-100 mt-1">
                Enjoy learning at no cost!
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StudentEnrolledCourseDetails;