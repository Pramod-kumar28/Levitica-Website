import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiClock,
} from "react-icons/fi";
import {
  useCreateInternshipsDomainMutation,
  useUpdateInternshipsDomainMutation,
} from "../../../../Services/admin/internshipsDomainService";

const InternshipsDomainModal = ({
  handleClose,
  mode = "add",
  domain = {},
}) => {
  const isEdit = mode === "edit";

  const [createDomain, { isLoading: isCreating }] =
    useCreateInternshipsDomainMutation();
  const [updateDomain, { isLoading: isUpdating }] =
    useUpdateInternshipsDomainMutation();

  const initialValues = isEdit
    ? {
        name: domain.name || "",
        focus: domain.focus || "",
        level: domain.level || "",
        durations: domain.durations?.length
          ? domain.durations
          : [{ days: 5, fee: 1000 }],
        isActive: domain.isActive ?? true,
      }
    : {
        name: "",
        focus: "",
        level: "",
        durations: [{ days: 5, fee: 1000 }],
        isActive: true,
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Domain name is required"),
    focus: Yup.string().required("Focus area is required"),
    level: Yup.string().required("Level is required"),
    durations: Yup.array()
      .of(
        Yup.object({
          days: Yup.number()
            .min(1, "Must be at least 1 day")
            .required("Days required"),
          fee: Yup.number()
            .min(0, "Fee must be positive")
            .required("Fee required"),
        })
      )
      .min(1, "At least one duration is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values,"from internships modal")
    if (isEdit) {
      await updateDomain({
        id: domain._id,
        updatedData: values,
      }).unwrap();
    } else {
      await createDomain(values).unwrap();
    }
    handleClose();
  };

  const isLoading = isCreating || isUpdating;

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
          className="tw-w-full tw-max-w-2xl tw-max-h-[90vh] tw-overflow-hidden tw-rounded-2xl tw-bg-white tw-shadow-2xl tw-overflow-y-auto"
        >
          {/* ================= HEADER ================= */}
          <div className="tw-flex tw-items-start tw-justify-between tw-border-b tw-border-slate-200 tw-p-6">
            <div>
              <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900">
                {isEdit ? "Edit Domain" : "Create Domain"}
              </h2>
              <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
                Manage internship domains and durations
              </p>
            </div>
            <button
              onClick={handleClose}
              className="tw-rounded-lg tw-p-2 tw-text-slate-500 hover:tw-bg-slate-100"
            >
              <FiX className="tw-h-5 tw-w-5" />
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className="tw-overflow-y-auto tw-p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="tw-space-y-5">
                  {/* Domain Name */}
                  <div>
                    <label className="tw-label">Domain Name</label>
                    <Field
                      name="name"
                      placeholder="e.g. Java Full Stack Development"
                      className="tw-input"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="tw-error"
                    />
                  </div>

                  {/* Focus */}
                  <div>
                    <label className="tw-label">Focus Areas</label>
                    <Field
                      name="focus"
                      placeholder="Core Java, Spring Boot, React"
                      className="tw-input"
                    />
                    <ErrorMessage
                      name="focus"
                      component="p"
                      className="tw-error"
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="tw-label">Level</label>
                    <Field as="select" name="level" className="tw-input">
                      <option value="">Select level</option>
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Basic / Intermediate">
                        Basic / Intermediate
                      </option>
                    </Field>
                    <ErrorMessage
                      name="level"
                      component="p"
                      className="tw-error"
                    />
                  </div>

                  {/* Durations */}
                  <FieldArray name="durations">
                    {({ push, remove }) => (
                      <div className="tw-space-y-3">
                        <div className="tw-flex tw-items-center tw-justify-between">
                          <h4 className="tw-font-medium tw-flex tw-items-center tw-gap-2">
                            <FiClock /> Durations
                          </h4>
                          <button
                            type="button"
                            onClick={() => push({ days: "", fee: "" })}
                            className="tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-indigo-600"
                          >
                            <FiPlus /> Add
                          </button>
                        </div>

                        {values.durations.map((_, index) => (
                          <div
                            key={index}
                            className="tw-grid tw-grid-cols-2 tw-gap-3 tw-rounded-lg tw-border tw-border-slate-200 tw-p-3"
                          >
                            <div>
                              <label className="tw-label">Days</label>
                              <Field
                                name={`durations.${index}.days`}
                                type="number"
                                className="tw-input"
                              />
                            </div>

                            <div>
                              <label className="tw-label">Fee (₹)</label>
                              <Field
                                name={`durations.${index}.fee`}
                                type="number"
                                className="tw-input"
                              />
                            </div>

                            {values.durations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="tw-col-span-2 tw-flex tw-items-center tw-gap-1 tw-text-sm tw-text-rose-600"
                              >
                                <FiTrash2 /> Remove
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>

                  {/* Active */}
                  <label className="tw-flex tw-items-center tw-gap-3 tw-rounded-lg tw-border tw-border-slate-200 tw-p-3">
                    <Field
                      type="checkbox"
                      name="isActive"
                      className="tw-h-4 tw-w-4 tw-accent-indigo-600"
                    />
                    <span className="tw-text-sm tw-text-slate-700">
                      Active Domain
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="tw-w-full tw-rounded-xl tw-bg-gradient-to-r tw-from-indigo-600 tw-to-blue-600 tw-py-3 tw-text-sm tw-font-semibold tw-text-white hover:tw-from-indigo-700 hover:tw-to-blue-700 disabled:tw-opacity-60"
                  >
                    {isLoading
                      ? "Saving..."
                      : isEdit
                      ? "Update Domain"
                      : "Create Domain"}
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

export default InternshipsDomainModal;
