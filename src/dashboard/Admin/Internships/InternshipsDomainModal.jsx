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
} from '@/Services/admin/internshipsDomainService';
import toast from "react-hot-toast";

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
    
    if (isEdit) {
      await updateDomain({
        id: domain._id,
        updatedData: values,
      }).unwrap();
      toast.success("Domain updated successfully");
    } else {
      await createDomain(values).unwrap();
      toast.success("Domain created successfully");
    }
    handleClose();
  };

  const isLoading = isCreating || isUpdating;

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
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl overflow-y-auto"
        >
          {/* ================= HEADER ================= */}
          <div className="flex items-start justify-between border-b border-slate-200 p-6">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                {isEdit ? "Edit Domain" : "Create Domain"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Manage internship domains and durations
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* ================= FORM ================= */}
          <div className="overflow-y-auto p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values }) => (
                <Form className="space-y-5">
                  {/* Domain Name */}
                  <div>
                    <label className="label">Domain Name</label>
                    <Field
                      name="name"
                      placeholder="e.g. Java Full Stack Development"
                      className="input"
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="error"
                    />
                  </div>

                  {/* Focus */}
                  <div>
                    <label className="label">Focus Areas</label>
                    <Field
                      name="focus"
                      placeholder="Core Java, Spring Boot, React"
                      className="input"
                    />
                    <ErrorMessage
                      name="focus"
                      component="p"
                      className="error"
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className="label">Level</label>
                    <Field as="select" name="level" className="input">
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
                      className="error"
                    />
                  </div>

                  {/* Durations */}
                  <FieldArray name="durations">
                    {({ push, remove }) => (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-md flex items-center gap-2">
                            <FiClock /> Durations
                          </div>
                          <button
                            type="button"
                            onClick={() => push({ days: "", fee: "" })}
                            className="flex items-center gap-1 text-sm text-indigo-600"
                          >
                            <FiPlus /> Add
                          </button>
                        </div>

                        {values.durations.map((_, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-2 gap-3 rounded-lg border border-slate-200 p-3"
                          >
                            <div>
                              <label className="label">Days</label>
                              <Field
                                name={`durations.${index}.days`}
                                type="number"
                                className="input"
                              />
                            </div>

                            <div>
                              <label className="label">Fee (₹)</label>
                              <Field
                                name={`durations.${index}.fee`}
                                type="number"
                                className="input"
                              />
                            </div>

                            {values.durations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="col-span-2 flex items-center gap-1 text-sm text-rose-600"
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
                  <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                    <Field
                      type="checkbox"
                      name="isActive"
                      className="h-4 w-4 accent-indigo-600"
                    />
                    <span className="text-sm text-slate-700">
                      Active Domain
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 py-3 text-sm font-semibold text-white hover:from-indigo-700 hover:to-blue-700 disabled:opacity-60"
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
