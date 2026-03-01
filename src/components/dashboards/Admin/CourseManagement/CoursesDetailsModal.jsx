import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { v4 as uuid } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion, AnimatePresence } from 'framer-motion';

import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

import {
  useAddCourseDetailsMutation,
  useUpdateCourseDetailsMutation,
  useUpdateCurriculumMutation,
} from "../../../../Services/admin/coursesService";

import { CourseDetailsSchema } from "../../../../utils/validations/courseDetailasSchema";
import useCurriculumAutosave from "./useCurriculumAutoSave";
import SortableWeekItem from "./SortableWeekItem";

// React Icons
import {
  FiBook,
  FiTarget,
  FiCheckCircle,
  FiMenu,
  FiPlus,
  FiTrash2,
  FiX,
  FiSave,
  FiAlertCircle,
 
} from "react-icons/fi";
import {
  BsArrowsMove,  // Changed from BsArrowUpDown
  BsInfoCircle
} from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import { TbArrowsSort } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const emptyValues = {
  description: "",
  objectives: [""],
  requirements: [""],
  curriculum: [
    {
      id: uuid(),
      title: "",
      sessions: [{ id: uuid(), title: "" }],
    },
  ],
};

const CurriculumAutosaveWatcher = ({ curriculum, courseId, updateCurriculum, enabled }) => {
  useCurriculumAutosave(curriculum, courseId, updateCurriculum, enabled);
  return null;
};

