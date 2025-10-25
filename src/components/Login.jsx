import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";



const LoginPage = () => {
    return (
        <section className="hero-section hero-bg-2 ptb-100 full-screen">
            <div className="container">
                <div className="row align-items-center justify-content-between pt-5 pt-sm-5 pt-md-5 pt-lg-0">
                    {/* Left Side */}
                    <div className="col-md-7 col-lg-6">
                        <div className="hero-content-left text-white my-5">
                            <h1 className="text-white">Welcome Back!</h1>
                            <p className="lead">
                                Keep your face always toward the sunshine — and shadows will fall behind you.
                            </p>
                        </div>
                    </div>

                    {/* Right Side (Login Card) */}
                    <div className="col-md-5 col-lg-5">
                        <div className="card login-signup-card shadow-lg mb-0">
                            <div className="card-body px-md-5 py-5">
                                <div className="mb-5">
                                    <h5 className="h3">Login</h5>
                                    <p className="text-muted mb-0">Sign in to your account to continue.</p>
                                </div>

                               <LoginForm  />   
                            </div>

                            {/* Footer */}
                            <div className="card-footer bg-transparent border-top px-md-5">
                                <small>Not registered?</small>
                                <Link to="/sign-up" className="small">
                                    {" "}
                                    Create account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;