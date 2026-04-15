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
    <form onSubmit={formik.handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <label className="text-sm font-medium">Your Name</label>
        <div className="relative">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            name="name"
            className="w-full pl-10 py-2 border rounded-lg"
            placeholder="Enter your name"
            {...formik.getFieldProps("name")}
          />
        </div>
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}
      </div>

      {/* EMAIL + VERIFY */}
      <div>
        <label className="text-sm font-medium">Email Address</label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="email"
              name="email"
              className="w-full pl-10 py-2 border rounded-lg"
              placeholder="name@email.com"
              {...formik.getFieldProps("email")}
            />
          </div>

          {!isVerified ? (
            <button
              onClick={handleVerifyEmail}
              disabled={isVerifying || verifyCooldown}
              className="text-sm text-blue-600"
            >
              {isVerifying ? "Sending..." : verifyCooldown ? "Wait" : "Verify"}
            </button>
          ) : (
            <FaCheckCircle className="text-green-500" />
          )}
        </div>
      </div>

      {/* MOBILE + PASSWORD (only after verify) */}
      {isVerified && (
        <>
          <div>
            <label className="text-sm font-medium">Mobile Number</label>
            <div className="relative">
              <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                name="mobile"
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="10-digit mobile"
                {...formik.getFieldProps("mobile")}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                name="password"
                className="w-full pl-10 py-2 border rounded-lg"
                placeholder="Enter password"
                {...formik.getFieldProps("password")}
              />
            </div>
          </div>
        </>
      )}

      {/* TERMS */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          onChange={(e) => setTermsAccepted(e.target.checked)}
        />
        <span className="text-sm">
          I agree to the{" "}
          <a href="#" className="text-blue-600">
            terms & conditions
          </a>
        </span>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!termsAccepted || !isVerified || isLoading}
        className="btn secondary-solid-btn w-full"
      >
        {isLoading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
