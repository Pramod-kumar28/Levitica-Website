import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <section className="hero-section hero-bg-2 tw-min-h-screen tw-flex tw-items-center">
            <div className="tw-max-w-7xl tw-mx-auto tw-px-4 lg:tw-py-4  tw-py-20 ">
                <div className="tw-grid lg:tw-grid-cols-2 tw-gap-12 tw-items-center">

                    {/* LEFT CONTENT */}
                    <div className=" tw-backdrop-blur-sm tw-rounded-xl tw-p-6 tw-text-white tw-space-y-4 tw-max-w-xl">
                        <h1 className="tw-text-4xl md:tw-text-5xl tw-font-bold tw-text-white ">
                            Welcome Back!
                        </h1>
                        <p className="tw-text-lg tw-text-slate-200">
                            Keep your face always toward the sunshine — and shadows will fall behind you.
                        </p>
                    </div>

                    {/* RIGHT LOGIN CARD */}
                    <div className="tw-bg-white tw-rounded-xl tw-shadow-xl tw-w-full tw-max-w-md tw-mx-auto  login-signup-card ">
                        <div className="tw-px-8 tw-py-10">
                            <div className="tw-mb-6">
                                <h2 className="tw-text-2xl tw-font-bold">Login</h2>
                                <p className="tw-text-slate-500">
                                    Sign in to your account to continue.
                                </p>
                            </div>

                            <LoginForm />
                        </div>

                        {/* FOOTER */}
                        <div className="tw-border-t tw-px-8 tw-py-4 tw-text-sm">
                            <span className="tw-text-slate-600">Not registered?</span>{" "}
                            <Link to="/sign-up" className="tw-text-blue-600 hover:tw-underline">
                                Create account
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LoginPage;
