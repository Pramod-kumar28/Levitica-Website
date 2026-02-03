import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useCourses } from "../../../../hooks/useCourses";
import { useCreateUserMutation } from "../../../../Services/admin/statsService";

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
    <form onSubmit={formik.handleSubmit} className="tw-space-y-4">
      <div className="tw-grid md:tw-grid-cols-2 tw-gap-4">
        {["username", "email", "password", "confirmPassword"].map(name => (
          <div key={name}>
            <label className="tw-text-sm tw-font-medium tw-text-slate-700">
              {name.replace(/([A-Z])/g, " $1")}
            </label>
            <input
              type={name.includes("password") ? "password" : "text"}
              name={name}
              onChange={formik.handleChange}
              value={formik.values[name]}
              className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-px-3 tw-py-2 tw-text-sm focus:tw-ring-2 focus:tw-ring-indigo-500/20"
            />
          </div>
        ))}
      </div>

      {/* Courses */}
      <div>
        <p className="tw-text-sm tw-font-medium tw-text-slate-700 tw-mb-2">
          Enroll in Courses
        </p>
        <div className="tw-grid sm:tw-grid-cols-2 tw-gap-2">
          {courses?.map(c => (
            <label key={c._id} className="tw-flex tw-items-center tw-gap-2">
              <input
                type="checkbox"
                checked={formik.values.enrolledCourses.includes(c._id)}
                onChange={e => {
                  const set = new Set(formik.values.enrolledCourses);
                  e.target.checked ? set.add(c._id) : set.delete(c._id);
                  formik.setFieldValue("enrolledCourses", [...set]);
                }}
              />
              <span className="tw-text-sm">{c.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="tw-w-full tw-rounded-xl tw-bg-indigo-600 tw-py-3 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-indigo-700 disabled:tw-opacity-60"
      >
        {isLoading ? "Creating…" : "Create User"}
      </button>
    </form>
  );
};

export default UserCreationForm;
