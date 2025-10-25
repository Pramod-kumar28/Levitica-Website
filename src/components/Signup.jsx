import { Link } from "react-router-dom";

import SignupForm from "./SignupForm";


const SignupPage = () => {
  return (
    <section className="hero-section hero-bg-2 ptb-100 full-screen">
      <div className="container">
        <div className="row align-items-center justify-content-between pt-5 pt-sm-5 pt-md-5 pt-lg-0">
          {/* Left Side Content */}
          <div className="col-md-7 col-lg-6">
            <div className="hero-content-left text-white my-5">
              <h1 className="text-white">Create Your Account</h1>
              <p className="lead">
                Keep your face always toward the sunshine — and shadows will fall behind you.
              </p>
            </div>
          </div>

          {/* Right Side - Signup Card */}
          <div className="col-md-5 col-lg-5">
            <div className="card login-signup-card shadow-lg mb-0">
              <div className="card-body px-md-5 py-5">
                <div className="mb-5">
                  <h6 className="h3">Create Account</h6>
                  <p className="text-muted mb-0">Made with love by developers for developers.</p>
                </div>

               <SignupForm onSubmit={(values) => {
                  console.log("Form Submitted", values);
               }} />
              </div>

              {/* Footer Link */}
              <div className="card-footer px-md-5 bg-transparent border-top">
                <small>Already have an account?</small>
                <Link to={"/login"} className="small">Sign in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;