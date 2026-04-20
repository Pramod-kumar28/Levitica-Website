import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { motion, AnimatePresence } from "framer-motion";
import { useBatchHandlers } from "./batchshooks";
import { useTheme } from '@/context/ThemeContext';
import {
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import { useGetCoursesQuery } from '@/Services/sharedServices/courses.Services';

const BatchModal = ({ handleClose, mode = "add", batch = {} }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isEdit = mode === "edit";

  const {
    handleAddBatchSubmit,
    handleUpdateBatchSubmit,
    addStatus,
    updateStatus,
  } = useBatchHandlers();

  const { data: courses } = useGetCoursesQuery();

  /* ================= INITIAL VALUES ================= */
  const initialValues = isEdit
    ? {
      batchId: batch._id,
      batchName: batch.batchName || "",
      courseId: batch.courseId?._id || "",
      startDate: batch.startDate?.slice(0, 10) || "",
      endDate: batch.endDate?.slice(0, 10) || "",
      status: batch.status || "active",
      completedAt: batch.completedAt?.slice(0, 10) || "",
    }
    : {
      batchName: "",
      courseId: "",
      startDate: "",
      endDate: "",
      status: "active",
      completedAt: "",
    };

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    batchName: Yup.string().required("Batch name is required"),
    courseId: Yup.string().required("Course is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date must be after start date")
      .required("End date is required"),
    status: Yup.string()
      .oneOf(["active", "completed", "cancelled", "inactive"])
      .required("Status is required"),

    completedAt: Yup.date().when("status", {
      is: "completed",
      then: (schema) =>
        schema.required("Completion date is required"),
      otherwise: (schema) => schema.nullable(),
    }),
  });

  /* ================= SUBMIT ================= */
  const onSubmit = async (values, { resetForm }) => {
    if (isEdit) {
      await handleUpdateBatchSubmit(values);
    } else {
      await handleAddBatchSubmit(values);
      resetForm();
    }
    handleClose();
  };

  const isLoading = isEdit
    ? updateStatus.isLoading
    : addStatus.isLoading;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 24, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`w-full max-w-lg rounded-2xl shadow-2xl transition-colors ${
            isDark
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white'
          }`}
        >
          {/* ================= HEADER ================= */}
          <div className={`flex items-start justify-between border-b p-6 transition-colors ${
            isDark
              ? 'border-slate-700'
              : 'border-slate-200'
          }`}>
            <div>
              <h2 className={`text-lg font-semibold transition-colors ${
                isDark
                  ? 'text-slate-100'
                  : 'text-slate-900'
              }`}>
                {isEdit ? "Edit Batch" : "Create New Batch"}
              </h2>
              <p className={`mt-1 text-sm transition-colors ${
                isDark
                  ? 'text-slate-400'
                  : 'text-slate-500'
              }`}>
                Manage batch details and lifecycle
              </p>
            </div>
            <button onClick={handleClose} className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-700 text-slate-400'
                : 'hover:bg-slate-100 text-slate-600'
            }`}>
              <FiX />
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className={`p-6 transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-5">
                  {/* Batch Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>Batch Name</label>
                    <Field 
                      name="batchName" 
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                      }`}
                    />
                    <ErrorMessage name="batchName" component="p" className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  </div>

                  {/* Course */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>Course</label>
                    <div className="relative">
                      <Field 
                        as="select" 
                        name="courseId" 
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark-input'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      >
                        <option value="">Select course</option>
                        {courses?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage name="courseId" component="p" className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>Start Date</label>
                      <Field 
                        type="date" 
                        name="startDate" 
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark-input'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>End Date</label>
                      <Field 
                        type="date" 
                        name="endDate" 
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark-input'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                    </div>
                  </div>

                  {/* STATUS DROPDOWN */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 transition-colors ${
                      isDark
                        ? 'text-slate-300'
                        : 'text-slate-700'
                    }`}>Batch Status</label>
                    <Field
                      as="select"
                      name="status"
                      className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                        isDark
                          ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark-input'
                          : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                      }`}
                      onChange={(e) => {
                        const value = e.target.value;
                        setFieldValue("status", value);

                        if (value === "completed") {
                          setFieldValue(
                            "completedAt",
                            new Date().toISOString().slice(0, 10)
                          );
                        } else {
                          setFieldValue("completedAt", "");
                        }
                      }}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Field>
                    <ErrorMessage name="status" component="p" className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                  </div>
                  {/* COMPLETED AT (Conditional) */}
                  {values.status === "completed" && (
                    <div>
                      <label className={`block text-sm font-medium mb-2 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>Completed At</label>
                      <Field
                        type="date"
                        name="completedAt"
                        className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                          isDark
                            ? 'bg-slate-700 border-slate-600 text-slate-100 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/20 dark-input'
                            : 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'
                        }`}
                      />
                      <ErrorMessage
                        name="completedAt"
                        component="p"
                        className={`mt-1 text-sm ${isDark ? 'text-red-400' : 'text-red-600'}`}
                      />
                    </div>
                  )}


                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 rounded-xl font-medium transition-all ${
                      isDark
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:opacity-60'
                        : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white disabled:opacity-60'
                    }`}
                  >
                    {isLoading ? "Saving..." : isEdit ? "Update Batch" : "Create Batch"}
                  </button>

                  {/* Tip */}
                  <div className={`flex gap-2 border p-3 rounded-lg transition-colors ${
                    isDark
                      ? 'bg-blue-900/30 border-blue-700/50 text-blue-300'
                      : 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  }`}>
                    <FiCheckCircle className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-blue-400' : 'text-indigo-600'}`} />
                    <p className="text-sm">
                      Completed batches won’t allow new student assignments.
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BatchModal;
