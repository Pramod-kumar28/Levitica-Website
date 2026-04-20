import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiX, FiCheckCircle, FiAlertCircle, FiUserPlus } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';
import { useCreateAdminMutation } from '@/Services/admin/admincreationServices';

const CreateAdminForm = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [createAdmin, { isLoading }] = useCreateAdminMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createAdmin(values).unwrap();

        setAlertType("success");
        setAlertMessage(
          response?.message || "Admin account created successfully!"
        );
        setShowAlert(true);
        formik.resetForm();
      } catch (error) {
        const message =
          error?.data?.message ||
          error?.data?.error ||
          "Admin creation failed. Please try again.";

        setAlertType("error");
        setAlertMessage(message);
        setShowAlert(true);
      }
    },
  });

  return (
    <div className={`rounded-2xl border shadow-lg overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'border-slate-200 bg-white'}`}>
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
            <FiUserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              Create Admin Account
            </h2>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-indigo-100 line-clamp-1">
              Grant administrative access to a new user
            </p>
          </div>
        </div>
      </div>

      <div className={`p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 ${isDark ? 'bg-slate-800' : ''}`}>
        {/* Alert */}
        {showAlert && (
          <div
            className={`mb-4 sm:mb-6 flex items-start justify-between gap-3 sm:gap-4 rounded-lg sm:rounded-xl border p-3 sm:p-4 backdrop-blur-sm text-xs sm:text-sm ${
              alertType === "success"
                ? isDark ? "border-emerald-800 bg-emerald-950 text-emerald-300 shadow-md" : "border-emerald-300 bg-emerald-50 text-emerald-700 shadow-md"
                : isDark ? "border-rose-800 bg-rose-950 text-rose-300 shadow-md" : "border-rose-300 bg-rose-50 text-rose-700 shadow-md"
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1">
              {alertType === "success" ? (
                <FiCheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
              ) : (
                <FiAlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" />
              )}
              <p className="font-medium break-words">{alertMessage}</p>
            </div>
            <button
              onClick={() => setShowAlert(false)}
              className="text-current opacity-70 hover:opacity-100 flex-shrink-0"
            >
              <FiX className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-4 sm:space-y-5">
          {[
            {
              name: "name",
              label: "Full Name",
              placeholder: "Admin name",
              icon: FiUser,
              type: "text",
            },
            {
              name: "email",
              label: "Email Address",
              placeholder: "admin@example.com",
              icon: FiMail,
              type: "email",
            },
            {
              name: "password",
              label: "Password",
              placeholder: "Create a secure password",
              icon: FiLock,
              type: "password",
            },
          ].map(({ name, label, placeholder, icon: Icon, type }) => (
            <div key={name}>
              <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                {label}
              </label>
              <div className="relative group">
                <Icon className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-indigo-600 ${isDark ? 'text-slate-500 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`} />
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-indigo-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-indigo-500 hover:border-slate-400'}`}
                />
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <p className={`mt-1 text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formik.isValid || isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none mt-2 sm:mt-3"
          >
            <FiUserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
            {isLoading ? "Creating Admin..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminForm;