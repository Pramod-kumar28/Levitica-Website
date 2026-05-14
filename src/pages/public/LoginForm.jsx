import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLoginMutation } from '@/Services/authService';
import { useDispatch } from "react-redux";
import { login } from '@/features/authSlice';
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [triggerLogin, { isLoading }] = useLoginMutation();

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const response = await triggerLogin(values);
        console.log("Login response:", response);
        if (response.error) {
          toast.error(response.error.data?.message || "Login failed");
          return;
        }
        dispatch(
          login({
            user: response.data.user,
          })
        );

        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1200);
      } catch {
        toast.error("Something went wrong");
      }
    },
    [triggerLogin, dispatch, navigate]
  );

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5 login-signup-form">

      {/* EMAIL */}
      <div>
        <label className="block text-left text-sm font-medium mb-1 text-midnight_text dark:text-light">
          Email Address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray" />
          <input
            type="email"
            name="email"
            className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark_border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-semidark dark:text-light dark:placeholder:text-darkgray"
            placeholder="name@domain.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <p className="text-rose-500 dark:text-rose-500 text-sm mt-1">{formik.errors.email}</p>
        )}
      </div>

      {/* PASSWORD */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-sm font-medium text-midnight_text dark:text-light">Password</label>
          <Link
            to="/password-reset"
            className="text-sm text-primary hover:text-cyan transition-colors duration-150"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="w-full pl-10 pr-10 py-2 border border-border dark:border-dark_border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-semidark dark:text-light dark:placeholder:text-darkgray"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray dark:text-darkgray hover:text-primary dark:hover:text-primary transition-colors duration-150"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {formik.touched.password && formik.errors.password && (
          <p className="text-rose-500 dark:text-rose-500 text-sm mt-1">{formik.errors.password}</p>
        )}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 px-4 py-2.5 bg-primary hover:bg-secondary text-light font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;