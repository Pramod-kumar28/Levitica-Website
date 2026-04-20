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
  
} from "react-icons/fi";

const CoursesManagement = () => {
  const { courses = [] } = useCourses();
  const { openModal } = useModal();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { handleDeleteCourse } = useCourseHandlers();

  const [view, setView] = useState("cards");



  return (
    <div className={`space-y-6 py-3 rounded-xl transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen'
        : 'bg-white'
    }`}>
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6">
        <div>
          <h1 className={`text-2xl font-bold transition-colors ${
            isDark
              ? 'text-slate-100'
              : 'text-gray-900'
          }`}>
            Course Management
          </h1>
          <p className={`transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-gray-500'
          }`}>
            Manage courses and their batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.ADD_COURSE, { mode: "add" })}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
            isDark
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <FiPlus />
          Add Course
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center px-6">
        <span className={`text-sm transition-colors ${
          isDark
            ? 'text-slate-400'
            : 'text-gray-500'
        }`}>
          {courses.length} total courses
        </span>

        <div className={`flex rounded-lg p-1 transition-colors ${
          isDark
            ? 'bg-slate-700'
            : 'bg-gray-100'
        }`}>
          <button
            onClick={() => setView("cards")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
              view === "cards" 
                ? isDark
                  ? 'bg-slate-600 shadow'
                  : 'bg-white shadow'
                : ''
            }`}
          >
            <FiGrid /> Cards
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
              view === "table" 
                ? isDark
                  ? 'bg-slate-600 shadow'
                  : 'bg-white shadow'
                : ''
            }`}
          >
            <FiList /> Table
          </button>
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



