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
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                    Terms & Conditions
                                </h1>
                                <div className="border-b mx-auto" style={{ width: '400px', height: '2px' }}></div>
                            </div>

                            <div className="bg-white shadow-lg border-0 rounded-lg">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gray-50 border rounded-lg mb-6 p-4">
                                        <p className="mb-0 font-medium">
                                            Welcome to <strong>Levitica Technologies</strong> ("Company", "we", "our", "us").
                                            By accessing or using our website{" "}
                                            <a href="https://leviticatechnologies.com" className="no-underline font-bold text-blue-600">
                                                https://leviticatechnologies.com
                                            </a>{" "}
                                            and our services, you ("User", "you", "your") agree to be bound by these Terms and Conditions.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">1. Acceptance of Terms</h4>
                                            <div className="bg-gray-50 border rounded-lg flex p-4">
                                                <div className="mr-3">
                                                    <FaLongArrowAltRight className="text-gray-600" />
                                                </div>
                                                <p className="mb-0">
                                                    By accessing, browsing, or using our website and services, you acknowledge that you have read,
                                                    understood, and agree to be bound by these Terms. If you do not agree with any part of these
                                                    Terms, you must not use our services.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">2. Eligibility and Account Registration</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div>
                                                        <strong>Age Requirement</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            You must be at least 18 years old to use our services. By using our services,
                                                            you represent and warrant that you meet this age requirement.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div>
                                                        <strong>Account Accuracy</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            You agree to provide accurate, current, and complete information during
                                                            registration and to update such information to keep it accurate.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div>
                                                        <strong>Account Security</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            You are responsible for maintaining the confidentiality of your account
                                                            credentials and for all activities that occur under your account.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div>
                                                        <strong>One Account Per User</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Each user may maintain only one account. Sharing accounts or creating
                                                            multiple accounts is strictly prohibited.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">3. Services and Payments</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-2"><FaCreditCard className="text-blue-500" /></div>
                                                    <div>
                                                        <strong>Payment Processing</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            All payments are processed securely via Razorpay. You agree to provide
                                                            valid and current payment information. We reserve the right to change
                                                            our pricing with 30 days notice.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-2"><FaFileInvoice className="text-green-500" /></div>
                                                    <div>
                                                        <strong>Subscription Terms</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Subscription fees are billed in advance on a recurring basis. You may
                                                            cancel your subscription at any time, but no refunds will be provided
                                                            for the current billing period.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-2"><FaBan className="text-red-500" /></div>
                                                    <div>
                                                        <strong>Payment Failures</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Failed payments may result in immediate suspension of services.
                                                            Repeated payment failures may lead to account termination.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-2"><FaPercent className="text-purple-500" /></div>
                                                    <div>
                                                        <strong>Taxes</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            All fees are exclusive of applicable taxes, which will be added to
                                                            your invoice where required by law.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">4. Intellectual Property Rights</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <p className="mb-3">
                                                    All content provided through our services, including but not limited to videos,
                                                    course materials, live classes, text, graphics, logos, and software, is the
                                                    property of Levitica Technologies or our licensors and is protected by copyright
                                                    and intellectual property laws.
                                                </p>
                                                <ul className="mb-0 list-none pl-0">
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>License Grant:</strong> We grant you a limited, non-exclusive,
                                                        non-transferable license to access and use the content for personal,
                                                        non-commercial educational purposes.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Restrictions:</strong> You may not copy, distribute, modify,
                                                        transmit, display, perform, reproduce, publish, license, create derivative
                                                        works from, or sell any content obtained from our services.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>User Content:</strong> By submitting content to our platform,
                                                        you grant us a worldwide, perpetual license to use, modify, and display
                                                        such content for educational purposes.
                                                    </li>
                                                    <li className="flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Enforcement:</strong> We will pursue legal action against any
                                                        unauthorized use of our intellectual property.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">5. User Conduct and Responsibilities</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div className="flex items-start">
                                                    <div className="mr-3"><FaShareAlt className="text-blue-500" /></div>
                                                    <div>
                                                        <strong>No Content Sharing</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Do not share, distribute, or make available any course materials to third parties
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mr-3"><FaCommentDots className="text-green-500" /></div>
                                                    <div>
                                                        <strong>Respectful Communication</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Maintain professional and respectful communication in all interactions
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mr-3"><FaLock className="text-red-500" /></div>
                                                    <div>
                                                        <strong>Security</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Do not attempt to breach security measures or access unauthorized areas
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start">
                                                    <div className="mr-3"><FaUsers className="text-purple-500" /></div>
                                                    <div>
                                                        <strong>No Impersonation</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Do not impersonate any person or entity or misrepresent your affiliation
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">6. Limitation of Liability</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <p className="mb-3">
                                                    To the fullest extent permitted by applicable law, Levitica Technologies shall not be liable for:
                                                </p>
                                                <ul className="mb-0 list-none pl-0">
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        Any indirect, incidental, special, consequential, or punitive damages
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        Loss of profits, data, use, goodwill, or other intangible losses
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        Payment gateway failures, technical issues, or service interruptions beyond our control
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        Any errors or omissions in any content or for any loss or damage incurred as a result
                                                        of the use of any content posted, emailed, transmitted, or otherwise made available
                                                    </li>
                                                    <li className="flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        The success or failure of your career outcomes after completing our courses
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">7. Termination</h4>
                                            <div className="bg-gray-50 border rounded-lg flex p-4">
                                                <div className="mr-3">
                                                    <FaLongArrowAltRight />
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

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">8. Governing Law and Dispute Resolution</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <p className="mb-3">
                                                    These Terms shall be governed and construed in accordance with the laws of India,
                                                    without regard to its conflict of law provisions.
                                                </p>
                                                <ul className="mb-0 list-none pl-0">
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Jurisdiction:</strong> Any disputes arising from these Terms shall be
                                                        subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Informal Resolution:</strong> We strongly encourage you to contact us
                                                        first to seek resolution of any dispute amicably before pursuing formal proceedings.
                                                    </li>
                                                    <li className="flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Time Limitation:</strong> Any cause of action arising out of or related
                                                        to these Terms must commence within one year after the cause of action accrues.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">9. Changes to Terms</h4>
                                            <div className="bg-gray-50 border rounded-lg flex p-4">
                                                <div className="mr-3">
                                                    <FaLongArrowAltRight />
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

                                    <div className="mb-0">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">10. Contact Information</h4>
                                            <div className="bg-gray-50 border rounded-lg flex p-4">
                                                <div className="mr-3">
                                                    <FaLongArrowAltRight />
                                                </div>
                                                <p className="mb-0">
                                                    If you have any questions about these Terms, please contact us at{" "}
                                                    <a href="mailto:info@leviticatechnologies.com" className="no-underline font-bold text-blue-600">
                                                        info@leviticatechnologies.com
                                                    </a>
                                                    . For general inquiries, you may also reach us at{" "}
                                                    <a href="mailto:info@leviticatechnologies.com" className="no-underline font-bold text-blue-600">
                                                        info@leviticatechnologies.com
                                                    </a>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 bg-gray-900 text-white rounded-lg">
                                        <p className="mb-0 text-center font-medium">
                                            By using our services, you acknowledge that you have read, understood, and agree to be bound
                                            by these Terms and Conditions. These Terms constitute the entire agreement between you and
                                            Levitica Technologies regarding our services.
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
        <div className="pt-24 bg-gray-50">
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="text-center mb-10">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                            Privacy Policy
                        </h1>
                        <p className="text-sm sm:text-base text-gray-500">
                            Effective Date: October 15, 2025
                        </p>

                        <div className="w-24 h-[2px] bg-gray-300 mx-auto" />
                    </div>

                    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
                        <div className="bg-gray-50 border rounded-xl p-4 mb-8">
                            <p className="text-sm sm:text-base font-medium text-gray-700">
                                <strong>Levitica Technologies </strong> is an educational platform. The platform provides instructor-led live classes, online learning modules, quizzes, and batch-based training. Students can enroll in courses and attend scheduled live sessions through Zoom using the 'Join Class' feature in the app.
                            </p>
                        </div>

                        <SectionTitle title="Information We Collect" />
                        <p className="text-gray-600 mb-4">We may collect the following information:</p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
                            <InfoCard
                                icon={<FaUserCircle size={32} />}
                                title="Personal Information"
                                text="Name, email address, phone number, and profile photo (optional)."
                            />
                            <InfoCard
                                icon={<FaCreditCard size={32} />}
                                title="Payment Information"
                                text="Payment transaction details processed through Razorpay. We do not store credit/debit card details."
                            />
                            <InfoCard
                                icon={<FaChartLine size={32} />}
                                title="Course & Learning Data"
                                text="Course enrollment details, batch information, learning progress, and quiz results."
                            />
                            <InfoCard
                                icon={<FaMobile size={32} />}
                                title="Device Information"
                                text="Device model, operating system version, and app usage statistics."
                            />
                            <InfoCard
                                icon={<FaVideo size={32} />}
                                title="Live Session Data"
                                text="Attendance records and Zoom session participation data."
                            />
                            <InfoCard
                                icon={<FaDatabase size={32} />}
                                title="Transaction Records"
                                text="Order ID, payment ID, and purchased course information for record-keeping."
                            />
                        </div>

                        <SectionTitle title="How We Use Your Information" />
                        <p className="text-gray-600 mb-4">We use the collected data to:</p>
                        <div className="grid sm:grid-cols-2 gap-6 mb-12">
                            <UseItem icon={<FaPlayCircle size={18} />} title="Manage student and admin accounts" />
                            <UseItem icon={<FaShieldAlt size={18} />} title="Provide access to enrolled courses and learning materials" />
                            <UseItem icon={<FaVideo size={18} />} title="Allow students to join scheduled live sessions through Zoom" />
                            <UseItem icon={<FaChartLine size={18} />} title="Track learning progress and quiz results" />
                            <UseItem icon={<FaCreditCard size={18} />} title="Process payments securely using Razorpay" />
                            <UseItem icon={<FaBell size={18} />} title="Send notifications regarding classes, updates, and assignments" />
                            <UseItem icon={<FaChartBar size={18} />} title="Improve our services and application performance" />
                            <UseItem icon={<FaClock size={18} />} title="Schedule and manage batch-based training sessions" />
                        </div>

                        <SectionTitle title="Payment Processing" />
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-12">
                            <p className="text-gray-700">
                                All payments are processed securely through <strong>Razorpay</strong>. We do not store credit card, debit card, or bank details on our servers. We may store transaction identifiers such as order ID, payment ID, and purchased course information for record-keeping.
                            </p>
                        </div>

                        <SectionTitle title="Third‑Party Services" />
                        <p className="text-gray-600 mb-4">Levitica Technologies integrates with third‑party services to provide core functionality:</p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
                            <ServiceCard
                                title="Razorpay"
                                description="Secure payment processing"
                                icon={<FaCreditCard size={24} />}
                            />
                            <ServiceCard
                                title="Zoom"
                                description="Joining scheduled live classes"
                                icon={<FaVideo size={24} />}
                            />
                            <ServiceCard
                                title="Email Services"
                                description="Sending notifications and account updates"
                                icon={<FaEnvelope size={24} />}
                            />

                        </div>

                        <SectionTitle title="Data Security" />
                        <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-12">
                            <p className="text-gray-700">
                                We protect your information using <strong>HTTPS encryption</strong>, secure authentication mechanisms, and controlled access to backend systems. While we take strong measures to protect user data, no system can guarantee absolute security.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            <TextBlock
                                title="Children's Privacy"
                                text="Levitica Technologies is intended for users aged 13 years and older. We do not knowingly collect personal information from children under the age of 13."
                            />

                            <TextBlock
                                title="User Rights"
                                text="Users may request access, correction, or deletion of their personal data by contacting us through our official website."
                            />

                            <TextBlock
                                title="Data Retention"
                                text="We retain user information only as long as necessary to provide services and comply with legal obligations."
                            />

                            <TextBlock
                                title="Changes to This Privacy Policy"
                                text="We may update this Privacy Policy periodically. Any updates will be posted on our official website or within the application."
                            />
                        </div>

                        <div className="mt-10">
                            <h4 className="text-lg sm:text-xl font-semibold mb-4">
                                Contact Information
                            </h4>
                            <div className="bg-gray-50 border rounded-xl p-6">
                                <p className="text-sm sm:text-base text-gray-700 mb-4">
                                    For any questions regarding this Privacy Policy, please contact us through our website and email:
                                </p>

                                <div className="space-y-3">
                                    {/* Email Contact */}
                                    <div className="flex items-center gap-3">
                                        <FaEnvelope size={18} className="text-blue-600" />
                                        <a
                                            href="mailto:info@leviticatechnologies.com"
                                            className="font-semibold text-blue-600 hover:underline"
                                        >
                                            info@leviticatechnologies.com
                                        </a>
                                    </div>

                                    {/* Website Contact */}
                                    <div className="flex items-center gap-3">
                                        <FaGlobe size={18} className="text-blue-600" />
                                        <a
                                            href="https://www.leviticatechnologies.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-semibold text-blue-600 hover:underline"
                                        >
                                            www.leviticatechnologies.com
                                        </a>
                                    </div>
                                </div>


                            </div>
                        </div>
                        

                        <div className="mt-8 text-center text-xs text-gray-400">
                            <p>© {new Date().getFullYear()} Levitica Technologies. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// Helper Components (keep these as they are or modify as needed)