const CourseDetailsModal = ({ courseId, initialData, onSuccess }) => {

  const isEdit = Boolean(initialData);

  const [addDetails] = useAddCourseDetailsMutation();
  const [updateDetails] = useUpdateCourseDetailsMutation();
  const [updateCurriculum] = useUpdateCurriculumMutation();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event, values, setFieldValue) => {
    const { active, over } = event;

    if (active && over && active.id !== over.id) {
      const oldIndex = values.curriculum.findIndex((w) => w.id === active.id);
      const newIndex = values.curriculum.findIndex((w) => w.id === over.id);

      setFieldValue(
        "curriculum",
        arrayMove(values.curriculum, oldIndex, newIndex)
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="tw-fixed tw-inset-0 tw-z-[1100] tw-flex tw-items-center tw-justify-center tw-bg-slate-900/60 tw-backdrop-blur-sm tw-p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="tw-w-full tw-max-w-4xl tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-2xl tw-max-h-[90vh] tw-overflow-y-auto"
        >
          <div className="tw-p-6 tw-space-y-8">
            <div className="tw-border-b tw-pb-4 tw-sticky tw-top-0 tw-bg-white tw-z-20">
              <div className="tw-flex tw-items-center tw-justify-between">
                <div className="tw-flex tw-items-center tw-gap-3">
                  <div className="tw-p-2 tw-bg-indigo-100 tw-rounded-lg">
                    <RiFileList3Line className="tw-w-6 tw-h-6 tw-text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="tw-text-2xl tw-font-bold tw-text-gray-800">
                      {isEdit ? "Edit Course Details" : "Create New Course"}
                    </h2>
                    <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
                      {isEdit ? "Update your course information" : "Fill in all required information for your course"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onSuccess}
                  className="tw-p-2 tw-text-gray-400 hover:tw-text-gray-600 hover:tw-bg-gray-100 tw-rounded-lg tw-transition-colors"
                  aria-label="Close modal"
                >
                  <FiX className="tw-w-5 tw-h-5" />
                </button>
              </div>
            </div>

            <Formik
              initialValues={initialData || emptyValues}
              validationSchema={CourseDetailsSchema}
              enableReinitialize
              onSubmit={async (values, { setSubmitting }) => {
                
                try {
                  if (isEdit) {
                    await updateDetails({ courseId, body: values }).unwrap();
                  } else {
                    await addDetails({ courseId, body: values }).unwrap();
                  }
                  onSuccess();
                } catch (error) {
                  console.error("Failed to save course details:", error);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, isValid, isSubmitting, errors, touched, setFieldValue }) => (
                <>
                  <CurriculumAutosaveWatcher
                    curriculum={values.curriculum}
                    courseId={courseId}
                    updateCurriculum={updateCurriculum}
                    enabled={isEdit}
                  />

                  <Form className="tw-space-y-8">
                    {/* Course Description */}
                    <motion.div 
                      className="tw-space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="tw-flex tw-items-center tw-gap-3">
                        <div className="tw-p-2 tw-bg-blue-50 tw-rounded-lg">
                          <FiBook className="tw-w-5 tw-h-5 tw-text-blue-600" />
                        </div>
                        <div>
                          <label className="tw-label tw-text-lg tw-font-semibold tw-text-gray-800">
                            Course Description
                          </label>
                          <p className="tw-text-sm tw-text-gray-500">
                            What will students learn in this course?
                          </p>
                        </div>
                      </div>
                      <div className="tw-space-y-2">
                        <Field
                          as="textarea"
                          name="description"
                          rows={4}
                          placeholder="Describe the course content, teaching methods, and what makes this course unique..."
                          className="tw-input tw-min-h-[120px] tw-resize-y focus:tw-border-blue-500 focus:tw-ring-2 focus:tw-ring-blue-200"
                        />
                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-text-gray-500">
                          <BsInfoCircle className="tw-w-4 tw-h-4" />
                          <span>Be specific about outcomes and benefits</span>
                        </div>
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="tw-text-sm tw-text-red-500 tw-mt-1 tw-flex tw-items-center tw-gap-1"
                        >
                          {msg => (
                            <>
                              <FiAlertCircle className="tw-w-4 tw-h-4" />
                              {msg}
                            </>
                          )}
                        </ErrorMessage>
                      </div>
                    </motion.div>

                    {/* Learning Objectives */}
                    <motion.div 
                      className="tw-space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="tw-flex tw-items-center tw-gap-3">
                        <div className="tw-p-2 tw-bg-green-50 tw-rounded-lg">
                          <FiTarget className="tw-w-5 tw-h-5 tw-text-green-600" />
                        </div>
                        <div>
                          <label className="tw-label tw-text-lg tw-font-semibold tw-text-gray-800">
                            Learning Objectives
                          </label>
                          <p className="tw-text-sm tw-text-gray-500">
                            What will students be able to do after completing this course?
                          </p>
                        </div>
                      </div>

                      <FieldArray name="objectives">
                        {({ push, remove }) => (
                          <div className="tw-space-y-3">
                            {values.objectives.map((objective, index) => (
                              <motion.div 
                                key={index} 
                                className="tw-flex tw-items-start tw-gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="tw-flex tw-items-center tw-justify-center tw-w-6 tw-h-6 tw-rounded-full tw-bg-green-100 tw-text-green-600 tw-text-sm tw-font-medium tw-mt-2 tw-flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="tw-flex-1">
                                  <div className="tw-relative">
                                    <Field
                                      name={`objectives.${index}`}
                                      placeholder={`Objective ${index + 1} (e.g., "Build a full-stack web application")`}
                                      className="tw-input tw-pr-10 focus:tw-border-green-500 focus:tw-ring-2 focus:tw-ring-green-200"
                                    />
                                    {values.objectives.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="tw-absolute tw-right-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 
                                           tw-text-gray-400 hover:tw-text-red-500 hover:tw-bg-red-50 tw-p-1 tw-rounded"
                                        aria-label="Remove objective"
                                      >
                                        <FiTrash2 className="tw-w-4 tw-h-4" />
                                      </button>
                                    )}
                                  </div>
                                  <ErrorMessage
                                    name={`objectives.${index}`}
                                    component="div"
                                    className="tw-text-sm tw-text-red-500 tw-mt-1 tw-flex tw-items-center tw-gap-1"
                                  >
                                    {msg => (
                                      <>
                                        <FiAlertCircle className="tw-w-4 tw-h-4" />
                                        {msg}
                                      </>
                                    )}
                                  </ErrorMessage>
                                </div>
                              </motion.div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push("")}
                              className="tw-inline-flex tw-items-center tw-gap-2 tw-text-indigo-600 
                                 hover:tw-text-indigo-700 tw-font-medium tw-text-sm tw-mt-2
                                 tw-p-2 hover:tw-bg-indigo-50 tw-rounded-lg tw-transition-colors"
                            >
                              <FiPlus className="tw-w-4 tw-h-4" />
                              Add Another Objective
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </motion.div>

                    {/* Requirements */}
                    <motion.div 
                      className="tw-space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="tw-flex tw-items-center tw-gap-3">
                        <div className="tw-p-2 tw-bg-purple-50 tw-rounded-lg">
                          <FiCheckCircle className="tw-w-5 tw-h-5 tw-text-purple-600" />
                        </div>
                        <div>
                          <label className="tw-label tw-text-lg tw-font-semibold tw-text-gray-800">
                            Requirements
                          </label>
                          <p className="tw-text-sm tw-text-gray-500">
                            What should students know or have before taking this course?
                          </p>
                        </div>
                      </div>

                      <FieldArray name="requirements">
                        {({ push, remove }) => (
                          <div className="tw-space-y-3">
                            {values.requirements.map((requirement, index) => (
                              <motion.div 
                                key={index} 
                                className="tw-flex tw-items-start tw-gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="tw-flex tw-items-center tw-justify-center tw-w-5 tw-h-5 
                                       tw-rounded tw-bg-purple-100 tw-text-purple-600 tw-mt-2 
                                       tw-flex-shrink-0">
                                  <div className="tw-w-2 tw-h-2 tw-rounded-full tw-bg-purple-600" />
                                </div>
                                <div className="tw-flex-1">
                                  <div className="tw-relative">
                                    <Field
                                      name={`requirements.${index}`}
                                      placeholder={`Requirement ${index + 1} (e.g., "Basic knowledge of JavaScript")`}
                                      className="tw-input tw-pr-10 focus:tw-border-purple-500 focus:tw-ring-2 focus:tw-ring-purple-200"
                                    />
                                    {values.requirements.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="tw-absolute tw-right-3 tw-top-1/2 tw-transform -tw-translate-y-1/2 
                                           tw-text-gray-400 hover:tw-text-red-500 hover:tw-bg-red-50 tw-p-1 tw-rounded"
                                        aria-label="Remove requirement"
                                      >
                                        <FiTrash2 className="tw-w-4 tw-h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push("")}
                              className="tw-inline-flex tw-items-center tw-gap-2 tw-text-indigo-600 
                                 hover:tw-text-indigo-700 tw-font-medium tw-text-sm tw-mt-2
                                 tw-p-2 hover:tw-bg-indigo-50 tw-rounded-lg tw-transition-colors"
                            >
                              <FiPlus className="tw-w-4 tw-h-4" />
                              Add Another Requirement
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </motion.div>

                    {/* Curriculum */}
                    <motion.div 
                      className="tw-space-y-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="tw-flex tw-items-center tw-justify-between">
                        <div className="tw-flex tw-items-center tw-gap-3">
                          <div className="tw-p-2 tw-bg-orange-50 tw-rounded-lg">
                            <FiMenu className="tw-w-5 tw-h-5 tw-text-orange-600" />
                          </div>
                          <div>
                            <label className="tw-label tw-text-lg tw-font-semibold tw-text-gray-800">
                              Course Curriculum
                            </label>
                            <p className="tw-text-sm tw-text-gray-500">
                              Organize your course content into weeks and sessions
                            </p>
                          </div>
                        </div>
                        <div className="tw-flex tw-items-center tw-gap-2 tw-text-sm tw-font-medium tw-text-gray-600">
                          <TbArrowsSort className="tw-w-4 tw-h-4" />
                          <span>{values.curriculum.length} week{values.curriculum.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      <div className="tw-flex tw-items-center tw-gap-2 tw-p-3 tw-bg-gray-50 tw-rounded-lg">
                        <BsArrowsMove className="tw-w-4 tw-h-4 tw-text-gray-500" />
                        <span className="tw-text-sm tw-text-gray-600">
                          Drag weeks to reorder. Click and hold the grip icon to drag.
                        </span>
                      </div>

                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        modifiers={[restrictToVerticalAxis]}
                        onDragEnd={(event) => handleDragEnd(event, values, setFieldValue)}
                      >
                        <SortableContext
                          items={values.curriculum.map((w) => w.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="tw-space-y-4">
                            <FieldArray name="curriculum">
                              {({ push, remove }) => (
                                <>
                                  {values.curriculum.map((week, weekIndex) => (
                                    <SortableWeekItem
                                      key={week.id}
                                      week={week}
                                      weekIndex={weekIndex}
                                      removeWeek={remove}
                                      setFieldValue={setFieldValue}
                                    />
                                  ))}

                                  <motion.button
                                    type="button"
                                    onClick={() =>
                                      push({
                                        id: uuid(),
                                        title: "",
                                        sessions: [{ id: uuid(), title: "" }],
                                      })
                                    }
                                    className="tw-w-full tw-flex tw-items-center tw-justify-center 
                                       tw-gap-3 tw-p-6 tw-border-2 tw-border-dashed 
                                       tw-border-gray-300 tw-rounded-xl hover:tw-border-indigo-400 
                                       hover:tw-bg-indigo-50 tw-text-gray-600 hover:tw-text-indigo-700 
                                       tw-transition-all tw-group"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <div className="tw-p-2 tw-bg-indigo-100 group-hover:tw-bg-indigo-200 tw-rounded-lg tw-transition-colors">
                                      <FiPlus className="tw-w-5 tw-h-5 tw-text-indigo-600" />
                                    </div>
                                    <span className="tw-font-medium">Add New Week</span>
                                  </motion.button>
                                </>
                              )}
                            </FieldArray>
                          </div>
                        </SortableContext>
                      </DndContext>
                    </motion.div>

                    {/* Validation Errors */}
                    <AnimatePresence>
                      {Object.keys(errors).length > 0 && (
                        <motion.div 
                          className="tw-p-4 tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-lg"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="tw-flex tw-items-start tw-gap-3">
                            <FiAlertCircle className="tw-w-5 tw-h-5 tw-text-red-500 tw-flex-shrink-0 tw-mt-0.5" />
                            <div>
                              <p className="tw-text-sm tw-font-medium tw-text-red-800">
                                Please complete all required fields
                              </p>
                              <p className="tw-text-sm tw-text-red-600 tw-mt-1">
                                Check highlighted fields above for errors
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <motion.div 
                      className="tw-flex tw-items-center tw-justify-end tw-gap-3 tw-pt-6 tw-border-t"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        type="button"
                        onClick={onSuccess}
                        className="tw-inline-flex tw-items-center tw-gap-2 tw-px-5 tw-py-2.5 tw-border tw-border-gray-300 tw-rounded-lg 
                           tw-text-gray-700 hover:tw-bg-gray-50 tw-font-medium 
                           tw-transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiX className="tw-w-4 tw-h-4" />
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`tw-inline-flex tw-items-center tw-gap-2 tw-px-5 tw-py-2.5 tw-rounded-lg tw-font-medium tw-transition-all 
                           ${!isValid || isSubmitting
                            ? "tw-bg-gray-100 tw-text-gray-400 tw-cursor-not-allowed"
                            : "tw-bg-indigo-600 hover:tw-bg-indigo-700 tw-text-white"
                          }`}
                        whileHover={{ scale: !isValid || isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: !isValid || isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <AiOutlineLoading3Quarters className="tw-w-4 tw-h-4 tw-animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave className="tw-w-4 tw-h-4" />
                            {isEdit ? "Update Course" : "Create Course"}
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CourseDetailsModal;