import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";
import {
  useSendVerificationEmailMutation,
  useSignupMutation,
} from '@/Services/authService';
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCooldown, setVerifyCooldown] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { name, email } = location.state || {};

  const [triggerSignup, { isLoading }] = useSignupMutation();
  const [sendVerificationEmail, { isLoading: isVerifying }] =
    useSendVerificationEmailMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      password: "",
      role: "student",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, "Mobile must be 10 digits")
        .required("Mobile is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      if (!termsAccepted || !isVerified) return;

      try {
        await triggerSignup(values).unwrap();
        toast.success("Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } catch (err) {
        toast.error(err?.data?.message || "Signup failed");
      }
    },
  });

  useEffect(() => {
    if (name || email) {
      formik.setValues((prev) => ({
        ...prev,
        name: name || "",
        email: email || "",
      }));
      setIsVerified(true);
    }
  }, [name, email]);

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    const { email, name } = formik.values;

    if (!email || !name) {
      toast.error("Please enter name and email first");
      return;
    }

    try {
      const res = await sendVerificationEmail({ email, name }).unwrap();
      toast.success(res.message || "Verification email sent");
      setVerifyCooldown(true);
      setTimeout(() => setVerifyCooldown(false), 30000);
    } catch {
      toast.error("Verification failed");
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 login-signup-form">

      {/* NAME */}
      <div>
        <label className="block text-left text-sm font-medium mb-1 text-midnight_text dark:text-light">
          Your Name
        </label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray" />
          <input
            type="text"
            name="name"
            className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark_border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-semidark dark:text-light dark:placeholder:text-darkgray transition-all duration-150"
            placeholder="Enter your name"
            {...formik.getFieldProps("name")}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="text-rose-500 dark:text-rose-500 text-sm mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* EMAIL + VERIFY */}
      <div>
        <label className="block text-left text-sm font-medium mb-1 text-midnight_text dark:text-light">
          Email Address
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray" />
            <input
              type="email"
              name="email"
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark_border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-semidark dark:text-light dark:placeholder:text-darkgray transition-all duration-150"
              placeholder="name@email.com"
              {...formik.getFieldProps("email")}
            />
          </div>

          {!isVerified ? (
            <button
              onClick={handleVerifyEmail}
              disabled={isVerifying || verifyCooldown}
              className="px-4 py-2 text-sm font-medium text-primary hover:text-cyan border border-border dark:border-dark_border rounded-lg hover:border-primary dark:hover:border-primary transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isVerifying ? "Sending..." : verifyCooldown ? "Wait 30s" : "Verify"}
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <FaCheckCircle className="text-emerald-500 dark:text-emerald-400 text-lg" />
              <span className="text-sm text-emerald-700 dark:text-emerald-300">Verified</span>
            </div>
          )}
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-rose-500 dark:text-rose-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* MOBILE + PASSWORD (only after verify) */}
      {isVerified && (
        <>
          <div>
            <label className="block text-left text-sm font-medium mb-1 text-midnight_text dark:text-light">
              Mobile Number
            </label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray" />
              <input
                type="text"
                name="mobile"
                className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark_border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-semidark dark:text-light dark:placeholder:text-darkgray transition-all duration-150"
                placeholder="10-digit mobile"
                {...formik.getFieldProps("mobile")}
              />
            </div>
            {formik.touched.mobile && formik.errors.mobile && (
              <p className="text-rose-500 dark:text-rose-500 text-sm mt-1">{formik.errors.mobile}</p>
            )}
          </div>

          <div>
            <label className="block text-left text-sm font-medium mb-1 text-midnight_text dark:text-light">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray" />
              <input
                type="password"
                name="password"
                className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark_border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-semidark dark:text-light dark:placeholder:text-darkgray transition-all duration-150"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-rose-500 dark:text-rose-500 text-sm mt-1">{formik.errors.password}</p>
            )}
          </div>
        </>
      )}

      {/* TERMS */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="w-4 h-4 text-primary border-border dark:border-dark_border rounded focus:ring-primary focus:ring-2"
        />
        <label htmlFor="terms" className="text-sm text-midnight_text dark:text-light">
          I agree to the{" "}
          <a href="#" className="text-primary hover:text-cyan transition-colors duration-150">
            terms & conditions
          </a>
        </label>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!termsAccepted || !isVerified || isLoading}
        className="w-full mt-4 px-4 py-2.5 bg-primary hover:bg-secondary text-light font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;