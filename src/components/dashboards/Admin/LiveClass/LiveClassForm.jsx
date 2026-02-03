import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCourses } from "../../../../hooks/useCourses";
import {
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
} from "../../../../Services/admin/zoomService";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useGetIdAndBatchNamesQuery } from "../../../../Services/admin/batchdetailsService";
import { FiX, FiInfo } from "react-icons/fi";

/* ---------------- Validation (UNCHANGED) ---------------- */

const validationSchema = Yup.object({
  title: Yup.string().required("Required"),
  startTime: Yup.date()
    .min(new Date(), "Start time must be in the future")
    .required("Required"),
  duration: Yup.number()
    .min(15, "Minimum 15 minutes")
    .max(180, "Maximum 180 minutes")
    .required("Required"),
  courseId: Yup.string().required("Required"),
  batchId: Yup.string().required("Required"),
  instructorEmail: Yup.string()
    .email("Invalid email")
    .required("Instructor email is required"),
  recurrence: Yup.string().oneOf(["once", "daily"]).required(),
  endDate: Yup.date().nullable().test(
    "end-required",
    "End date is required for daily classes",
    function (value) {
      const { recurrence, startTime } = this.parent;
      if (recurrence === "daily") {
        if (!value) return false;
        if (startTime && value <= startTime) {
          return this.createError({
            message: "End date must be after start time",
          });
        }
      }
      return true;
    }
  ),
});

/* ---------------- Component ---------------- */

