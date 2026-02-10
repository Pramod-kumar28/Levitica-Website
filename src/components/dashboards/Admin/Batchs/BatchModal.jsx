import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { motion, AnimatePresence } from "framer-motion";
import { useBatchHandlers } from "./batchshooks";
import {
  FiX,
  FiCheckCircle,
} from "react-icons/fi";
import { useGetCoursesQuery } from "../../../../Services/sharedServices/courses.Services";

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
      }
    : {
        batchName: "",
        courseId: "",
        startDate: "",
        endDate: "",
        status: "active",
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
      .oneOf(["active", "completed", "cancelled","inactive"])
      .required("Status is required"),
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
        className="tw-fixed tw-inset-0 tw-z-[1100] tw-flex tw-items-center tw-justify-center tw-bg-slate-900/60 tw-backdrop-blur-sm tw-p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 24, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="tw-w-full tw-max-w-lg tw-rounded-2xl tw-bg-white tw-shadow-2xl"
        >
          {/* ================= HEADER ================= */}
          <div className="tw-flex tw-items-start tw-justify-between tw-border-b tw-p-6">
            <div>
              <h2 className="tw-text-lg tw-font-semibold">
                {isEdit ? "Edit Batch" : "Create New Batch"}
              </h2>
              <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
                Manage batch details and lifecycle
              </p>
            </div>
            <button onClick={handleClose} className="tw-p-2 hover:tw-bg-slate-100">
              <FiX />
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className="tw-p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form className="tw-space-y-5">
                  {/* Batch Name */}
                  <div>
                    <label className="tw-label">Batch Name</label>
                    <Field name="batchName" className="tw-input" />
                    <ErrorMessage name="batchName" component="p" className="tw-error" />
                  </div>

                  {/* Course */}
                  <div>
                    <label className="tw-label">Course</label>
                    <div className="tw-relative">
                     
                      <Field as="select" name="courseId" className="tw-input tw-pl-10 tw-pr-4">
                        <option value="">Select course</option>
                        {courses?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage name="courseId" component="p" className="tw-error" />
                  </div>

                  {/* Dates */}
                  <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                    <div>
                      <label className="tw-label">Start Date</label>
                      <Field type="date" name="startDate" className="tw-input" />
                    </div>
                    <div>
                      <label className="tw-label">End Date</label>
                      <Field type="date" name="endDate" className="tw-input" />
                    </div>
                  </div>

                  {/* STATUS DROPDOWN */}
                  <div>
                    <label className="tw-label">Batch Status</label>
                    <Field as="select" name="status" className="tw-input">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </Field>
                    <ErrorMessage name="status" component="p" className="tw-error" />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="tw-w-full tw-bg-gradient-to-r tw-from-indigo-600 tw-to-blue-600 tw-py-3 tw-text-white tw-rounded-xl"
                  >
                    {isLoading ? "Saving..." : isEdit ? "Update Batch" : "Create Batch"}
                  </button>

                  {/* Tip */}
                  <div className="tw-flex tw-gap-2 tw-bg-indigo-50 tw-border tw-border-indigo-200 tw-p-3 tw-rounded-lg">
                    <FiCheckCircle className="tw-text-indigo-600" />
                    <p className="tw-text-sm tw-text-indigo-700">
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
