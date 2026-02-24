import { motion, AnimatePresence } from "framer-motion";
import { useCourseHandlers } from "./courseshooks";
import { useCourses } from "../../../../hooks/useCourses";
import { MODAL_TYPES, useModal } from "../Modals/ModalContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiEye,
  FiGrid,
  FiList,
  FiDownload,
  FiX,
} from "react-icons/fi";

const CoursesManagement = () => {
  const { courses = [] } = useCourses();
  const { openModal } = useModal();
  const { handleDeleteCourse } = useCourseHandlers();

  const [view, setView] = useState("cards");
  const [expandedCourse, setExpandedCourse] = useState(null);

  const handleViewBatches = (courseId) => {
    setExpandedCourse(prev => (prev === courseId ? null : courseId));
  };

  return (
    <div className=" tw-space-y-6 tw-py-3">
      {/* Header */}
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">
            Course Management
          </h1>
          <p className="tw-text-gray-500">
            Manage courses and their batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.ADD_COURSE, { mode: "add" })}
          className="tw-flex tw-items-center tw-gap-2 tw-bg-blue-600 tw-text-white
                     tw-px-4 tw-py-2 tw-rounded-lg hover:tw-bg-blue-700"
        >
          <FiPlus />
          Add Course
        </button>
      </div>

      {/* View Toggle */}
      <div className="tw-flex tw-justify-between tw-items-center">
        <span className="tw-text-sm tw-text-gray-500">
          {courses.length} total courses
        </span>

        <div className="tw-flex tw-bg-gray-100 tw-rounded-lg tw-p-1">
          <button
            onClick={() => setView("cards")}
            className={`tw-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1.5 tw-rounded-md
              ${view === "cards" ? "tw-bg-white tw-shadow" : ""}`}
          >
            <FiGrid /> Cards
          </button>
          <button
            onClick={() => setView("table")}
            className={`tw-flex tw-items-center tw-gap-1 tw-px-3 tw-py-1.5 tw-rounded-md
              ${view === "table" ? "tw-bg-white tw-shadow" : ""}`}
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
            expandedCourse={expandedCourse}
            onEdit={(course) =>
              openModal(MODAL_TYPES.ADD_COURSE, { mode: "edit", course })
            }
            onDelete={handleDeleteCourse}
            onViewBatches={handleViewBatches}
          />
        ) : (
          <CoursesTableView
            courses={courses}
            onEdit={(course) =>
              openModal(MODAL_TYPES.ADD_COURSE, { mode: "edit", course })
            }
            onDelete={handleDeleteCourse}
            onViewBatches={handleViewBatches}
          />
        )}
      </AnimatePresence>

      {/* Batch Section */}
      <AnimatePresence>
        {expandedCourse && (
          <BatchSection
            courseId={expandedCourse}
            onClose={() => setExpandedCourse(null)}
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
  onViewBatches,
}) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
      {courses.map((course) => (
        <motion.div
          key={course._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="tw-bg-white tw-rounded-xl tw-border tw-p-5 tw-shadow-sm hover:tw-shadow-md"
        >
          <div className="tw-relative tw-h-40">
            <img
          src={course.thumbnail}
          alt={course.name}
          className="tw-w-full tw-h-full tw-object-cover"
        />
          </div>
          {/* Header */}
          <div className="tw-flex tw-justify-between tw-mt-3">

            <div>
              <h3 className="tw-font-semibold tw-text-lg">{course.name}</h3>
              <p className="tw-text-sm tw-text-gray-500">
                {course.category}
              </p>
            </div>
            <span className="tw-text-blue-600 tw-font-semibold">
              ₹{course.price}
            </span>
          </div>

          {/* Meta */}
          <p className="tw-text-sm tw-text-gray-600 tw-mt-3 line-clamp-2">
            {course.shortdescription || "No  Short description added yet"}
          </p>

          <div className="tw-flex tw-justify-between tw-items-center tw-mt-4">
            <span className="tw-text-xs tw-text-gray-500">
              {course.duration}
            </span>

            {/* Actions */}
            <div className="tw-flex tw-gap-3 tw-items-center">
              {/* Edit course */}
              <FiEdit
                title="Edit Course"
                className="tw-text-blue-600 tw-cursor-pointer"
                onClick={() => onEdit(course)}
              />

              {/* Add / View Details */}
              {course.details ? (
                <FiEye
                  title="View Details"
                  className="tw-text-green-600 tw-cursor-pointer"
                  onClick={() =>
                    navigate(`/dashboard/course/${course._id}`)
                  }
                />
              ) : (
                <FiPlus
                  title="Add Details"
                  className="tw-text-green-600 tw-cursor-pointer"
                  onClick={() =>
                    openModal(MODAL_TYPES.ADD_COURSE_DETAILS, {
                      courseId: course._id,
                    })
                  }
                />
              )}

              {/* View batches */}
              <FiUsers
                title="View Batches"
                className="tw-text-gray-600 tw-cursor-pointer"
                onClick={() => onViewBatches(course._id)}
              />

              {/* Delete ONLY if no details */}
              {!course.details && (
                <FiTrash2
                  title="Delete Course"
                  className="tw-text-red-500 tw-cursor-pointer"
                  onClick={() => onDelete(course._id)}
                />
              )}
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
  onViewBatches,
}) => {
  const navigate = useNavigate();
  const { openModal } = useModal();

  return (
    <div className="tw-bg-white tw-rounded-xl tw-border tw-overflow-hidden">
      <table className="tw-w-full">
        <thead className="tw-bg-gray-50">
          <tr className="tw-text-left tw-text-sm tw-text-gray-500">
            <th className="tw-p-4">Course</th>
            <th>Category</th>
            <th>Duration</th>
            <th>Price</th>
            <th className="tw-text-right tw-p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course._id} className="tw-border-t">
              {/* Course */}
              <td className="tw-p-4">
                <div className="tw-font-medium">{course.name}</div>
                <div className="tw-text-xs tw-text-gray-500 line-clamp-1">
                  {course.shortdescription || "No short description added"}
                </div>
              </td>

              <td>{course.category}</td>
              <td>{course.duration}</td>
              <td className="tw-font-semibold">₹{course.price}</td>

              {/* Actions */}
              <td className="tw-p-4">
                <div className="tw-flex tw-justify-end tw-gap-4 tw-items-center">
                  {/* Edit course */}
                  <FiEdit
                    title="Edit Course"
                    className="tw-cursor-pointer tw-text-blue-600"
                    onClick={() => onEdit(course)}
                  />

                  {/* Add / View Details */}
                  {course.details ? (
                    <FiEye
                      title="View Details"
                      className="tw-cursor-pointer tw-text-green-600"
                      onClick={() =>
                        navigate(
                          `/dashboard/course/${course._id}/`
                        )
                      }
                    />
                  ) : (
                    <FiPlus
                      title="Add Details"
                      className="tw-cursor-pointer tw-text-green-600"
                      onClick={() =>
                        openModal(MODAL_TYPES.ADD_COURSE_DETAILS, {
                          courseId: course._id,
                        })
                      }
                    />
                  )}

                  {/* View batches */}
                  <FiUsers
                    title="View Batches"
                    className="tw-cursor-pointer tw-text-gray-600"
                    onClick={() => onViewBatches(course._id)}
                  />

                  {/* Delete only if no details */}
                  {!course.details && (
                    <FiTrash2
                      title="Delete Course"
                      className="tw-cursor-pointer tw-text-red-500"
                      onClick={() => onDelete(course._id)}
                    />
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



const BatchSection = ({ courseId, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="tw-bg-white tw-border tw-rounded-xl tw-p-6 tw-shadow-lg"
  >
    <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
      <div>
        <h3 className="tw-font-semibold">Batches</h3>
        <p className="tw-text-sm tw-text-gray-500">
          Course ID: {courseId}
        </p>
      </div>
      <div className="tw-flex tw-gap-3">
        <button className="tw-flex tw-items-center tw-gap-1 tw-text-sm">
          <FiDownload /> Export
        </button>
        <FiX
          className="tw-cursor-pointer"
          onClick={onClose}
        />
      </div>
    </div>

    <div className="tw-text-gray-500 tw-text-sm">
      Batch listing goes here (API integration next)
    </div>
  </motion.div>
);