const LiveClassForm = ({ onSuccess, initialData, mode = "create" }) => {
  const { data: batches } = useGetIdAndBatchNamesQuery();
  const { courses } = useCourses();

  const [createMeeting, { isLoading: isCreating }] =
    useCreateMeetingMutation();
  const [updateMeeting, { isLoading: isUpdating }] =
    useUpdateMeetingMutation();

  const isEditMode = mode === "edit";
  const isLoading = isCreating || isUpdating;

  const initialValues = isEditMode
    ? {
        title: initialData.title,
        startTime: initialData.startTime,
        duration: initialData.duration,
        courseId: initialData.courseId,
        batchId: initialData.batchId,
        instructorEmail: initialData.instructorEmail || "",
        recurrence: initialData.recurrence || "once",
        endDate: initialData.endDate || "",
      }
    : {
        title: "",
        startTime: "",
        duration: 60,
        courseId: "",
        batchId: "",
        instructorEmail: "",
        recurrence: "once",
        endDate: "",
      };

  return (
    <AnimatePresence>
      <motion.div
        className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-slate-900/60 tw-backdrop-blur-sm tw-p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 20, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="tw-w-full tw-max-w-xl tw-max-h-[90vh] tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-2xl"
        >
          {/* ================= Header ================= */}
          <div className="tw-flex tw-items-start tw-justify-between tw-gap-4 tw-border-b tw-border-slate-200 tw-px-6 tw-py-4">
            <div>
              <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900">
                {isEditMode ? "Edit Live Class" : "Schedule Live Class"}
              </h2>
              <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
                Configure class timing, batch, and instructor details
              </p>
            </div>

            <button
              onClick={onSuccess}
              className="tw-rounded-lg tw-p-2 tw-text-slate-500 hover:tw-bg-slate-100 hover:tw-text-slate-700"
            >
              <FiX className="tw-h-5 tw-w-5" />
            </button>
          </div>

          {/* ================= Body ================= */}
          <div className="tw-overflow-y-auto tw-p-6 tw-max-h-[75vh]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  if (isEditMode) {
                    await updateMeeting({
                      id: initialData._id,
                      ...values,
                    }).unwrap();
                    toast.success("Live class updated");
                  } else {
                    await createMeeting(values).unwrap();
                    toast.success("Live class created");
                    resetForm();
                  }
                  onSuccess?.();
                } catch (err) {
                  toast.error(
                    err?.data?.message ||
                      `Failed to ${
                        isEditMode ? "update" : "create"
                      } class`
                  );
                }
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="tw-space-y-5">
                  {/* Title */}
                  <FieldInput
                    name="title"
                    label="Class Title"
                    placeholder="e.g. React Hooks Deep Dive"
                    errors={errors}
                    touched={touched}
                  />

                  {/* Recurrence */}
                  <FieldSelect
                    name="recurrence"
                    label="Class Type"
                    options={[
                      { value: "once", label: "One-time Class" },
                      { value: "daily", label: "Daily Recurring Class" },
                    ]}
                    errors={errors}
                    touched={touched}
                  />

                  {/* Start Time */}
                  <FieldInput
                    name="startTime"
                    type="datetime-local"
                    label={
                      values.recurrence === "daily"
                        ? "First Class Start Time"
                        : "Start Time"
                    }
                    errors={errors}
                    touched={touched}
                  />

                  {/* End Date (animated) */}
                  {values.recurrence === "daily" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                    >
                      <FieldInput
                        name="endDate"
                        type="date"
                        label="Recurrence End Date"
                        errors={errors}
                        touched={touched}
                      />
                    </motion.div>
                  )}

                  {/* Duration */}
                  <FieldInput
                    name="duration"
                    type="number"
                    label="Duration (minutes)"
                    errors={errors}
                    touched={touched}
                  />

                  {/* Course & Batch */}
                  <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                    <FieldSelect
                      name="courseId"
                      label="Course"
                      options={courses?.map((c) => ({
                        value: c._id,
                        label: c.name,
                      }))}
                      errors={errors}
                      touched={touched}
                    />

                    <FieldSelect
                      name="batchId"
                      label="Batch"
                      options={batches?.map((b) => ({
                        value: b._id,
                        label: b.batchName,
                      }))}
                      errors={errors}
                      touched={touched}
                    />
                  </div>

                  {/* Instructor Email */}
                  <FieldInput
                    name="instructorEmail"
                    type="email"
                    label="Instructor Email"
                    placeholder="instructor@example.com"
                    errors={errors}
                    touched={touched}
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="tw-mt-2 tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-xl tw-bg-indigo-600 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-transition hover:tw-bg-indigo-700 disabled:tw-cursor-not-allowed disabled:tw-opacity-60"
                  >
                    {isLoading
                      ? isEditMode
                        ? "Updating..."
                        : "Creating..."
                      : isEditMode
                      ? "Update Live Class"
                      : "Create Live Class"}
                  </button>

                  {/* Info */}
                  {values.recurrence === "daily" && (
                    <div className="tw-flex tw-gap-2 tw-rounded-xl tw-border tw-border-indigo-200 tw-bg-indigo-50 tw-p-3 tw-text-sm tw-text-indigo-700">
                      <FiInfo className="tw-mt-0.5 tw-h-4 tw-w-4" />
                      Daily classes will automatically repeat until the selected
                      end date.
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/* ---------------- Reusable Fields (Refined UI) ---------------- */

const FieldInput = ({ label, name, errors, touched, ...props }) => (
  <div>
    <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
      {label}
    </label>
    <Field
      name={name}
      {...props}
      className={`tw-w-full tw-rounded-lg tw-border tw-px-3 tw-py-2 tw-text-sm tw-transition focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20 ${
        errors[name] && touched[name]
          ? "tw-border-rose-500"
          : "tw-border-slate-300"
      }`}
    />
    {errors[name] && touched[name] && (
      <p className="tw-mt-1 tw-text-xs tw-text-rose-600">
        {errors[name]}
      </p>
    )}
  </div>
);

const FieldSelect = ({ label, name, options = [], errors, touched }) => (
  <div>
    <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
      {label}
    </label>
    <Field
      as="select"
      name={name}
      className={`tw-w-full tw-rounded-lg tw-border tw-bg-white tw-px-3 tw-py-2 tw-text-sm focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20 ${
        errors[name] && touched[name]
          ? "tw-border-rose-500"
          : "tw-border-slate-300"
      }`}
    >
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Field>
    {errors[name] && touched[name] && (
      <p className="tw-mt-1 tw-text-xs tw-text-rose-600">
        {errors[name]}
      </p>
    )}
  </div>
);

export default LiveClassForm;
