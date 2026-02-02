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

/* ---------------- Validation ---------------- */

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
        className="tw-fixed tw-inset-0 tw-bg-black/50 tw-z-50 tw-flex tw-items-center tw-justify-center tw-p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="tw-bg-white tw-w-full tw-max-w-lg tw-rounded-xl tw-shadow-xl tw-flex tw-flex-col tw-max-h-[90vh]"
        >
          {/* Header */}
          <div className="tw-flex tw-items-center tw-justify-between tw-p-5 tw-border-b">
            <h2 className="tw-text-xl tw-font-semibold">
              {isEditMode ? "Edit Live Class" : "Schedule Live Class"}
            </h2>
            <button onClick={onSuccess}>
              <FiX className="tw-text-xl tw-text-gray-500 hover:tw-text-gray-700" />
            </button>
          </div>

          {/* Body */}
          <div className="tw-overflow-y-auto tw-p-5">
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
                      `Failed to ${isEditMode ? "update" : "create"} class`
                  );
                }
              }}
            >
              {({ errors, touched, values }) => (
                <Form className="tw-space-y-4">
                  {/* Title */}
                  <FieldInput
                    name="title"
                    label="Title"
                    placeholder="Enter class title"
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

                  {/* End Date */}
                  {values.recurrence === "daily" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
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

                  {/* Course */}
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

                  {/* Batch */}
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
                    className="tw-w-full tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-font-medium tw-rounded-lg tw-py-3 tw-mt-2 disabled:tw-opacity-50"
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
                    <div className="tw-flex tw-gap-2 tw-bg-blue-50 tw-border tw-border-blue-200 tw-rounded-lg tw-p-3 tw-text-sm tw-text-blue-700">
                      <FiInfo className="tw-mt-0.5" />
                      Daily classes will repeat until the end date.
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

/* ---------------- Reusable Fields ---------------- */

const FieldInput = ({ label, name, errors, touched, ...props }) => (
  <div>
    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
      {label}
    </label>
    <Field
      name={name}
      {...props}
      className={`tw-w-full tw-border tw-rounded-lg tw-p-3 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 ${
        errors[name] && touched[name]
          ? "tw-border-red-500"
          : "tw-border-gray-300"
      }`}
    />
    {errors[name] && touched[name] && (
      <p className="tw-text-xs tw-text-red-500 tw-mt-1">{errors[name]}</p>
    )}
  </div>
);

const FieldSelect = ({ label, name, options = [], errors, touched }) => (
  <div>
    <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
      {label}
    </label>
    <Field
      as="select"
      name={name}
      className={`tw-w-full tw-border tw-rounded-lg tw-p-3 ${
        errors[name] && touched[name]
          ? "tw-border-red-500"
          : "tw-border-gray-300"
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
      <p className="tw-text-xs tw-text-red-500 tw-mt-1">{errors[name]}</p>
    )}
  </div>
);

export default LiveClassForm;
