import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <section className="hero-section hero-bg-2 ptb-100 full-screen">
      <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
        <div className="tw-grid lg:tw-grid-cols-2 tw-gap-12 tw-items-center">

          {/* LEFT CONTENT */}
<div className=" tw-backdrop-blur-sm tw-rounded-xl tw-p-6 tw-text-white tw-space-y-4 tw-max-w-xl">
            <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white ">
              Create Your Account
            </h1>
            <p className="tw-text-lg tw-text-slate-200">
              Keep your face always toward the sunshine — and shadows will fall behind you.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="tw-bg-white login-signup-card tw-rounded-xl tw-shadow-xl tw-w-full tw-max-w-md tw-mx-auto">
            <div className="tw-px-8 tw-py-10">
              <div className="tw-mb-6">
                <h2 className="tw-text-2xl tw-font-bold">Create Account</h2>
                <p className="tw-text-slate-500">
                  Made with love by developers for developers.
                </p>
              </div>

              <SignupForm />
            </div>

            {/* FOOTER */}
            <div className="tw-border-t tw-px-8 tw-py-4 tw-text-sm">
              <span className="tw-text-slate-600">Already have an account?</span>{" "}
              <Link to="/login" className="tw-text-blue-600 hover:tw-underline">
                Sign in
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SignupPage;
