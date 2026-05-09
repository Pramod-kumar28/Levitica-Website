import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiX, FiCheckCircle, FiAlertCircle, FiUserPlus, FiAward, FiBriefcase, FiPhone, FiFileText } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';
import { useCreateMentorMutation } from '@/Services/admin/mentorServices';

const CreateMentorForm = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const [createMentor, { isLoading }] = useCreateMentorMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      expertise: "",
      experience: "",
      phone: "",
      bio: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      expertise: Yup.string().required("Expertise area is required"),
      experience: Yup.number()
        .min(0, "Experience must be positive")
        .required("Years of experience is required"),
      phone: Yup.string(),
      bio: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const response = await createMentor(values).unwrap();

        setAlertType("success");
        setAlertMessage(
          response?.message || "Mentor account created successfully!"
        );
        setShowAlert(true);
        formik.resetForm();
      } catch (error) {
        const message =
          error?.data?.message ||
          error?.data?.error ||
          "Mentor creation failed. Please try again.";

        setAlertType("error");
        setAlertMessage(message);
        setShowAlert(true);
      }
    },
  });

  return (
    <div className={`rounded-2xl border shadow-lg overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'border-slate-200 bg-white'}`}>
      {/* Premium Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 sm:p-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
            <FiUserPlus className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              Create Mentor Account
            </h2>
            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-emerald-100 line-clamp-1">
              Add a new mentor to guide students
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
          {/* Name Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Full Name *
            </label>
            <div className="relative group">
              <FiUser className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <input
                type="text"
                name="name"
                placeholder="Enter mentor's full name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className={`mt-1 text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Email Address *
            </label>
            <div className="relative group">
              <FiMail className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <input
                type="email"
                name="email"
                placeholder="mentor@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className={`mt-1 text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Password *
            </label>
            <div className="relative group">
              <FiLock className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <input
                type="password"
                name="password"
                placeholder="Create a secure password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className={`mt-1 text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Expertise Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Area of Expertise *
            </label>
            <div className="relative group">
              <FiAward className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <input
                type="text"
                name="expertise"
                placeholder="e.g., Web Development, Data Science, UI/UX"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expertise}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
            {formik.touched.expertise && formik.errors.expertise && (
              <p className={`mt-1 text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                {formik.errors.expertise}
              </p>
            )}
          </div>

          {/* Experience Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Years of Experience *
            </label>
            <div className="relative group">
              <FiBriefcase className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <input
                type="number"
                name="experience"
                placeholder="e.g., 5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.experience}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
            {formik.touched.experience && formik.errors.experience && (
              <p className={`mt-1 text-xs ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
                {formik.errors.experience}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Phone Number (Optional)
            </label>
            <div className="relative group">
              <FiPhone className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 123-4567"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
          </div>

          {/* Bio Field */}
          <div>
            <label className={`mb-1.5 sm:mb-2 block text-xs sm:text-sm font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Bio (Optional)
            </label>
            <div className="relative group">
              <FiFileText className={`pointer-events-none absolute left-3 top-3 h-4 w-4 sm:h-5 sm:w-5 transition group-focus-within:text-emerald-600 ${isDark ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-600'}`} />
              <textarea
                name="bio"
                rows="3"
                placeholder="Brief introduction about the mentor..."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                className={`w-full rounded-lg sm:rounded-xl border px-9 sm:px-10 py-2 sm:py-2.5 text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark ? 'border-slate-600 bg-slate-700 text-white placeholder-slate-500 focus:bg-slate-600 focus:border-emerald-500 hover:border-slate-500' : 'border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-500 hover:border-slate-400'}`}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!formik.isValid || isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none mt-2 sm:mt-3"
          >
            <FiUserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
            {isLoading ? "Creating Mentor..." : "Create Mentor Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMentorForm;