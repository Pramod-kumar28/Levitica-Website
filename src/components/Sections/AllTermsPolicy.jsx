import {
    Clock, Calendar, RefreshCw, Mail,
    CalendarCheck, Hourglass, AlertTriangle, User,
    Video, GraduationCap, Award, Eye, Edit, Trash2, PauseCircle, Download, Ban, ChartLine, CreditCard, Gift, Shield, Bell, BarChart3, Lock, UserCheck, MessageCircle, Percent, PlayCircle, Receipt, Share, UserCircle2, Users2, Handshake, Gavel,
    Briefcase, Lightbulb, Users, ListChecks,
    LogIn,
    UserPlusIcon,

    ArrowBigRight
} from "lucide-react";
import { Link } from "react-router-dom";

export const Terms = () => {
    return (
        <div className="pt-100">
            <section className="py-5 bg-light main">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bold mb-3">Terms & Conditions</h1>

                                <div className="border-bottom mx-auto" style={{ width: '400px', height: '2px' }}></div>
                            </div>

                            <div className="card shadow-sm border-0 rounded-lg">
                                <div className="card-body p-5">
                                    <div className="alert alert-light border mb-4">
                                        <p className="mb-0 fw-medium">
                                            Welcome to <strong>Design Career Metrics</strong> ("Company", "we", "our", "us").
                                            By accessing or using our website{" "}
                                            <a href="https://designcareermetrics.com" className="text-decoration-none fw-bold">
                                                https://designcareermetrics.com
                                            </a>{" "}
                                            and our services, you ("User", "you", "your") agree to be bound by these Terms and Conditions.
                                        </p>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">1. Acceptance of Terms</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    By accessing, browsing, or using our website and services, you acknowledge that you have read,
                                                    understood, and agree to be bound by these Terms. If you do not agree with any part of these
                                                    Terms, you must not use our services.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">2. Eligibility and Account Registration</h4>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 border rounded h-100">
                                                        <div>
                                                            <strong>Age Requirement</strong>
                                                            <p className="small text-muted mb-0">
                                                                You must be at least 18 years old to use our services. By using our services,
                                                                you represent and warrant that you meet this age requirement.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 border rounded h-100">

                                                        <div>
                                                            <strong>Account Accuracy</strong>
                                                            <p className="small text-muted mb-0">
                                                                You agree to provide accurate, current, and complete information during
                                                                registration and to update such information to keep it accurate.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 my-3 border rounded h-100">

                                                        <div>
                                                            <strong>Account Security</strong>
                                                            <p className="small text-muted mb-0">
                                                                You are responsible for maintaining the confidentiality of your account
                                                                credentials and for all activities that occur under your account.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className=" p-3 my-3 border rounded h-100">

                                                        <div>
                                                            <strong>One Account Per User</strong>
                                                            <p className="small text-muted mb-0">
                                                                Each user may maintain only one account. Sharing accounts or creating
                                                                multiple accounts is strictly prohibited.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">3. Services and Payments</h4>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 border rounded h-100">

                                                        <div className="mx-2"><CreditCard /></div>
                                                        <div>
                                                            <strong>Payment Processing</strong>
                                                            <p className="small text-muted mb-0">
                                                                All payments are processed securely via Razorpay. You agree to provide
                                                                valid and current payment information. We reserve the right to change
                                                                our pricing with 30 days notice.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 border rounded h-100">
                                                        <div className="mx-2">

                                                            <Receipt />
                                                        </div>
                                                        <div>
                                                            <strong>Subscription Terms</strong>
                                                            <p className="small text-muted mb-0">
                                                                Subscription fees are billed in advance on a recurring basis. You may
                                                                cancel your subscription at any time, but no refunds will be provided
                                                                for the current billing period.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 my-4">
                                                    <div className="d-flex align-items-start p-3 border rounded h-100">

                                                        <div className="mx-2">

                                                            <Ban />
                                                        </div>
                                                        <div>
                                                            <strong>Payment Failures</strong>
                                                            <p className="small text-muted mb-0">
                                                                Failed payments may result in immediate suspension of services.
                                                                Repeated payment failures may lead to account termination.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 my-4">
                                                    <div className="d-flex align-items-start p-3 border rounded h-100">
                                                        <div className="mx-2"> <Percent />
                                                        </div>
                                                        <div>
                                                            <strong>Taxes</strong>
                                                            <p className="small text-muted mb-0">
                                                                All fees are exclusive of applicable taxes, which will be added to
                                                                your invoice where required by law.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">4. Intellectual Property Rights</h4>
                                            <div className="alert alert-light border">
                                                <p className="mb-3">
                                                    All content provided through our services, including but not limited to videos,
                                                    course materials, live classes, text, graphics, logos, and software, is the
                                                    property of Design Career Metrics or our licensors and is protected by copyright
                                                    and intellectual property laws.
                                                </p>
                                                <ul className="mb-0">
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>License Grant:</strong> We grant you a limited, non-exclusive,
                                                        non-transferable license to access and use the content for personal,
                                                        non-commercial educational purposes.
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Restrictions:</strong> You may not copy, distribute, modify,
                                                        transmit, display, perform, reproduce, publish, license, create derivative
                                                        works from, or sell any content obtained from our services.
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>User Content:</strong> By submitting content to our platform,
                                                        you grant us a worldwide, perpetual license to use, modify, and display
                                                        such content for educational purposes.
                                                    </li>
                                                    <li>
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Enforcement:</strong> We will pursue legal action against any
                                                        unauthorized use of our intellectual property.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">5. User Conduct and Responsibilities</h4>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">

                                                            <Share />
                                                        </div>
                                                        <div>
                                                            <strong>No Content Sharing</strong>
                                                            <p className="small text-muted mb-0">
                                                                Do not share, distribute, or make available any course materials to third parties
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <MessageCircle />

                                                        </div>
                                                        <div>
                                                            <strong>Respectful Communication</strong>
                                                            <p className="small text-muted mb-0">
                                                                Maintain professional and respectful communication in all interactions
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 my-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Lock />
                                                        </div>
                                                        <div>
                                                            <strong>Security</strong>
                                                            <p className="small text-muted mb-0">
                                                                Do not attempt to breach security measures or access unauthorized areas
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 my-3">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3"> <Users2 /></div>
                                                        <div>
                                                            <strong>No Impersonation</strong>
                                                            <p className="small text-muted mb-0">
                                                                Do not impersonate any person or entity or misrepresent your affiliation
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">6. Limitation of Liability</h4>
                                            <div className="alert alert-light border">
                                                <p className="mb-3">
                                                    To the fullest extent permitted by applicable law, Design Career Metrics shall not be liable for:
                                                </p>
                                                <ul className="mb-0">
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        Any indirect, incidental, special, consequential, or punitive damages
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        Loss of profits, data, use, goodwill, or other intangible losses
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        Payment gateway failures, technical issues, or service interruptions beyond our control
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        Any errors or omissions in any content or for any loss or damage incurred as a result
                                                        of the use of any content posted, emailed, transmitted, or otherwise made available
                                                    </li>
                                                    <li>
                                                        <ArrowBigRight className="mx-2" />
                                                        The success or failure of your career outcomes after completing our courses
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">7. Termination</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">

                                                    We may terminate or suspend your account and access to our services immediately,
                                                    without prior notice or liability, for any reason, including if you breach these
                                                    Terms. Upon termination, your right to use our services will cease immediately.
                                                    All provisions of these Terms which by their nature should survive termination
                                                    shall survive, including ownership provisions, warranty disclaimers, and
                                                    limitations of liability.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">8. Governing Law and Dispute Resolution</h4>
                                            <div className="alert alert-light border">
                                                <p className="mb-3">
                                                    These Terms shall be governed and construed in accordance with the laws of India,
                                                    without regard to its conflict of law provisions.
                                                </p>
                                                <ul className="mb-0">
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Jurisdiction:</strong> Any disputes arising from these Terms shall be
                                                        subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Informal Resolution:</strong> We strongly encourage you to contact us
                                                        first to seek resolution of any dispute amicably before pursuing formal proceedings.
                                                    </li>
                                                    <li>
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Time Limitation:</strong> Any cause of action arising out of or related
                                                        to these Terms must commence within one year after the cause of action accrues.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">9. Changes to Terms</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    We reserve the right, at our sole discretion, to modify or replace these Terms
                                                    at any time. If a revision is material, we will provide at least 30 days' notice
                                                    prior to any new terms taking effect. What constitutes a material change will be
                                                    determined at our sole discretion. By continuing to access or use our services
                                                    after those revisions become effective, you agree to be bound by the revised terms.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">10. Contact Information</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    If you have any questions about these Terms, please contact us at{" "}
                                                    <a href="mailto:legal@designcareermetrics.com" className="text-decoration-none fw-bold">
                                                        legal@designcareermetrics.com
                                                    </a>
                                                    . For general inquiries, you may also reach us at{" "}
                                                    <a href="mailto:info@designcareermetrics.com" className="text-decoration-none fw-bold">
                                                        info@designcareermetrics.com
                                                    </a>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 p-4 bg-dark text-white rounded ">

                                        <p className="mb-0 text-center fw-medium">

                                            By using our services, you acknowledge that you have read, understood, and agree to be bound
                                            by these Terms and Conditions. These Terms constitute the entire agreement between you and
                                            Design Career Metrics regarding our services.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export const Privacy = () => {
    return (
        <div className="pt-100">
            <section className="py-5 bg-light main">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bold mb-3">Privacy Policy</h1>
                                <p className="lead text-muted">Last updated:17-Jan-2025</p>
                                <div className="border-bottom mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="card shadow-sm border-0 rounded-lg">
                                <div className="card-body p-5">
                                    <div className="alert alert-light border mb-4">
                                        <p className="mb-0 fw-medium">
                                            At <strong>Design Career Metrics</strong>, we are committed to protecting your privacy
                                            and ensuring the security of your personal information. This Privacy Policy outlines
                                            our practices regarding data collection, usage, and protection.
                                        </p>
                                    </div>

                                    <div className="row">
                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Information We Collect</h4>
                                            <div className="row">
                                                <div className="col-md-4 mb-4">
                                                    <div className="text-center p-4 bg-white border rounded h-100">
                                                        <UserCircle2 size={40} />
                                                        <h6 className="fw-bold">Personal Information</h6>
                                                        <small className="text-muted">
                                                            Full name, email address, phone number, billing address,
                                                            professional background, educational history, and career objectives
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="text-center p-4 bg-white border rounded h-100">
                                                        <CreditCard size={40} />
                                                        <h6 className="fw-bold">Financial Information</h6>
                                                        <small className="text-muted">
                                                            Payment card details, billing history, subscription status,
                                                            and transaction records processed through secure payment gateways
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 mb-4">
                                                    <div className="text-center p-4 bg-white border rounded h-100">

                                                        <ChartLine size={40} />
                                                        <h6 className="fw-bold">Technical & Usage Data</h6>
                                                        <small className="text-muted">
                                                            IP address, browser type, device information, operating system,
                                                            session duration, page views, and interaction patterns
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">How We Use Your Information</h4>
                                            <div className="row g-4">
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <PlayCircle className="text-primary" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Service Delivery</strong>
                                                            <p className="small text-muted mb-0">
                                                                Provide access to courses, live sessions, learning materials,
                                                                and personalized educational content
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Shield className="text-success" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Payment Processing</strong>
                                                            <p className="small text-muted mb-0">
                                                                Process transactions, manage subscriptions, and handle billing inquiries
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Bell className="text-warning" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Communication</strong>
                                                            <p className="small text-muted mb-0">
                                                                Send course updates, schedule changes, important announcements,
                                                                and educational resources
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <BarChart3 className="text-info" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Platform Improvement</strong>
                                                            <p className="small text-muted mb-0">
                                                                Analyze usage patterns to enhance user experience and develop new features
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Lock className="text-danger" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Security & Fraud Prevention</strong>
                                                            <p className="small text-muted mb-0">
                                                                Monitor for suspicious activities and protect against unauthorized access
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <UserCheck className="text-secondary" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Personalization</strong>
                                                            <p className="small text-muted mb-0">
                                                                Customize learning paths and recommend relevant courses and resources
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Data Sharing and Disclosure</h4>
                                            <div className="row g-4">
                                                <div className="col-md-4">
                                                    <div className="text-center p-4 border rounded h-100">
                                                        <div className="mx-3 mb-3">
                                                            <Ban className="text-danger" size={32} />
                                                        </div>
                                                        <h6 className="fw-bold">No Sale of Personal Data</h6>
                                                        <small className="text-muted">
                                                            We do not sell, trade, or rent your personal information to third parties
                                                            for marketing purposes
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-center p-4 border rounded h-100">
                                                        <div className="mx-3 mb-3">
                                                            <Handshake className="text-warning" size={32} />
                                                        </div>
                                                        <h6 className="fw-bold">Trusted Service Providers</h6>
                                                        <small className="text-muted">
                                                            We share data with payment processors (Razorpay), cloud hosting services,
                                                            email service providers, and analytics platforms under strict confidentiality agreements
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-center p-4 border rounded h-100">
                                                        <div className="mx-3 mb-3">
                                                            <Gavel className="text-info" size={32} />
                                                        </div>
                                                        <h6 className="fw-bold">Legal Requirements</h6>
                                                        <small className="text-muted">
                                                            We may disclose information when required by law, court order, or
                                                            governmental regulations to protect our rights and comply with legal processes
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Data Retention</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    We retain your personal information for as long as necessary to fulfill the purposes
                                                    outlined in this Privacy Policy, unless a longer retention period is required or
                                                    permitted by law. We typically retain customer data for 3 years after account
                                                    termination for legal and business purposes. Usage data may be anonymized for
                                                    analytical purposes after 12 months.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Cookies and Tracking Technologies</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    We use cookies and similar tracking technologies to enhance your experience,
                                                    analyze site traffic, and understand user behavior. These include session cookies
                                                    for authentication, persistent cookies for preferences, and analytics cookies
                                                    to improve our services. You can control cookie preferences through your browser settings.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Data Security</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    We implement comprehensive security measures including SSL encryption, secure
                                                    server infrastructure, regular security audits, access controls, and data encryption
                                                    at rest and in transit. While we strive to protect your personal information,
                                                    no method of transmission over the Internet or electronic storage is 100% secure.
                                                    We continuously update our security practices to address emerging threats.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">International Data Transfers</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    Your information may be processed and stored in servers located outside your
                                                    country of residence. We ensure that appropriate safeguards are in place and
                                                    that all data transfers comply with applicable data protection laws through
                                                    standard contractual clauses and other approved mechanisms.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-12 mb-5">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Your Rights and Choices</h4>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Eye className="text-primary" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Right to Access</strong>
                                                            <p className="small text-muted mb-0">
                                                                Request a copy of the personal data we hold about you
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Edit className="text-success" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Right to Rectification</strong>
                                                            <p className="small text-muted mb-0">
                                                                Correct inaccurate or incomplete personal information
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Trash2 className="text-danger" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Right to Erasure</strong>
                                                            <p className="small text-muted mb-0">
                                                                Request deletion of your personal data under certain circumstances
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <PauseCircle className="text-warning" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Right to Restrict Processing</strong>
                                                            <p className="small text-muted mb-0">
                                                                Limit how we use your personal data
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Download className="text-info" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Right to Data Portability</strong>
                                                            <p className="small text-muted mb-0">
                                                                Receive your data in a structured, machine-readable format
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start">
                                                        <div className="mx-3">
                                                            <Ban className="text-secondary" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Right to Object</strong>
                                                            <p className="small text-muted mb-0">
                                                                Object to certain types of processing activities
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-4">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Children's Privacy</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    Our services are not directed to individuals under the age of 16. We do not
                                                    knowingly collect personal information from children under 16. If we become
                                                    aware that we have collected personal data from a child under 16, we will
                                                    take steps to delete such information promptly.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12 mb-4">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Changes to This Policy</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    We may update this Privacy Policy from time to time to reflect changes in our
                                                    practices or legal requirements. We will notify you of any material changes
                                                    by posting the updated policy on our website and updating the "Last updated"
                                                    date. We encourage you to review this policy periodically.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <h4 className="fw-bold mb-3">Contact Information</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>

                                                <p className="mb-0">
                                                    If you have any questions, concerns, or requests regarding this Privacy Policy
                                                    or our data practices, please contact our Data Protection Officer at{" "}
                                                    <a href="mailto:privacy@designcareermetrics.com" className="text-decoration-none fw-bold">
                                                        privacy@designcareermetrics.com
                                                    </a>
                                                    . You may also write to us at our registered office address or use our
                                                    dedicated privacy contact form on our website.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>);
};

export const Refund = () => {
    return (
        <div className="pt-100">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bold mb-3">Refund & Cancellation Policy</h1>

                                <div className="border-bottom mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="card shadow-sm border-0 rounded-lg">
                                <div className="card-body p-5">
                                    <div className="alert alert-light border mb-4">
                                        <p className="mb-0 fw-medium">
                                            At Design Career Metrics, we are committed to your satisfaction. Please read our comprehensive
                                            refund and cancellation policy carefully before making any purchase.
                                        </p>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">General Policy Overview</h4>
                                            <div className="alert alert-light border d-flex">
                                                <div>

                                                    <ArrowBigRight />
                                                </div>
                                                <p className="mb-0">
                                                    Our refund and cancellation policy is designed to be fair to both our students and our business.
                                                    Due to the digital nature of our products and services, we have specific guidelines to ensure
                                                    the integrity of our educational content.
                                                </p>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-lg-12 p-0 ">
                                        <div className="d-flex align-items-center mb-3">

                                            <h4 className="fw-bold mb-0">Cancellation Policy</h4>
                                        </div>
                                        <div className="p-4 bg-white border rounded h-100">
                                            <ul className="list-unstyled">
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={28} />
                                                    <div className="d-flex align-items-start">
                                                        <Clock className="text-primary mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Cancellation Window:</strong> Course cancellations may be requested within
                                                            <strong> 24–48 hours of purchase</strong>, provided no course content has been accessed.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={28} />
                                                    <div className="d-flex align-items-start">
                                                        <Lock className="text-warning mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Content Access:</strong> Once you access any course material, download resources,
                                                            or attend live sessions, cancellation is no longer permitted.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={28} />
                                                    <div className="d-flex align-items-start">
                                                        <Calendar className="text-info mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Live Session Cancellations:</strong> For courses with live components, cancellations
                                                            must be requested before the first scheduled session.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={28} />
                                                    <div className="d-flex align-items-start">
                                                        <RefreshCw className="text-success mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Subscription Cancellations:</strong> Monthly subscriptions can be canceled anytime,
                                                            but will remain active until the end of the current billing cycle.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={24} />
                                                    <div className="d-flex align-items-start">
                                                        <Mail className="text-secondary mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Cancellation Process:</strong> All cancellation requests must be submitted in writing
                                                            via email to our support team.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mt-4 p-0">
                                        <div className="d-flex align-items-center mb-3">

                                            <h4 className="fw-bold mb-0">Refund Policy</h4>
                                        </div>
                                        <div className="p-4 bg-white border rounded h-100">
                                            <ul className="list-unstyled">
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={24} />
                                                    <div className="d-flex align-items-start">
                                                        <CalendarCheck className="text-primary mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Processing Time:</strong> Eligible refunds are processed within
                                                            <strong> 5–7 business days</strong> to the original payment method.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={26} />
                                                    <div className="d-flex align-items-start">
                                                        <Hourglass className="text-warning mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Bank Processing:</strong> Additional time may be required by your bank or
                                                            payment provider to credit the refund to your account.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={32} />
                                                    <div className="d-flex align-items-start">
                                                        <Download className="text-info mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Non-Refundable Items:</strong> Digital downloads, accessed course materials,
                                                            attended live sessions, and partially completed courses are not eligible for refunds.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={25} />
                                                    <div className="d-flex align-items-start">
                                                        <AlertTriangle className="text-danger mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Technical Issues:</strong> Refunds are not provided for technical issues
                                                            that can be resolved through our support team.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="d-flex align-items-start">
                                                    <ArrowBigRight className="mx-2" size={28} />
                                                    <div className="d-flex align-items-start">
                                                        <User className="text-secondary mt-1 me-2 flex-shrink-0 mx-2" size={16} />
                                                        <div>
                                                            <strong>Change of Mind:</strong> Refunds are not granted for change of mind or
                                                            failure to meet personal expectations after accessing course content.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="row my-5 ">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Special Circumstances</h4>
                                            <div className="row g-4">
                                                <div className="col-md-6 my-4">
                                                    <div className="d-flex align-items-start p-3 border rounded">
                                                        <div className="mx-3">
                                                            <Video className="text-primary" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Live Session Recordings</strong>
                                                            <p className="small text-muted mb-0">
                                                                If you miss a live session but access the recording, the course is considered
                                                                consumed and non-refundable.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 my-4">
                                                    <div className="d-flex align-items-start p-3 border rounded">
                                                        <div className="mx-3">
                                                            <Download className="text-info" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Downloadable Resources</strong>
                                                            <p className="small text-muted mb-0">
                                                                Any downloaded materials, templates, or resources make the course
                                                                non-refundable immediately.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 border rounded">
                                                        <div className="mx-3">
                                                            <GraduationCap className="text-success" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Course Completion</strong>
                                                            <p className="small text-muted mb-0">
                                                                Courses completed beyond 25% are not eligible for refunds under any circumstances.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="d-flex align-items-start p-3 border rounded">
                                                        <div className="mx-3">
                                                            <Award className="text-warning" size={20} />
                                                        </div>
                                                        <div>
                                                            <strong>Certification Programs</strong>
                                                            <p className="small text-muted mb-0">
                                                                Certification programs are non-refundable once the assessment process has begun.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Refund Processing Details</h4>
                                            <div className="alert alert-light border">
                                                <ul className="mb-0">
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Payment Method Refunds:</strong> Refunds are processed to the original payment method only.
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Partial Refunds:</strong> In exceptional circumstances, partial refunds may be granted
                                                        at our discretion.
                                                    </li>
                                                    <li className="mb-2">
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Currency Conversion:</strong> Refund amounts are subject to currency conversion rates
                                                        and may differ from the original.
                                                    </li>
                                                    <li>
                                                        <ArrowBigRight className="mx-2" />
                                                        <strong>Refund Denials:</strong> We reserve the right to deny refunds in cases of policy
                                                        violation or abuse.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">How to Request Cancellation or Refund</h4>
                                            <div className="row g-3">
                                                <div className="col-md-4">
                                                    <div className="text-center p-3 border rounded h-100">
                                                        <div className="mx-3 mb-3">
                                                            <Mail className="text-primary" size={32} />
                                                        </div>
                                                        <h6 className="fw-bold">Email Request</h6>
                                                        <small className="text-muted">
                                                            Send detailed request to our support email with your order information
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-center p-3 border rounded h-100">
                                                        <div className="mx-3 mb-3">
                                                            <Receipt className="text-success" size={32} />
                                                        </div>
                                                        <h6 className="fw-bold">Include Details</h6>
                                                        <small className="text-muted">
                                                            Provide order number, purchase date, and reason for request
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-center p-3 border rounded h-100">
                                                        <div className="mx-3 mb-3">
                                                            <Clock className="text-warning" size={32} />
                                                        </div>
                                                        <h6 className="fw-bold">Response Time</h6>
                                                        <small className="text-muted">
                                                            We respond to all requests within 24-48 business hours
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Policy Updates</h4>
                                            <div className="alert alert-light border">
                                                <p className="mb-0">
                                                    <ArrowBigRight className="mx-1" />
                                                    We reserve the right to modify this refund and cancellation policy at any time.
                                                    Changes will be effective immediately upon posting to our website. Continued use
                                                    of our services after any changes constitutes acceptance of the modified policy.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-4 bg-dark text-white rounded mt-4">
                                        <h4 className="fw-bold mb-3 text-white">Need Assistance?</h4>
                                        <p className="mb-3">
                                            For cancellation requests, refund inquiries, or any questions about our policy,
                                            please contact our support team:
                                        </p>
                                        <div className="d-flex flex-column flex-sm-row justify-content-between w-75 m-auto">
                                            <a href="mailto:support@designcareermetrics.com" className="btn btn-light  fw-bold">
                                                <Mail className="mx-1" />
                                                support@designcareermetrics.com
                                            </a>
                                            <a href="mailto:info@designcareermetrics.com" className="btn btn-outline-light fw-bold">
                                                <Mail className="mx-1" />
                                                info@designcareermetrics.com
                                            </a>
                                        </div>
                                        <p className="mt-3 mb-0 small">
                                            Response Time: 24-48 business hours | Support Hours: Monday-Friday, 9 AM - 6 PM
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};


export const Forums = () => {
    return (
        <section className="py-5 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center mb-5">
                            <h1 className="display-5 fw-bold mb-3">Community Forums</h1>
                            <p className="lead text-muted">Connect, collaborate, and learn with our community of designers and professionals</p>
                            <div className="border-bottom mx-auto" style={{ width: '100px', height: '2px' }}></div>
                        </div>

                        <div className="card shadow-sm border-0 rounded-lg">
                            <div className="card-body p-5">
                                <div className="alert alert-light border mb-4">
                                    <p className="mb-0 fw-medium">
                                        Join our vibrant community of learners, instructors, and industry professionals.
                                        Share knowledge, ask questions, and grow together.
                                    </p>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Forum Categories</h4>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start p-4 border rounded h-100">
                                                    <div className="mx-3">
                                                        <GraduationCap className="text-primary" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold">Learning Support</h5>
                                                        <p className="text-muted mb-2">
                                                            Get help with course content, assignments, and learning challenges
                                                        </p>
                                                        <div className="d-flex text-muted small">
                                                            <span className="me-3"><strong className="mx-1">115</strong> Topics</span>
                                                            <span><strong className="mx-1">899</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start p-4 border rounded h-100">
                                                    <div className="mx-3">
                                                        <Briefcase className="text-success" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold">Career Discussions</h5>
                                                        <p className="text-muted mb-2">
                                                            Discuss career paths, job opportunities, and industry trends
                                                        </p>
                                                        <div className="d-flex text-muted small">
                                                            <span className="me-3"><strong className="mx-1">189</strong> Topics</span>
                                                            <span><strong className="mx-1">856</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start p-4 border rounded h-100">
                                                    <div className="mx-3">
                                                        <Lightbulb className="text-warning" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold">Project Showcase</h5>
                                                        <p className="text-muted mb-2">
                                                            Share your work, get feedback, and showcase your projects
                                                        </p>
                                                        <div className="d-flex text-muted small">
                                                            <span className="me-3"><strong className="mx-1">156</strong> Topics</span>
                                                            <span><strong className="mx-1">723</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start p-4 border rounded h-100">
                                                    <div className="mx-3">
                                                        <Users className="text-info" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold">Community Events</h5>
                                                        <p className="text-muted mb-2">
                                                            Information about webinars, meetups, and community events
                                                        </p>
                                                        <div className="d-flex text-muted small">
                                                            <span className="me-3"><strong className="mx-1">67</strong> Topics</span>
                                                            <span><strong className="mx-1">234</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Recent Discussions</h4>
                                        <div className="list-group">
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">Best practices for responsive design in 2024</h6>
                                                    <p className="mb-1 text-muted small">Posted by Sarah Chen in Learning Support</p>
                                                </div>

                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">Portfolio review for junior UX designer position</h6>
                                                    <p className="mb-1 text-muted small">Posted by Mike Rodriguez in Project Showcase</p>
                                                </div>

                                            </div>
                                            <div className="list-group-item d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">Upcoming webinar: AI in Design workflows</h6>
                                                    <p className="mb-1 text-muted small">Posted by Admin in Community Events</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Forum Guidelines</h4>
                                        <div className="alert alert-light border">
                                            <ul className="mb-0">
                                                <li className="mb-2">
                                                      
                                                    <ArrowBigRight className="mx-2"/>
                                                
                                                    <strong>Be Respectful:</strong> Treat all community members with respect and professionalism.
                                                </li>
                                                <li className="mb-2">
                                                     <ArrowBigRight className="mx-2"/>
                                                    <strong>Stay On Topic:</strong> Keep discussions relevant to the forum category.
                                                </li>
                                                <li className="mb-2">
                                                     <ArrowBigRight className="mx-2"/>
                                                    <strong>No Spam:</strong> Commercial promotions and spam content are not allowed.
                                                </li>
                                                <li className="mb-2">
                                                     <ArrowBigRight className="mx-2"/>
                                                    <strong>Protect Privacy:</strong> Do not share personal information of yourself or others.
                                                </li>
                                                <li>
                                                     <ArrowBigRight className="mx-2"/>
                                                    <strong>Give Credit:</strong> Always credit original sources when sharing content.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-dark text-white rounded">
                                    <h4 className="fw-bold mb-3 text-white">Join the Conversation</h4>
                                    <p className="mb-3">
                                        Ready to connect with our community? Sign in to access the forums and start participating.
                                    </p>
                                    <Link to={"/login"} className="btn btn-light  fw-bold me-3 mx-3">
                                        <LogIn className="mx-1" />
                                        Sign In
                                    </Link>
                                    <Link to={"/sign-up"} className="btn btn-outline-light  fw-bold">
                                        <UserPlusIcon className="mx-1" />
                                        Create Account
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export const KnowledgeBase = () => {
    return (
        <section className="pt-100 bg-light">
           <div className="py-5">
             <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center mb-5">
                            <h1 className="display-5 fw-bold mb-3">Knowledge Base</h1>
                            <p className="lead text-muted">Find answers to common questions and learn how to make the most of our platform</p>
                            <div className="border-bottom mx-auto" style={{ width: '100px', height: '2px' }}></div>
                        </div>

                        <div className="card shadow-sm border-0 rounded-lg">
                            <div className="card-body p-5">
                                <div className="alert alert-light border mb-4">
                                    <p className="mb-0 fw-medium">
                                        Welcome to our comprehensive Knowledge Base. Here you'll find detailed guides,
                                        tutorials, and answers to frequently asked questions about Design Career Metrics.
                                    </p>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Getting Started</h4>
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start p-4 border rounded h-100">
                                                    <div className="mx-3">
                                                        <UserPlusIcon className="text-primary" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold">Account Setup</h5>
                                                        <p className="text-muted mb-0">
                                                            To get started, visit our <Link to={"/sign-up"} className="text-decoration-none fw-bold">signup page</Link>,
                                                            fill in your details including name, email, and password. Verify your email through the confirmation link
                                                            sent to your inbox, then complete your profile setup in the dashboard.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="d-flex align-items-start p-4 border rounded h-100">
                                                    <div className="mx-3">
                                                        <PlayCircle className="text-success" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="fw-bold">First Steps</h5>
                                                        <p className="text-muted mb-0">
                                                            After signing up, navigate to the <a href="/courses" className="text-decoration-none fw-bold">courses section</a>,
                                                            browse available courses, and enroll in your preferred program. Access your learning dashboard to start
                                                            watching videos, complete assignments, and track your progress.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Course Management</h4>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <div className="text-center p-4 border rounded h-100">
                                                    <div className="mx-3 mb-3">
                                                        <Video className="text-info" size={32} />
                                                    </div>
                                                    <h6 className="fw-bold">Video Lessons</h6>
                                                    <p className="small text-muted mb-0">
                                                        Access videos from your course dashboard. Click on any lesson to start watching.
                                                        Your progress is automatically saved, and you can resume from where you left off.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center p-4 border rounded h-100">
                                                    <div className="mx-3 mb-3">
                                                        <ListChecks className="text-warning" size={32} />
                                                    </div>
                                                    <h6 className="fw-bold">Assignments</h6>
                                                    <p className="small text-muted mb-0">
                                                        Submit assignments through the course portal before deadlines.
                                                        Upload files directly or provide links to your work. Receive feedback within 48 hours.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center p-4 border rounded h-100">
                                                    <div className="mx-3 mb-3">
                                                        <BarChart3 className="text-danger" size={32} />
                                                    </div>
                                                    <h6 className="fw-bold">Progress Tracking</h6>
                                                    <p className="small text-muted mb-0">
                                                        Monitor your progress in the analytics dashboard. Track completed lessons,
                                                        assignment scores, and overall course completion percentage in real-time.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Technical Support</h4>
                                        <div className="alert alert-light border">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-dark">Browser Compatibility</h5>
                                                    <p className="small text-muted">
                                                        For optimal performance, use Chrome, Firefox, or Safari latest versions.
                                                        Clear your browser cache regularly and ensure JavaScript is enabled.
                                                    </p>
                                                </div>
                                                <div className="col-md-6">
                                                    <h5 className="fw-bold text-dark">Mobile Access</h5>
                                                    <p className="small text-muted">
                                                        Download our mobile app from App Store or Google Play.
                                                        All course features are available on mobile with offline viewing capability.
                                                    </p>
                                                </div>
                                                <div className="col-md-6 my-4">
                                                    <h5 className="fw-bold text-dark">Video Playback</h5>
                                                    <p className="small text-muted">
                                                        Ensure stable internet connection (min 5Mbps). For playback issues,
                                                        try lowering video quality or using a different browser.
                                                    </p>
                                                </div>
                                                <div className="col-md-6 my-4">
                                                    <h5 className="fw-bold text-dark">Download Issues</h5>
                                                    <p className="small text-muted">
                                                        Check your storage space and internet connection.
                                                        If downloads fail, try again after clearing browser cache or using incognito mode.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h4 className="fw-bold mb-4 border-bottom pb-2">Frequently Asked Questions</h4>
                                        <div className="accordion" id="kbAccordion">
                                            <div className="card">
                                                <div className="card-header" id="headingOne">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link w-100 text-start text-decoration-none"
                                                            type="button" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseOne" aria-expanded="true"
                                                            aria-controls="collapseOne">
                                                            How do I reset my password?
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#kbAccordion">
                                                    <div className="card-body">
                                                        You can reset your password by clicking on "Forgot Password" on the login page.
                                                        Follow the instructions sent to your email to create a new password.
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card">
                                                <div className="card-header" id="headingTwo">
                                                    <h5 className="mb-0">
                                                        <button className="btn btn-link w-100 text-start text-decoration-none collapsed"
                                                            type="button" data-bs-toggle="collapse"
                                                            data-bs-target="#collapseTwo" aria-expanded="false"
                                                            aria-controls="collapseTwo">
                                                            Can I download course materials for offline use?
                                                        </button>
                                                    </h5>
                                                </div>
                                                <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#kbAccordion">
                                                    <div className="card-body">
                                                        Yes, most course materials are available for download. Look for the download
                                                        icon next to each resource. Some materials may have restrictions based on
                                                        the course provider's policies.
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center p-4 bg-dark text-white rounded">
                                    <h4 className="fw-bold mb-3 text-white">Still Need Help?</h4>
                                    <p className="mb-3">
                                        Can't find what you're looking for? Our support team is here to help you.
                                    </p>
                                    <Link to={"/contact-us"} className="btn btn-light  fw-bold me-3">
                                        <Mail className="mx-1" />
                                        Contact Us
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </section>
    );
};

export const AffiliatesProgram = () => {
    return (
        <div className="pt-100">
            <section className="py-5 bg-light">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="text-center mb-5">
                                <h1 className="display-5 fw-bold mb-3">Affiliates Program</h1>
                                <p className="lead text-muted">Earn commissions by referring students to Design Career Metrics</p>
                                <div className="border-bottom mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="card shadow-sm border-0 rounded-lg">
                                <div className="card-body p-5">
                                    <div className="alert alert-light border mb-4">
                                        <p className="mb-0 fw-medium">
                                            Join our Affiliates Program and earn competitive commissions for every student you refer.
                                            Help others advance their design careers while growing your income.
                                        </p>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Program Benefits</h4>
                                            <div className="row g-4">
                                                <div className="col-md-4">
                                                    <div className="text-center p-4 border rounded h-100">
                                                        <Percent />

                                                        <h5 className="fw-bold">Competitive Commissions</h5>
                                                        <p className="text-muted">
                                                            Earn up to 20% commission on every successful referral
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-center p-4 border rounded h-100">
                                                        <ChartLine />

                                                        <h5 className="fw-bold">Real-time Tracking</h5>
                                                        <p className="text-muted">
                                                            Monitor your referrals and earnings with our dashboard
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="text-center p-4 border rounded h-100">
                                                        <Gift />

                                                        <h5 className="fw-bold">Performance Bonuses</h5>
                                                        <p className="text-muted">
                                                            Additional bonuses for top-performing affiliates
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">Commission Structure</h4>
                                            <div className="table-responsive">
                                                <table className="table table-bordered">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Program Tier</th>
                                                            <th>Commission Rate</th>
                                                            <th>Requirements</th>
                                                            <th>Payout Frequency</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Starter</td>
                                                            <td>10%</td>
                                                            <td>1-10 referrals/month</td>
                                                            <td>Monthly</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Professional</td>
                                                            <td>15%</td>
                                                            <td>11-25 referrals/month</td>
                                                            <td>Bi-weekly</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Elite</td>
                                                            <td>20%</td>
                                                            <td>26+ referrals/month</td>
                                                            <td>Weekly</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-5">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">How It Works</h4>
                                            <div className="row g-4">
                                                <div className="col-md-3">
                                                    <div className="text-center">
                                                        <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                            <span className="fw-bold">1</span>
                                                        </div>
                                                        <h6>Sign Up</h6>
                                                        <p className="small text-muted">
                                                            Register for our affiliates program
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="text-center">
                                                        <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                            <span className="fw-bold">2</span>
                                                        </div>
                                                        <h6>Get Links</h6>
                                                        <p className="small text-muted">
                                                            Access your unique referral links
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="text-center">
                                                        <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                            <span className="fw-bold">3</span>
                                                        </div>
                                                        <h6>Share & Promote</h6>
                                                        <p className="small text-muted">
                                                            Share your links with your audience
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="text-center">
                                                        <div className="bg-info text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                            <span className="fw-bold">4</span>
                                                        </div>
                                                        <h6>Earn Commissions</h6>
                                                        <p className="small text-muted">
                                                            Get paid for every successful referral
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h4 className="fw-bold mb-4 border-bottom pb-2">FAQ</h4>
                                            <div className="accordion" id="affiliatesAccordion">
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5 className="mb-0">
                                                            <button className="btn btn-link w-100 text-start text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#affiliateOne" aria-expanded="true"
                                                                aria-controls="affiliateOne">
                                                                How much can I earn as an affiliate?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="affiliateOne" className="collapse show" data-bs-parent="#affiliatesAccordion">
                                                        <div className="card-body">
                                                            Our top affiliates earn over 5,000 Rs per month. Earnings depend on your audience size,
                                                            engagement, and the number of successful referrals. With our tiered commission structure,
                                                            the more you refer, the higher your commission rate.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h5 className="mb-0">
                                                            <button className="btn btn-link w-100 text-start text-decoration-none collapsed"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#affiliateTwo" aria-expanded="false"
                                                                aria-controls="affiliateTwo">
                                                                When do I get paid?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="affiliateTwo" className="collapse" data-bs-parent="#affiliatesAccordion">
                                                        <div className="card-body">
                                                            Payouts are processed based on your tier: Starter (monthly), Professional (bi-weekly),
                                                            and Elite (weekly). All payments are made via Razorpay or bank transfer. There's a
                                                            30-day refund period before commissions are released.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-4 bg-primary text-white rounded">
                                        <h4 className="fw-bold mb-3 text-white">Ready to Start Earning?</h4>
                                        <p className="mb-3">
                                            Join thousands of successful affiliates promoting Design Career Metrics
                                        </p>

                                        <Link to={"/contact-us"} className="btn btn-outline-light  fw-bold">
                                            <Mail className="mx-2" />
                                            Contact Us
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};