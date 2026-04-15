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
} from '@/Services/admin/coursesService';

import { CourseDetailsSchema } from '@/utils/validations/courseDetailasSchema';
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
        className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="p-6 space-y-8">
            <div className="border-b pb-4 sticky top-0 bg-white z-20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <RiFileList3Line className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {isEdit ? "Edit Course Details" : "Create New Course"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {isEdit ? "Update your course information" : "Fill in all required information for your course"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onSuccess}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <FiX className="w-5 h-5" />
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

                  <Form className="space-y-8">
                    {/* Course Description */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <FiBook className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <label className="label text-lg font-semibold text-gray-800">
                            Course Description
                          </label>
                          <p className="text-sm text-gray-500">
                            What will students learn in this course?
                          </p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Field
                          as="textarea"
                          name="description"
                          rows={4}
                          placeholder="Describe the course content, teaching methods, and what makes this course unique..."
                          className="input min-h-[120px] resize-y focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <BsInfoCircle className="w-4 h-4" />
                          <span>Be specific about outcomes and benefits</span>
                        </div>
                        <ErrorMessage
                          name="description"
                          component="div"
                          className="text-sm text-red-500 mt-1 flex items-center gap-1"
                        >
                          {msg => (
                            <>
                              <FiAlertCircle className="w-4 h-4" />
                              {msg}
                            </>
                          )}
                        </ErrorMessage>
                      </div>
                    </motion.div>

                    {/* Learning Objectives */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 rounded-lg">
                          <FiTarget className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <label className="label text-lg font-semibold text-gray-800">
                            Learning Objectives
                          </label>
                          <p className="text-sm text-gray-500">
                            What will students be able to do after completing this course?
                          </p>
                        </div>
                      </div>

                      <FieldArray name="objectives">
                        {({ push, remove }) => (
                          <div className="space-y-3">
                            {values.objectives.map((objective, index) => (
                              <motion.div 
                                key={index} 
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 text-sm font-medium mt-2 flex-shrink-0">
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="relative">
                                    <Field
                                      name={`objectives.${index}`}
                                      placeholder={`Objective ${index + 1} (e.g., "Build a full-stack web application")`}
                                      className="input pr-10 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    />
                                    {values.objectives.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                           text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded"
                                        aria-label="Remove objective"
                                      >
                                        <FiTrash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                  <ErrorMessage
                                    name={`objectives.${index}`}
                                    component="div"
                                    className="text-sm text-red-500 mt-1 flex items-center gap-1"
                                  >
                                    {msg => (
                                      <>
                                        <FiAlertCircle className="w-4 h-4" />
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
                              className="inline-flex items-center gap-2 text-indigo-600 
                                 hover:text-indigo-700 font-medium text-sm mt-2
                                 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <FiPlus className="w-4 h-4" />
                              Add Another Objective
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </motion.div>

                    {/* Requirements */}
                    <motion.div 
                      className="space-y-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-50 rounded-lg">
                          <FiCheckCircle className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <label className="label text-lg font-semibold text-gray-800">
                            Requirements
                          </label>
                          <p className="text-sm text-gray-500">
                            What should students know or have before taking this course?
                          </p>
                        </div>
                      </div>

                      <FieldArray name="requirements">
                        {({ push, remove }) => (
                          <div className="space-y-3">
                            {values.requirements.map((requirement, index) => (
                              <motion.div 
                                key={index} 
                                className="flex items-start gap-3"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                              >
                                <div className="flex items-center justify-center w-5 h-5 
                                       rounded bg-purple-100 text-purple-600 mt-2 
                                       flex-shrink-0">
                                  <div className="w-2 h-2 rounded-full bg-purple-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="relative">
                                    <Field
                                      name={`requirements.${index}`}
                                      placeholder={`Requirement ${index + 1} (e.g., "Basic knowledge of JavaScript")`}
                                      className="input pr-10 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                                    />
                                    {values.requirements.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                                           text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded"
                                        aria-label="Remove requirement"
                                      >
                                        <FiTrash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                            <button
                              type="button"
                              onClick={() => push("")}
                              className="inline-flex items-center gap-2 text-indigo-600 
                                 hover:text-indigo-700 font-medium text-sm mt-2
                                 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                            >
                              <FiPlus className="w-4 h-4" />
                              Add Another Requirement
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </motion.div>

                    {/* Curriculum */}
                    <motion.div 
                      className="space-y-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-orange-50 rounded-lg">
                            <FiMenu className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <label className="label text-lg font-semibold text-gray-800">
                              Course Curriculum
                            </label>
                            <p className="text-sm text-gray-500">
                              Organize your course content into weeks and sessions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                          <TbArrowsSort className="w-4 h-4" />
                          <span>{values.curriculum.length} week{values.curriculum.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <BsArrowsMove className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
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
                          <div className="space-y-4">
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
                                    className="w-full flex items-center justify-center 
                                       gap-3 p-6 border-2 border-dashed 
                                       border-gray-300 rounded-xl hover:border-indigo-400 
                                       hover:bg-indigo-50 text-gray-600 hover:text-indigo-700 
                                       transition-all group"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <div className="p-2 bg-indigo-100 group-hover:bg-indigo-200 rounded-lg transition-colors">
                                      <FiPlus className="w-5 h-5 text-indigo-600" />
                                    </div>
                                    <span className="font-medium">Add New Week</span>
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
                          className="p-4 bg-red-50 border border-red-200 rounded-lg"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex items-start gap-3">
                            <FiAlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-red-800">
                                Please complete all required fields
                              </p>
                              <p className="text-sm text-red-600 mt-1">
                                Check highlighted fields above for errors
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Action Buttons */}
                    <motion.div 
                      className="flex items-center justify-end gap-3 pt-6 border-t"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.button
                        type="button"
                        onClick={onSuccess}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg 
                           text-gray-700 hover:bg-gray-50 font-medium 
                           transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiX className="w-4 h-4" />
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all 
                           ${!isValid || isSubmitting
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                          }`}
                        whileHover={{ scale: !isValid || isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: !isValid || isSubmitting ? 1 : 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FiSave className="w-4 h-4" />
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