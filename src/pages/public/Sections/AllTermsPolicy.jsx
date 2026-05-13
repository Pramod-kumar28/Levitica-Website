import { Link } from "react-router-dom";
import {
    FaClock, FaCalendarAlt, FaSyncAlt, FaEnvelope, FaCalendarCheck,
    FaHourglassHalf, FaExclamationTriangle, FaUser, FaVideo,
    FaGraduationCap, FaAward,
    FaDownload, FaBan, FaChartLine, FaCreditCard, FaGift, FaShieldAlt,
    FaBell, FaChartBar, FaLock, FaCommentDots, FaPercent,
    FaPlayCircle, FaFileInvoice, FaShareAlt, FaUserCircle, FaUsers,
    FaBriefcase, FaLightbulb,
    FaMobile, FaDatabase,
    FaLongArrowAltRight, FaSignInAlt, FaUserPlus,
    FaGlobe,

} from "react-icons/fa";

import { FaListCheck } from "react-icons/fa6";

// Usage
<FaListCheck className="text-yellow-500" size={32} />
export const Terms = () => {
    return (
        <div className="pt-24">
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    Terms & Conditions
                                </h1>
                                <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                                <p className="text-gray-500 mt-3">Last updated: October 15, 2025</p>
                            </div>

                            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-8 p-6">
                                        <p className="mb-0 text-gray-700">
                                            Welcome to <strong className="text-blue-600">Levitica Technologies</strong> ("Company", "we", "our", "us").
                                            By accessing or using our website{" "}
                                            <a href="https://leviticatechnologies.com" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                                https://leviticatechnologies.com
                                            </a>{" "}
                                            and our services, you ("User", "you", "your") agree to be bound by these Terms and Conditions.
                                        </p>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="group">
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">1</span>
                                                Acceptance of Terms
                                            </h4>
                                            <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-shadow">
                                                <p className="mb-0 text-gray-600 leading-relaxed">
                                                    By accessing, browsing, or using our website and services, you acknowledge that you have read,
                                                    understood, and agree to be bound by these Terms. If you do not agree with any part of these
                                                    Terms, you must not use our services.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">2</span>
                                                Eligibility and Account Registration
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                                        <FaUser className="text-blue-500" />
                                                    </div>
                                                    <strong className="text-gray-800 block mb-2">Age Requirement</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        You must be at least 18 years old to use our services. By using our services,
                                                        you represent and warrant that you meet this age requirement.
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                                                        <FaUserCircle className="text-green-500" />
                                                    </div>
                                                    <strong className="text-gray-800 block mb-2">Account Accuracy</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        You agree to provide accurate, current, and complete information during
                                                        registration and to update such information to keep it accurate.
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                                                        <FaShieldAlt className="text-purple-500" />
                                                    </div>
                                                    <strong className="text-gray-800 block mb-2">Account Security</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        You are responsible for maintaining the confidentiality of your account
                                                        credentials and for all activities that occur under your account.
                                                    </p>
                                                </div>
                                                <div className="bg-gray-50 rounded-xl p-5 hover:shadow-md transition-all">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                                                        <FaLock className="text-orange-500" />
                                                    </div>
                                                    <strong className="text-gray-800 block mb-2">One Account Per User</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        Each user may maintain only one account. Sharing accounts or creating
                                                        multiple accounts is strictly prohibited.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">3</span>
                                                Services and Payments
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5">
                                                    <FaCreditCard className="text-blue-500 text-2xl mb-3" />
                                                    <strong className="text-gray-800 block mb-2">Payment Processing</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        All payments are processed securely via Razorpay. You agree to provide
                                                        valid and current payment information.
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-5">
                                                    <FaFileInvoice className="text-green-500 text-2xl mb-3" />
                                                    <strong className="text-gray-800 block mb-2">Subscription Terms</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        Subscription fees are billed in advance on a recurring basis. You may
                                                        cancel your subscription at any time.
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-5">
                                                    <FaBan className="text-red-500 text-2xl mb-3" />
                                                    <strong className="text-gray-800 block mb-2">Payment Failures</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        Failed payments may result in immediate suspension of services.
                                                        Repeated payment failures may lead to account termination.
                                                    </p>
                                                </div>
                                                <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-5">
                                                    <FaPercent className="text-purple-500 text-2xl mb-3" />
                                                    <strong className="text-gray-800 block mb-2">Taxes</strong>
                                                    <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                        All fees are exclusive of applicable taxes, which will be added to
                                                        your invoice where required by law.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">4</span>
                                                Intellectual Property Rights
                                            </h4>
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                                                <p className="mb-4 text-gray-600 leading-relaxed">
                                                    All content provided through our services, including but not limited to videos,
                                                    course materials, live classes, text, graphics, logos, and software, is the
                                                    property of Levitica Technologies or our licensors and is protected by copyright
                                                    and intellectual property laws.
                                                </p>
                                                <div className="space-y-3">
                                                    <div className="flex items-start p-3 bg-white rounded-lg">
                                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        </div>
                                                        <p className="mb-0 text-gray-700 text-sm"><strong>License Grant:</strong> We grant you a limited, non-exclusive, non-transferable license to access and use the content for personal, non-commercial educational purposes.</p>
                                                    </div>
                                                    <div className="flex items-start p-3 bg-white rounded-lg">
                                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        </div>
                                                        <p className="mb-0 text-gray-700 text-sm"><strong>Restrictions:</strong> You may not copy, distribute, modify, transmit, display, perform, reproduce, publish, license, create derivative works from, or sell any content obtained from our services.</p>
                                                    </div>
                                                    <div className="flex items-start p-3 bg-white rounded-lg">
                                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        </div>
                                                        <p className="mb-0 text-gray-700 text-sm"><strong>User Content:</strong> By submitting content to our platform, you grant us a worldwide, perpetual license to use, modify, and display such content for educational purposes.</p>
                                                    </div>
                                                    <div className="flex items-start p-3 bg-white rounded-lg">
                                                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                                        </div>
                                                        <p className="mb-0 text-gray-700 text-sm"><strong>Enforcement:</strong> We will pursue legal action against any unauthorized use of our intellectual property.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">5</span>
                                                User Conduct and Responsibilities
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                                                    <FaShareAlt className="text-blue-500 mt-1 mr-3 text-lg" />
                                                    <div>
                                                        <strong className="text-gray-800">No Content Sharing</strong>
                                                        <p className="text-sm text-gray-600 mb-0 mt-1">Do not share, distribute, or make available any course materials to third parties</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                                                    <FaCommentDots className="text-green-500 mt-1 mr-3 text-lg" />
                                                    <div>
                                                        <strong className="text-gray-800">Respectful Communication</strong>
                                                        <p className="text-sm text-gray-600 mb-0 mt-1">Maintain professional and respectful communication in all interactions</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                                                    <FaLock className="text-red-500 mt-1 mr-3 text-lg" />
                                                    <div>
                                                        <strong className="text-gray-800">Security</strong>
                                                        <p className="text-sm text-gray-600 mb-0 mt-1">Do not attempt to breach security measures or access unauthorized areas</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                                                    <FaUsers className="text-purple-500 mt-1 mr-3 text-lg" />
                                                    <div>
                                                        <strong className="text-gray-800">No Impersonation</strong>
                                                        <p className="text-sm text-gray-600 mb-0 mt-1">Do not impersonate any person or entity or misrepresent your affiliation</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">6</span>
                                                Limitation of Liability
                                            </h4>
                                            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6">
                                                <p className="mb-3 text-gray-700 font-medium">To the fullest extent permitted by applicable law, Levitica Technologies shall not be liable for:</p>
                                                <ul className="space-y-2">
                                                    <li className="flex items-start text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-2"></div>
                                                        Any indirect, incidental, special, consequential, or punitive damages
                                                    </li>
                                                    <li className="flex items-start text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-2"></div>
                                                        Loss of profits, data, use, goodwill, or other intangible losses
                                                    </li>
                                                    <li className="flex items-start text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-2"></div>
                                                        Payment gateway failures, technical issues, or service interruptions beyond our control
                                                    </li>
                                                    <li className="flex items-start text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-2"></div>
                                                        Any errors or omissions in any content or for any loss or damage incurred
                                                    </li>
                                                    <li className="flex items-start text-gray-600">
                                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 mr-2"></div>
                                                        The success or failure of your career outcomes after completing our courses
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">7</span>
                                                Termination
                                            </h4>
                                            <div className="bg-gray-50 rounded-xl p-5">
                                                <p className="mb-0 text-gray-600 leading-relaxed">
                                                    We may terminate or suspend your account and access to our services immediately,
                                                    without prior notice or liability, for any reason, including if you breach these
                                                    Terms. Upon termination, your right to use our services will cease immediately.
                                                    All provisions of these Terms which by their nature should survive termination
                                                    shall survive, including ownership provisions, warranty disclaimers, and
                                                    limitations of liability.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">8</span>
                                                Governing Law and Dispute Resolution
                                            </h4>
                                            <div className="bg-gray-50 rounded-xl p-6">
                                                <p className="mb-3 text-gray-700">These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>
                                                <div className="space-y-2">
                                                    <div className="flex items-start p-2">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2"></div>
                                                        <p className="mb-0 text-gray-600 text-sm"><strong>Jurisdiction:</strong> Any disputes shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.</p>
                                                    </div>
                                                    <div className="flex items-start p-2">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2"></div>
                                                        <p className="mb-0 text-gray-600 text-sm"><strong>Informal Resolution:</strong> We strongly encourage you to contact us first to seek resolution amicably.</p>
                                                    </div>
                                                    <div className="flex items-start p-2">
                                                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-2"></div>
                                                        <p className="mb-0 text-gray-600 text-sm"><strong>Time Limitation:</strong> Any cause of action must commence within one year after the cause of action accrues.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">9</span>
                                                Changes to Terms
                                            </h4>
                                            <div className="bg-gray-50 rounded-xl p-5">
                                                <p className="mb-0 text-gray-600 leading-relaxed">
                                                    We reserve the right, at our sole discretion, to modify or replace these Terms
                                                    at any time. If a revision is material, we will provide at least 30 days' notice
                                                    prior to any new terms taking effect. By continuing to access or use our services
                                                    after those revisions become effective, you agree to be bound by the revised terms.
                                                </p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-xl mb-4 text-gray-800 flex items-center">
                                                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">10</span>
                                                Contact Information
                                            </h4>
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                                <p className="mb-0 text-gray-700">
                                                    If you have any questions about these Terms, please contact us at{" "}
                                                    <a href="mailto:info@leviticatechnologies.com" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">
                                                        info@leviticatechnologies.com
                                                    </a>
                                                    .
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 p-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl text-center">
                                        <p className="mb-0 font-medium">
                                            By using our services, you acknowledge that you have read, understood, and agree to be bound
                                            by these Terms and Conditions.
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
        <div className="pt-24 bg-gradient-to-b from-gray-50 to-white">
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                            Privacy Policy
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500">
                            Effective Date: October 15, 2025
                        </p>
                        <div className="w-24 h-1 bg-blue-500 rounded-full mx-auto mt-3"></div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-6 sm:p-10">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
                                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                                    <strong className="text-blue-600">Levitica Technologies</strong> is an educational platform. The platform provides instructor-led live classes, online learning modules, quizzes, and batch-based training. Students can enroll in courses and attend scheduled live sessions through Zoom using the 'Join Class' feature in the app.
                                </p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-800 flex items-center">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    Information We Collect
                                </h3>
                                <p className="text-gray-600 mb-5">We may collect the following information:</p>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-blue-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaUserCircle size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Personal Information</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Name, email address, phone number, and profile photo (optional).</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-green-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaCreditCard size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Payment Information</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Payment transaction details processed through Razorpay. We do not store credit/debit card details.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-purple-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaChartLine size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Course & Learning Data</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Course enrollment details, batch information, learning progress, and quiz results.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-orange-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaMobile size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Device Information</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Device model, operating system version, and app usage statistics.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-red-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaVideo size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Live Session Data</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Attendance records and Zoom session participation data.</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-indigo-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                                            <FaDatabase size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Transaction Records</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">Order ID, payment ID, and purchased course information for record-keeping.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-800 flex items-center">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    How We Use Your Information
                                </h3>
                                <p className="text-gray-600 mb-5">We use the collected data to:</p>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-blue-500"><FaPlayCircle size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Manage student and admin accounts</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-green-500"><FaShieldAlt size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Provide access to enrolled courses and learning materials</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-purple-500"><FaVideo size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Allow students to join scheduled live sessions through Zoom</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-orange-500"><FaChartLine size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Track learning progress and quiz results</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-red-500"><FaCreditCard size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Process payments securely using Razorpay</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-yellow-500"><FaBell size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Send notifications regarding classes, updates, and assignments</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-indigo-500"><FaChartBar size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Improve our services and application performance</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
                                        <div className="text-teal-500"><FaClock size={18} /></div>
                                        <span className="text-sm sm:text-base text-gray-700">Schedule and manage batch-based training sessions</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-800 flex items-center">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    Payment Processing
                                </h3>
                                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        All payments are processed securely through <strong className="text-blue-600">Razorpay</strong>. We do not store credit card, debit card, or bank details on our servers. We may store transaction identifiers such as order ID, payment ID, and purchased course information for record-keeping.
                                    </p>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-800 flex items-center">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    Third-Party Services
                                </h3>
                                <p className="text-gray-600 mb-5">Levitica Technologies integrates with third-party services to provide core functionality:</p>
                                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-blue-500 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                                            <FaCreditCard size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Razorpay</h4>
                                        <p className="text-xs text-gray-600">Secure payment processing</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-green-500 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                                            <FaVideo size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Zoom</h4>
                                        <p className="text-xs text-gray-600">Joining scheduled live classes</p>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 group">
                                        <div className="text-purple-500 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
                                            <FaEnvelope size={32} />
                                        </div>
                                        <h4 className="font-semibold text-gray-800 mb-2">Email Services</h4>
                                        <p className="text-xs text-gray-600">Sending notifications and account updates</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-blue-800 flex items-center">
                                    <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
                                    Data Security
                                </h3>
                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        We protect your information using <strong className="text-green-600">HTTPS encryption</strong>, secure authentication mechanisms, and controlled access to backend systems. While we take strong measures to protect user data, no system can guarantee absolute security.
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Children's Privacy</h4>
                                    <p className="text-gray-600 leading-relaxed">Levitica Technologies is intended for users aged 13 years and older. We do not knowingly collect personal information from children under the age of 13.</p>
                                </div>
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">User Rights</h4>
                                    <p className="text-gray-600 leading-relaxed">Users may request access, correction, or deletion of their personal data by contacting us through our official website.</p>
                                </div>
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Data Retention</h4>
                                    <p className="text-gray-600 leading-relaxed">We retain user information only as long as necessary to provide services and comply with legal obligations.</p>
                                </div>
                                <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Changes to This Privacy Policy</h4>
                                    <p className="text-gray-600 leading-relaxed">We may update this Privacy Policy periodically. Any updates will be posted on our official website or within the application.</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-lg sm:text-xl font-semibold mb-5 text-blue-800 flex items-center">
                                    <span className="w-1 h-5 bg-blue-500 rounded-full mr-3"></span>
                                    Contact Information
                                </h4>
                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                    <p className="text-sm sm:text-base text-gray-700 mb-5">
                                        For any questions regarding this Privacy Policy, please contact us through our website and email:
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <FaEnvelope size={18} className="text-blue-600" />
                                            </div>
                                            <a href="mailto:info@leviticatechnologies.com" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                                info@leviticatechnologies.com
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg hover:shadow-md transition-all">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <FaGlobe size={18} className="text-green-600" />
                                            </div>
                                            <a href="https://www.leviticatechnologies.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                                                www.leviticatechnologies.com
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 text-center text-xs text-gray-400 border-t border-gray-100">
                                <p>© {new Date().getFullYear()} Levitica Technologies. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Components (updated for consistency)
const SectionTitle = ({ title }) => (
    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 flex items-center">
        <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
        {title}
    </h3>
);

const InfoCard = ({ icon, title, text }) => (
    <div className="bg-gray-50 p-5 rounded-xl hover:shadow-lg transition-all duration-300 group">
        <div className="text-blue-500 mb-3 group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className="font-semibold text-gray-800 text-lg mb-2">{title}</div>
        <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
    </div>
);

const UseItem = ({ icon, title }) => (
    <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white p-3 rounded-xl hover:shadow-md transition-all">
        <div className="text-blue-500">{icon}</div>
        <span className="text-sm sm:text-base text-gray-700">{title}</span>
    </div>
);

const ServiceCard = ({ title, description, icon }) => (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 text-center hover:shadow-lg transition-all duration-300 group">
        <div className="text-blue-500 mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</div>
        <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
        <p className="text-xs text-gray-600">{description}</p>
    </div>
);

const TextBlock = ({ title, text }) => (
    <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
        <h4 className="text-lg font-semibold mb-3 text-gray-800">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
);

export const Refund = () => {
    return (
        <div className="pt-24">
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    Refund & Cancellation Policy
                                </h1>
                                <div className="w-24 h-1 bg-blue-500 rounded-full mx-auto"></div>
                                <p className="text-gray-500 mt-3">Last updated: October 15, 2025</p>
                            </div>

                            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-8 p-6">
                                        <p className="mb-0 text-gray-700 font-medium">
                                            At Levitica Technologies, we are committed to your satisfaction. Please read our comprehensive
                                            refund and cancellation policy carefully before making any purchase.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">1</span>
                                            General Policy Overview
                                        </h4>
                                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5">
                                            <p className="mb-0 text-gray-600 leading-relaxed">
                                                Our refund and cancellation policy is designed to be fair to both our students and our business.
                                                Due to the digital nature of our products and services, we have specific guidelines to ensure
                                                the integrity of our educational content.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">2</span>
                                            Cancellation Policy
                                        </h4>
                                        <div className="grid gap-4">
                                            <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaClock className="text-red-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Cancellation Window:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Course cancellations may be requested within <strong>24–48 hours of purchase</strong>, provided no course content has been accessed.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaLock className="text-yellow-600" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Content Access:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Once you access any course material, download resources, or attend live sessions, cancellation is no longer permitted.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaCalendarAlt className="text-blue-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Live Session Cancellations:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">For courses with live components, cancellations must be requested before the first scheduled session.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaSyncAlt className="text-green-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Subscription Cancellations:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Monthly subscriptions can be canceled anytime, but will remain active until the end of the current billing cycle.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaEnvelope className="text-purple-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Cancellation Process:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">All cancellation requests must be submitted in writing via email to our support team.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">3</span>
                                            Refund Policy
                                        </h4>
                                        <div className="grid gap-4">
                                            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaCalendarCheck className="text-blue-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Processing Time:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Eligible refunds are processed within <strong>5–7 business days</strong> to the original payment method.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaHourglassHalf className="text-yellow-600" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Bank Processing:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Additional time may be required by your bank or payment provider to credit the refund to your account.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-red-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaDownload className="text-red-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Non-Refundable Items:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Digital downloads, accessed course materials, attended live sessions, and partially completed courses are not eligible for refunds.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-orange-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaExclamationTriangle className="text-orange-500" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Technical Issues:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Refunds are not provided for technical issues that can be resolved through our support team.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <div className="flex items-start">
                                                    <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                                                        <FaUser className="text-gray-600" size={18} />
                                                    </div>
                                                    <div>
                                                        <strong className="text-gray-800">Change of Mind:</strong>
                                                        <p className="text-sm text-gray-600 mt-1 mb-0">Refunds are not granted for change of mind or failure to meet personal expectations after accessing course content.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">4</span>
                                            Special Circumstances
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <FaVideo className="text-blue-500 text-2xl mb-3" />
                                                <strong className="text-gray-800 block mb-2">Live Session Recordings</strong>
                                                <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                    If you miss a live session but access the recording, the course is considered consumed and non-refundable.
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-r from-cyan-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <FaDownload className="text-cyan-500 text-2xl mb-3" />
                                                <strong className="text-gray-800 block mb-2">Downloadable Resources</strong>
                                                <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                    Any downloaded materials, templates, or resources make the course non-refundable immediately.
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <FaGraduationCap className="text-green-500 text-2xl mb-3" />
                                                <strong className="text-gray-800 block mb-2">Course Completion</strong>
                                                <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                    Courses completed beyond 25% are not eligible for refunds under any circumstances.
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-5 hover:shadow-md transition-all">
                                                <FaAward className="text-yellow-500 text-2xl mb-3" />
                                                <strong className="text-gray-800 block mb-2">Certification Programs</strong>
                                                <p className="text-sm text-gray-600 mb-0 leading-relaxed">
                                                    Certification programs are non-refundable once the assessment process has begun.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">5</span>
                                            Refund Processing Details
                                        </h4>
                                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5">
                                            <div className="space-y-3">
                                                <div className="flex items-start p-2 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                                                    <p className="mb-0 text-gray-700"><strong>Payment Method Refunds:</strong> Refunds are processed to the original payment method only.</p>
                                                </div>
                                                <div className="flex items-start p-2 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                                                    <p className="mb-0 text-gray-700"><strong>Partial Refunds:</strong> In exceptional circumstances, partial refunds may be granted at our discretion.</p>
                                                </div>
                                                <div className="flex items-start p-2 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3"></div>
                                                    <p className="mb-0 text-gray-700"><strong>Currency Conversion:</strong> Refund amounts are subject to currency conversion rates and may differ from the original.</p>
                                                </div>
                                                <div className="flex items-start p-2 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                                                    <p className="mb-0 text-gray-700"><strong>Refund Denials:</strong> We reserve the right to deny refunds in cases of policy violation or abuse.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">6</span>
                                            How to Request Cancellation or Refund
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="text-center bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 hover:shadow-lg transition-all group">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-all">
                                                    <FaEnvelope className="text-blue-600 text-2xl" />
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Email Request</h6>
                                                <p className="text-sm text-gray-600">
                                                    Send detailed request to our support email with your order information
                                                </p>
                                            </div>
                                            <div className="text-center bg-gradient-to-b from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-all group">
                                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-all">
                                                    <FaFileInvoice className="text-green-600 text-2xl" />
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Include Details</h6>
                                                <p className="text-sm text-gray-600">
                                                    Provide order number, purchase date, and reason for request
                                                </p>
                                            </div>
                                            <div className="text-center bg-gradient-to-b from-yellow-50 to-white rounded-xl p-6 hover:shadow-lg transition-all group">
                                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-all">
                                                    <FaClock className="text-yellow-600 text-2xl" />
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Response Time</h6>
                                                <p className="text-sm text-gray-600">
                                                    We respond to all requests within 24-48 business hours
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <h4 className="font-bold text-xl mb-4 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">7</span>
                                            Policy Updates
                                        </h4>
                                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5">
                                            <p className="mb-0 text-gray-600 leading-relaxed">
                                                We reserve the right to modify this refund and cancellation policy at any time.
                                                Changes will be effective immediately upon posting to our website. Continued use
                                                of our services after any changes constitutes acceptance of the modified policy.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 text-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                                        <h4 className="font-bold mb-4 text-white text-2xl">Need Assistance?</h4>
                                        <p className="mb-4 text-blue-100">
                                            For cancellation requests, refund inquiries, or any questions about our policy,
                                            please contact our support team:
                                        </p>
                                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                                            <a href="mailto:info@leviticatechnologies.com" className="inline-flex items-center gap-2 bg-white text-blue-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                                                <FaEnvelope />
                                                info@leviticatechnologies.com
                                            </a>
                                        </div>
                                        <p className="mt-4 mb-0 text-sm text-blue-100">
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
        <section className="pt-24">
            <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                                    Community Forums
                                </h1>
                                <p className="text-lg text-gray-500">Connect, collaborate, and learn with our community of designers and professionals</p>
                                <div className="w-24 h-1 bg-blue-500 rounded-full mx-auto mt-3"></div>
                            </div>

                            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-8 p-6">
                                        <p className="mb-0 text-gray-700 font-medium">
                                            Join our vibrant community of learners, instructors, and industry professionals.
                                            Share knowledge, ask questions, and grow together.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">📚</span>
                                            Forum Categories
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <FaGraduationCap className="text-blue-500" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-gray-800 mb-2">Learning Support</h5>
                                                        <p className="text-gray-600 text-sm mb-3">
                                                            Get help with course content, assignments, and learning challenges
                                                        </p>
                                                        <div className="flex text-gray-500 text-xs">
                                                            <span className="mr-3"><strong className="text-blue-600 mr-1">115</strong> Topics</span>
                                                            <span><strong className="text-green-600 mr-1">899</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <FaBriefcase className="text-green-500" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-gray-800 mb-2">Career Discussions</h5>
                                                        <p className="text-gray-600 text-sm mb-3">
                                                            Discuss career paths, job opportunities, and industry trends
                                                        </p>
                                                        <div className="flex text-gray-500 text-xs">
                                                            <span className="mr-3"><strong className="text-blue-600 mr-1">189</strong> Topics</span>
                                                            <span><strong className="text-green-600 mr-1">856</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-yellow-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <FaLightbulb className="text-yellow-500" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-gray-800 mb-2">Project Showcase</h5>
                                                        <p className="text-gray-600 text-sm mb-3">
                                                            Share your work, get feedback, and showcase your projects
                                                        </p>
                                                        <div className="flex text-gray-500 text-xs">
                                                            <span className="mr-3"><strong className="text-blue-600 mr-1">156</strong> Topics</span>
                                                            <span><strong className="text-green-600 mr-1">723</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <FaUsers className="text-purple-500" size={24} />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h5 className="font-bold text-gray-800 mb-2">Community Events</h5>
                                                        <p className="text-gray-600 text-sm mb-3">
                                                            Information about webinars, meetups, and community events
                                                        </p>
                                                        <div className="flex text-gray-500 text-xs">
                                                            <span className="mr-3"><strong className="text-blue-600 mr-1">67</strong> Topics</span>
                                                            <span><strong className="text-green-600 mr-1">234</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">💬</span>
                                            Recent Discussions
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h6 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                                            Best practices for responsive design in 2024
                                                        </h6>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <FaUserCircle size={14} />
                                                            <span>Posted by Sarah Chen</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="text-blue-600">Learning Support</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-gray-400">2 hours ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h6 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                                            Portfolio review for junior UX designer position
                                                        </h6>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <FaUserCircle size={14} />
                                                            <span>Posted by Mike Rodriguez</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="text-green-600">Project Showcase</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-gray-400">1 day ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-md transition-all cursor-pointer group">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h6 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                                                            Upcoming webinar: AI in Design workflows
                                                        </h6>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                                            <FaUserCircle size={14} />
                                                            <span>Posted by Admin</span>
                                                            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                                            <span className="text-purple-600">Community Events</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs text-gray-400">3 days ago</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">📋</span>
                                            Forum Guidelines
                                        </h4>
                                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                        <span className="text-blue-600 text-xs">✓</span>
                                                    </div>
                                                    <p className="mb-0 text-gray-700"><strong>Be Respectful:</strong> Treat all community members with respect and professionalism.</p>
                                                </div>
                                                <div className="flex items-start p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                        <span className="text-green-600 text-xs">✓</span>
                                                    </div>
                                                    <p className="mb-0 text-gray-700"><strong>Stay On Topic:</strong> Keep discussions relevant to the forum category.</p>
                                                </div>
                                                <div className="flex items-start p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                        <span className="text-red-600 text-xs">✗</span>
                                                    </div>
                                                    <p className="mb-0 text-gray-700"><strong>No Spam:</strong> Commercial promotions and spam content are not allowed.</p>
                                                </div>
                                                <div className="flex items-start p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                        <span className="text-yellow-600 text-xs">🔒</span>
                                                    </div>
                                                    <p className="mb-0 text-gray-700"><strong>Protect Privacy:</strong> Do not share personal information of yourself or others.</p>
                                                </div>
                                                <div className="flex items-start p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                                                        <span className="text-purple-600 text-xs">⭐</span>
                                                    </div>
                                                    <p className="mb-0 text-gray-700"><strong>Give Credit:</strong> Always credit original sources when sharing content.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                                        <h4 className="font-bold mb-4 text-white text-2xl">Join the Conversation</h4>
                                        <p className="mb-5 text-blue-100">
                                            Ready to connect with our community? Sign in to access the forums and start participating.
                                        </p>
                                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                                            <Link to="/login" className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                                                <FaSignInAlt />
                                                Sign In
                                            </Link>
                                            <Link to="/sign-up" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-6 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition-all">
                                                <FaUserPlus />
                                                Create Account
                                            </Link>
                                        </div>
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

export const KnowledgeBase = () => {
    return (
        <section className="pt-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    Knowledge Base
                                </h1>
                                <p className="text-lg text-gray-500">Find answers to common questions and learn how to make the most of our platform</p>
                                <div className="w-24 h-1 bg-blue-500 rounded-full mx-auto mt-3"></div>
                            </div>

                            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-8 p-6">
                                        <p className="mb-0 text-gray-700 font-medium">
                                            Welcome to our comprehensive Knowledge Base. Here you'll find detailed guides,
                                            tutorials, and answers to frequently asked questions about Levitica Technologies.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">🚀</span>
                                            Getting Started
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <FaUserPlus className="text-blue-500" size={24} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-800 mb-2">Account Setup</h5>
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            To get started, visit our <Link to="/sign-up" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">signup page</Link>,
                                                            fill in your details including name, email, and password. Verify your email through the confirmation link
                                                            sent to your inbox, then complete your profile setup in the dashboard.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-start">
                                                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                                                        <FaPlayCircle className="text-green-500" size={24} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold text-gray-800 mb-2">First Steps</h5>
                                                        <p className="text-gray-600 text-sm leading-relaxed">
                                                            After signing up, navigate to the <a href="/courses" className="font-bold text-blue-600 hover:text-blue-700 transition-colors">courses section</a>,
                                                            browse available courses, and enroll in your preferred program. Access your learning dashboard to start
                                                            watching videos, complete assignments, and track your progress.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">📚</span>
                                            Course Management
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <FaVideo className="text-blue-500" size={28} />
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Video Lessons</h6>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    Access videos from your course dashboard. Click on any lesson to start watching.
                                                    Your progress is automatically saved, and you can resume from where you left off.
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-b from-yellow-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <FaListCheck className="text-yellow-500" size={28} />
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Assignments</h6>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    Submit assignments through the course portal before deadlines.
                                                    Upload files directly or provide links to your work. Receive feedback within 48 hours.
                                                </p>
                                            </div>
                                            <div className="bg-gradient-to-b from-red-50 to-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <FaChartBar className="text-red-500" size={28} />
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Progress Tracking</h6>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    Monitor your progress in the analytics dashboard. Track completed lessons,
                                                    assignment scores, and overall course completion percentage in real-time.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">⚙️</span>
                                            Technical Support
                                        </h4>
                                        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                                                            <span className="text-blue-600 text-sm">🌐</span>
                                                        </div>
                                                        <h5 className="font-bold text-gray-800">Browser Compatibility</h5>
                                                    </div>
                                                    <p className="text-sm text-gray-600 ml-11">
                                                        For optimal performance, use Chrome, Firefox, or Safari latest versions.
                                                        Clear your browser cache regularly and ensure JavaScript is enabled.
                                                    </p>
                                                </div>
                                                <div className="p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                                                            <span className="text-green-600 text-sm">📱</span>
                                                        </div>
                                                        <h5 className="font-bold text-gray-800">Mobile Access</h5>
                                                    </div>
                                                    <p className="text-sm text-gray-600 ml-11">
                                                        Download our mobile app from App Store or Google Play.
                                                        All course features are available on mobile with offline viewing capability.
                                                    </p>
                                                </div>
                                                <div className="p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                                                            <span className="text-purple-600 text-sm">🎬</span>
                                                        </div>
                                                        <h5 className="font-bold text-gray-800">Video Playback</h5>
                                                    </div>
                                                    <p className="text-sm text-gray-600 ml-11">
                                                        Ensure stable internet connection (min 5Mbps). For playback issues,
                                                        try lowering video quality or using a different browser.
                                                    </p>
                                                </div>
                                                <div className="p-3 hover:bg-white rounded-lg transition-all">
                                                    <div className="flex items-center mb-2">
                                                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                                                            <span className="text-orange-600 text-sm">⬇️</span>
                                                        </div>
                                                        <h5 className="font-bold text-gray-800">Download Issues</h5>
                                                    </div>
                                                    <p className="text-sm text-gray-600 ml-11">
                                                        Check your storage space and internet connection.
                                                        If downloads fail, try again after clearing browser cache or using incognito mode.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">❓</span>
                                            Frequently Asked Questions
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden">
                                                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <span className="text-blue-600 text-sm">Q</span>
                                                        </div>
                                                        <span className="font-semibold text-gray-800">How do I reset my password?</span>
                                                    </div>
                                                    <FaChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                </button>
                                                <div className="px-5 pb-5 text-gray-600 ml-11 border-l-2 border-blue-200 ml-[52px]">
                                                    You can reset your password by clicking on "Forgot Password" on the login page.
                                                    Follow the instructions sent to your email to create a new password.
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden">
                                                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <span className="text-green-600 text-sm">Q</span>
                                                        </div>
                                                        <span className="font-semibold text-gray-800">Can I download course materials for offline use?</span>
                                                    </div>
                                                    <FaChevronRight className="text-gray-400 group-hover:text-green-500 transition-colors" />
                                                </button>
                                                <div className="px-5 pb-5 text-gray-600 border-l-2 border-green-200 ml-[52px]">
                                                    Yes, most course materials are available for download. Look for the download
                                                    icon next to each resource. Some materials may have restrictions based on
                                                    the course provider's policies.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                                        <h4 className="font-bold mb-4 text-white text-2xl">Still Need Help?</h4>
                                        <p className="mb-5 text-blue-100">
                                            Can't find what you're looking for? Our support team is here to help you.
                                        </p>
                                        <Link to="/contact-us" className="inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                                            <FaEnvelope />
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
        <div className="pt-24">
            <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    Affiliates Program
                                </h1>
                                <p className="text-lg text-gray-500">Earn commissions by referring students to Levitica Technologies</p>
                                <div className="w-24 h-1 bg-blue-500 rounded-full mx-auto mt-3"></div>
                            </div>

                            <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-8 p-6">
                                        <p className="mb-0 text-gray-700 font-medium">
                                            Join our Affiliates Program and earn competitive commissions for every student you refer.
                                            Help others advance their design careers while growing your income.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">🎯</span>
                                            Program Benefits
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                            <div className="text-center bg-gradient-to-b from-blue-50 to-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                                                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <FaPercent className="text-blue-500 text-3xl" />
                                                </div>
                                                <h5 className="font-bold text-gray-800 mb-2">Competitive Commissions</h5>
                                                <p className="text-gray-600 text-sm">
                                                    Earn up to 20% commission on every successful referral
                                                </p>
                                            </div>
                                            <div className="text-center bg-gradient-to-b from-green-50 to-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <FaChartLine className="text-green-500 text-3xl" />
                                                </div>
                                                <h5 className="font-bold text-gray-800 mb-2">Real-time Tracking</h5>
                                                <p className="text-gray-600 text-sm">
                                                    Monitor your referrals and earnings with our dashboard
                                                </p>
                                            </div>
                                            <div className="text-center bg-gradient-to-b from-purple-50 to-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
                                                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                    <FaGift className="text-purple-500 text-3xl" />
                                                </div>
                                                <h5 className="font-bold text-gray-800 mb-2">Performance Bonuses</h5>
                                                <p className="text-gray-600 text-sm">
                                                    Additional bonuses for top-performing affiliates
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">💰</span>
                                            Commission Structure
                                        </h4>
                                        <div className="overflow-x-auto bg-gradient-to-r from-gray-50 to-white rounded-xl p-1">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="border-b border-gray-200">
                                                        <th className="text-left px-4 py-3 font-semibold text-gray-800">Program Tier</th>
                                                        <th className="text-left px-4 py-3 font-semibold text-gray-800">Commission Rate</th>
                                                        <th className="text-left px-4 py-3 font-semibold text-gray-800">Requirements</th>
                                                        <th className="text-left px-4 py-3 font-semibold text-gray-800">Payout Frequency</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="border-b border-gray-100 hover:bg-white transition-all">
                                                        <td className="px-4 py-3 text-gray-700">
                                                            <span className="inline-flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                                                Starter
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-bold text-blue-600">10%</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-600">1-10 referrals/month</td>
                                                        <td className="px-4 py-3 text-gray-600">Monthly</td>
                                                    </tr>
                                                    <tr className="border-b border-gray-100 hover:bg-white transition-all">
                                                        <td className="px-4 py-3 text-gray-700">
                                                            <span className="inline-flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                                Professional
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-bold text-green-600">15%</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-600">11-25 referrals/month</td>
                                                        <td className="px-4 py-3 text-gray-600">Bi-weekly</td>
                                                    </tr>
                                                    <tr className="hover:bg-white transition-all">
                                                        <td className="px-4 py-3 text-gray-700">
                                                            <span className="inline-flex items-center gap-2">
                                                                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                                                Elite
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3">
                                                            <span className="font-bold text-purple-600">20%</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-gray-600">26+ referrals/month</td>
                                                        <td className="px-4 py-3 text-gray-600">Weekly</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">📋</span>
                                            How It Works
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                            <div className="text-center group">
                                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                                    <span className="font-bold text-2xl">1</span>
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Sign Up</h6>
                                                <p className="text-sm text-gray-600">
                                                    Register for our affiliates program
                                                </p>
                                            </div>
                                            <div className="text-center group">
                                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                                    <span className="font-bold text-2xl">2</span>
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Get Links</h6>
                                                <p className="text-sm text-gray-600">
                                                    Access your unique referral links
                                                </p>
                                            </div>
                                            <div className="text-center group">
                                                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                                    <span className="font-bold text-2xl">3</span>
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Share & Promote</h6>
                                                <p className="text-sm text-gray-600">
                                                    Share your links with your audience
                                                </p>
                                            </div>
                                            <div className="text-center group">
                                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                                                    <span className="font-bold text-2xl">4</span>
                                                </div>
                                                <h6 className="font-bold text-gray-800 mb-2">Earn Commissions</h6>
                                                <p className="text-sm text-gray-600">
                                                    Get paid for every successful referral
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-bold text-xl mb-5 text-blue-800 flex items-center">
                                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm mr-3">❓</span>
                                            FAQ
                                        </h4>
                                        <div className="space-y-4">
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden">
                                                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <span className="text-blue-600 text-sm">Q</span>
                                                        </div>
                                                        <span className="font-semibold text-gray-800">How much can I earn as an affiliate?</span>
                                                    </div>
                                                    <FaChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                                                </button>
                                                <div className="px-5 pb-5 text-gray-600 ml-11 border-l-2 border-blue-200">
                                                    Our top affiliates earn over 5,000 Rs per month. Earnings depend on your audience size,
                                                    engagement, and the number of successful referrals. With our tiered commission structure,
                                                    the more you refer, the higher your commission rate.
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl overflow-hidden">
                                                <button className="w-full flex items-center justify-between p-5 text-left hover:bg-white transition-all group">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                            <span className="text-green-600 text-sm">Q</span>
                                                        </div>
                                                        <span className="font-semibold text-gray-800">When do I get paid?</span>
                                                    </div>
                                                    <FaChevronRight className="text-gray-400 group-hover:text-green-500 transition-colors" />
                                                </button>
                                                <div className="px-5 pb-5 text-gray-600 ml-11 border-l-2 border-green-200">
                                                    Payouts are processed based on your tier: Starter (monthly), Professional (bi-weekly),
                                                    and Elite (weekly). All payments are made via Razorpay or bank transfer. There's a
                                                    30-day refund period before commissions are released.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl">
                                        <h4 className="font-bold mb-4 text-white text-2xl">Ready to Start Earning?</h4>
                                        <p className="mb-5 text-blue-100">
                                            Join thousands of successful affiliates promoting Levitica Technologies
                                        </p>
                                        <Link to="/contact-us" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                                            <FaEnvelope />
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
