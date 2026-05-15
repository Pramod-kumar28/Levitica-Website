import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useCourses } from '@/hooks/useCourses';
import { useCreateUserMutation } from '@/Services/admin/statsService';
import { useTheme } from '@/context/ThemeContext';
import { FiX } from 'react-icons/fi';

const UserCreationForm = () => {
  const { courses } = useCourses();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [createUser, { isLoading }] = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      enrolledCourses: [],
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")])
        .required(),
    }),
    onSubmit: async values => {
      try {
        await createUser({ ...values, role: "student" }).unwrap();
        toast.success("User created successfully");
        formik.resetForm();
      } catch (e) {
        toast.error(e?.data?.message || "User creation failed");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {["username", "email", "password", "confirmPassword"].map(name => (
          <div key={name}>
            <label className={`text-sm font-medium block mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {name.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={name.includes("password") ? "password" : "text"}
              name={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[name]}
              className={`w-full rounded-lg px-4 py-2.5 text-sm font-medium border transition-all duration-200 ${
                formik.touched[name] && formik.errors[name]
                  ? isDark 
                    ? 'bg-red-950 border-2 border-red-600 text-red-100 placeholder-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 focus:outline-none'
                    : 'bg-red-50 border-2 border-red-500 text-red-900 placeholder-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-500/30 focus:outline-none'
                  : isDark
                    ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-500/40 focus:outline-none hover:border-slate-500'
                    : 'bg-white border-gray-200 text-slate-900 placeholder-gray-400 focus:border-gray-400 focus:ring-1 focus:ring-gray-300 focus:outline-none hover:border-gray-300'
              }`}
              placeholder={name.replace(/([A-Z])/g, " $1")}
            />
            {formik.touched[name] && formik.errors[name] && (
              <p className={`text-xs mt-1.5 font-medium flex items-center gap-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                <FiX className="w-4 h-4" />
                {formik.errors[name]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Courses */}
      <div>
        <p className={`text-sm font-bold mb-3 block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          Enroll in Courses
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {courses?.map(c => (
            <label key={c._id} className={`flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg transition-colors ${isDark ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-slate-100 text-slate-700'}`}>
              <input
                type="checkbox"
                checked={formik.values.enrolledCourses.includes(c._id)}
                onChange={e => {
                  const set = new Set(formik.values.enrolledCourses);
                  e.target.checked ? set.add(c._id) : set.delete(c._id);
                  formik.setFieldValue("enrolledCourses", [...set]);
                }}
                className={`w-4 h-4 rounded cursor-pointer transition-colors ${isDark ? 'accent-indigo-500 bg-slate-700 border-slate-600' : 'accent-indigo-600 bg-white border-slate-300'}`}
              />
              <span className="text-sm font-medium">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full rounded-lg py-2.5 text-sm font-bold transition-all duration-200 btn btn-primary`}
      >
        {isLoading ? "Creating…" : "Create User"}
      </button>
    </form>
  );
};

export default UserCreationForm;