const SectionTitle = ({ title }) => (
    <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">
        {title}
    </h3>
);

const InfoCard = ({ icon, title, text }) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
        <div className="text-blue-600 mb-2">{icon}</div>
        <div className="font-semibold text-lg mb-1">{title}</div>
        <p className="text-sm text-gray-600">{text}</p>
    </div>
);

const UseItem = ({ icon, title }) => (
    <div className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
        <div className="text-blue-600 mt-1">{icon}</div>
        <span className="text-sm sm:text-base text-gray-700">{title}</span>
    </div>
);

const ServiceCard = ({ title, description, icon }) => (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
        <div className="text-blue-600 mb-2 flex justify-center">{icon}</div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-xs text-gray-600">{description}</p>
    </div>
);

const TextBlock = ({ title, text }) => (
    <div className="mb-6">
        <h4 className="text-lg sm:text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600 leading-relaxed">{text}</p>
    </div>
);

export const Refund = () => {
    return (
        <div className="pt-24">
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">Refund & Cancellation Policy</h1>
                                <div className="border-b mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="bg-white shadow-lg border-0 rounded-lg">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gray-50 border rounded-lg mb-6 p-4">
                                        <p className="mb-0 font-medium">
                                            At Levitica Technologies, we are committed to your satisfaction. Please read our comprehensive
                                            refund and cancellation policy carefully before making any purchase.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">General Policy Overview</h4>
                                            <div className="bg-gray-50 border rounded-lg flex p-4">
                                                <div className="mr-3">
                                                    <FaLongArrowAltRight />
                                                </div>
                                                <p className="mb-0">
                                                    Our refund and cancellation policy is designed to be fair to both our students and our business.
                                                    Due to the digital nature of our products and services, we have specific guidelines to ensure
                                                    the integrity of our educational content.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-full p-0">
                                        <div className="flex items-center mb-3">
                                            <h4 className="font-bold mb-0">Cancellation Policy</h4>
                                        </div>
                                        <div className="p-4 bg-white border rounded-lg h-full">
                                            <ul className="list-none pl-0">
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaClock className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Cancellation Window:</strong> Course cancellations may be requested within
                                                            <strong> 24–48 hours of purchase</strong>, provided no course content has been accessed.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaLock className="text-yellow-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Content Access:</strong> Once you access any course material, download resources,
                                                            or attend live sessions, cancellation is no longer permitted.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaCalendarAlt className="text-blue-400 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Live Session Cancellations:</strong> For courses with live components, cancellations
                                                            must be requested before the first scheduled session.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaSyncAlt className="text-green-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Subscription Cancellations:</strong> Monthly subscriptions can be canceled anytime,
                                                            but will remain active until the end of the current billing cycle.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaEnvelope className="text-gray-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Cancellation Process:</strong> All cancellation requests must be submitted in writing
                                                            via email to our support team.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="w-full mt-6 p-0">
                                        <div className="flex items-center mb-3">
                                            <h4 className="font-bold mb-0">Refund Policy</h4>
                                        </div>
                                        <div className="p-4 bg-white border rounded-lg h-full">
                                            <ul className="list-none pl-0">
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaCalendarCheck className="text-blue-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Processing Time:</strong> Eligible refunds are processed within
                                                            <strong> 5–7 business days</strong> to the original payment method.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaHourglassHalf className="text-yellow-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Bank Processing:</strong> Additional time may be required by your bank or
                                                            payment provider to credit the refund to your account.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaDownload className="text-blue-400 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Non-Refundable Items:</strong> Digital downloads, accessed course materials,
                                                            attended live sessions, and partially completed courses are not eligible for refunds.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="mb-3 flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Technical Issues:</strong> Refunds are not provided for technical issues
                                                            that can be resolved through our support team.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="flex items-start">
                                                    <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" size={20} />
                                                    <div className="flex items-start">
                                                        <FaUser className="text-gray-500 mt-1 mr-2 flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Change of Mind:</strong> Refunds are not granted for change of mind or
                                                            failure to meet personal expectations after accessing course content.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="my-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Special Circumstances</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-4 border rounded-lg">
                                                    <div className="mr-3">
                                                        <FaVideo className="text-blue-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Live Session Recordings</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            If you miss a live session but access the recording, the course is considered
                                                            consumed and non-refundable.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg">
                                                    <div className="mr-3">
                                                        <FaDownload className="text-blue-400" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Downloadable Resources</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Any downloaded materials, templates, or resources make the course
                                                            non-refundable immediately.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg">
                                                    <div className="mr-3">
                                                        <FaGraduationCap className="text-green-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Course Completion</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Courses completed beyond 25% are not eligible for refunds under any circumstances.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg">
                                                    <div className="mr-3">
                                                        <FaAward className="text-yellow-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Certification Programs</strong>
                                                        <p className="text-sm text-gray-500 mb-0">
                                                            Certification programs are non-refundable once the assessment process has begun.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Refund Processing Details</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <ul className="mb-0 list-none pl-0">
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Payment Method Refunds:</strong> Refunds are processed to the original payment method only.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Partial Refunds:</strong> In exceptional circumstances, partial refunds may be granted
                                                        at our discretion.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Currency Conversion:</strong> Refund amounts are subject to currency conversion rates
                                                        and may differ from the original.
                                                    </li>
                                                    <li className="flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Refund Denials:</strong> We reserve the right to deny refunds in cases of policy
                                                        violation or abuse.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">How to Request Cancellation or Refund</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <div className="mb-3">
                                                        <FaEnvelope className="text-blue-500 mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="font-bold">Email Request</h6>
                                                    <small className="text-gray-500">
                                                        Send detailed request to our support email with your order information
                                                    </small>
                                                </div>
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <div className="mb-3">
                                                        <FaFileInvoice className="text-green-500 mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="font-bold">Include Details</h6>
                                                    <small className="text-gray-500">
                                                        Provide order number, purchase date, and reason for request
                                                    </small>
                                                </div>
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <div className="mb-3">
                                                        <FaClock className="text-yellow-500 mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="font-bold">Response Time</h6>
                                                    <small className="text-gray-500">
                                                        We respond to all requests within 24-48 business hours
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Policy Updates</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <p className="mb-0">
                                                    <FaLongArrowAltRight className="mr-1 inline" />
                                                    We reserve the right to modify this refund and cancellation policy at any time.
                                                    Changes will be effective immediately upon posting to our website. Continued use
                                                    of our services after any changes constitutes acceptance of the modified policy.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-6 bg-gray-900 text-white rounded-lg mt-6">
                                        <h4 className="font-bold mb-3 text-white">Need Assistance?</h4>
                                        <p className="mb-3">
                                            For cancellation requests, refund inquiries, or any questions about our policy,
                                            please contact our support team:
                                        </p>
                                        <div className="flex flex-col sm:flex-row justify-center w-full md:w-3/4 mx-auto">
                                            <a href="mailto:info@leviticatechnologies.com" className="bg-white text-gray-900 font-bold px-4 py-2 rounded mb-2 sm:mb-0 hover:bg-gray-100">
                                                <FaEnvelope className="mr-1 inline" />
                                                info@leviticatechnologies.com
                                            </a>
                                           
                                        </div>
                                        <p className="mt-3 mb-0 text-sm">
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
            <div className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">Community Forums</h1>
                                <p className="text-lg text-gray-500">Connect, collaborate, and learn with our community of designers and professionals</p>
                                <div className="border-b mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="bg-white shadow-lg border-0 rounded-lg">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gray-50 border rounded-lg mb-6 p-4">
                                        <p className="mb-0 font-medium">
                                            Join our vibrant community of learners, instructors, and industry professionals.
                                            Share knowledge, ask questions, and grow together.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Forum Categories</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-3">
                                                        <FaGraduationCap className="text-blue-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold">Learning Support</h5>
                                                        <p className="text-gray-500 mb-2">
                                                            Get help with course content, assignments, and learning challenges
                                                        </p>
                                                        <div className="flex text-gray-500 text-sm">
                                                            <span className="mr-3"><strong className="mr-1">115</strong> Topics</span>
                                                            <span><strong className="mr-1">899</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-3">
                                                        <FaBriefcase className="text-green-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold">Career Discussions</h5>
                                                        <p className="text-gray-500 mb-2">
                                                            Discuss career paths, job opportunities, and industry trends
                                                        </p>
                                                        <div className="flex text-gray-500 text-sm">
                                                            <span className="mr-3"><strong className="mr-1">189</strong> Topics</span>
                                                            <span><strong className="mr-1">856</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-3">
                                                        <FaLightbulb className="text-yellow-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold">Project Showcase</h5>
                                                        <p className="text-gray-500 mb-2">
                                                            Share your work, get feedback, and showcase your projects
                                                        </p>
                                                        <div className="flex text-gray-500 text-sm">
                                                            <span className="mr-3"><strong className="mr-1">156</strong> Topics</span>
                                                            <span><strong className="mr-1">723</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-3">
                                                        <FaUsers className="text-blue-400" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold">Community Events</h5>
                                                        <p className="text-gray-500 mb-2">
                                                            Information about webinars, meetups, and community events
                                                        </p>
                                                        <div className="flex text-gray-500 text-sm">
                                                            <span className="mr-3"><strong className="mr-1">67</strong> Topics</span>
                                                            <span><strong className="mr-1">234</strong> Posts</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Recent Discussions</h4>
                                            <div className="border rounded-lg overflow-hidden">
                                                <div className="border-b p-4 flex justify-between items-center hover:bg-gray-50">
                                                    <div>
                                                        <h6 className="mb-1">Best practices for responsive design in 2024</h6>
                                                        <p className="mb-1 text-gray-500 text-sm">Posted by Sarah Chen in Learning Support</p>
                                                    </div>
                                                </div>
                                                <div className="border-b p-4 flex justify-between items-center hover:bg-gray-50">
                                                    <div>
                                                        <h6 className="mb-1">Portfolio review for junior UX designer position</h6>
                                                        <p className="mb-1 text-gray-500 text-sm">Posted by Mike Rodriguez in Project Showcase</p>
                                                    </div>
                                                </div>
                                                <div className="p-4 flex justify-between items-center hover:bg-gray-50">
                                                    <div>
                                                        <h6 className="mb-1">Upcoming webinar: AI in Design workflows</h6>
                                                        <p className="mb-1 text-gray-500 text-sm">Posted by Admin in Community Events</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Forum Guidelines</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <ul className="mb-0 list-none pl-0">
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Be Respectful:</strong> Treat all community members with respect and professionalism.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Stay On Topic:</strong> Keep discussions relevant to the forum category.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>No Spam:</strong> Commercial promotions and spam content are not allowed.
                                                    </li>
                                                    <li className="mb-2 flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Protect Privacy:</strong> Do not share personal information of yourself or others.
                                                    </li>
                                                    <li className="flex">
                                                        <FaLongArrowAltRight className="mr-2 mt-1 flex-shrink-0" />
                                                        <strong>Give Credit:</strong> Always credit original sources when sharing content.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-6 bg-gray-900 text-white rounded-lg">
                                        <h4 className="font-bold mb-3 text-white">Join the Conversation</h4>
                                        <p className="mb-3">
                                            Ready to connect with our community? Sign in to access the forums and start participating.
                                        </p>
                                        <Link to={"/login"} className="bg-white text-gray-900 font-bold px-4 py-2 rounded mr-3 hover:bg-gray-100">
                                            <FaSignInAlt className="mr-1 inline" />
                                            Sign In
                                        </Link>
                                        <Link to={"/sign-up"} className="border border-white text-white font-bold px-4 py-2 rounded hover:bg-white hover:text-gray-900">
                                            <FaUserPlus className="mr-1 inline" />
                                            Create Account
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

export const KnowledgeBase = () => {
    return (
        <section className="pt-24 bg-gray-50">
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">Knowledge Base</h1>
                                <p className="text-lg text-gray-500">Find answers to common questions and learn how to make the most of our platform</p>
                                <div className="border-b mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="bg-white shadow-lg border-0 rounded-lg">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gray-50 border rounded-lg mb-6 p-4">
                                        <p className="mb-0 font-medium">
                                            Welcome to our comprehensive Knowledge Base. Here you'll find detailed guides,
                                            tutorials, and answers to frequently asked questions about Levitica Technologies.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Getting Started</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-3">
                                                        <FaUserPlus className="text-blue-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold">Account Setup</h5>
                                                        <p className="text-gray-500 mb-0">
                                                            To get started, visit our <Link to={"/sign-up"} className="no-underline font-bold text-blue-600">signup page</Link>,
                                                            fill in your details including name, email, and password. Verify your email through the confirmation link
                                                            sent to your inbox, then complete your profile setup in the dashboard.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start p-4 border rounded-lg h-full">
                                                    <div className="mr-3">
                                                        <FaPlayCircle className="text-green-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-bold">First Steps</h5>
                                                        <p className="text-gray-500 mb-0">
                                                            After signing up, navigate to the <a href="/courses" className="no-underline font-bold text-blue-600">courses section</a>,
                                                            browse available courses, and enroll in your preferred program. Access your learning dashboard to start
                                                            watching videos, complete assignments, and track your progress.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Course Management</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <div className="mb-3">
                                                        <FaVideo className="text-blue-400 mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="font-bold">Video Lessons</h6>
                                                    <p className="text-sm text-gray-500 mb-0">
                                                        Access videos from your course dashboard. Click on any lesson to start watching.
                                                        Your progress is automatically saved, and you can resume from where you left off.
                                                    </p>
                                                </div>
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <div className="mb-3">
                                                        <FaListCheck className="text-yellow-500 mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="font-bold">Assignments</h6>
                                                    <p className="text-sm text-gray-500 mb-0">
                                                        Submit assignments through the course portal before deadlines.
                                                        Upload files directly or provide links to your work. Receive feedback within 48 hours.
                                                    </p>
                                                </div>
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <div className="mb-3">
                                                        <FaChartBar className="text-red-500 mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="font-bold">Progress Tracking</h6>
                                                    <p className="text-sm text-gray-500 mb-0">
                                                        Monitor your progress in the analytics dashboard. Track completed lessons,
                                                        assignment scores, and overall course completion percentage in real-time.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Technical Support</h4>
                                            <div className="bg-gray-50 border rounded-lg p-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2">
                                                    <div className="mb-4 md:mb-0">
                                                        <h5 className="font-bold text-gray-900">Browser Compatibility</h5>
                                                        <p className="text-sm text-gray-500">
                                                            For optimal performance, use Chrome, Firefox, or Safari latest versions.
                                                            Clear your browser cache regularly and ensure JavaScript is enabled.
                                                        </p>
                                                    </div>
                                                    <div className="mb-4 md:mb-0">
                                                        <h5 className="font-bold text-gray-900">Mobile Access</h5>
                                                        <p className="text-sm text-gray-500">
                                                            Download our mobile app from App Store or Google Play.
                                                            All course features are available on mobile with offline viewing capability.
                                                        </p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <h5 className="font-bold text-gray-900">Video Playback</h5>
                                                        <p className="text-sm text-gray-500">
                                                            Ensure stable internet connection (min 5Mbps). For playback issues,
                                                            try lowering video quality or using a different browser.
                                                        </p>
                                                    </div>
                                                    <div className="mt-4">
                                                        <h5 className="font-bold text-gray-900">Download Issues</h5>
                                                        <p className="text-sm text-gray-500">
                                                            Check your storage space and internet connection.
                                                            If downloads fail, try again after clearing browser cache or using incognito mode.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Frequently Asked Questions</h4>
                                            <div className="border rounded-lg overflow-hidden" id="kbAccordion">
                                                <div className="border-b">
                                                    <div className="p-4" id="headingOne">
                                                        <h5 className="mb-0">
                                                            <button className="w-full text-left bg-transparent border-0 text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseOne" aria-expanded="true"
                                                                aria-controls="collapseOne">
                                                                How do I reset my password?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseOne" className="p-4 bg-gray-50" aria-labelledby="headingOne" data-bs-parent="#kbAccordion">
                                                        <div className="">
                                                            You can reset your password by clicking on "Forgot Password" on the login page.
                                                            Follow the instructions sent to your email to create a new password.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-b">
                                                    <div className="p-4" id="headingTwo">
                                                        <h5 className="mb-0">
                                                            <button className="w-full text-left bg-transparent border-0 text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseTwo" aria-expanded="false"
                                                                aria-controls="collapseTwo">
                                                                Can I download course materials for offline use?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseTwo" className="p-4 bg-gray-50" aria-labelledby="headingTwo" data-bs-parent="#kbAccordion">
                                                        <div className="">
                                                            Yes, most course materials are available for download. Look for the download
                                                            icon next to each resource. Some materials may have restrictions based on
                                                            the course provider's policies.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-6 bg-gray-900 text-white rounded-lg">
                                        <h4 className="font-bold mb-3 text-white">Still Need Help?</h4>
                                        <p className="mb-3">
                                            Can't find what you're looking for? Our support team is here to help you.
                                        </p>
                                        <Link to={"/contact-us"} className="bg-white text-gray-900 font-bold px-4 py-2 rounded hover:bg-gray-100">
                                            <FaEnvelope className="mr-1 inline" />
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
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        <div className="w-full lg:w-10/12">
                            <div className="text-center mb-12">
                                <h1 className="text-3xl md:text-4xl font-bold mb-3">Affiliates Program</h1>
                                <p className="text-lg text-gray-500">Earn commissions by referring students to Levitica Technologies</p>
                                <div className="border-b mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="bg-white shadow-lg border-0 rounded-lg">
                                <div className="p-6 md:p-8">
                                    <div className="bg-gray-50 border rounded-lg mb-6 p-4">
                                        <p className="mb-0 font-medium">
                                            Join our Affiliates Program and earn competitive commissions for every student you refer.
                                            Help others advance their design careers while growing your income.
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Program Benefits</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <FaPercent className="text-4xl mx-auto mb-3 text-blue-500" />
                                                    <h5 className="font-bold">Competitive Commissions</h5>
                                                    <p className="text-gray-500">
                                                        Earn up to 20% commission on every successful referral
                                                    </p>
                                                </div>
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <FaChartLine className="text-4xl mx-auto mb-3 text-green-500" />
                                                    <h5 className="font-bold">Real-time Tracking</h5>
                                                    <p className="text-gray-500">
                                                        Monitor your referrals and earnings with our dashboard
                                                    </p>
                                                </div>
                                                <div className="text-center p-4 border rounded-lg h-full">
                                                    <FaGift className="text-4xl mx-auto mb-3 text-purple-500" />
                                                    <h5 className="font-bold">Performance Bonuses</h5>
                                                    <p className="text-gray-500">
                                                        Additional bonuses for top-performing affiliates
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">Commission Structure</h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full border border-collapse">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th className="border px-4 py-2">Program Tier</th>
                                                            <th className="border px-4 py-2">Commission Rate</th>
                                                            <th className="border px-4 py-2">Requirements</th>
                                                            <th className="border px-4 py-2">Payout Frequency</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="border px-4 py-2">Starter</td>
                                                            <td className="border px-4 py-2">10%</td>
                                                            <td className="border px-4 py-2">1-10 referrals/month</td>
                                                            <td className="border px-4 py-2">Monthly</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2">Professional</td>
                                                            <td className="border px-4 py-2">15%</td>
                                                            <td className="border px-4 py-2">11-25 referrals/month</td>
                                                            <td className="border px-4 py-2">Bi-weekly</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="border px-4 py-2">Elite</td>
                                                            <td className="border px-4 py-2">20%</td>
                                                            <td className="border px-4 py-2">26+ referrals/month</td>
                                                            <td className="border px-4 py-2">Weekly</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">How It Works</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                                <div className="text-center">
                                                    <div className="bg-blue-500 text-white rounded-full inline-flex items-center justify-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="font-bold">1</span>
                                                    </div>
                                                    <h6>Sign Up</h6>
                                                    <p className="text-sm text-gray-500">
                                                        Register for our affiliates program
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-green-500 text-white rounded-full inline-flex items-center justify-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="font-bold">2</span>
                                                    </div>
                                                    <h6>Get Links</h6>
                                                    <p className="text-sm text-gray-500">
                                                        Access your unique referral links
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-yellow-500 text-white rounded-full inline-flex items-center justify-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="font-bold">3</span>
                                                    </div>
                                                    <h6>Share & Promote</h6>
                                                    <p className="text-sm text-gray-500">
                                                        Share your links with your audience
                                                    </p>
                                                </div>
                                                <div className="text-center">
                                                    <div className="bg-blue-400 text-white rounded-full inline-flex items-center justify-center mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="font-bold">4</span>
                                                    </div>
                                                    <h6>Earn Commissions</h6>
                                                    <p className="text-sm text-gray-500">
                                                        Get paid for every successful referral
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="col-span-12">
                                            <h4 className="font-bold mb-4 border-b pb-2">FAQ</h4>
                                            <div className="border rounded-lg overflow-hidden" id="affiliatesAccordion">
                                                <div className="border-b">
                                                    <div className="p-4">
                                                        <h5 className="mb-0">
                                                            <button className="w-full text-left bg-transparent border-0 text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#affiliateOne" aria-expanded="true"
                                                                aria-controls="affiliateOne">
                                                                How much can I earn as an affiliate?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="affiliateOne" className="p-4 bg-gray-50" data-bs-parent="#affiliatesAccordion">
                                                        <div className="">
                                                            Our top affiliates earn over 5,000 Rs per month. Earnings depend on your audience size,
                                                            engagement, and the number of successful referrals. With our tiered commission structure,
                                                            the more you refer, the higher your commission rate.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-b">
                                                    <div className="p-4">
                                                        <h5 className="mb-0">
                                                            <button className="w-full text-left bg-transparent border-0 text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#affiliateTwo" aria-expanded="false"
                                                                aria-controls="affiliateTwo">
                                                                When do I get paid?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="affiliateTwo" className="p-4 bg-gray-50" data-bs-parent="#affiliatesAccordion">
                                                        <div className="">
                                                            Payouts are processed based on your tier: Starter (monthly), Professional (bi-weekly),
                                                            and Elite (weekly). All payments are made via Razorpay or bank transfer. There's a
                                                            30-day refund period before commissions are released.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center p-6 bg-blue-500 text-white rounded-lg">
                                        <h4 className="font-bold mb-3 text-white">Ready to Start Earning?</h4>
                                        <p className="mb-3">
                                            Join thousands of successful affiliates promoting Levitica Technologies
                                        </p>
                                        <Link to={"/contact-us"} className="border border-white text-white font-bold px-4 py-2 rounded hover:bg-white hover:text-blue-500">
                                            <FaEnvelope className="mr-2 inline" />
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
