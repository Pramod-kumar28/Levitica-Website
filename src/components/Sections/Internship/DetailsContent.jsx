import { Mail, Phone, Plus } from "lucide-react";

const DetailsContent = ({ showPaymentForm, setShowPaymentForm, workshopData }) => {

    const backendData = {
        company: {
            name: "Design Career Metrics",
            logo: "/img/dcmlogo3.jpg",
            shortName: "DC",
            email: "hr@designcareermetrics.com",
            phone: "+91  7337572543",
        },
        program: {
            title: "Industrial Internship WorkShops For B.Tech & Degree Students",
            subtitle: "Learn from industry professionals through On-Campus or Online Internship Programs — conducted by Design Career Metrics Pvt Ltd in collaboration with Levitica Technologies Pvt Ltd, Hyderabad."
        },
        workshops: workshopData || [
            {
                id: 1,
                title: "5-Day Workshop",
                course: "Data Science & AI",
                days: 5,
                level: "Basic",
                price: 500,
            },
            {
                id: 2,
                title: "15-Day Workshop",
                course: "Data Science & AI",
                days: 15,
                level: "Intermediate",
                price: 1000,
            }
        ],
        learningOutcomes: [
            "Build and deploy real-time mini projects",
            "Strengthen core technical and problem-solving skills",
            "Gain hands-on exposure to modern tools and frameworks",
            "Understand how AI integrates into real-world solutions",
            "Receive Internship Certificates recognized by industry partners",
            "Participate in career guidance and placement sessions"
        ],
        domains: [
            {
                name: "Java Full Stack Development",
                focus: "Core Java, Spring Boot, React, MySQL",
                duration: "5 / 15 Days",
                level: "Basic / Intermediate",
                fee: "₹500 / ₹1000"
            },
            {
                name: "Python Full Stack + Generative AI",
                focus: "Django, FastAPI, React, AI Integrations",
                duration: "5 / 15 Days",
                level: "Basic / Intermediate",
                fee: "₹500 / ₹1000"
            },
            {
                name: ".NET Full Stack + Cloud AI",
                focus: "ASP.NET Core, Angular, Azure Integrations",
                duration: "5 / 15 Days",
                level: "Basic / Intermediate",
                fee: "₹500 / ₹1000"
            },
            {
                name: "Flutter Mobile App Development",
                focus: "Dart, Firebase, APIs, AI Chatbot Integration",
                duration: "5 / 15 Days",
                level: "Basic / Intermediate",
                fee: "₹500 / ₹1000"
            },
            {
                name: "Software Testing & Automation",
                focus: "Manual, Selenium, PyTest, CI/CD",
                duration: "5 / 15 Days",
                level: "Basic / Intermediate",
                fee: "₹500 / ₹1000"
            },
            {
                name: "Data Science & AI",
                focus: "Python, ML, Deep Learning Basics",
                duration: "5 / 15 Days",
                level: "Basic / Intermediate",
                fee: "₹500 / ₹1000"
            }
        ]
    };

    const { company, program, learningOutcomes, domains } = backendData;

    return (
        <div className="p-6 ps-4 lg-w-3/4">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex flex-col items-center">
                    <div className="w-3/4 mb-4">
                        <img
                            src={company.logo}
                            alt="DCM Logo"
                            className="w-1/4"
                        />
                    </div>
                    <h1 className="text-2xl lg-text-3xl font-bold " style={{color:"#2c4c96ff"}}>
                        {company.name}
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
                {/* Program Title */}
                <div className="text-center">
                    <h2 className="text-xl lg-text-2xl font-bold text-gray-900 leading-tight mb-4">
                        {program.title}
                    </h2>
                    <div className="w-3/4 mx-auto h-1 gradient-line mt-2"></div>
                </div>
                
                <p className="text-base  mt-4 lg-text-lg text-gray-600 text-center leading-relaxed">
                    {program.subtitle}
                </p>

                {/* Internship Domains */}
                <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                         Internship Domains Offered
                    </h4>
                    <p className="text-base text-gray-600 mb-4">
                        Each college can choose one or more domains based on student interest:
                    </p>
                    
                    <div className="domains-grid">
                        {domains.map((domain, index) => (
                            <div key={index} className="domain-card ">
                                <h4 className="domain-title">{domain.name}</h4>
                                <div className="domain-details">
                                    <div className="domain-row">
                                        <span className="domain-label">Key Focus:</span>
                                        <span className="domain-value">{domain.focus}</span>
                                    </div>
                                    <div className="domain-row">
                                        <span className="domain-label">Duration:</span>
                                        <span className="domain-value">{domain.duration}</span>
                                    </div>
                                    <div className="domain-row">
                                        <span className="domain-label">Level:</span>
                                        <span className="domain-value">{domain.level}</span>
                                    </div>
                                    <div className="domain-row">
                                        <span className="domain-label">Fee:</span>
                                        <span className="domain-fee">{domain.fee}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-sm text-gray-500 mt-4 text-center font-semibold ">
                        Workshops can be organized On-Campus or conducted Online, depending on college convenience.
                    </p>
                </div>

                {/* About the Internship */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg lg-text-xl text-gray-900 mb-4 flex items-center">
                        🧭 About the Internship Workshops
                    </h3>
                    <div className="text-base text-gray-700 space-y-3 leading-relaxed">
                        <p>Our Internship-Based Workshops are designed to help B.Tech and Degree students gain hands-on exposure to the latest industry technologies through structured short-term training.</p>
                        <p>These workshops are conducted either directly on your campus or through online live sessions, based on your college's preference.</p>
                        <p>Every participant receives an Internship Certificate jointly issued by Levitica Technologies Pvt Ltd and Design Career Metrics Pvt Ltd upon successful completion.</p>
                    </div>
                </div>

                {/* Learning Outcomes */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg lg-text-xl text-gray-900 mb-4 flex items-center">
                        🎯 What You'll Learn
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {learningOutcomes.map((outcome, index) => (
                            <div key={index} className="flex items-center space-x-3">
                                <div className="learning-outcome-dot">
                                    <div className="learning-outcome-dot-inner"></div>
                                </div>
                                <span className=" text-gray-700 leading-relaxed flex-1">
                                    {outcome}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Organizer Details */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg lg-text-xl text-gray-900 mb-4">
                        Organized By
                    </h3>
                    <div className="flex items-center space-x-2">
                        <div className="w-1/4">
                            <img 
                                src="/img/dcmlogo3.jpg" 
                                alt="dcm logo" 
                                className="w-3/4  object-contain "
                            />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-lg text-gray-900">Design Career Metrics Pvt Ltd</p>
                            <p className="text-sm text-gray-600">Campus & Online Training Partner</p>
                            <p className="text-sm text-gray-700">in collaboration with Levitica Technologies Pvt Ltd, Hyderabad</p>
                        </div>
                    </div>
                </div>

                {/* Support Details */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">
                        Contact Us
                    </h3>
                    <div className="w-1/4 h-1 gradient-line mb-3"></div>
                    <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                            <Mail size={20} />
                            <a href={`mailto:${company.email}`} className="text-base text-gray-700 hover-text-blue-500 break-all">
                                {company.email}
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone size={20} />
                            <a href={`tel:${company.phone}`} className="text-base text-gray-700 hover-text-blue-500">
                                {company.phone}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Terms & Conditions */}
                <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">
                        Terms & Conditions
                    </h3>
                    <div className=" text-gray-600 space-y-2 leading-relaxed">
                        <p>● You agree to share information entered on this page with Design Career Metrics and Razorpay</p>
                        <p>● Fees once paid are non-refundable</p>
                        <p>● Make sure that Enter Correct College Name , Code , Roll Number and Other Details</p>
                        <p>● Certificate will be provided upon successful completion by <a href="https://leviticatechnologies.com" target="_blank" className="text-blue-600 hover-text-blue-500">Levitica Technologies Pvt Ltd</a></p>
                        <p>● 80% attendance is mandatory for certification</p>
                        <p>● All payments are secured with 256-bit SSL encryption</p>
                    </div>

                    {/* Mobile Payment Button - Visible only on mobile */}
                    <div className="lg-hidden mt-6">
                        <button
                            onClick={() => setShowPaymentForm(true)}
                            className="btn btn--gradient w-full"
                        >
                            <span>Proceed to Payment</span>
                            <Plus className="ml-2" size={20} />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-6 text-center">
                    <div className="flex flex-col lg-flex-row justify-between items-center w-3/4 mx-auto mt-3 ">
                       <div className="w-1/4">
                         <img
                            src="/img/dcmlogo3.jpg"
                            alt="dcm logo"
                            className="w-3/4"
                        />
                       </div>
                    
                    </div>
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                        Powered by DCM • PCI DSS Compliant • 256-bit Encryption
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DetailsContent;