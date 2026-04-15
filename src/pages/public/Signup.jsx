import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

const SignupPage = () => {
  return (
    <section className="hero-section hero-bg-2 ptb-100 full-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
<div className=" backdrop-blur-sm rounded-xl p-6 text-white space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white ">
              Create Your Account
            </h1>
            <p className="text-lg text-slate-200">
              Keep your face always toward the sunshine and shadows will fall behind you.
            </p>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white login-signup-card rounded-xl shadow-xl w-full max-w-md mx-auto">
            <div className="px-8 py-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="text-slate-500">
                  Made with love by developers for developers.
                </p>
              </div>

              <SignupForm />
            </div>

            {/* FOOTER */}
            <div className="border-t px-8 py-4 text-sm">
              <span className="text-slate-600">Already have an account?</span>{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
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
