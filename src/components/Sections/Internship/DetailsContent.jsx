// DetailsContent.jsx
import { FaEnvelope, FaPhone, FaUsers } from "react-icons/fa";
import { HiDesktopComputer, HiPlus } from "react-icons/hi";
import { MdOutlineWork } from "react-icons/md";
import { GiAchievement } from "react-icons/gi";
import { useGetAllInternshipsDomainsQuery } from "../../../Services/paymentServices/internshipsServices";

const DetailsContent = ({ showPaymentForm, setShowPaymentForm }) => {
  const { data, isLoading, isError } = useGetAllInternshipsDomainsQuery({
    isActive: true, // public / student view
  });

  const domains = data?.data || [];
  console.log("domains in details content ", domains)
  const formatDurations = (durations = []) =>
    durations.map(d => d.label).join(" / ");

  const formatFees = (durations = []) =>
    durations.map(d => `₹${d.fee}`).join(" / ");

  // const domains = [
  //   {
  //     name: "Java Full Stack Development",
  //     focus: "Core Java, Spring Boot, React, MySQL",
  //     duration: "5 / 15 Days",
  //     level: "Basic / Intermediate",
  //     fee: "₹1000 / ₹2000"
  //   },
  //   {
  //     name: "Python Full Stack + Generative AI",
  //     focus: "Django, FastAPI, React, AI Integrations",
  //     duration: "5 / 15 Days",
  //     level: "Basic / Intermediate",
  //     fee: "₹1000 / ₹2000"
  //   },
  //   {
  //     name: ".NET Full Stack + Cloud AI",
  //     focus: "ASP.NET Core, Angular, Azure Integrations",
  //     duration: "5 / 15 Days",
  //     level: "Basic / Intermediate",
  //     fee: "₹1000 / ₹2000"
  //   },
  //   {
  //     name: "Flutter Mobile App Development",
  //     focus: "Dart, Firebase, APIs, AI Chatbot Integration",
  //     duration: "5 / 15 Days",
  //     level: "Basic / Intermediate",
  //     fee: "₹1000 / ₹2000"
  //   },
  //   {
  //     name: "Software Testing & Automation",
  //     focus: "Manual, Selenium, PyTest, CI/CD",
  //     duration: "5 / 15 Days",
  //     level: "Basic / Intermediate",
  //     fee: "₹1000 / ₹2000"
  //   },
  //   {
  //     name: "Data Science & AI",
  //     focus: "Python, ML, Deep Learning Basics",
  //     duration: "5 / 15 Days",
  //     level: "Basic / Intermediate",
  //     fee: "₹1000 / ₹2000"
  //   }
  // ];

  const learningOutcomes = [
    "Build and deploy real-time mini projects",
    "Strengthen core technical and problem-solving skills",
    "Gain hands-on exposure to modern tools and frameworks",
    "Understand how AI integrates into real-world solutions",
    "Receive Internship Certificates recognized by industry partners",
    "Participate in career guidance and placement sessions"
  ];

  if (isLoading) {
    return (
      <div className="tw-text-center tw-p-6 tw-text-gray-600">
        Loading internship domains...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="tw-text-center tw-p-6 tw-text-red-500">
        Failed to load internship domains.
      </div>
    );
  }


  return (
    <div className="tw-p-4 lg:tw-p-6 tw-max-w-3xl lg:tw-ms-7">
      {/* Header - Minimalist */}
      <div className="tw-text-center tw-mb-6">
        <div className="tw-flex tw-flex-col tw-items-center">
          <div className="tw-mb-3">
            <img
              src="/img/dcmlogo3.jpg"
              alt="DCM Logo"
              className="tw-w-32 tw-h-auto tw-mx-auto"
            />
          </div>
          <h1 className="tw-text-xl md:tw-text-2xl tw-font-semibold tw-text-blue-900">
            Design Career Metrics
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="tw-space-y-6">
        {/* Program Title */}
        <div className="tw-text-center">
          <h2 className="tw-text-lg md:tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-3">
            Industrial Internship Workshops For B.Tech & Degree Students
          </h2>
          <div className="tw-w-24 md:tw-w-32 tw-h-0.5 tw-bg-gradient-to-r tw-from-pink-500 tw-to-blue-700 tw-mx-auto tw-rounded-full"></div>
        </div>

        <p className="tw-text-sm md:tw-text-base tw-text-gray-600 tw-text-center tw-leading-relaxed">
          Learn from industry professionals through On-Campus or Online Internship Programs — conducted by Design Career Metrics Pvt Ltd in collaboration with Levitica Technologies Pvt Ltd, Hyderabad.
        </p>

        {/* Internship Domains */}
        <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
          <h4 className="tw-font-semibold tw-text-base md:tw-text-lg tw-text-gray-900 tw-mb-3 tw-flex tw-items-center">
            <HiDesktopComputer className="tw-mr-2 tw-text-blue-600" /> Internship Domains Offered
          </h4>
          <p className="tw-text-sm tw-text-gray-600 tw-mb-4">
            Each college can choose one or more domains based on student interest:
          </p>

          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-3">
            {domains.map((domain) => (
              <div
                key={domain._id}
                className="tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg tw-p-3 hover:tw-shadow-sm tw-transition-shadow"
              >
                <h4 className="tw-font-semibold tw-text-gray-900 tw-mb-3 tw-text-md">
                  {domain.name}
                </h4>

                <div className="tw-space-y-2.5">
                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-600 tw-text-sm">Focus:</span>
                    <span className="tw-text-gray-900 tw-text-sm tw-font-medium tw-text-right">
                      {domain.focus}
                    </span>
                  </div>

                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-600 tw-text-sm">Duration:</span>
                    <span className="tw-text-gray-900 tw-text-sm tw-font-medium">
                      {formatDurations(domain.durations)}
                    </span>
                  </div>

                  <div className="tw-flex tw-justify-between">
                    <span className="tw-text-gray-600 tw-text-sm">Level:</span>
                    <span className="tw-text-gray-900 tw-text-sm tw-font-medium">
                      {domain.level}
                    </span>
                  </div>

                  <div className="tw-flex tw-justify-between tw-mt-1.5 tw-pt-1.5 tw-border-t">
                    <span className="tw-text-gray-600 tw-text-sm tw-font-semibold">
                      Fee:
                    </span>
                    <span className="tw-text-green-600 tw-text-sm tw-font-bold">
                      {formatFees(domain.durations)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>



          <p className="tw-text-xs md:tw-text-sm tw-text-gray-500 tw-mt-4 tw-text-center tw-font-medium">
            Workshops can be organized On-Campus or conducted Online, depending on college convenience.
          </p>
        </div>

        {/* About the Internship */}
        <div className="tw-p-4">
          <h3 className="tw-font-semibold tw-text-base md:tw-text-lg tw-text-gray-900 tw-mb-3 tw-flex tw-items-center">
            <MdOutlineWork className="tw-mr-2 tw-text-blue-600" /> About the Internship Workshops
          </h3>
          <div className="tw-space-y-2 tw-text-gray-700 tw-text-sm">
            <p className="tw-flex tw-items-start">
              <span className="tw-text-blue-500 tw-mr-2 tw-mt-0.5">•</span>
              Our Internship-Based Workshops are designed to help B.Tech and Degree students gain hands-on exposure to the latest industry technologies through structured short-term training.
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-blue-500 tw-mr-2 tw-mt-0.5">•</span>
              These workshops are conducted either directly on your campus or through online live sessions, based on your college's preference.
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-blue-500 tw-mr-2 tw-mt-0.5">•</span>
              Every participant receives an Internship Certificate jointly issued by Levitica Technologies Pvt Ltd and Design Career Metrics Pvt Ltd upon successful completion.
            </p>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="tw-p-4 tw-bg-blue-50 tw-rounded-lg">
          <h3 className="tw-font-semibold tw-text-base md:tw-text-lg tw-text-gray-900 tw-mb-3 tw-flex tw-items-center">
            <GiAchievement className="tw-mr-2 tw-text-blue-600" /> What You'll Learn
          </h3>
          <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-2">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="tw-flex tw-items-start">
                <div className="tw-flex-shrink-0 tw-w-1.5 tw-h-1.5 tw-bg-blue-500 tw-rounded-full tw-mt-1 tw-mr-2"></div>
                <span className="tw-text-gray-700 tw-text-sm">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Organizer Details */}
        <div className="tw-p-4 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg">
          <h3 className="tw-font-semibold tw-text-base md:tw-text-lg tw-text-gray-900 tw-mb-3">
            <FaUsers className="tw-inline tw-mr-2 tw-text-blue-600" /> Organized By
          </h3>
          <div className="tw-flex tw-flex-col md:tw-flex-row tw-items-center md:tw-items-start tw-space-y-3 md:tw-space-y-0 md:tw-space-x-4">
            <div className="tw-w-24">
              <img
                src="/img/dcmlogo3.jpg"
                alt="dcm logo"
                className="tw-w-full tw-h-auto"
              />
            </div>
            <div className="tw-flex-1">
              <p className="tw-font-semibold tw-text-gray-900">Design Career Metrics Pvt Ltd</p>
              <p className="tw-text-xs tw-text-gray-600">Campus & Online Training Partner</p>
              <p className="tw-text-xs tw-text-gray-700 tw-mt-0.5">
                in collaboration with Levitica Technologies Pvt Ltd, Hyderabad
              </p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="tw-p-4 tw-bg-gray-50 tw-rounded-lg">
          <h3 className="tw-font-semibold tw-text-base tw-text-gray-900 tw-mb-3">
            Contact Us
          </h3>
          <div className="tw-w-12 tw-h-0.5 tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-mb-3 tw-rounded-full"></div>
          <div className="tw-space-y-2">
            <div className="tw-flex tw-items-center">
              <FaEnvelope className="tw-text-gray-500 tw-mr-2 tw-text-sm" />
              <a href="mailto:hr@designcareermetrics.com" className="tw-text-gray-700 hover:tw-text-blue-600 tw-text-sm">
                hr@designcareermetrics.com
              </a>
            </div>
            <div className="tw-flex tw-items-center">
              <FaPhone className="tw-text-gray-500 tw-mr-2 tw-text-sm" />
              <a href="tel:+917337572543" className="tw-text-gray-700 hover:tw-text-blue-600 tw-text-sm">
                +91 7337572543
              </a>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="tw-p-4 tw-bg-white tw-border tw-border-gray-200 tw-rounded-lg">
          <h3 className="tw-font-semibold tw-text-base tw-text-gray-900 tw-mb-3">
            Terms & Conditions
          </h3>
          <div className="tw-space-y-1.5 tw-text-gray-600 tw-text-sm">
            <p className="tw-flex tw-items-start">
              <span className="tw-text-red-400 tw-mr-2 tw-mt-0.5">•</span>
              You agree to share information entered on this page with Design Career Metrics and Razorpay
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-red-400 tw-mr-2 tw-mt-0.5">•</span>
              Fees once paid are non-refundable
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-red-400 tw-mr-2 tw-mt-0.5">•</span>
              Make sure to enter correct College Name, Code, Roll Number and other details
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-red-400 tw-mr-2 tw-mt-0.5">•</span>
              Certificate will be provided upon successful completion by{" "}
              <a href="https://leviticatechnologies.com" target="_blank" rel="noopener noreferrer"
                className="tw-text-blue-600 hover:tw-text-blue-800">
                Levitica Technologies Pvt Ltd
              </a>
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-red-400 tw-mr-2 tw-mt-0.5">•</span>
              80% attendance is mandatory for certification
            </p>
            <p className="tw-flex tw-items-start">
              <span className="tw-text-red-400 tw-mr-2 tw-mt-0.5">•</span>
              All payments are secured with 256-bit SSL encryption
            </p>
          </div>

          {/* Mobile Payment Button - Visible only on mobile */}
          <div className="lg:tw-hidden tw-mt-4">
            <button
              onClick={() => setShowPaymentForm(true)}
              className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-blue-900 tw-text-white tw-font-medium tw-py-2.5 tw-px-4 tw-rounded-lg tw-w-full tw-flex tw-items-center tw-justify-center hover:tw-from-blue-700 hover:tw-to-purple-700 tw-transition-all tw-text-sm"
            >
              <span>Proceed to Payment</span>
              <HiPlus className="tw-ml-2" size={16} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="tw-border-t tw-border-gray-200 tw-pt-4 tw-text-center">
          <div className="tw-flex tw-justify-center tw-items-center">
            <div className="tw-w-20">
              <img
                src="/img/dcmlogo3.jpg"
                alt="dcm logo"
                className="tw-w-full tw-h-auto"
              />
            </div>
          </div>
          <p className="tw-text-xs tw-text-gray-500 tw-mt-2">
            Powered by DCM • PCI DSS Compliant • 256-bit Encryption
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsContent;