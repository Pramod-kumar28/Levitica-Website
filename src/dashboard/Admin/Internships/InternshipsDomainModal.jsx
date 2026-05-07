import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from '@/context/ThemeContext';
import {
  FiX,
  FiPlus,
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiEdit2,
  FiArrowRight,
  FiBriefcase,
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, y: 24, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.96, y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl flex flex-col ${
            isDark ? 'bg-semidark' : 'bg-white'
          }`}
        >
          {/* ================= HEADER ================= */}
          <div className={`border-b p-4 sm:p-6 ${
            isDark
              ? 'border-dark_border bg-darklight'
              : 'border-border bg-light'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br from-primary to-skyBlue shadow-lg`}>
                    {isEdit ? (
                      <FiEdit2 className="h-4 w-4 text-white" />
                    ) : (
                      <FiBriefcase className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <h2 className={`text-xl sm:text-2xl font-bold truncate ${
                    isDark ? 'text-white' : 'text-midnight_text'
                  }`}>
                    {isEdit ? "Edit Domain" : "Create Domain"}
                  </h2>
                </div>
                <p className={`text-xs sm:text-sm line-clamp-2 text-gray ml-11`}>
                  {isEdit 
                    ? "Update internship domain details and durations" 
                    : "Set up a new internship domain program"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className={`inline-flex rounded-xl p-1.5 sm:p-2 transition-colors flex-shrink-0 ${
                  isDark
                    ? 'text-gray hover:bg-darklight hover:text-white'
                    : 'text-gray hover:bg-light hover:text-midnight_text'
                }`}
              >
                <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <div className={`flex-1 overflow-y-auto p-4 sm:p-6 space-y-1`}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors }) => (
                <Form className="space-y-4 sm:space-y-5">
                  {/* Domain Name */}
                  <div>
                    <label className={`mb-1.5 block text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-gray' : 'text-midnight_text'
                    }`}>
                      Domain Name <span className="text-rose-500">*</span>
                    </label>
                    <Field
                      name="name"
                      placeholder="e.g. Java Full Stack Development"
                      className={`w-full rounded-xl border px-3 sm:px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.name 
                          ? isDark
                            ? "border-rose-500/50 bg-rose-500/10 text-white focus:ring-rose-500/30"
                            : "border-rose-500/50 bg-rose-500/10 text-midnight_text focus:ring-rose-500/20"
                          : isDark
                          ? "border-dark_border bg-darklight text-white placeholder-gray focus:border-primary focus:ring-primary/30"
                          : "border-border bg-light text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20"
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1 text-xs font-medium text-rose-500"
                    />
                  </div>

                  {/* Focus */}
                  <div>
                    <label className={`mb-1.5 block text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-gray' : 'text-midnight_text'
                    }`}>
                      Focus Areas <span className="text-rose-500">*</span>
                    </label>
                    <Field
                      name="focus"
                      placeholder="Core Java, Spring Boot, React"
                      className={`w-full rounded-xl border px-3 sm:px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.focus 
                          ? isDark
                            ? "border-rose-500/50 bg-rose-500/10 text-white focus:ring-rose-500/30"
                            : "border-rose-500/50 bg-rose-500/10 text-midnight_text focus:ring-rose-500/20"
                          : isDark
                          ? "border-dark_border bg-darklight text-white placeholder-gray focus:border-primary focus:ring-primary/30"
                          : "border-border bg-light text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20"
                      }`}
                    />
                    <ErrorMessage
                      name="focus"
                      component="p"
                      className="mt-1 text-xs font-medium text-rose-500"
                    />
                  </div>

                  {/* Level */}
                  <div>
                    <label className={`mb-1.5 block text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-gray' : 'text-midnight_text'
                    }`}>
                      Level <span className="text-rose-500">*</span>
                    </label>
                    <Field 
                      as="select" 
                      name="level" 
                      className={`w-full rounded-xl border px-3 sm:px-4 py-2.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                        errors.level 
                          ? isDark
                            ? "border-rose-500/50 bg-rose-500/10 text-white focus:ring-rose-500/30"
                            : "border-rose-500/50 bg-rose-500/10 text-midnight_text focus:ring-rose-500/20"
                          : isDark
                          ? "border-dark_border bg-darklight text-white focus:border-primary focus:ring-primary/30"
                          : "border-border bg-light text-midnight_text focus:border-primary focus:ring-primary/20"
                      }`}
                    >
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
                      className="mt-1 text-xs font-medium text-rose-500"
                    />
                  </div>

                  {/* Durations */}
                  <FieldArray name="durations">
                    {({ push, remove }) => (
                      <div className={`space-y-3 rounded-xl border p-4 ${
                        isDark
                          ? 'border-dark_border bg-darklight'
                          : 'border-border bg-light'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div className={`flex items-center gap-2 font-semibold text-sm ${
                            isDark ? 'text-white' : 'text-midnight_text'
                          }`}>
                            <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                              isDark ? 'bg-primary/20' : 'bg-primary/10'
                            }`}>
                              <FiClock className={`h-4 w-4 text-primary`} />
                            </div>
                            Durations & Fees <span className="text-rose-500">*</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => push({ days: "", fee: "" })}
                            className={`inline-flex items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                              isDark
                                ? 'bg-primary text-white hover:bg-skyBlue'
                                : 'bg-primary text-white hover:bg-skyBlue'
                            }`}
                          >
                            <FiPlus className="h-3.5 w-3.5" /> 
                            <span className="hidden sm:inline">Add Duration</span>
                            <span className="sm:hidden">Add</span>
                          </button>
                        </div>

                        <div className="space-y-2">
                          {values.durations.map((_, index) => (
                            <div
                              key={index}
                              className={`grid grid-cols-2 gap-2 rounded-lg border p-3 ${
                                isDark
                                  ? 'border-dark_border bg-semidark'
                                  : 'border-border bg-white'
                              }`}
                            >
                              <div>
                                <label className={`mb-1 block text-xs font-medium text-gray`}>
                                  Days
                                </label>
                                <Field
                                  name={`durations.${index}.days`}
                                  type="number"
                                  className={`w-full rounded-lg border px-2 py-1.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                                    isDark
                                      ? 'border-dark_border bg-darklight text-white focus:border-primary focus:ring-primary/30'
                                      : 'border-border bg-light text-midnight_text focus:border-primary focus:ring-primary/20'
                                  }`}
                                  placeholder="e.g. 5"
                                />
                                <ErrorMessage
                                  name={`durations.${index}.days`}
                                  component="p"
                                  className="mt-1 text-xs font-medium text-rose-500"
                                />
                              </div>

                              <div>
                                <label className={`mb-1 block text-xs font-medium text-gray`}>
                                  Fee (₹)
                                </label>
                                <Field
                                  name={`durations.${index}.fee`}
                                  type="number"
                                  className={`w-full rounded-lg border px-2 py-1.5 text-sm transition-all focus:outline-none focus:ring-2 ${
                                    isDark
                                      ? 'border-dark_border bg-darklight text-white focus:border-primary focus:ring-primary/30'
                                      : 'border-border bg-light text-midnight_text focus:border-primary focus:ring-primary/20'
                                  }`}
                                  placeholder="e.g. 1000"
                                />
                                <ErrorMessage
                                  name={`durations.${index}.fee`}
                                  component="p"
                                  className="mt-1 text-xs font-medium text-rose-500"
                                />
                              </div>

                              {values.durations.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className={`col-span-2 inline-flex items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                                    isDark
                                      ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30'
                                      : 'bg-rose-500/10 text-rose-600 hover:bg-rose-500/20'
                                  }`}
                                >
                                  <FiTrash2 className="h-3.5 w-3.5" /> Remove Duration
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FieldArray>

                  {/* Active */}
                  <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all ${
                    isDark
                      ? 'border-dark_border hover:border-primary'
                      : 'border-border hover:border-primary'
                  }`}>
                    <Field type="checkbox" name="isActive" className="hidden" />
                    {({ field }) => (
                      <>
                        <div
                          className={`relative flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${
                            field.value
                              ? 'bg-primary border-primary'
                              : isDark
                              ? 'border-dark_border bg-darklight'
                              : 'border-border bg-light'
                          }`}
                        >
                          {field.value && (
                            <FiCheckCircle className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <span className={`font-medium text-sm ${
                          isDark ? 'text-white' : 'text-midnight_text'
                        }`}>
                          Mark as Active Domain
                        </span>
                      </>
                    )}
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-white shadow-md transition-all disabled:opacity-60 disabled:shadow-none ${
                      isDark
                        ? 'bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary'
                        : 'bg-gradient-to-r from-primary to-skyBlue hover:from-skyBlue hover:to-primary'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isLoading && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                      )}
                      <span>
                        {isLoading
                          ? "Saving..."
                          : isEdit
                          ? "Update Domain"
                          : "Create Domain"}
                      </span>
                    </div>
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