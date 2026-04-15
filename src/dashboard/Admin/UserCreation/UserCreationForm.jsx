import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useCourses } from '@/hooks/useCourses';
import { useCreateUserMutation } from '@/Services/admin/statsService';

const UserCreationForm = () => {
  const { courses } = useCourses();
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
            <label className="text-sm font-medium text-slate-700">
              {name.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={name.includes("password") ? "password" : "text"}
              name={name}
              onChange={formik.handleChange}
              value={formik.values[name]}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        ))}
      </div>

      {/* Courses */}
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">
          Enroll in Courses
        </p>
        <div className="grid sm:grid-cols-2 gap-2">
          {courses?.map(c => (
            <label key={c._id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formik.values.enrolledCourses.includes(c._id)}
                onChange={e => {
                  const set = new Set(formik.values.enrolledCourses);
                  e.target.checked ? set.add(c._id) : set.delete(c._id);
                  formik.setFieldValue("enrolledCourses", [...set]);
                }}
              />
              <span className="text-sm">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
      >
        {isLoading ? "Creating…" : "Create User"}
      </button>
    </form>
  );
};

export default UserCreationForm;
