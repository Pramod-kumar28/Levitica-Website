import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <section className="pt-32 pb-32 bg-light dark:bg-darkmode">

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
        <div className="flex justify-center items-center text-center">

          {/* CARD */}
          <div className="max-w-lg w-full bg-white dark:bg-semidark px-8 py-14 sm:px-12 md:px-16 rounded-lg shadow-property">

            {/* LOGO */}
            <div className="mb-10 text-center mx-auto inline-block max-w-[160px]">
              <img src="/img/leviticalogo.png" className="mx-auto rounded-xl" />
            </div>

            {/* TITLE */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-midnight_text dark:text-white">
                Login
              </h2>
              <p className="text-gray mt-2">
                Sign in to your account to continue.
              </p>
            </div>

            {/* FORM */}
            <LoginForm />

            {/* FOOTER */}
            <div className="mt-8 text-sm text-gray">
              Not a member yet?{" "}
              <Link
                to="/sign-up"
                className="text-primary hover:underline"
              >
                Sign Up
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default LoginPage;