import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiUser, FiMail, FiLock, FiX } from "react-icons/fi";
import { useCreateAdminMutation } from "../../../../Services/admin/admincreationServices";

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
    <div className="tw-rounded-2xl tw-border tw-border-slate-200 tw-bg-white tw-shadow-sm">
      {/* Header */}
      <div className="tw-border-b tw-border-slate-200 tw-p-6">
        <h2 className="tw-text-lg tw-font-semibold tw-text-slate-900">
          Create Admin Account
        </h2>
        <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
          Grant administrative access to a new user
        </p>
      </div>

      <div className="tw-p-6">
        {/* Alert */}
        {showAlert && (
          <div
            className={`tw-mb-4 tw-flex tw-items-start tw-justify-between tw-gap-4 tw-rounded-xl tw-border tw-p-4 ${
              alertType === "success"
                ? "tw-border-emerald-200 tw-bg-emerald-50 tw-text-emerald-700"
                : "tw-border-rose-200 tw-bg-rose-50 tw-text-rose-700"
            }`}
          >
            <p className="tw-text-sm">{alertMessage}</p>
            <button
              onClick={() => setShowAlert(false)}
              className="tw-text-current tw-opacity-70 hover:tw-opacity-100"
            >
              <FiX />
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="tw-space-y-5">
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
              <label className="tw-mb-1 tw-block tw-text-sm tw-font-medium tw-text-slate-700">
                {label}
              </label>
              <div className="tw-relative">
                <Icon className="tw-pointer-events-none tw-absolute tw-left-3 tw-top-2.5 tw-h-5 tw-w-5 tw-text-slate-400" />
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                  className="tw-w-full tw-rounded-lg tw-border tw-border-slate-300 tw-px-10 tw-py-2 tw-text-sm tw-transition focus:tw-border-indigo-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-indigo-500/20"
                />
              </div>
              {formik.touched[name] && formik.errors[name] && (
                <p className="tw-mt-1 tw-text-xs tw-text-rose-600">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            disabled={!formik.isValid || isLoading}
            className="tw-flex tw-w-full tw-items-center tw-justify-center tw-rounded-xl tw-bg-indigo-600 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-transition hover:tw-bg-indigo-700 disabled:tw-cursor-not-allowed disabled:tw-opacity-60"
          >
            {isLoading ? "Creating Admin..." : "Create Admin Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminForm;