import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import {
  useCreateAdminMutation,
  useUpdateAdminMutation,
} from "@/Services/admin/admincreationServices";

// Icons
import {
  FiX,
  FiUser,
  FiMail,
  FiLock,
  FiShield,
  FiSave,
  FiCheck,
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

const AdminModal = ({ onSuccess, mode = "add", admin = {} }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isEdit = mode === "edit";

  const [createAdmin] = useCreateAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();

  // Initial values
  const initialValues = isEdit
    ? {
        name: admin.name || "",
        email: admin.email || "",
        role: admin.role || "admin",
        password: "", // Password is optional in edit mode
      }
    : {
        name: "",
        email: "",
        password: "",
        role: "admin",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required"),
    password: isEdit
      ? Yup.string().min(6, "Password must be at least 6 characters")
      : Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={`w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl transition-colors ${
            isDark ? "bg-slate-800 border border-slate-700" : "bg-white"
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between border-b px-6 py-4 transition-colors ${
              isDark ? "border-slate-700" : "border-slate-200"
            }`}
          >
            <div>
              <h2
                className={`text-lg font-bold transition-colors ${
                  isDark ? "text-slate-100" : "text-slate-900"
                }`}
              >
                {isEdit ? "Edit Admin Profile" : "Add New Admin"}
              </h2>
              <p
                className={`mt-1 text-xs transition-colors ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {isEdit
                  ? "Update admin settings and permissions"
                  : "Create a new administrator account"}
              </p>
            </div>
            <button
              onClick={onSuccess}
              className={`rounded-lg p-2 transition ${
                isDark
                  ? "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>

          {/* Form container */}
          <div className="max-h-[75vh] overflow-y-auto p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                const payload = {
                  name: values.name,
                  email: values.email,
                  role: values.role,
                };
                
                // Only include password if provided (for edit mode)
                if (values.password) {
                  payload.password = values.password;
                }

                try {
                  if (isEdit) {
                    await updateAdmin({ id: admin._id, data: payload }).unwrap();
                    toast.success("Admin profile updated successfully");
                  } else {
                    await createAdmin(payload).unwrap();
                    toast.success("Admin profile created successfully");
                  }
                  onSuccess();
                } catch (error) {
                  console.error("Admin mutation error:", error);
                  const errorMsg =
                    error?.data?.message ||
                    error?.data?.error ||
                    "Operation failed. Please try again.";
                  toast.error(errorMsg);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ values, isSubmitting, setFieldValue }) => (
                <Form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label
                        className={`mb-1 block text-xs font-medium transition-colors ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Full Name *
                      </label>
                      <div className="relative group">
                        <FiUser
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${
                            isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                          }`}
                        />
                        <Field
                          name="name"
                          placeholder="John Doe"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                            isDark
                              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                              : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 bg-white"
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="p"
                        className="mt-1 text-xs text-rose-500"
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        className={`mb-1 block text-xs font-medium transition-colors ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Email Address *
                      </label>
                      <div className="relative group">
                        <FiMail
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${
                            isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                          }`}
                        />
                        <Field
                          name="email"
                          type="email"
                          placeholder="admin@example.com"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                            isDark
                              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                              : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 bg-white"
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="mt-1 text-xs text-rose-500"
                      />
                    </div>

                    {/* Password */}
                    <div>
                      <label
                        className={`mb-1 block text-xs font-medium transition-colors ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Password {!isEdit && "*"}
                      </label>
                      <div className="relative group">
                        <FiLock
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${
                            isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                          }`}
                        />
                        <Field
                          name="password"
                          type="password"
                          placeholder={isEdit ? "Leave blank to keep current" : "Create a secure password"}
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                            isDark
                              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                              : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 bg-white"
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="mt-1 text-xs text-rose-500"
                      />
                    </div>

                    {/* Role Selection */}
                    <div>
                      <label
                        className={`mb-1 block text-xs font-medium transition-colors ${
                          isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                      >
                        Role *
                      </label>
                      <div className="relative group">
                        <FiShield
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${
                            isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                          }`}
                        />
                        <Field
                          as="select"
                          name="role"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${
                            isDark
                              ? "bg-slate-700 border-slate-600 text-white focus:border-emerald-500"
                              : "border-slate-300 text-slate-900 focus:border-emerald-500 bg-white"
                          }`}
                        >
                          <option value="admin">Admin</option>
                          <option value="superadmin">Super Admin</option>
                        </Field>
                      </div>
                      <ErrorMessage
                        name="role"
                        component="p"
                        className="mt-1 text-xs text-rose-500"
                      />
                    </div>
                  </div>

                  {/* Footer Action Buttons */}
                  <div
                    className={`flex items-center justify-end gap-3 pt-6 border-t ${
                      isDark ? "border-slate-700" : "border-slate-200"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={onSuccess}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-xs font-semibold transition-colors ${
                        isDark
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all shadow-md hover:shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700`}
                    >
                      {isSubmitting ? (
                        <>
                          <AiOutlineLoading3Quarters className="w-3.5 h-3.5 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="w-3.5 h-3.5" />
                          {isEdit ? "Update Profile" : "Create Account"}
                        </>
                      )}
                    </button>
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

export default AdminModal;