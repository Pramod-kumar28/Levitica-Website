import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useForgotPasswordMutation } from "../Services/authService";
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
        <div className="tw-w-full tw-min-h-screen tw-grid lg:tw-grid-cols-2">

          {/* LEFT IMAGE */}
          <div
            className="tw-hidden lg:tw-block tw-relative tw-bg-cover tw-bg-center"
            style={{ backgroundImage: "url(/img/slider-img-2.jpg)" }}
          >
            <div className="tw-absolute tw-inset-0 gradient-overlay" />

            <div className="tw-relative tw-h-full tw-flex tw-items-center tw-px-16">
              <div className="tw-text-white tw-max-w-lg">
                <h2 className="tw-text-3xl tw-font-bold tw-mb-4 tw-text-white">
                  Don’t worry, you can reset your password
                </h2>
                <p className="tw-text-white/90 tw-leading-relaxed">
                  Keep your face always toward the sunshine — and shadows will fall
                  behind you. We’ll help you regain access securely.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="tw-flex tw-items-center tw-justify-center tw-px-6 md:tw-px-12">
            <div className="tw-w-full tw-max-w-md">

              <h1 className="tw-text-3xl tw-font-bold tw-text-center tw-mb-2">
                Password Reset
              </h1>

              <p className="tw-text-center tw-text-slate-500 tw-mb-8">
                Enter your email to receive a reset link
              </p>

              <form onSubmit={handleSubmit} className="tw-space-y-6">

                {/* EMAIL */}
                <div>
                  <label className="tw-block tw-text-sm tw-font-medium tw-mb-1">
                    Email address
                  </label>
                  <div className="tw-relative">
                    <FaEnvelope className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-slate-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@address.com"
                      className="tw-w-full tw-pl-10 tw-pr-4 tw-py-3 tw-border tw-rounded-lg
                                 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
                    />
                  </div>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading || isButtonDisabled}
                  className="tw-w-full tw-bg-blue-600 hover:tw-bg-blue-700
                             tw-text-white tw-font-semibold tw-py-3 tw-rounded-lg
                             tw-transition disabled:tw-opacity-60"
                >
                  {isLoading
                    ? "Sending..."
                    : isButtonDisabled
                    ? `Resend in ${countdown}s`
                    : "Reset Password"}
                </button>

                {/* LINK */}
                <p className="tw-text-center tw-text-sm tw-text-slate-500">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="tw-text-blue-600 hover:tw-underline"
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
