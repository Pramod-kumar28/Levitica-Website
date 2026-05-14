import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";
import { useGetCoursesQuery } from "@/Services/sharedServices/courses.Services";
import {
  useCreateMentorMutation,
  useUpdateMentorMutation,
} from "@/Services/admin/mentorServices";

// Icons
import {
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiAward,
  FiBookOpen,
  FiSave,
  FiCheck,
  FiImage,
} from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

const MentorModal = ({ onSuccess, mode = "add", mentor = {} }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isEdit = mode === "edit";

  const { data: coursesData, isLoading: coursesLoading } = useGetCoursesQuery();
  const [createMentor] = useCreateMentorMutation();
  const [updateMentor] = useUpdateMentorMutation();

  const courses = coursesData || [];

  // Initial values mapped from backend schema
  const initialValues = isEdit
    ? {
      name: mentor.name || "",
      email: mentor.email || "",
      mobile: mentor.mobile || "",
      expertise: Array.isArray(mentor.expertise)
        ? mentor.expertise.join(", ")
        : mentor.expertise || "",
      courses: Array.isArray(mentor.courses)
        ? mentor.courses.map((c) => (typeof c === "object" ? c._id : c))
        : [],
      isActive: mentor.isActive !== undefined ? mentor.isActive : true,
      profileImageUrl: mentor.profileImage?.url || "",
    }
    : {
      name: "",
      email: "",
      mobile: "",
      expertise: "",
      courses: [],
      isActive: true,
      profileImageUrl: "",
    };

  const validationSchema = Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email address is required"),
    mobile: Yup.string()
      .required("Mobile number is required")
      .matches(/^[0-9+\s-]{10,15}$/, "Enter a valid mobile number"),
    expertise: Yup.string().required("At least one area of expertise is required"),
    courses: Yup.array().of(Yup.string()),
    isActive: Yup.boolean(),
    profileImageUrl: Yup.string().url("Must be a valid image URL").nullable(),
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
          className={`w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl transition-colors ${isDark ? "bg-slate-800 border border-slate-700" : "bg-white"
            }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between border-b px-6 py-4 transition-colors ${isDark ? "border-slate-700" : "border-slate-200"
              }`}
          >
            <div>
              <h2
                className={`text-lg font-bold transition-colors ${isDark ? "text-slate-100" : "text-slate-900"
                  }`}
              >
                {isEdit ? "Edit Mentor Profile" : "Add New Mentor"}
              </h2>
              <p
                className={`mt-1 text-xs transition-colors ${isDark ? "text-slate-400" : "text-slate-500"
                  }`}
              >
                {isEdit
                  ? "Update mentor settings, courses, and active status"
                  : "Create a new mentor account and assign them to courses"}
              </p>
            </div>
            <button
              onClick={onSuccess}
              className={`rounded-lg p-2 transition ${isDark
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
                // Map frontend values to backend model
                const payload = {
                  name: values.name,
                  email: values.email,
                  mobile: values.mobile,
                  expertise: values.expertise
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
                  courses: values.courses,
                  isActive: values.isActive,
                  profileImage: values.profileImageUrl
                    ? { url: values.profileImageUrl, publicId: "" }
                    : {},
                };

                try {
                  if (isEdit) {
                    await updateMentor({ id: mentor._id, ...payload }).unwrap();
                    toast.success("Mentor profile updated successfully");
                  } else {
                    await createMentor(payload).unwrap();
                    toast.success("Mentor profile created successfully");
                  }
                  onSuccess();
                } catch (error) {
                  console.error("Mentor mutation error:", error);
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
                        className={`mb-1 block text-xs font-medium transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                      >
                        Full Name *
                      </label>
                      <div className="relative group">
                        <FiUser
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                            }`}
                        />
                        <Field
                          name="name"
                          placeholder="John Doe"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark
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
                        className={`mb-1 block text-xs font-medium transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                      >
                        Email Address *
                      </label>
                      <div className="relative group">
                        <FiMail
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                            }`}
                        />
                        <Field
                          name="email"
                          type="email"
                          placeholder="mentor@example.com"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark
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

                    {/* Mobile Number */}
                    <div>
                      <label
                        className={`mb-1 block text-xs font-medium transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                      >
                        Mobile Number *
                      </label>
                      <div className="relative group">
                        <FiPhone
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                            }`}
                        />
                        <Field
                          name="mobile"
                          placeholder="9876543210"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark
                              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                              : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 bg-white"
                            }`}
                        />
                      </div>
                      <ErrorMessage
                        name="mobile"
                        component="p"
                        className="mt-1 text-xs text-rose-500"
                      />
                    </div>

                    {/* Area of Expertise */}
                    <div>
                      <label
                        className={`mb-1 block text-xs font-medium transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                          }`}
                      >
                        Area of Expertise *
                      </label>
                      <div className="relative group">
                        <FiAward
                          className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${isDark
                              ? "text-slate-500 group-focus-within:text-emerald-400"
                              : "text-slate-400 group-focus-within:text-emerald-600"
                            }`}
                        />
                        <Field
                          name="expertise"
                          placeholder="Web Dev, React, Python (comma separated)"
                          className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark
                              ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                              : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 bg-white"
                            }`}
                        />
                      </div>
                      <ErrorMessage
                        name="expertise"
                        component="p"
                        className="mt-1 text-xs text-rose-500"
                      />
                    </div>
                  </div>

                  {/* Profile Image URL */}
                  <div>
                    <label
                      className={`mb-1 block text-xs font-medium transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                    >
                      Profile Image URL (Optional)
                    </label>
                    <div className="relative group">
                      <FiImage
                        className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition ${isDark
                            ? "text-slate-500 group-focus-within:text-emerald-400"
                            : "text-slate-400 group-focus-within:text-emerald-600"
                          }`}
                      />
                      <Field
                        name="profileImageUrl"
                        placeholder="https://example.com/image.jpg"
                        className={`w-full rounded-lg border pl-9 pr-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${isDark
                            ? "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-500"
                            : "border-slate-300 text-slate-900 placeholder-slate-400 focus:border-emerald-500 bg-white"
                          }`}
                      />
                    </div>
                    <ErrorMessage
                      name="profileImageUrl"
                      component="p"
                      className="mt-1 text-xs text-rose-500"
                    />
                  </div>

                  {/* Active Status */}
                  <div className="flex items-center gap-3 py-2">
                    <label
                      className={`text-sm font-medium transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                    >
                      Active Status
                    </label>
                    <button
                      type="button"
                      onClick={() => setFieldValue("isActive", !values.isActive)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${values.isActive ? "bg-emerald-500" : "bg-slate-600"
                        }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${values.isActive ? "translate-x-5" : "translate-x-0"
                          }`}
                      />
                    </button>
                    <span
                      className={`text-xs ${values.isActive ? "text-emerald-500" : "text-slate-500"
                        }`}
                    >
                      {values.isActive ? "Active (Can be assigned)" : "Inactive"}
                    </span>
                  </div>

                  {/* Courses Selection */}
                  <div className="space-y-2">
                    <label
                      className={`block text-xs font-semibold transition-colors ${isDark ? "text-slate-300" : "text-slate-700"
                        }`}
                    >
                      Assign Courses
                    </label>
                    {coursesLoading ? (
                      <div className="text-xs text-gray animate-pulse">
                        Loading courses list...
                      </div>
                    ) : (
                      <div
                        className={`max-h-40 overflow-y-auto rounded-xl border p-4 space-y-2.5 transition-colors ${isDark
                            ? "border-slate-700 bg-slate-900/50"
                            : "border-slate-200 bg-slate-50"
                          }`}
                      >
                        {courses.length === 0 ? (
                          <div className="text-xs text-slate-500 text-center py-4">
                            No courses available to assign.
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {courses.map((course) => {
                              const isChecked = values.courses.includes(
                                course._id
                              );
                              return (
                                <label
                                  key={course._id}
                                  className={`flex items-center gap-2.5 p-2 rounded-lg border text-xs cursor-pointer transition-all duration-200 select-none ${isChecked
                                      ? isDark
                                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                                        : "border-emerald-300 bg-emerald-50 text-emerald-800"
                                      : isDark
                                        ? "border-slate-700 hover:border-slate-600 text-slate-400"
                                        : "border-slate-200 hover:border-slate-300 text-slate-600 bg-white"
                                    }`}
                                >
                                  <input
                                    type="checkbox"
                                    name="courses"
                                    value={course._id}
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const nextCourses = e.target.checked
                                        ? [...values.courses, course._id]
                                        : values.courses.filter(
                                          (id) => id !== course._id
                                        );
                                      setFieldValue("courses", nextCourses);
                                    }}
                                    className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/20"
                                  />
                                  <div className="truncate">
                                    <p className="font-semibold truncate">
                                      {course.name}
                                    </p>
                                    <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                                      {course.category}
                                    </p>
                                  </div>
                                </label>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer Action Buttons */}
                  <div
                    className={`flex items-center justify-end gap-3 pt-6 border-t ${isDark ? "border-slate-700" : "border-slate-200"
                      }`}
                  >
                    <button
                      type="button"
                      onClick={onSuccess}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 border rounded-lg text-xs font-semibold transition-colors ${isDark
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700"
                          : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white transition-all shadow-md hover:shadow-lg ${isSubmitting
                          ? "bg-slate-600 cursor-not-allowed opacity-60"
                          : "bg-emerald-600 hover:bg-emerald-700"
                        }`}
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

export default MentorModal;
