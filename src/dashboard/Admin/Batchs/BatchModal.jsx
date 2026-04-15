import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { motion, AnimatePresence } from "framer-motion";
import { useBatchHandlers } from "./batchshooks";
import {
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import { useGetCoursesQuery } from '@/Services/sharedServices/courses.Services';

const BatchModal = ({ handleClose, mode = "add", batch = {} }) => {
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
          className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between border-b p-6">
            <div>
              <h2 className="text-lg font-semibold">
                {isEdit ? "Edit Batch" : "Create New Batch"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage batch details and lifecycle
              </p>
            </div>
            <button onClick={handleClose} className="p-2 hover:bg-slate-100">
              <FiX />
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-5">
                  {/* Batch Name */}
                  <div>
                    <label className="label">Batch Name</label>
                    <Field name="batchName" className="input" />
                    <ErrorMessage name="batchName" component="p" className="error" />
                  </div>

                  {/* Course */}
                  <div>
                    <label className="label">Course</label>
                    <div className="relative">

                      <Field as="select" name="courseId" className="input pl-10 pr-4">
                        <option value="">Select course</option>
                        {courses?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage name="courseId" component="p" className="error" />
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Start Date</label>
                      <Field type="date" name="startDate" className="input" />
                    </div>
                    <div>
                      <label className="label">End Date</label>
                      <Field type="date" name="endDate" className="input" />
                    </div>
                  </div>

                  {/* STATUS DROPDOWN */}
                  <div>
                    <label className="label">Batch Status</label>
                    <Field
                      as="select"
                      name="status"
                      className="input"
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
                    <ErrorMessage name="status" component="p" className="error" />
                  </div>
                  {/* COMPLETED AT (Conditional) */}
                  {values.status === "completed" && (
                    <div>
                      <label className="label">Completed At</label>
                      <Field
                        type="date"
                        name="completedAt"
                        className="input"
                      />
                      <ErrorMessage
                        name="completedAt"
                        component="p"
                        className="error"
                      />
                    </div>
                  )}


                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-white rounded-xl"
                  >
                    {isLoading ? "Saving..." : isEdit ? "Update Batch" : "Create Batch"}
                  </button>

                  {/* Tip */}
                  <div className="flex gap-2 bg-indigo-50 border border-indigo-200 p-3 rounded-lg">
                    <FiCheckCircle className="text-indigo-600" />
                    <p className="text-sm text-indigo-700">
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
