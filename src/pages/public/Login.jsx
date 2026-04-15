import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";

const LoginPage = () => {
    return (
        <section className="hero-section hero-bg-2 min-h-screen flex items-center lg:pt-28">
            <div className="max-w-7xl mx-auto px-4 lg:py-4  py-20 ">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* LEFT CONTENT */}
                    <div className=" backdrop-blur-sm rounded-xl p-6 text-white space-y-4 max-w-xl">
                        <h1 className="text-4xl md:text-5xl font-bold text-white ">
                            Welcome Back!
                        </h1>
                        <p className="text-lg text-slate-200">
                            Keep your face always toward the sunshine and shadows will fall behind you.
                        </p>
                    </div>

                    {/* RIGHT LOGIN CARD */}
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto  login-signup-card ">
                        <div className="lg:px-8 lg:py-10 px-4 py-6 ">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold my-1">Login</h2>
                                <p className="text-slate-500">
                                    Sign in to your account to continue.
                                </p>
                            </div>

                            <LoginForm />
                        </div>

                        {/* FOOTER */}
                        <div className="border-t px-4 lg:px-8 py-4 text-sm">
                            <span className="text-slate-600">Not registered?</span>{" "}
                            <Link to="/sign-up" className="text-blue-600 hover:underline">
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
