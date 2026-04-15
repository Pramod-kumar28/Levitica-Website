import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from '@/Services/authService';
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const startCountdown = () => {
    setIsButtonDisabled(true);
    let timeLeft = 60;
    setCountdown(timeLeft);

    const interval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);
      if (timeLeft <= 0) {
        clearInterval(interval);
        setIsButtonDisabled(false);
      }
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await forgotPassword(email).unwrap();

      if (
        data.message.includes("sent") ||
        data.message.includes("If that email exists")
      ) {
        toast.success(data.message);
        startCountdown();
        setEmail("");
      } else if (
        data.message.includes("not found") ||
        data.message.includes("not registered")
      ) {
        toast.error(data.message);
      } else {
        toast.success(data.message);
        startCountdown();
        setEmail("");
      }
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="main">
      <section className="hero-section full-screen gray-light-bg">
        <div className="w-full min-h-screen grid lg:grid-cols-2">

          {/* LEFT IMAGE */}
          <div
            className="hidden lg:block relative bg-cover bg-center"
            style={{ backgroundImage: "url(/img/slider-img-2.jpg)" }}
          >
            <div className="absolute inset-0 gradient-overlay" />

            <div className="relative h-full flex items-center px-16">
              <div className="text-white max-w-lg">
                <h2 className="text-3xl font-bold mb-4 text-white">
                  Don’t worry, you can reset your password
                </h2>
                <p className="text-white/90 leading-relaxed">
                  Keep your face always toward the sunshine and shadows will fall
                  behind you. We’ll help you regain access securely.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="flex items-center justify-center px-6 md:px-12">
            <div className="w-full max-w-md">

              <h1 className="text-3xl font-bold text-center mb-2">
                Password Reset
              </h1>

              <p className="text-center text-slate-500 mb-8">
                Enter your email to receive a reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@address.com"
                      className="w-full pl-10 pr-4 py-3 border rounded-lg
                                 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading || isButtonDisabled}
                  className="w-full bg-blue-600 hover:bg-blue-700
                             text-white font-semibold py-3 rounded-lg
                             transition disabled:opacity-60"
                >
                  {isLoading
                    ? "Sending..."
                    : isButtonDisabled
                    ? `Resend in ${countdown}s`
                    : "Reset Password"}
                </button>

                {/* LINK */}
                <p className="text-center text-sm text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline"
                  >
                    Log in
                  </Link>
                </p>

              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
