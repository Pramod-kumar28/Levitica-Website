import { Link } from "react-router-dom";
import SignupForm from "./SignupForm";

const SignupPage = () => {
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
                Create Account
              </h2>
              <p className="text-gray mt-2">
                Made with love by developers for developers.
              </p>
            </div>

            {/* FORM */}
            <SignupForm />

            {/* FOOTER */}
            <div className="mt-8 text-sm text-gray">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline"
              >
                Sign In
              </Link>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};

export default SignupPage;