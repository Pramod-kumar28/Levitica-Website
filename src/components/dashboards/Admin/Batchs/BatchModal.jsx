import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetCoursesQuery } from "../../../../Services/admin/coursesService";
import { motion, AnimatePresence } from "framer-motion";
import { useBatchHandlers } from "./batchshooks";
import {
  FiX,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

const BatchModal = ({ handleClose, mode = "add", batch = {} }) => {
  const isEdit = mode === "edit";

  const {
    handleAddBatchSubmit,
    handleUpdateBatchSubmit,
    addStatus,
    updateStatus,
  } = useBatchHandlers();

  const { data: courses } = useGetCoursesQuery();

  const initialValues = isEdit
    ? {
        batchId: batch._id,
        batchName: batch.batchName || "",
        courseId: batch.courseId || "",
        startDate: batch.startDate?.slice(0, 10) || "",
        endDate: batch.endDate?.slice(0, 10) || "",
        isActive: batch.isActive ?? true,
      }
    : {
        batchName: "",
        courseId: "",
        startDate: "",
        endDate: "",
        isActive: true,
      };

  const validationSchema = Yup.object({
    batchName: Yup.string().required("Batch name is required"),
    courseId: Yup.string().required("Course is required"),
    startDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "End date must be after start date")
      .required("End date is required"),
  });

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
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="tw-w-full tw-max-w-lg tw-max-h-[90vh] tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-2xl"
        >
          {/* ================= HEADER ================= */}
          <div className="tw-flex tw-items-start tw-justify-between tw-gap-4 tw-border-b tw-border-slate-200 tw-p-6">
            <div>
              <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900">
                {isEdit ? "Edit Batch" : "Create New Batch"}
              </h2>
              <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
                {isEdit
                  ? "Update batch details and timeline"
                  : "Create a new batch for student enrollment"}
              </p>
            </div>

            <button
              onClick={handleClose}
              className="tw-rounded-lg tw-p-2 tw-text-slate-500 tw-transition hover:tw-bg-slate-100 hover:tw-text-slate-700"
            >
              <FiX className="tw-h-5 tw-w-5" />
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className="tw-overflow-y-auto tw-p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {() => (
                <Form className="tw-space-y-5">
                  {/* Batch Name */}
                  <div>
                    <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                      Batch Name
                    </label>
                    <Field
                      name="batchName"
                      placeholder="e.g. React Batch A"
                      className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-px-3 tw-py-2 tw-text-sm tw-transition focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                    />
                    <ErrorMessage
                      name="batchName"
                      component="p"
                      className="tw-mt-1 tw-text-xs tw-text-rose-600"
                    />
                  </div>

                  {/* Course */}
                  <div>
                    <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                      Course
                    </label>
                    <div className="tw-relative">
                      <FiBookOpen className="tw-pointer-events-none tw-absolute tw-left-3 tw-top-2.5 tw-h-5 tw-w-5 tw-text-slate-400" />
                      <Field
                        as="select"
                        name="courseId"
                        className="tw-w-full tw-appearance-none tw-rounded-lg tw-border tw-border-slate-300 tw-bg-white tw-px-10 tw-py-2 tw-text-sm focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                      >
                        <option value="">Select course</option>
                        {courses?.map((course) => (
                          <option key={course._id} value={course._id}>
                            {course.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="courseId"
                      component="p"
                      className="tw-mt-1 tw-text-xs tw-text-rose-600"
                    />
                  </div>

                  {/* Dates */}
                  <div className="tw-grid tw-grid-cols-1 tw-gap-4 md:tw-grid-cols-2">
                    {[
                      { name: "startDate", label: "Start Date" },
                      { name: "endDate", label: "End Date" },
                    ].map(({ name, label }) => (
                      <div key={name}>
                        <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                          {label}
                        </label>
                        <div className="tw-relative">
                          <FiCalendar className="tw-pointer-events-none tw-absolute tw-left-3 tw-top-2.5 tw-h-5 tw-w-5 tw-text-slate-400" />
                          <Field
                            type="date"
                            name={name}
                            className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-px-10 tw-py-2 tw-text-sm focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                          />
                        </div>
                        <ErrorMessage
                          name={name}
                          component="p"
                          className="tw-mt-1 tw-text-xs tw-text-rose-600"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Active Toggle */}
                  <label className="tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-border tw-border-slate-200 tw-p-3 tw-transition hover:tw-bg-slate-50">
                    <Field
                      type="checkbox"
                      name="isActive"
                      className="tw-h-5 tw-w-5 tw-accent-indigo-600"
                    />
                    <div>
                      <p className="tw-text-sm tw-font-medium tw-text-slate-800">
                        Active Batch
                      </p>
                      <p className="tw-text-xs tw-text-slate-500">
                        Students can enroll into this batch
                      </p>
                    </div>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="tw-mt-2 tw-flex tw-w-full tw-items-center tw-justify-center tw-gap-2 tw-rounded-xl tw-bg-gradient-to-r tw-from-indigo-600 tw-to-blue-600 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-shadow-lg tw-transition hover:tw-from-indigo-700 hover:tw-to-blue-700 disabled:tw-cursor-not-allowed disabled:tw-opacity-60"
                  >
                    {isLoading
                      ? "Saving..."
                      : isEdit
                      ? "Update Batch"
                      : "Create Batch"}
                  </button>

                  {/* Tip */}
                  <div className="tw-flex tw-items-start tw-gap-2 tw-rounded-xl tw-border tw-border-indigo-200 tw-bg-indigo-50 tw-p-3 tw-text-sm tw-text-indigo-700">
                    <FiCheckCircle className="tw-mt-0.5 tw-h-4 tw-w-4" />
                    <span>
                      Make sure the end date is later than the start date.
                    </span>
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
