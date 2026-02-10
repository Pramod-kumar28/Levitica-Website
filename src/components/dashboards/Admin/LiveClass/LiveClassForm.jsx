import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useCourses } from "../../../../hooks/useCourses";
import {
  useCreateMeetingMutation,
  useUpdateMeetingMutation,
} from "../../../../Services/admin/zoomService";
import { toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useGetBatchesByCourseQuery } from "../../../../Services/admin/batchdetailsService";
import { FiX } from "react-icons/fi";

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
  const { courses } = useCourses();

  const toLocalInput = (utc) => {
    const d = new Date(utc);
    const offset = d.getTimezoneOffset();
    const local = new Date(d.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const isEditMode = mode === "edit";

  const [selectedCourseId, setSelectedCourseId] = useState(
    initialData?.course?._id || ""
  );

  const { data: batchesByCourse } = useGetBatchesByCourseQuery(
    selectedCourseId,
    { skip: !selectedCourseId }
  );

  const [createMeeting, { isLoading: isCreating }] =
    useCreateMeetingMutation();
  const [updateMeeting, { isLoading: isUpdating }] =
    useUpdateMeetingMutation();

  const isLoading = isCreating || isUpdating;

  const initialValues = isEditMode
    ? {
      title: initialData.title || "",
      startTime: initialData.startTime
        ? toLocalInput(initialData.startTime)
        : "",
      duration: initialData.duration || 60,
      courseId: initialData.course?._id || "",
      batchId: initialData.batch?._id || "",
      instructorEmail: initialData.hostEmail || "",
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
          {/* Header */}
          <div className="tw-flex tw-items-start tw-justify-between tw-border-b tw-px-6 tw-py-4">
            <div>
              <h2 className="tw-text-lg tw-font-semibold">
                {isEditMode ? "Edit Live Class" : "Schedule Live Class"}
              </h2>
              <p className="tw-text-sm tw-text-slate-500">
                Configure class timing, batch, and instructor details
              </p>
            </div>
            <button onClick={onSuccess}>
              <FiX />
            </button>
          </div>

          {/* Body */}
          <div className="tw-p-6 tw-overflow-y-auto tw-max-h-[75vh]">
            <Formik
              initialValues={initialValues}
              enableReinitialize
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
              {({ errors, touched, values, setFieldValue }) => (
                <Form className="tw-space-y-5">
                  <FieldInput
                    name="title"
                    label="Class Title"
                    errors={errors}
                    touched={touched}
                  />

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

                  <FieldInput
                    name="startTime"
                    type="datetime-local"
                    label="Start Time"
                    errors={errors}
                    touched={touched}
                  />
                  

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
                  <FieldInput
                    name="duration"
                    type="number"
                    label="Duration (minutes)"
                    errors={errors}
                    touched={touched}
                  />

                  {/* Course & Batch */}
                  <div className="tw-grid md:tw-grid-cols-2 tw-gap-4">
                    {/* Course */}
                    <div>
                      <label className="tw-text-sm tw-font-medium">Course</label>
                      <Field
                        as="select"
                        name="courseId"
                        className="tw-w-full tw-rounded-lg tw-border tw-p-2"
                        onChange={(e) => {
                          const value = e.target.value;
                          setFieldValue("courseId", value);

                          if (!isEditMode) {
                            setFieldValue("batchId", "");
                          }

                          setSelectedCourseId(value);
                        }}

                      >
                        <option value="">Select Course</option>
                        {courses?.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))}
                      </Field>
                    </div>

                    {/* Batch */}
                    <div>
                      <label className="tw-text-sm tw-font-medium">Batch</label>
                      <Field
                        as="select"
                        name="batchId"
                        disabled={!values.courseId}
                        className="tw-w-full tw-rounded-lg tw-border tw-p-2 disabled:tw-bg-slate-100"
                      >
                        <option value="">
                          {values.courseId
                            ? "Select Batch"
                            : "Select Course First"}
                        </option>
                        {batchesByCourse?.data?.map((b) => (
                          <option key={b._id} value={b._id}>
                            {b.batchName}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>

                  <FieldInput
                    name="instructorEmail"
                    type="email"
                    label="Instructor Email"
                    errors={errors}
                    touched={touched}
                  />


                  <button
                    type="submit"
                    disabled={isLoading}
                    className="tw-w-full tw-bg-indigo-600 tw-text-white tw-py-3 tw-rounded-xl"
                  >
                    {isLoading
                      ? isEditMode
                        ? "Updating..."
                        : "Creating..."
                      : isEditMode
                        ? "Update Live Class"
                        : "Create Live Class"}
                  </button>


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
    <label className="tw-text-sm tw-font-medium">{label}</label>
    <Field name={name} {...props} className="tw-w-full tw-border tw-p-2" />
    {errors[name] && touched[name] && (
      <p className="tw-text-xs tw-text-red-500">{errors[name]}</p>
    )}
  </div>
);

const FieldSelect = ({ label, name, options, errors, touched }) => (
  <div>
    <label className="tw-text-sm tw-font-medium">{label}</label>
    <Field as="select" name={name} className="tw-w-full tw-border tw-p-2">
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Field>
    {errors[name] && touched[name] && (
      <p className="tw-text-xs tw-text-red-500">{errors[name]}</p>
    )}
  </div>
);

export default LiveClassForm;
