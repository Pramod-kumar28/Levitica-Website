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

      toast.success(data.message);
      startCountdown();
      setEmail("");

    } catch (err) {
      toast.error(err?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <section className="pt-32 pb-32 bg-light dark:bg-darkmode">

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="flex justify-center items-center text-center">

          {/* CARD */}
          <div className="max-w-lg w-full bg-white dark:bg-semidark px-8 py-14 sm:px-12 md:px-16 rounded-lg shadow-property">

            {/* LOGO */}
            <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
              <img src="/img/leviticalogo.png" className="mx-auto" />
            </div>

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-midnight_text dark:text-white">
                Password Reset
              </h2>
              <p className="text-gray mt-2">
                Enter your email to receive a reset link
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6 text-left">

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-2 text-midnight_text dark:text-white">
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray" />

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@address.com"
                    className="w-full pl-12 pr-4 py-3 rounded-md border border-border dark:border-dark_border bg-transparent text-midnight_text dark:text-white outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isLoading || isButtonDisabled}
                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition disabled:opacity-60"
              >
                {isLoading
                  ? "Sending..."
                  : isButtonDisabled
                  ? `Resend in ${countdown}s`
                  : "Reset Password"}
              </button>

              {/* LINK */}
              <p className="text-center text-sm text-gray">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Log in
                </Link>
              </p>

            </form>

          </div>

        </div>
      </div>

    </section>
  );
};

export default ForgotPassword;