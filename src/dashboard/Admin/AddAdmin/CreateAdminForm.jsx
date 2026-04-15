import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiX } from "react-icons/fi";
import { useCreateAdminMutation } from '@/Services/admin/admincreationServices';

const CreateAdminForm = () => {
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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Create Admin Account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Grant administrative access to a new user
        </p>
      </div>

      <div className="p-6">
        {/* Alert */}
        {showAlert && (
          <div
            className={`mb-4 flex items-start justify-between gap-4 rounded-xl border p-4 ${
              alertType === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            <p className="text-sm">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="text-current opacity-70 hover:opacity-100"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
              <label className="mb-1 block text-sm font-medium text-slate-700">
                {label}
              </label>
              <div className="relative">
                <Icon className="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  className="w-full rounded-lg border border-slate-300 px-10 py-2 text-sm transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <p className="mt-1 text-xs text-rose-600">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formik.isValid || isLoading}
            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating Admin..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminForm;