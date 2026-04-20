import { motion, AnimatePresence } from "framer-motion";
import { useCourseHandlers } from "./courseshooks";
import { useCourses } from '@/hooks/useCourses';
import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiGrid,
  FiList,
  FiBookOpen,
} from "react-icons/fi";

const CoursesManagement = () => {
  const { courses = [] } = useCourses();
  const { openModal } = useModal();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { handleDeleteCourse } = useCourseHandlers();

  const [view, setView] = useState("cards");



  return (
    <div className={`space-y-6 sm:space-y-8 py-3 px-3 sm:px-4 md:px-6 rounded-xl transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen'
        : 'bg-white'
    }`}>
      {/* ===== Page Header with Gradient ===== */}
      <div className={`rounded-xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300 ${
        isDark
          ? 'bg-slate-800'
          : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
          <div>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 ${
              isDark ? 'text-blue-400' : 'text-white'
            }`}>
              Course Management
            </h1>
            <p className={`text-xs sm:text-sm flex items-center gap-2 ${
              isDark ? 'text-blue-300' : 'text-blue-100'
            }`}>
              <FiBookOpen className="w-4 h-4" />
              Manage courses and their batches
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openModal(MODAL_TYPES.ADD_COURSE, { mode: "add" })}
            className={`flex items-center gap-2 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center sm:justify-start ${
              isDark
                ? 'bg-blue-600 hover:bg-blue-500 text-white'
                : 'bg-white text-blue-600'
            }`}
          >
            <FiPlus className="w-5 h-5" />
            Add Course
          </motion.button>
        </div>
      </div>

      {/* ===== View Toggle & Stats ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className={`bg-gradient-to-r from-blue-50 to-cyan-50 border rounded-xl px-4 py-3 sm:py-4 transition-colors ${
          isDark
            ? 'from-blue-900/40 to-cyan-900/40 border-blue-800/50'
            : 'from-blue-50 to-cyan-50 border-blue-200'
        }`}>
          <p className={`text-xs sm:text-sm ${
            isDark ? 'text-blue-300' : 'text-slate-700'
          }`}>
            <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{courses.length}</span>
            <span className={isDark ? 'text-blue-400' : 'text-slate-600'}> total courses</span>
          </p>
        </div>

        <div className={`inline-flex rounded-lg border p-1 shadow-sm transition-colors ${
          isDark
            ? 'bg-blue-800 border-blue-700'
            : 'bg-slate-100 border-slate-300'
        }`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView("cards")}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all ${
              view === "cards" 
                ? isDark
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-900 shadow'
                : isDark
                  ? 'text-slate-300 hover:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FiGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => setView("table")}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-medium transition-all ${
              view === "table" 
                ? isDark
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-slate-900 shadow'
                : isDark
                  ? 'text-slate-300 hover:text-slate-100'
                  : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FiList className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </motion.button>
        </div>
      </div>


      {/* Content */}
      <div className="px-6 pb-6">
        <AnimatePresence mode="wait">
        {view === "cards" ? (
          <CoursesCardView
            courses={courses}
            isDark={isDark}
            onEdit={(course) =>
              openModal(MODAL_TYPES.ADD_COURSE, { mode: "edit", course })
            }
            onDelete={(id) => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this course? This will permanently remove all course details."
              );

              if (confirmDelete) {
                handleDeleteCourse(id);
              }
            }}
          />
        ) : (
          <CoursesTableView
            courses={courses}
            isDark={isDark}
            onEdit={(course) =>
              openModal(MODAL_TYPES.ADD_COURSE, { mode: "edit", course })
            }
            onDelete={() => {
              const confirmDelete = window.confirm(
                "Are you sure you want to delete this course? This will permanently remove all course details."
              );

              if (confirmDelete) {
                handleDeleteCourse();
              }
            }}
          />
        )}
      </AnimatePresence>
      </div>


    </div>
  );
};
export default CoursesManagement;





