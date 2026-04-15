import { motion, AnimatePresence } from "framer-motion";
import { useCourseHandlers } from "./courseshooks";
import { useCourses } from '@/hooks/useCourses';
import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
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
  const { handleDeleteCourse } = useCourseHandlers();

  const [view, setView] = useState("cards");



  return (
    <div className=" space-y-6 py-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-500">
            Manage courses and their batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.ADD_COURSE, { mode: "add" })}
          className="flex items-center gap-2 bg-blue-600 text-white
                     px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FiPlus />
          Add Course
        </button>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {courses.length} total courses
        </span>

        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView("cards")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md
              ${view === "cards" ? "bg-white shadow" : ""}`}
          >
            <FiGrid /> Cards
          </button>
          <button
            onClick={() => setView("table")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md
              ${view === "table" ? "bg-white shadow" : ""}`}
          >
            <FiList /> Table
          </button>
        </div>
      </div>


      {/* Content */}
      <AnimatePresence mode="wait">
        {view === "cards" ? (
          <CoursesCardView
            courses={courses}

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
  );
};
export default CoursesManagement;





const CoursesCardView = ({
  courses,
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
          className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md"
        >
          <div className="relative h-40">
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Header */}
          <div className="flex justify-between mt-3">

            <div>
              <h3 className="font-semibold text-lg">{course.name}</h3>
              <p className="text-sm text-gray-500">
                {course.category}
              </p>
            </div>
            <span className="text-blue-600 font-semibold">
              {course.price === 0 ? "Free" : `₹${course.price}`}
            </span>
          </div>

          {/* Meta */}
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">
            {course.shortdescription || "No  Short description added yet"}
          </p>

          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-500">
              {course.duration}
            </span>

            {/* Actions */}
            <div className="flex gap-3 items-center">
              {/* Edit course */}
              <FiEdit
                title="Edit Course"
                className="text-blue-600 cursor-pointer"
                onClick={() => onEdit(course)}
              />

              {/* Add / View Details */}
              {course.details ? (
                <FiEye
                  title="View Details"
                  className="text-green-600 cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/course/${course._id}`)
                  }
                />
              ) : (
                <FiPlus
                  title="Add Details"
                  className="text-green-600 cursor-pointer"
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
                className="text-red-500 cursor-pointer"
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
  onEdit,
  onDelete,

}) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm text-gray-500">
            <th className="p-4">Course</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Price</th>
            <th className="text-right p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="border-t">
              {/* Course */}
              <td className="p-4">
                <div className="font-medium">{course.name}</div>
                <div className="text-xs text-gray-500 line-clamp-1">
                  {course.shortdescription || "No short description added"}
                </div>
              </td>

              <td>{course.category}</td>
              <td>{course.duration}</td>
              <td className="font-semibold">₹{course.price}</td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-end gap-4 items-center">
                  {/* Edit course */}
                  <FiEdit
                    title="Edit Course"
                    className="cursor-pointer text-blue-600"
                    onClick={() => onEdit(course)}
                  />

                  {/* Add / View Details */}
                  {course.details ? (
                    <FiEye
                      title="View Details"
                      className="cursor-pointer text-green-600"
                      onClick={() =>
                        navigate(
                          `/dashboard/course/${course._id}/`
                        )
                      }
                    />
                  ) : (
                    <FiPlus
                      title="Add Details"
                      className="cursor-pointer text-green-600"
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
                    className="cursor-pointer text-red-500"
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



