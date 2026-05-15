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
import { useTheme } from '@/context/ThemeContext';

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
  BsArrowsMove,
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        className="fixed inset-0 z-999 flex items-center justify-center bg-midnight_text/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className={`w-full max-w-4xl overflow-hidden rounded-lg shadow-property max-h-[90vh] overflow-y-auto transition-all duration-150 ${
            isDark
              ? 'bg-semidark border border-dark_border'
              : 'bg-white border border-border'
          }`}
        >
          <div className="p-6 space-y-8">
            <div className={`border-b pb-4 sticky top-0 z-20 transition-colors duration-150 ${
              isDark
                ? 'border-dark_border bg-semidark'
                : 'border-border bg-white'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors duration-150 ${
                    isDark
                      ? 'bg-primary/10'
                      : 'bg-primary/5'
                  }`}>
                    <RiFileList3Line className={`w-6 h-6 transition-colors duration-150 ${
                      isDark
                        ? 'text-primary'
                        : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold transition-colors duration-150 ${
                      isDark
                        ? 'text-light'
                        : 'text-midnight_text'
                    }`}>
                      {isEdit ? "Edit Course Details" : "Create New Course"}
                    </h2>
                    <p className={`text-sm mt-1 transition-colors duration-150 text-gray`}>
                      {isEdit ? "Update your course information" : "Fill in all required information for your course"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onSuccess}
                  className={`p-2 rounded-lg transition-all duration-150 ${
                    isDark
                      ? 'text-gray hover:text-light hover:bg-darklight'
                      : 'text-gray hover:text-midnight_text hover:bg-light'
                  }`}
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
              {({ values, isValid, isSubmitting, errors, setFieldValue }) => (
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
                        <div className={`p-2 rounded-lg transition-colors duration-150 ${
                          isDark
                            ? 'bg-primary/10'
                            : 'bg-primary/5'
                        }`}>
                          <FiBook className={`w-5 h-5 transition-colors duration-150 ${
                            isDark
                              ? 'text-primary'
                              : 'text-primary'
                          }`} />
                        </div>
                        <div>
                          <label className={`text-lg font-semibold transition-colors duration-150 ${
                            isDark
                              ? 'text-light'
                              : 'text-midnight_text'
                          }`}>
                            Course Description
                          </label>
                          <p className={`text-sm transition-colors duration-150 text-gray`}>
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
                          className={`min-h-[120px] resize-y rounded-lg border px-3 py-2 transition-all duration-150 focus:outline-none focus:ring-2 ${
                            isDark
                              ? 'bg-semidark border-dark_border text-light placeholder-darkgray focus:border-primary focus:ring-primary/30'
                              : 'bg-white border-border text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20'
                          }`}
                        />
                        <div className={`flex items-center gap-2 text-sm transition-colors duration-150 text-gray`}>
                          <BsInfoCircle className="w-4 h-4" />
                          <span>Be specific about outcomes and benefits</span>
                        </div>
                        <ErrorMessage
                          name="description"
                          component="div"
                          className={`text-sm mt-1 flex items-center gap-1 transition-colors duration-150 ${
                            isDark
                              ? 'text-rose-500'
                              : 'text-rose-600'
                          }`}
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
                        <div className={`p-2 rounded-lg transition-colors duration-150 ${
                          isDark
                            ? 'bg-emerald-500/10'
                            : 'bg-emerald-50'
                        }`}>
                          <FiTarget className={`w-5 h-5 transition-colors duration-150 ${
                            isDark
                              ? 'text-emerald-400'
                              : 'text-emerald-600'
                          }`} />
                        </div>
                        <div>
                          <label className={`text-lg font-semibold transition-colors duration-150 ${
                            isDark
                              ? 'text-light'
                              : 'text-midnight_text'
                          }`}>
                            Learning Objectives
                          </label>
                          <p className={`text-sm transition-colors duration-150 text-gray`}>
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
                                <div className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium mt-2 flex-shrink-0 ${
                                  isDark
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                  {index + 1}
                                </div>
                                <div className="flex-1">
                                  <div className="relative">
                                    <Field
                                      name={`objectives.${index}`}
                                      placeholder={`Objective ${index + 1} (e.g., "Build a full-stack web application")`}
                                      className={`w-full rounded-lg border px-3 py-2 pr-10 transition-all duration-150 focus:outline-none focus:ring-2 ${
                                        isDark
                                          ? 'bg-semidark border-dark_border text-light placeholder-darkgray focus:border-emerald-400 focus:ring-emerald-400/30'
                                          : 'bg-white border-border text-midnight_text placeholder-gray focus:border-emerald-500 focus:ring-emerald-500/20'
                                      }`}
                                    />
                                    {values.objectives.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-all duration-150 ${
                                          isDark
                                            ? 'text-gray hover:text-rose-400 hover:bg-darklight'
                                            : 'text-gray hover:text-rose-500 hover:bg-light'
                                        }`}
                                        aria-label="Remove objective"
                                      >
                                        <FiTrash2 className="w-4 h-4" />
                                      </button>
                                    )}
                                  </div>
                                  <ErrorMessage
                                    name={`objectives.${index}`}
                                    component="div"
                                    className={`text-sm mt-1 flex items-center gap-1 transition-colors duration-150 ${
                                      isDark ? 'text-rose-500' : 'text-rose-600'
                                    }`}
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
                              className={`inline-flex items-center gap-2 font-medium text-sm mt-2 p-2 rounded-lg transition-all duration-150 ${
                                isDark
                                  ? 'text-cyan hover:text-cyan hover:bg-primary/10'
                                  : 'text-primary hover:text-secondary hover:bg-primary/5'
                              }`}
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
                        <div className={`p-2 rounded-lg transition-colors duration-150 ${
                          isDark
                            ? 'bg-purple-500/10'
                            : 'bg-purple-50'
                        }`}>
                          <FiCheckCircle className={`w-5 h-5 transition-colors duration-150 ${
                            isDark
                              ? 'text-purple-400'
                              : 'text-purple-600'
                          }`} />
                        </div>
                        <div>
                          <label className={`text-lg font-semibold transition-colors duration-150 ${
                            isDark
                              ? 'text-light'
                              : 'text-midnight_text'
                          }`}>
                            Requirements
                          </label>
                          <p className={`text-sm transition-colors duration-150 text-gray`}>
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
                                <div className={`flex items-center justify-center w-5 h-5 rounded mt-2 flex-shrink-0 ${
                                  isDark
                                    ? 'bg-purple-500/20'
                                    : 'bg-purple-100'
                                }`}>
                                  <div className={`w-2 h-2 rounded-full ${
                                    isDark ? 'bg-purple-400' : 'bg-purple-600'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <div className="relative">
                                    <Field
                                      name={`requirements.${index}`}
                                      placeholder={`Requirement ${index + 1} (e.g., "Basic knowledge of JavaScript")`}
                                      className={`w-full rounded-lg border px-3 py-2 pr-10 transition-all duration-150 focus:outline-none focus:ring-2 ${
                                        isDark
                                          ? 'bg-semidark border-dark_border text-light placeholder-darkgray focus:border-purple-400 focus:ring-purple-400/30'
                                          : 'bg-white border-border text-midnight_text placeholder-gray focus:border-purple-500 focus:ring-purple-500/20'
                                      }`}
                                    />
                                    {values.requirements.length > 1 && (
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded transition-all duration-150 ${
                                          isDark
                                            ? 'text-gray hover:text-rose-400 hover:bg-darklight'
                                            : 'text-gray hover:text-rose-500 hover:bg-light'
                                        }`}
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
                              className={`inline-flex items-center gap-2 font-medium text-sm mt-2 p-2 rounded-lg transition-all duration-150 ${
                                isDark
                                  ? 'text-cyan hover:text-cyan hover:bg-primary/10'
                                  : 'text-primary hover:text-secondary hover:bg-primary/5'
                              }`}
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
                          <div className={`p-2 rounded-lg transition-colors duration-150 ${
                            isDark
                              ? 'bg-amber-500/10'
                              : 'bg-amber-50'
                          }`}>
                            <FiMenu className={`w-5 h-5 transition-colors duration-150 ${
                              isDark
                                ? 'text-amber-400'
                                : 'text-amber-600'
                            }`} />
                          </div>
                          <div>
                            <label className={`text-lg font-semibold transition-colors duration-150 ${
                              isDark
                                ? 'text-light'
                                : 'text-midnight_text'
                            }`}>
                              Course Curriculum
                            </label>
                            <p className={`text-sm transition-colors duration-150 ${
                              isDark
                                ? 'text-gray'
                                : 'text-gray'
                            }`}>
                              Organize your course content into weeks and sessions
                            </p>
                          </div>
                        </div>
                        <div className={`flex items-center gap-2 text-sm font-medium ${
                          isDark ? 'text-gray' : 'text-gray'
                        }`}>
                          <TbArrowsSort className="w-4 h-4" />
                          <span>{values.curriculum.length} week{values.curriculum.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>

                      <div className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-150 ${
                        isDark
                          ? 'bg-darklight text-darkgray'
                          : 'bg-light text-gray'
                      }`}>
                        <BsArrowsMove className="w-4 h-4" />
                        <span className="text-sm font-medium">
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
                                    className={`w-full flex items-center justify-center gap-3 p-6 border-2 border-dashed rounded-lg transition-all duration-150 ${
                                      isDark
                                        ? 'border-dark_border text-darkgray hover:border-primary hover:bg-primary/10 hover:text-primary'
                                        : 'border-border text-gray hover:border-primary hover:bg-primary/5 hover:text-primary'
                                    }`}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                  >
                                    <div className={`p-2 rounded-lg transition-colors duration-150 ${
                                      isDark
                                        ? 'bg-primary/10 group-hover:bg-primary/20'
                                        : 'bg-primary/5 group-hover:bg-primary/10'
                                    }`}>
                                      <FiPlus className={`w-5 h-5 ${
                                        isDark ? 'text-cyan' : 'text-primary'
                                      }`} />
                                    </div>
                                    <span className={`font-medium ${isDark ? 'text-cyan' : 'text-midnight_text'}`}>Add New Week</span>
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
                          className={`p-4 rounded-lg border transition-colors duration-150 ${
                            isDark
                              ? 'bg-rose-500/10 border-rose-500/30'
                              : 'bg-rose-50 border-rose-200'
                          }`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <div className="flex items-start gap-3">
                            <FiAlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                              isDark ? 'text-rose-400' : 'text-rose-500'
                            }`} />
                            <div>
                              <p className={`text-sm font-medium ${
                                isDark ? 'text-rose-400' : 'text-rose-800'
                              }`}>
                                Please complete all required fields
                              </p>
                              <p className={`text-sm mt-1 ${
                                isDark ? 'text-rose-500' : 'text-rose-600'
                              }`}>
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
                        className="btn-gray"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiX className="w-4 h-4" />
                        Cancel
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`btn ${!isValid || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''} btn-primary`}
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