const CoursesCardView = ({
  courses,
  isDark,
  onEdit,
  onDelete,

}) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <motion.div
          key={course._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition-all ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}
        >
          <div className="relative h-40">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover rounded"
            />
          </div>
          {/* Header */}
          <div className="flex justify-between mt-3">

            <div>
              <h3 className={`font-semibold text-lg transition-colors ${
                isDark
                  ? 'text-slate-100'
                  : 'text-gray-900'
              }`}>{course.name}</h3>
              <p className={`text-sm transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-gray-500'
              }`}>
                {course.category}
              </p>
            </div>
            <span className={`font-semibold transition-colors ${
              isDark
                ? 'text-blue-400'
                : 'text-blue-600'
            }`}>
              {course.price === 0 ? "Free" : `₹${course.price}`}
            </span>
          </div>

          {/* Meta */}
          <p className={`text-sm mt-3 line-clamp-2 transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-gray-600'
          }`}>
            {course.shortdescription || "No  Short description added yet"}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className={`text-xs transition-colors ${
              isDark
                ? 'text-slate-500'
                : 'text-gray-500'
            }`}>
              {course.duration}
            </span>

            {/* Actions */}
            <div className="flex gap-3 items-center">
              {/* Edit course */}
              <FiEdit
                title="Edit Course"
                className={`cursor-pointer transition-colors ${
                  isDark
                    ? 'text-blue-400 hover:text-blue-300'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
                onClick={() => onEdit(course)}
              />

              {/* Add / View Details */}
              {course.details ? (
                <FiEye
                  title="View Details"
                  className={`cursor-pointer transition-colors ${
                    isDark
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-green-600 hover:text-green-700'
                  }`}
                  onClick={() =>
                    navigate(`/dashboard/course/${course._id}`)
                  }
                />
              ) : (
                <FiPlus
                  title="Add Details"
                  className={`cursor-pointer transition-colors ${
                    isDark
                      ? 'text-green-400 hover:text-green-300'
                      : 'text-green-600 hover:text-green-700'
                  }`}
                  onClick={() =>
                    openModal(MODAL_TYPES.ADD_COURSE_DETAILS, {
                      courseId: course._id,
                    })
                  }
                />
              )}



              {/* Delete  with details details */}

              <FiTrash2
                title="Delete Course"
                className={`cursor-pointer transition-colors ${
                  isDark
                    ? 'text-red-400 hover:text-red-300'
                    : 'text-red-500 hover:text-red-600'
                }`}
                onClick={() => onDelete(course._id)}
              />

            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


const CoursesTableView = ({
  courses,
  isDark,
  onEdit,
  onDelete,

}) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className={`rounded-xl border overflow-hidden transition-colors ${
      isDark
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200'
    }`}>
      <table className="w-full">
        <thead className={`transition-colors ${
          isDark
            ? 'bg-slate-700'
            : 'bg-gray-50'
        }`}>
          <tr className={`text-left text-sm transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-gray-500'
          }`}>
            <th className="p-4">Course</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Price</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>

        <tbody className={`divide-y transition-colors ${
          isDark
            ? 'divide-slate-700'
            : 'divide-slate-200'
        }`}>
          {courses.map((course) => (
            <tr 
              key={course._id} 
              className={`transition-colors ${
                isDark
                  ? 'hover:bg-slate-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* Course */}
              <td className="p-4">
                <div className={`font-medium transition-colors ${
                  isDark
                    ? 'text-slate-100'
                    : 'text-gray-900'
                }`}>{course.name}</div>
                <div className={`text-xs line-clamp-1 transition-colors ${
                  isDark
                    ? 'text-slate-400'
                    : 'text-gray-500'
                }`}>
                  {course.shortdescription || "No short description added"}
                </div>
              </td>

              <td className={`transition-colors ${
                isDark
                  ? 'text-slate-300'
                  : 'text-gray-900'
              }`}>{course.category}</td>
              <td className={`transition-colors ${
                isDark
                  ? 'text-slate-300'
                  : 'text-gray-900'
              }`}>{course.duration}</td>
              <td className={`font-semibold transition-colors ${
                isDark
                  ? 'text-slate-300'
                  : 'text-gray-900'
              }`}>₹{course.price}</td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-end gap-4 items-center">
                  {/* Edit course */}
                  <FiEdit
                    title="Edit Course"
                    className={`cursor-pointer transition-colors ${
                      isDark
                        ? 'text-blue-400 hover:text-blue-300'
                        : 'text-blue-600 hover:text-blue-700'
                    }`}
                    onClick={() => onEdit(course)}
                  />

                  {/* Add / View Details */}
                  {course.details ? (
                    <FiEye
                      title="View Details"
                      className={`cursor-pointer transition-colors ${
                        isDark
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      onClick={() =>
                        navigate(
                          `/dashboard/course/${course._id}/`
                        )
                      }
                    />
                  ) : (
                    <FiPlus
                      title="Add Details"
                      className={`cursor-pointer transition-colors ${
                        isDark
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      onClick={() =>
                        openModal(MODAL_TYPES.ADD_COURSE_DETAILS, {
                          courseId: course._id,
                        })
                      }
                    />
                  )}



                  {/* Delete with all details */}

                  <FiTrash2
                    title="Delete Course"
                    className={`cursor-pointer transition-colors ${
                      isDark
                        ? 'text-red-400 hover:text-red-300'
                        : 'text-red-500 hover:text-red-600'
                    }`}
                    onClick={() => onDelete(course._id)}
                  />

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



