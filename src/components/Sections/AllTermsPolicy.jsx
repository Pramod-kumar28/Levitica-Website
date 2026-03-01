import { Link } from "react-router-dom";
import { 
  FaClock, FaCalendarAlt, FaSyncAlt, FaEnvelope, FaCalendarCheck, 
  FaHourglassHalf, FaExclamationTriangle, FaUser, FaVideo, 
  FaGraduationCap, FaAward, 
  FaDownload, FaBan, FaChartLine, FaCreditCard, FaGift, FaShieldAlt, 
  FaBell, FaChartBar, FaLock, FaUserCheck, FaCommentDots, FaPercent, 
  FaPlayCircle, FaFileInvoice, FaShareAlt, FaUserCircle, FaUsers, 
  FaHandshake, FaGavel, FaBriefcase, FaLightbulb,
 FaLongArrowAltRight, FaSignInAlt, FaUserPlus, 
 
} from "react-icons/fa";

import { FaListCheck } from "react-icons/fa6"; 

// Usage
<FaListCheck className="tw-text-yellow-500" size={32} />
export const Terms = () => {
    return (
        <div className="tw-pt-24">
            <section className="tw-py-12 tw-bg-gray-50">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <div className="tw-flex tw-justify-center">
                        <div className="tw-w-full lg:tw-w-10/12">
                            <div className="tw-text-center tw-mb-12">
                                <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">
                                    Terms & Conditions
                                </h1>
                                <div className="tw-border-b tw-mx-auto" style={{ width: '400px', height: '2px' }}></div>
                            </div>

                            <div className="tw-bg-white tw-shadow-lg tw-border-0 tw-rounded-lg">
                                <div className="tw-p-6 md:tw-p-8">
                                    <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-mb-6 tw-p-4">
                                        <p className="tw-mb-0 tw-font-medium">
                                            Welcome to <strong>Design Career Metrics</strong> ("Company", "we", "our", "us").
                                            By accessing or using our website{" "}
                                            <a href="https://designcareermetrics.com" className="tw-no-underline tw-font-bold tw-text-blue-600">
                                                https://designcareermetrics.com
                                            </a>{" "}
                                            and our services, you ("User", "you", "your") agree to be bound by these Terms and Conditions.
                                        </p>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">1. Acceptance of Terms</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-flex tw-p-4">
                                                <div className="tw-mr-3">
                                                    <FaLongArrowAltRight className="tw-text-gray-600" />
                                                </div>
                                                <p className="tw-mb-0">
                                                    By accessing, browsing, or using our website and services, you acknowledge that you have read,
                                                    understood, and agree to be bound by these Terms. If you do not agree with any part of these
                                                    Terms, you must not use our services.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">2. Eligibility and Account Registration</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div>
                                                        <strong>Age Requirement</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            You must be at least 18 years old to use our services. By using our services,
                                                            you represent and warrant that you meet this age requirement.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div>
                                                        <strong>Account Accuracy</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            You agree to provide accurate, current, and complete information during
                                                            registration and to update such information to keep it accurate.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div>
                                                        <strong>Account Security</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            You are responsible for maintaining the confidentiality of your account
                                                            credentials and for all activities that occur under your account.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div>
                                                        <strong>One Account Per User</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Each user may maintain only one account. Sharing accounts or creating
                                                            multiple accounts is strictly prohibited.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">3. Services and Payments</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mr-2"><FaCreditCard className="tw-text-blue-500" /></div>
                                                    <div>
                                                        <strong>Payment Processing</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            All payments are processed securely via Razorpay. You agree to provide
                                                            valid and current payment information. We reserve the right to change
                                                            our pricing with 30 days notice.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mr-2"><FaFileInvoice className="tw-text-green-500" /></div>
                                                    <div>
                                                        <strong>Subscription Terms</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Subscription fees are billed in advance on a recurring basis. You may
                                                            cancel your subscription at any time, but no refunds will be provided
                                                            for the current billing period.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mr-2"><FaBan className="tw-text-red-500" /></div>
                                                    <div>
                                                        <strong>Payment Failures</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Failed payments may result in immediate suspension of services.
                                                            Repeated payment failures may lead to account termination.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mr-2"><FaPercent className="tw-text-purple-500" /></div>
                                                    <div>
                                                        <strong>Taxes</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            All fees are exclusive of applicable taxes, which will be added to
                                                            your invoice where required by law.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">4. Intellectual Property Rights</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                                <p className="tw-mb-3">
                                                    All content provided through our services, including but not limited to videos,
                                                    course materials, live classes, text, graphics, logos, and software, is the
                                                    property of Design Career Metrics or our licensors and is protected by copyright
                                                    and intellectual property laws.
                                                </p>
                                                <ul className="tw-mb-0 tw-list-none tw-pl-0">
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>License Grant:</strong> We grant you a limited, non-exclusive,
                                                        non-transferable license to access and use the content for personal,
                                                        non-commercial educational purposes.
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Restrictions:</strong> You may not copy, distribute, modify,
                                                        transmit, display, perform, reproduce, publish, license, create derivative
                                                        works from, or sell any content obtained from our services.
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>User Content:</strong> By submitting content to our platform,
                                                        you grant us a worldwide, perpetual license to use, modify, and display
                                                        such content for educational purposes.
                                                    </li>
                                                    <li className="tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Enforcement:</strong> We will pursue legal action against any
                                                        unauthorized use of our intellectual property.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">5. User Conduct and Responsibilities</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
                                                <div className="tw-flex tw-items-start">
                                                    <div className="tw-mr-3"><FaShareAlt className="tw-text-blue-500" /></div>
                                                    <div>
                                                        <strong>No Content Sharing</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Do not share, distribute, or make available any course materials to third parties
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start">
                                                    <div className="tw-mr-3"><FaCommentDots className="tw-text-green-500" /></div>
                                                    <div>
                                                        <strong>Respectful Communication</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Maintain professional and respectful communication in all interactions
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start">
                                                    <div className="tw-mr-3"><FaLock className="tw-text-red-500" /></div>
                                                    <div>
                                                        <strong>Security</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Do not attempt to breach security measures or access unauthorized areas
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start">
                                                    <div className="tw-mr-3"><FaUsers className="tw-text-purple-500" /></div>
                                                    <div>
                                                        <strong>No Impersonation</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Do not impersonate any person or entity or misrepresent your affiliation
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">6. Limitation of Liability</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                                <p className="tw-mb-3">
                                                    To the fullest extent permitted by applicable law, Design Career Metrics shall not be liable for:
                                                </p>
                                                <ul className="tw-mb-0 tw-list-none tw-pl-0">
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        Any indirect, incidental, special, consequential, or punitive damages
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        Loss of profits, data, use, goodwill, or other intangible losses
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        Payment gateway failures, technical issues, or service interruptions beyond our control
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        Any errors or omissions in any content or for any loss or damage incurred as a result
                                                        of the use of any content posted, emailed, transmitted, or otherwise made available
                                                    </li>
                                                    <li className="tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        The success or failure of your career outcomes after completing our courses
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">7. Termination</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-flex tw-p-4">
                                                <div className="tw-mr-3">
                                                    <FaLongArrowAltRight />
                                                </div>
                                                <p className="tw-mb-0">
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

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">8. Governing Law and Dispute Resolution</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                                <p className="tw-mb-3">
                                                    These Terms shall be governed and construed in accordance with the laws of India,
                                                    without regard to its conflict of law provisions.
                                                </p>
                                                <ul className="tw-mb-0 tw-list-none tw-pl-0">
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Jurisdiction:</strong> Any disputes arising from these Terms shall be
                                                        subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India.
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Informal Resolution:</strong> We strongly encourage you to contact us
                                                        first to seek resolution of any dispute amicably before pursuing formal proceedings.
                                                    </li>
                                                    <li className="tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Time Limitation:</strong> Any cause of action arising out of or related
                                                        to these Terms must commence within one year after the cause of action accrues.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-4">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">9. Changes to Terms</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-flex tw-p-4">
                                                <div className="tw-mr-3">
                                                    <FaLongArrowAltRight />
                                                </div>
                                                <p className="tw-mb-0">
                                                    We reserve the right, at our sole discretion, to modify or replace these Terms
                                                    at any time. If a revision is material, we will provide at least 30 days' notice
                                                    prior to any new terms taking effect. What constitutes a material change will be
                                                    determined at our sole discretion. By continuing to access or use our services
                                                    after those revisions become effective, you agree to be bound by the revised terms.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-0">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">10. Contact Information</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-flex tw-p-4">
                                                <div className="tw-mr-3">
                                                    <FaLongArrowAltRight />
                                                </div>
                                                <p className="tw-mb-0">
                                                    If you have any questions about these Terms, please contact us at{" "}
                                                    <a href="mailto:legal@designcareermetrics.com" className="tw-no-underline tw-font-bold tw-text-blue-600">
                                                        legal@designcareermetrics.com
                                                    </a>
                                                    . For general inquiries, you may also reach us at{" "}
                                                    <a href="mailto:info@designcareermetrics.com" className="tw-no-underline tw-font-bold tw-text-blue-600">
                                                        info@designcareermetrics.com
                                                    </a>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mt-6 tw-p-4 tw-bg-gray-900 tw-text-white tw-rounded-lg">
                                        <p className="tw-mb-0 tw-text-center tw-font-medium">
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
        <div className="tw-pt-24 tw-bg-gray-50">
            <section className="tw-py-12">
                <div className="tw-max-w-6xl tw-mx-auto tw-px-4">
                    <div className="tw-text-center tw-mb-10">
                        <h1 className="tw-text-2xl sm:tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">
                            Privacy Policy
                        </h1>
                        <p className="tw-text-sm sm:tw-text-base tw-text-gray-500">
                            Last updated: 17-Jan-2025
                        </p>
                        <div className="tw-w-24 tw-h-[2px] tw-bg-gray-300 tw-mx-auto tw-mt-4" />
                    </div>

                    <div className="tw-bg-white tw-rounded-2xl tw-shadow-md tw-p-6 sm:tw-p-10">
                        <div className="tw-bg-gray-50 tw-border tw-rounded-xl tw-p-4 tw-mb-8">
                            <p className="tw-text-sm sm:tw-text-base tw-font-medium tw-text-gray-700">
                                At <strong>Design Career Metrics</strong>, we are committed to protecting your privacy and ensuring the security of your personal information.
                            </p>
                        </div>

                        <SectionTitle title="Information We Collect" />

                        <div className="tw-grid sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-mb-12">
                            <InfoCard
                                icon={<FaUserCircle size={32} />}
                                title="Personal Information"
                                text="Full name, email, phone, billing address, education & career details."
                            />
                            <InfoCard
                                icon={<FaCreditCard size={32} />}
                                title="Financial Information"
                                text="Payment details, billing history & transaction records via secure gateways."
                            />
                            <InfoCard
                                icon={<FaChartLine size={32} />}
                                title="Technical & Usage Data"
                                text="IP address, device info, session duration & user behavior."
                            />
                        </div>

                        <SectionTitle title="How We Use Your Information" />

                        <div className="tw-grid sm:tw-grid-cols-2 tw-gap-6 tw-mb-12">
                            <UseItem icon={<FaPlayCircle size={18} />} title="Service Delivery" />
                            <UseItem icon={<FaShieldAlt size={18} />} title="Payment Processing" />
                            <UseItem icon={<FaBell size={18} />} title="Communication" />
                            <UseItem icon={<FaChartBar size={18} />} title="Platform Improvement" />
                            <UseItem icon={<FaLock size={18} />} title="Security & Fraud Prevention" />
                            <UseItem icon={<FaUserCheck size={18} />} title="Personalization" />
                        </div>

                        <SectionTitle title="Data Sharing & Disclosure" />

                        <div className="tw-grid sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-6 tw-mb-12">
                            <InfoCard
                                icon={<FaBan size={28} />}
                                title="No Sale of Data"
                                text="We do not sell or rent your personal data."
                            />
                            <InfoCard
                                icon={<FaHandshake size={28} />}
                                title="Trusted Providers"
                                text="We share data with Razorpay, cloud & email providers under strict agreements."
                            />
                            <InfoCard
                                icon={<FaGavel size={28} />}
                                title="Legal Requirements"
                                text="We may disclose data if required by law."
                            />
                        </div>

                        <TextBlock
                            title="Data Retention"
                            text="We retain customer data for 3 years after account termination. Usage data may be anonymized after 12 months."
                        />

                        <TextBlock
                            title="Cookies & Tracking"
                            text="We use session, persistent, and analytics cookies. You can manage preferences in your browser settings."
                        />

                        <TextBlock
                            title="Data Security"
                            text="We use SSL encryption, secure infrastructure, and regular audits. No method is 100% secure."
                        />

                        <TextBlock
                            title="Your Rights"
                            text="You have rights to access, correct, delete, restrict, and request portability of your personal data."
                        />

                        <TextBlock
                            title="Children's Privacy"
                            text="Our services are not directed to individuals under 16."
                        />

                        <TextBlock
                            title="Changes to This Policy"
                            text="We may update this policy periodically and revise the Last Updated date."
                        />

                        <div className="tw-mt-10">
                            <h4 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-mb-3">
                                Contact Information
                            </h4>
                            <div className="tw-bg-gray-50 tw-border tw-rounded-xl tw-p-4 tw-flex tw-gap-3">
                                <FaLongArrowAltRight size={18} />
                                <p className="tw-text-sm sm:tw-text-base tw-text-gray-700">
                                    Contact us at{" "}
                                    <a
                                        href="mailto:privacy@designcareermetrics.com"
                                        className="tw-font-semibold tw-text-blue-600 hover:tw-underline"
                                    >
                                        privacy@designcareermetrics.com
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const Refund = () => {
    return (
        <div className="tw-pt-24">
            <section className="tw-py-12 tw-bg-gray-50">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <div className="tw-flex tw-justify-center">
                        <div className="tw-w-full lg:tw-w-10/12">
                            <div className="tw-text-center tw-mb-12">
                                <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">Refund & Cancellation Policy</h1>
                                <div className="tw-border-b tw-mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="tw-bg-white tw-shadow-lg tw-border-0 tw-rounded-lg">
                                <div className="tw-p-6 md:tw-p-8">
                                    <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-mb-6 tw-p-4">
                                        <p className="tw-mb-0 tw-font-medium">
                                            At Design Career Metrics, we are committed to your satisfaction. Please read our comprehensive
                                            refund and cancellation policy carefully before making any purchase.
                                        </p>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">General Policy Overview</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-flex tw-p-4">
                                                <div className="tw-mr-3">
                                                    <FaLongArrowAltRight />
                                                </div>
                                                <p className="tw-mb-0">
                                                    Our refund and cancellation policy is designed to be fair to both our students and our business.
                                                    Due to the digital nature of our products and services, we have specific guidelines to ensure
                                                    the integrity of our educational content.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-w-full tw-p-0">
                                        <div className="tw-flex tw-items-center tw-mb-3">
                                            <h4 className="tw-font-bold tw-mb-0">Cancellation Policy</h4>
                                        </div>
                                        <div className="tw-p-4 tw-bg-white tw-border tw-rounded-lg tw-h-full">
                                            <ul className="tw-list-none tw-pl-0">
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaClock className="tw-text-blue-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Cancellation Window:</strong> Course cancellations may be requested within
                                                            <strong> 24–48 hours of purchase</strong>, provided no course content has been accessed.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaLock className="tw-text-yellow-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Content Access:</strong> Once you access any course material, download resources,
                                                            or attend live sessions, cancellation is no longer permitted.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaCalendarAlt className="tw-text-blue-400 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Live Session Cancellations:</strong> For courses with live components, cancellations
                                                            must be requested before the first scheduled session.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaSyncAlt className="tw-text-green-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Subscription Cancellations:</strong> Monthly subscriptions can be canceled anytime,
                                                            but will remain active until the end of the current billing cycle.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaEnvelope className="tw-text-gray-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Cancellation Process:</strong> All cancellation requests must be submitted in writing
                                                            via email to our support team.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="tw-w-full tw-mt-6 tw-p-0">
                                        <div className="tw-flex tw-items-center tw-mb-3">
                                            <h4 className="tw-font-bold tw-mb-0">Refund Policy</h4>
                                        </div>
                                        <div className="tw-p-4 tw-bg-white tw-border tw-rounded-lg tw-h-full">
                                            <ul className="tw-list-none tw-pl-0">
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaCalendarCheck className="tw-text-blue-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Processing Time:</strong> Eligible refunds are processed within
                                                            <strong> 5–7 business days</strong> to the original payment method.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaHourglassHalf className="tw-text-yellow-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Bank Processing:</strong> Additional time may be required by your bank or
                                                            payment provider to credit the refund to your account.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaDownload className="tw-text-blue-400 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Non-Refundable Items:</strong> Digital downloads, accessed course materials,
                                                            attended live sessions, and partially completed courses are not eligible for refunds.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-mb-3 tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaExclamationTriangle className="tw-text-red-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Technical Issues:</strong> Refunds are not provided for technical issues
                                                            that can be resolved through our support team.
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="tw-flex tw-items-start">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" size={20} />
                                                    <div className="tw-flex tw-items-start">
                                                        <FaUser className="tw-text-gray-500 tw-mt-1 tw-mr-2 tw-flex-shrink-0" size={16} />
                                                        <div>
                                                            <strong>Change of Mind:</strong> Refunds are not granted for change of mind or
                                                            failure to meet personal expectations after accessing course content.
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="tw-my-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Special Circumstances</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg">
                                                    <div className="tw-mr-3">
                                                        <FaVideo className="tw-text-blue-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Live Session Recordings</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            If you miss a live session but access the recording, the course is considered
                                                            consumed and non-refundable.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg">
                                                    <div className="tw-mr-3">
                                                        <FaDownload className="tw-text-blue-400" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Downloadable Resources</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Any downloaded materials, templates, or resources make the course
                                                            non-refundable immediately.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg">
                                                    <div className="tw-mr-3">
                                                        <FaGraduationCap className="tw-text-green-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Course Completion</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Courses completed beyond 25% are not eligible for refunds under any circumstances.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg">
                                                    <div className="tw-mr-3">
                                                        <FaAward className="tw-text-yellow-500" size={20} />
                                                    </div>
                                                    <div>
                                                        <strong>Certification Programs</strong>
                                                        <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                            Certification programs are non-refundable once the assessment process has begun.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Refund Processing Details</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                                <ul className="tw-mb-0 tw-list-none tw-pl-0">
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Payment Method Refunds:</strong> Refunds are processed to the original payment method only.
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Partial Refunds:</strong> In exceptional circumstances, partial refunds may be granted
                                                        at our discretion.
                                                    </li>
                                                    <li className="tw-mb-2 tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Currency Conversion:</strong> Refund amounts are subject to currency conversion rates
                                                        and may differ from the original.
                                                    </li>
                                                    <li className="tw-flex">
                                                        <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                        <strong>Refund Denials:</strong> We reserve the right to deny refunds in cases of policy
                                                        violation or abuse.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">How to Request Cancellation or Refund</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3">
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mb-3">
                                                        <FaEnvelope className="tw-text-blue-500 tw-mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="tw-font-bold">Email Request</h6>
                                                    <small className="tw-text-gray-500">
                                                        Send detailed request to our support email with your order information
                                                    </small>
                                                </div>
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mb-3">
                                                        <FaFileInvoice className="tw-text-green-500 tw-mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="tw-font-bold">Include Details</h6>
                                                    <small className="tw-text-gray-500">
                                                        Provide order number, purchase date, and reason for request
                                                    </small>
                                                </div>
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mb-3">
                                                        <FaClock className="tw-text-yellow-500 tw-mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="tw-font-bold">Response Time</h6>
                                                    <small className="tw-text-gray-500">
                                                        We respond to all requests within 24-48 business hours
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-0">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Policy Updates</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                                <p className="tw-mb-0">
                                                    <FaLongArrowAltRight className="tw-mr-1 tw-inline" />
                                                    We reserve the right to modify this refund and cancellation policy at any time.
                                                    Changes will be effective immediately upon posting to our website. Continued use
                                                    of our services after any changes constitutes acceptance of the modified policy.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-text-center tw-p-6 tw-bg-gray-900 tw-text-white tw-rounded-lg tw-mt-6">
                                        <h4 className="tw-font-bold tw-mb-3 tw-text-white">Need Assistance?</h4>
                                        <p className="tw-mb-3">
                                            For cancellation requests, refund inquiries, or any questions about our policy,
                                            please contact our support team:
                                        </p>
                                        <div className="tw-flex tw-flex-col sm:tw-flex-row tw-justify-between tw-w-full md:tw-w-3/4 tw-mx-auto">
                                            <a href="mailto:support@designcareermetrics.com" className="tw-bg-white tw-text-gray-900 tw-font-bold tw-px-4 tw-py-2 tw-rounded tw-mb-2 sm:tw-mb-0 hover:tw-bg-gray-100">
                                                <FaEnvelope className="tw-mr-1 tw-inline" />
                                                support@designcareermetrics.com
                                            </a>
                                            <a href="mailto:info@designcareermetrics.com" className="tw-border tw-border-white tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded hover:tw-bg-white hover:tw-text-gray-900">
                                                <FaEnvelope className="tw-mr-1 tw-inline" />
                                                info@designcareermetrics.com
                                            </a>
                                        </div>
                                        <p className="tw-mt-3 tw-mb-0 tw-text-sm">
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
       <section className="tw-pt-24">
         <div className="tw-py-12 tw-bg-gray-50">
            <div className="tw-container tw-mx-auto tw-px-4">
                <div className="tw-flex tw-justify-center">
                    <div className="tw-w-full lg:tw-w-10/12">
                        <div className="tw-text-center tw-mb-12">
                            <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">Community Forums</h1>
                            <p className="tw-text-lg tw-text-gray-500">Connect, collaborate, and learn with our community of designers and professionals</p>
                            <div className="tw-border-b tw-mx-auto" style={{ width: '100px', height: '2px' }}></div>
                        </div>

                        <div className="tw-bg-white tw-shadow-lg tw-border-0 tw-rounded-lg">
                            <div className="tw-p-6 md:tw-p-8">
                                <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-mb-6 tw-p-4">
                                    <p className="tw-mb-0 tw-font-medium">
                                        Join our vibrant community of learners, instructors, and industry professionals.
                                        Share knowledge, ask questions, and grow together.
                                    </p>
                                </div>

                                <div className="tw-mb-8">
                                    <div className="tw-col-span-12">
                                        <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Forum Categories</h4>
                                        <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                            <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                <div className="tw-mr-3">
                                                    <FaGraduationCap className="tw-text-blue-500" size={32} />
                                                </div>
                                                <div>
                                                    <h5 className="tw-font-bold">Learning Support</h5>
                                                    <p className="tw-text-gray-500 tw-mb-2">
                                                        Get help with course content, assignments, and learning challenges
                                                    </p>
                                                    <div className="tw-flex tw-text-gray-500 tw-text-sm">
                                                        <span className="tw-mr-3"><strong className="tw-mr-1">115</strong> Topics</span>
                                                        <span><strong className="tw-mr-1">899</strong> Posts</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                <div className="tw-mr-3">
                                                    <FaBriefcase className="tw-text-green-500" size={32} />
                                                </div>
                                                <div>
                                                    <h5 className="tw-font-bold">Career Discussions</h5>
                                                    <p className="tw-text-gray-500 tw-mb-2">
                                                        Discuss career paths, job opportunities, and industry trends
                                                    </p>
                                                    <div className="tw-flex tw-text-gray-500 tw-text-sm">
                                                        <span className="tw-mr-3"><strong className="tw-mr-1">189</strong> Topics</span>
                                                        <span><strong className="tw-mr-1">856</strong> Posts</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                <div className="tw-mr-3">
                                                    <FaLightbulb className="tw-text-yellow-500" size={32} />
                                                </div>
                                                <div>
                                                    <h5 className="tw-font-bold">Project Showcase</h5>
                                                    <p className="tw-text-gray-500 tw-mb-2">
                                                        Share your work, get feedback, and showcase your projects
                                                    </p>
                                                    <div className="tw-flex tw-text-gray-500 tw-text-sm">
                                                        <span className="tw-mr-3"><strong className="tw-mr-1">156</strong> Topics</span>
                                                        <span><strong className="tw-mr-1">723</strong> Posts</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                <div className="tw-mr-3">
                                                    <FaUsers className="tw-text-blue-400" size={32} />
                                                </div>
                                                <div>
                                                    <h5 className="tw-font-bold">Community Events</h5>
                                                    <p className="tw-text-gray-500 tw-mb-2">
                                                        Information about webinars, meetups, and community events
                                                    </p>
                                                    <div className="tw-flex tw-text-gray-500 tw-text-sm">
                                                        <span className="tw-mr-3"><strong className="tw-mr-1">67</strong> Topics</span>
                                                        <span><strong className="tw-mr-1">234</strong> Posts</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-mb-8">
                                    <div className="tw-col-span-12">
                                        <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Recent Discussions</h4>
                                        <div className="tw-border tw-rounded-lg tw-overflow-hidden">
                                            <div className="tw-border-b tw-p-4 tw-flex tw-justify-between tw-items-center hover:tw-bg-gray-50">
                                                <div>
                                                    <h6 className="tw-mb-1">Best practices for responsive design in 2024</h6>
                                                    <p className="tw-mb-1 tw-text-gray-500 tw-text-sm">Posted by Sarah Chen in Learning Support</p>
                                                </div>
                                            </div>
                                            <div className="tw-border-b tw-p-4 tw-flex tw-justify-between tw-items-center hover:tw-bg-gray-50">
                                                <div>
                                                    <h6 className="tw-mb-1">Portfolio review for junior UX designer position</h6>
                                                    <p className="tw-mb-1 tw-text-gray-500 tw-text-sm">Posted by Mike Rodriguez in Project Showcase</p>
                                                </div>
                                            </div>
                                            <div className="tw-p-4 tw-flex tw-justify-between tw-items-center hover:tw-bg-gray-50">
                                                <div>
                                                    <h6 className="tw-mb-1">Upcoming webinar: AI in Design workflows</h6>
                                                    <p className="tw-mb-1 tw-text-gray-500 tw-text-sm">Posted by Admin in Community Events</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-mb-8">
                                    <div className="tw-col-span-12">
                                        <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Forum Guidelines</h4>
                                        <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                            <ul className="tw-mb-0 tw-list-none tw-pl-0">
                                                <li className="tw-mb-2 tw-flex">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                    <strong>Be Respectful:</strong> Treat all community members with respect and professionalism.
                                                </li>
                                                <li className="tw-mb-2 tw-flex">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                    <strong>Stay On Topic:</strong> Keep discussions relevant to the forum category.
                                                </li>
                                                <li className="tw-mb-2 tw-flex">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                    <strong>No Spam:</strong> Commercial promotions and spam content are not allowed.
                                                </li>
                                                <li className="tw-mb-2 tw-flex">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                    <strong>Protect Privacy:</strong> Do not share personal information of yourself or others.
                                                </li>
                                                <li className="tw-flex">
                                                    <FaLongArrowAltRight className="tw-mr-2 tw-mt-1 tw-flex-shrink-0" />
                                                    <strong>Give Credit:</strong> Always credit original sources when sharing content.
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="tw-text-center tw-p-6 tw-bg-gray-900 tw-text-white tw-rounded-lg">
                                    <h4 className="tw-font-bold tw-mb-3 tw-text-white">Join the Conversation</h4>
                                    <p className="tw-mb-3">
                                        Ready to connect with our community? Sign in to access the forums and start participating.
                                    </p>
                                    <Link to={"/login"} className="tw-bg-white tw-text-gray-900 tw-font-bold tw-px-4 tw-py-2 tw-rounded tw-mr-3 hover:tw-bg-gray-100">
                                        <FaSignInAlt className="tw-mr-1 tw-inline" />
                                        Sign In
                                    </Link>
                                    <Link to={"/sign-up"} className="tw-border tw-border-white tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded hover:tw-bg-white hover:tw-text-gray-900">
                                        <FaUserPlus className="tw-mr-1 tw-inline" />
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
        <section className="tw-pt-24 tw-bg-gray-50">
            <div className="tw-py-12">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <div className="tw-flex tw-justify-center">
                        <div className="tw-w-full lg:tw-w-10/12">
                            <div className="tw-text-center tw-mb-12">
                                <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">Knowledge Base</h1>
                                <p className="tw-text-lg tw-text-gray-500">Find answers to common questions and learn how to make the most of our platform</p>
                                <div className="tw-border-b tw-mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="tw-bg-white tw-shadow-lg tw-border-0 tw-rounded-lg">
                                <div className="tw-p-6 md:tw-p-8">
                                    <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-mb-6 tw-p-4">
                                        <p className="tw-mb-0 tw-font-medium">
                                            Welcome to our comprehensive Knowledge Base. Here you'll find detailed guides,
                                            tutorials, and answers to frequently asked questions about Design Career Metrics.
                                        </p>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Getting Started</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-4">
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mr-3">
                                                        <FaUserPlus className="tw-text-blue-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="tw-font-bold">Account Setup</h5>
                                                        <p className="tw-text-gray-500 tw-mb-0">
                                                            To get started, visit our <Link to={"/sign-up"} className="tw-no-underline tw-font-bold tw-text-blue-600">signup page</Link>,
                                                            fill in your details including name, email, and password. Verify your email through the confirmation link
                                                            sent to your inbox, then complete your profile setup in the dashboard.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="tw-flex tw-items-start tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mr-3">
                                                        <FaPlayCircle className="tw-text-green-500" size={32} />
                                                    </div>
                                                    <div>
                                                        <h5 className="tw-font-bold">First Steps</h5>
                                                        <p className="tw-text-gray-500 tw-mb-0">
                                                            After signing up, navigate to the <a href="/courses" className="tw-no-underline tw-font-bold tw-text-blue-600">courses section</a>,
                                                            browse available courses, and enroll in your preferred program. Access your learning dashboard to start
                                                            watching videos, complete assignments, and track your progress.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Course Management</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-3">
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mb-3">
                                                        <FaVideo className="tw-text-blue-400 tw-mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="tw-font-bold">Video Lessons</h6>
                                                    <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                        Access videos from your course dashboard. Click on any lesson to start watching.
                                                        Your progress is automatically saved, and you can resume from where you left off.
                                                    </p>
                                                </div>
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mb-3">
                                                        <FaListCheck className="tw-text-yellow-500 tw-mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="tw-font-bold">Assignments</h6>
                                                    <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                        Submit assignments through the course portal before deadlines.
                                                        Upload files directly or provide links to your work. Receive feedback within 48 hours.
                                                    </p>
                                                </div>
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <div className="tw-mb-3">
                                                        <FaChartBar className="tw-text-red-500 tw-mx-auto" size={32} />
                                                    </div>
                                                    <h6 className="tw-font-bold">Progress Tracking</h6>
                                                    <p className="tw-text-sm tw-text-gray-500 tw-mb-0">
                                                        Monitor your progress in the analytics dashboard. Track completed lessons,
                                                        assignment scores, and overall course completion percentage in real-time.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Technical Support</h4>
                                            <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-p-4">
                                                <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2">
                                                    <div className="tw-mb-4 md:tw-mb-0">
                                                        <h5 className="tw-font-bold tw-text-gray-900">Browser Compatibility</h5>
                                                        <p className="tw-text-sm tw-text-gray-500">
                                                            For optimal performance, use Chrome, Firefox, or Safari latest versions.
                                                            Clear your browser cache regularly and ensure JavaScript is enabled.
                                                        </p>
                                                    </div>
                                                    <div className="tw-mb-4 md:tw-mb-0">
                                                        <h5 className="tw-font-bold tw-text-gray-900">Mobile Access</h5>
                                                        <p className="tw-text-sm tw-text-gray-500">
                                                            Download our mobile app from App Store or Google Play.
                                                            All course features are available on mobile with offline viewing capability.
                                                        </p>
                                                    </div>
                                                    <div className="tw-mt-4">
                                                        <h5 className="tw-font-bold tw-text-gray-900">Video Playback</h5>
                                                        <p className="tw-text-sm tw-text-gray-500">
                                                            Ensure stable internet connection (min 5Mbps). For playback issues,
                                                            try lowering video quality or using a different browser.
                                                        </p>
                                                    </div>
                                                    <div className="tw-mt-4">
                                                        <h5 className="tw-font-bold tw-text-gray-900">Download Issues</h5>
                                                        <p className="tw-text-sm tw-text-gray-500">
                                                            Check your storage space and internet connection.
                                                            If downloads fail, try again after clearing browser cache or using incognito mode.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-4">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Frequently Asked Questions</h4>
                                            <div className="tw-border tw-rounded-lg tw-overflow-hidden" id="kbAccordion">
                                                <div className="tw-border-b">
                                                    <div className="tw-p-4" id="headingOne">
                                                        <h5 className="tw-mb-0">
                                                            <button className="tw-w-full tw-text-left tw-bg-transparent tw-border-0 tw-text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseOne" aria-expanded="true"
                                                                aria-controls="collapseOne">
                                                                How do I reset my password?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseOne" className="tw-p-4 tw-bg-gray-50" aria-labelledby="headingOne" data-bs-parent="#kbAccordion">
                                                        <div className="">
                                                            You can reset your password by clicking on "Forgot Password" on the login page.
                                                            Follow the instructions sent to your email to create a new password.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tw-border-b">
                                                    <div className="tw-p-4" id="headingTwo">
                                                        <h5 className="tw-mb-0">
                                                            <button className="tw-w-full tw-text-left tw-bg-transparent tw-border-0 tw-text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#collapseTwo" aria-expanded="false"
                                                                aria-controls="collapseTwo">
                                                                Can I download course materials for offline use?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="collapseTwo" className="tw-p-4 tw-bg-gray-50" aria-labelledby="headingTwo" data-bs-parent="#kbAccordion">
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

                                    <div className="tw-text-center tw-p-6 tw-bg-gray-900 tw-text-white tw-rounded-lg">
                                        <h4 className="tw-font-bold tw-mb-3 tw-text-white">Still Need Help?</h4>
                                        <p className="tw-mb-3">
                                            Can't find what you're looking for? Our support team is here to help you.
                                        </p>
                                        <Link to={"/contact-us"} className="tw-bg-white tw-text-gray-900 tw-font-bold tw-px-4 tw-py-2 tw-rounded hover:tw-bg-gray-100">
                                            <FaEnvelope className="tw-mr-1 tw-inline" />
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
        <div className="tw-pt-24">
            <section className="tw-py-12 tw-bg-gray-50">
                <div className="tw-container tw-mx-auto tw-px-4">
                    <div className="tw-flex tw-justify-center">
                        <div className="tw-w-full lg:tw-w-10/12">
                            <div className="tw-text-center tw-mb-12">
                                <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">Affiliates Program</h1>
                                <p className="tw-text-lg tw-text-gray-500">Earn commissions by referring students to Design Career Metrics</p>
                                <div className="tw-border-b tw-mx-auto" style={{ width: '100px', height: '2px' }}></div>
                            </div>

                            <div className="tw-bg-white tw-shadow-lg tw-border-0 tw-rounded-lg">
                                <div className="tw-p-6 md:tw-p-8">
                                    <div className="tw-bg-gray-50 tw-border tw-rounded-lg tw-mb-6 tw-p-4">
                                        <p className="tw-mb-0 tw-font-medium">
                                            Join our Affiliates Program and earn competitive commissions for every student you refer.
                                            Help others advance their design careers while growing your income.
                                        </p>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Program Benefits</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <FaPercent className="tw-text-4xl tw-mx-auto tw-mb-3 tw-text-blue-500" />
                                                    <h5 className="tw-font-bold">Competitive Commissions</h5>
                                                    <p className="tw-text-gray-500">
                                                        Earn up to 20% commission on every successful referral
                                                    </p>
                                                </div>
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <FaChartLine className="tw-text-4xl tw-mx-auto tw-mb-3 tw-text-green-500" />
                                                    <h5 className="tw-font-bold">Real-time Tracking</h5>
                                                    <p className="tw-text-gray-500">
                                                        Monitor your referrals and earnings with our dashboard
                                                    </p>
                                                </div>
                                                <div className="tw-text-center tw-p-4 tw-border tw-rounded-lg tw-h-full">
                                                    <FaGift className="tw-text-4xl tw-mx-auto tw-mb-3 tw-text-purple-500" />
                                                    <h5 className="tw-font-bold">Performance Bonuses</h5>
                                                    <p className="tw-text-gray-500">
                                                        Additional bonuses for top-performing affiliates
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">Commission Structure</h4>
                                            <div className="tw-overflow-x-auto">
                                                <table className="tw-w-full tw-border tw-border-collapse">
                                                    <thead className="tw-bg-gray-50">
                                                        <tr>
                                                            <th className="tw-border tw-px-4 tw-py-2">Program Tier</th>
                                                            <th className="tw-border tw-px-4 tw-py-2">Commission Rate</th>
                                                            <th className="tw-border tw-px-4 tw-py-2">Requirements</th>
                                                            <th className="tw-border tw-px-4 tw-py-2">Payout Frequency</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className="tw-border tw-px-4 tw-py-2">Starter</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">10%</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">1-10 referrals/month</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">Monthly</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tw-border tw-px-4 tw-py-2">Professional</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">15%</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">11-25 referrals/month</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">Bi-weekly</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="tw-border tw-px-4 tw-py-2">Elite</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">20%</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">26+ referrals/month</td>
                                                            <td className="tw-border tw-px-4 tw-py-2">Weekly</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-8">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">How It Works</h4>
                                            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-4 tw-gap-4">
                                                <div className="tw-text-center">
                                                    <div className="tw-bg-blue-500 tw-text-white tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="tw-font-bold">1</span>
                                                    </div>
                                                    <h6>Sign Up</h6>
                                                    <p className="tw-text-sm tw-text-gray-500">
                                                        Register for our affiliates program
                                                    </p>
                                                </div>
                                                <div className="tw-text-center">
                                                    <div className="tw-bg-green-500 tw-text-white tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="tw-font-bold">2</span>
                                                    </div>
                                                    <h6>Get Links</h6>
                                                    <p className="tw-text-sm tw-text-gray-500">
                                                        Access your unique referral links
                                                    </p>
                                                </div>
                                                <div className="tw-text-center">
                                                    <div className="tw-bg-yellow-500 tw-text-white tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="tw-font-bold">3</span>
                                                    </div>
                                                    <h6>Share & Promote</h6>
                                                    <p className="tw-text-sm tw-text-gray-500">
                                                        Share your links with your audience
                                                    </p>
                                                </div>
                                                <div className="tw-text-center">
                                                    <div className="tw-bg-blue-400 tw-text-white tw-rounded-full tw-inline-flex tw-items-center tw-justify-center tw-mb-3" style={{ width: '60px', height: '60px' }}>
                                                        <span className="tw-font-bold">4</span>
                                                    </div>
                                                    <h6>Earn Commissions</h6>
                                                    <p className="tw-text-sm tw-text-gray-500">
                                                        Get paid for every successful referral
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="tw-mb-4">
                                        <div className="tw-col-span-12">
                                            <h4 className="tw-font-bold tw-mb-4 tw-border-b tw-pb-2">FAQ</h4>
                                            <div className="tw-border tw-rounded-lg tw-overflow-hidden" id="affiliatesAccordion">
                                                <div className="tw-border-b">
                                                    <div className="tw-p-4">
                                                        <h5 className="tw-mb-0">
                                                            <button className="tw-w-full tw-text-left tw-bg-transparent tw-border-0 tw-text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#affiliateOne" aria-expanded="true"
                                                                aria-controls="affiliateOne">
                                                                How much can I earn as an affiliate?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="affiliateOne" className="tw-p-4 tw-bg-gray-50" data-bs-parent="#affiliatesAccordion">
                                                        <div className="">
                                                            Our top affiliates earn over 5,000 Rs per month. Earnings depend on your audience size,
                                                            engagement, and the number of successful referrals. With our tiered commission structure,
                                                            the more you refer, the higher your commission rate.
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tw-border-b">
                                                    <div className="tw-p-4">
                                                        <h5 className="tw-mb-0">
                                                            <button className="tw-w-full tw-text-left tw-bg-transparent tw-border-0 tw-text-decoration-none"
                                                                type="button" data-bs-toggle="collapse"
                                                                data-bs-target="#affiliateTwo" aria-expanded="false"
                                                                aria-controls="affiliateTwo">
                                                                When do I get paid?
                                                            </button>
                                                        </h5>
                                                    </div>
                                                    <div id="affiliateTwo" className="tw-p-4 tw-bg-gray-50" data-bs-parent="#affiliatesAccordion">
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

                                    <div className="tw-text-center tw-p-6 tw-bg-blue-500 tw-text-white tw-rounded-lg">
                                        <h4 className="tw-font-bold tw-mb-3 tw-text-white">Ready to Start Earning?</h4>
                                        <p className="tw-mb-3">
                                            Join thousands of successful affiliates promoting Design Career Metrics
                                        </p>
                                        <Link to={"/contact-us"} className="tw-border tw-border-white tw-text-white tw-font-bold tw-px-4 tw-py-2 tw-rounded hover:tw-bg-white hover:tw-text-blue-500">
                                            <FaEnvelope className="tw-mr-2 tw-inline" />
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

/* ================= Reusable Components ================= */

const SectionTitle = ({ title }) => (
    <h3 className="tw-text-lg sm:tw-text-xl md:tw-text-2xl tw-font-semibold tw-border-b tw-pb-2 tw-mb-6">
        {title}
    </h3>
);

const InfoCard = ({ icon, title, text }) => (
    <div className="tw-bg-gray-50 tw-border tw-rounded-2xl tw-p-6 tw-text-center hover:tw-shadow-lg tw-transition">
        <div className="tw-flex tw-justify-center tw-mb-4">{icon}</div>
        <h6 className="tw-font-semibold tw-text-base tw-mb-2">{title}</h6>
        <p className="tw-text-xs sm:tw-text-sm tw-text-gray-500">{text}</p>
    </div>
);

const UseItem = ({ icon, title }) => (
    <div className="tw-flex tw-items-start tw-gap-3">
        <div className="tw-text-blue-600">{icon}</div>
        <p className="tw-text-sm sm:tw-text-base tw-text-gray-700">
            <span className="tw-font-medium">{title}</span>
        </p>
    </div>
);

const TextBlock = ({ title, text }) => (
    <div className="tw-mb-8">
        <h4 className="tw-text-lg sm:tw-text-xl tw-font-semibold tw-mb-3">
            {title}
        </h4>
        <div className="tw-bg-gray-50 tw-border tw-rounded-xl tw-p-4 tw-flex tw-gap-3">
            <FaLongArrowAltRight size={18} />
            <p className="tw-text-sm sm:tw-text-base tw-text-gray-600">{text}</p>
        </div>
    </div>
);