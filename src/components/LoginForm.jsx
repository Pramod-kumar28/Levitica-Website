import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../Services/authService';
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff, LucideEye, MonitorCheck } from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [triggerLogin, { isLoading }] = useLoginMutation();

  const handleSubmit = useCallback(async (values) => {
    try {
      const response = await triggerLogin(values);
      
      if (response.error) {
        toast.error(response.error.data?.message || 'Login failed');
        return;
      }

      dispatch(login({
        user: response.data.user,
        stats: response.data.stats
      }));

      toast.success('Login successful! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  }, [triggerLogin, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Minimum 6 characters required')
        .required('Password is required'),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <form className="login-signup-form" onSubmit={formik.handleSubmit}>
      {/* 📧 Email Field */}
      <div className="form-group">
        <label className="pb-1">Email Address</label>
        <div className="input-group input-group-merge">
          <div className="input-icon">
            <span className="ti-email color-primary"></span>
          </div>
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="name@yourdomain.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <small className="text-danger d-block mt-1">{formik.errors.email}</small>
        )}
      </div>

      {/* 🔐 Password Field */}
      <div className="form-group">
        <div className="row">
          <div className="col">
            <label className="pb-1">Password</label>
          </div>
          <div className="col-auto">
            <Link to="/password-reset" className="form-text small text-muted">
              Forgot password?
            </Link>
          </div>
        </div>
          <div className="input-group input-group-merge">
  <div className="input-icon">
    <span className="ti-lock color-primary"></span>
  </div>
  <input
    type={showPassword ? 'text' : 'password'}
    name="password"
    className="form-control"
    placeholder="Enter your password"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  
  />
  <span className="toggle-eye w-100 " onClick={() => setShowPassword(!showPassword)}>
    
     <div className="form-text small text-muted text-right">
              {showPassword? "Hide password":"Show password"}
            </div>
  </span>
</div>
        {formik.touched.password && formik.errors.password && (
          <small className="text-danger d-block mt-1">{formik.errors.password}</small>
        )}
      </div>

      {/* 🚀 Submit Button */}
      <button 
        type="submit" 
        className="btn-block secondary-solid-btn border-radius mt-4 mb-3"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginForm;