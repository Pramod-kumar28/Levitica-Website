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
          className={`w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl overflow-y-auto transition-colors ${
            isDark ? 'bg-slate-800' : 'bg-white'
          }`}
        >
          {/* ================= HEADER ================= */}
          <div className={`border-b px-4 sm:px-6 py-4 sm:py-6 transition-colors ${
            isDark
              ? 'border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700'
              : 'border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* {isEdit ? (
                    <FiEdit2 className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 flex-shrink-0" />
                  ) : (
                    <FiArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-600 flex-shrink-0" />
                  )} */}
                  <h2 className={`text-xl sm:text-2xl font-bold truncate ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {isEdit ? "Edit Domain" : "Create Domain"}
                  </h2>
                </div>
                <p className={`text-xs sm:text-sm line-clamp-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {isEdit 
                    ? "Update internship domain details and durations" 
                    : "Set up a new internship domain program"}
                </p>
              </div>
              <button
                onClick={handleClose}
                className={`inline-flex rounded-lg p-1.5 sm:p-2 transition-colors flex-shrink-0 ${
                  isDark
                    ? 'text-slate-400 hover:bg-slate-700 hover:text-slate-300'
                    : 'text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
              >
                <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <div className={`overflow-y-auto p-4 sm:p-6 space-y-1 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors }) => (
                <Form className="space-y-4 sm:space-y-6">
                  {/* Domain Name */}
                  <div className="group">
                    <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-900'
                    }`}>
                      Domain Name <span className="text-rose-500">*</span>
                    </label>
                    <Field
                      name="name"
                      placeholder="e.g. Java Full Stack Development"
                      className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 ${
                        errors.name 
                          ? isDark
                            ? "border-rose-600/50 bg-rose-950/20 text-white"
                            : "border-rose-300 bg-rose-50 text-slate-900"
                          : isDark
                          ? "border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:border-indigo-500"
                          : "border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-indigo-500"
                      }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="p"
                      className="mt-1 text-xs font-medium text-rose-600"
                    />
                  </div>

                  {/* Focus */}
                  <div className="group">
                    <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-900'
                    }`}>
                      Focus Areas <span className="text-rose-500">*</span>
                    </label>
                    <Field
                      name="focus"
                      placeholder="Core Java, Spring Boot, React"
                      className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 ${
                        errors.focus 
                          ? isDark
                            ? "border-rose-600/50 bg-rose-950/20 text-white"
                            : "border-rose-300 bg-rose-50 text-slate-900"
                          : isDark
                          ? "border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:border-indigo-500"
                          : "border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-indigo-500"
                      }`}
                    />
                    <ErrorMessage
                      name="focus"
                      component="p"
                      className="mt-1 text-xs font-medium text-rose-600"
                    />
                  </div>

                  {/* Level */}
                  <div className="group">
                    <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-semibold ${
                      isDark ? 'text-slate-300' : 'text-slate-900'
                    }`}>
                      Level <span className="text-rose-500">*</span>
                    </label>
                    <Field 
                      as="select" 
                      name="level" 
                      className={`w-full rounded-lg border-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 ${
                        errors.level 
                          ? isDark
                            ? "border-rose-600/50 bg-rose-950/20 text-white"
                            : "border-rose-300 bg-rose-50 text-slate-900"
                          : isDark
                          ? "border-slate-600 bg-slate-700 text-slate-100 hover:border-slate-500 focus:border-indigo-500"
                          : "border-slate-200 bg-white text-slate-900 hover:border-slate-300 focus:border-indigo-500"
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
                      className="mt-1 text-xs font-medium text-rose-600"
                    />
                  </div>

                  {/* Durations */}
                  <FieldArray name="durations">
                    {({ push, remove }) => (
                      <div className={`space-y-3 sm:space-y-4 rounded-lg sm:rounded-xl border-2 p-3 sm:p-4 transition-colors ${
                        isDark
                          ? 'border-slate-600 bg-slate-700'
                          : 'border-slate-200 bg-slate-50'
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                          <div className={`flex items-center gap-2 font-semibold text-xs sm:text-base ${
                            isDark ? 'text-slate-300' : 'text-slate-900'
                          }`}>
                            <div className={`flex h-6 sm:h-8 w-6 sm:w-8 items-center justify-center rounded-lg ${
                              isDark ? 'bg-indigo-900/40' : 'bg-indigo-100'
                            }`}>
                              <FiClock className={`h-4 sm:h-5 w-4 sm:w-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                            </div>
                            Durations & Fees <span className="text-rose-500">*</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => push({ days: "", fee: "" })}
                            className={`inline-flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 rounded-lg px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all active:scale-95 w-full sm:w-auto ${
                              isDark
                                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                                : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                          >
                            <FiPlus className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> <span className="hidden sm:inline">Add Duration</span><span className="sm:hidden">Add</span>
                          </button>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                          {values.durations.map((_, index) => (
                            <div
                              key={index}
                              className={`grid grid-cols-2 gap-2 sm:gap-3 rounded-lg border p-2.5 sm:p-4 ${
                                isDark
                                  ? 'border-slate-600 bg-slate-800'
                                  : 'border-slate-200 bg-white'
                              }`}
                            >
                              <div>
                                <label className={`mb-1 sm:mb-1.5 block text-[10px] sm:text-xs font-semibold uppercase tracking-wide ${
                                  isDark ? 'text-slate-400' : 'text-slate-700'
                                }`}>
                                  Days
                                </label>
                                <Field
                                  name={`durations.${index}.days`}
                                  type="number"
                                  className={`w-full rounded-lg border-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 ${
                                    isDark
                                      ? 'border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:border-indigo-500'
                                      : 'border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-indigo-500'
                                  }`}
                                  placeholder="e.g. 5"
                                />
                                <ErrorMessage
                                  name={`durations.${index}.days`}
                                  component="p"
                                  className="mt-1 text-xs font-medium text-rose-600"
                                />
                              </div>

                              <div>
                                <label className={`mb-1 sm:mb-1.5 block text-[10px] sm:text-xs font-semibold uppercase tracking-wide ${
                                  isDark ? 'text-slate-400' : 'text-slate-700'
                                }`}>
                                  Fee (₹)
                                </label>
                                <Field
                                  name={`durations.${index}.fee`}
                                  type="number"
                                  className={`w-full rounded-lg border-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0 ${
                                    isDark
                                      ? 'border-slate-600 bg-slate-700 text-slate-100 placeholder-slate-500 hover:border-slate-500 focus:border-indigo-500'
                                      : 'border-slate-200 bg-white text-slate-900 placeholder-slate-400 hover:border-slate-300 focus:border-indigo-500'
                                  }`}
                                  placeholder="e.g. 1000"
                                />
                                <ErrorMessage
                                  name={`durations.${index}.fee`}
                                  component="p"
                                  className="mt-1 text-xs font-medium text-rose-600"
                                />
                              </div>

                              {values.durations.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => remove(index)}
                                  className={`col-span-2 inline-flex items-center justify-center gap-1 sm:gap-1.5 rounded-lg py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all active:scale-95 ${
                                    isDark
                                      ? 'bg-rose-900/30 text-rose-300 hover:bg-rose-900/50'
                                      : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                                  }`}
                                >
                                  <FiTrash2 className="h-3.5 sm:h-4 w-3.5 sm:w-4" /> Remove Duration
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </FieldArray>

                  {/* Active */}
                  <label className={`group flex cursor-pointer items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl border-2 p-3 sm:p-4 transition-all ${
                    isDark
                      ? 'border-slate-600 bg-gradient-to-r from-slate-800 to-slate-700 hover:border-indigo-600 hover:bg-indigo-950/20'
                      : 'border-slate-200 bg-gradient-to-r from-slate-50 to-white hover:border-indigo-300 hover:bg-indigo-50'
                  }`}>
                    <div className={`relative flex h-5 sm:h-6 w-5 sm:w-6 items-center justify-center rounded-md border-2 transition-all flex-shrink-0 group-has-[:checked]:border-indigo-600 group-has-[:checked]:bg-indigo-600 ${
                      isDark
                        ? 'border-slate-500 bg-slate-700'
                        : 'border-slate-300 bg-white'
                    }`}>
                      <Field
                        type="checkbox"
                        name="isActive"
                        className="peer h-5 w-5 cursor-pointer appearance-none accent-indigo-600"
                      />
                      <FiCheckCircle className="absolute h-4 sm:h-5 w-4 sm:w-5 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                    </div>
                    <span className={`font-medium text-xs sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>
                      Mark as Active Domain
                    </span>
                  </label>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`group relative w-full overflow-hidden rounded-lg sm:rounded-xl py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg transition-all active:scale-95 disabled:opacity-60 disabled:shadow-none ${
                      isDark
                        ? 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:shadow-xl hover:shadow-indigo-500/50 hover:from-indigo-500 hover:via-indigo-500 hover:to-blue-500'
                        : 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-blue-600 hover:shadow-xl hover:from-indigo-700 hover:via-indigo-700 hover:to-blue-700'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isLoading && (
                        <div className="h-3.5 sm:h-4 w-3.5 sm:w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
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
