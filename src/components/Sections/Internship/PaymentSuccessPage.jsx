import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaUserGraduate,
  FaUniversity,
  FaLaptopCode,
  FaCalendarAlt,
  FaDownload,
  FaHome,
  FaClock,
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaBook,
  FaCalendarDay,
  FaRupeeSign,
  FaReceipt,
  FaShieldAlt
} from "react-icons/fa";
import { HiAcademicCap, HiDesktopComputer } from "react-icons/hi";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentData, setPaymentData] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [isValidAccess, setIsValidAccess] = useState(true);

  /* ---------------- VALIDATION ---------------- */
  useEffect(() => {
    const data = location.state?.paymentData;
    const stored = JSON.parse(localStorage.getItem("lastPayment") || "null");

    if (data) {
      setPaymentData(data);
      localStorage.setItem(
        "lastPayment",
        JSON.stringify({ ...data, accessTime: Date.now() })
      );
    } else if (stored && Date.now() - stored.accessTime < 30 * 60 * 1000) {
      setPaymentData(stored);
    } else {
      setIsValidAccess(false);
      setTimeout(() => navigate("/"), 2000);
    }
  }, [location, navigate]);

  /* ---------------- COUNTDOWN ---------------- */
  useEffect(() => {
    if (!isValidAccess) return;

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearPaymentData();
          navigate("/");
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, isValidAccess]);

  const clearPaymentData = () => {
    localStorage.removeItem("lastPayment");
    setPaymentData(null);
  };

  /* ---------------- HELPERS ---------------- */
  const getDomainName = (id) => ({
    "java-fullstack": "Java Full Stack Development",
    "python-ai": "Python Full Stack + Generative AI",
    "dotnet-cloud": ".NET Full Stack + Cloud AI",
    "flutter-mobile": "Flutter Mobile App Development",
    "software-testing": "Software Testing & Automation",
    "data-science-ai": "Data Science & AI"
  }[id] || id);

  const getProgramName = (id) =>
    id === "5days" ? "5 Days Program" : "15 Days Program";

  /* ---------------- RECEIPT ---------------- */
  const handleDownloadReceipt = () => {
    const text = `
PAYMENT RECEIPT - Design Career Metrics
========================================
Payment ID: ${paymentData.paymentId}
Order ID: ${paymentData.orderId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

STUDENT INFORMATION:
-------------------
Name: ${paymentData.student.name}
Email: ${paymentData.student.email}
Phone: ${paymentData.student.phone}
Roll Number: ${paymentData.student.rollNumber}

COLLEGE DETAILS:
----------------
College: ${paymentData.collegeName}
Department: ${paymentData.department}
Semester: ${paymentData.semester}

PROGRAM DETAILS:
----------------
Domain: ${getDomainName(paymentData.domain)}
Program: ${getProgramName(paymentData.program)}
Duration: ${paymentData.program === "5days" ? "5 Days" : "15 Days"}

PAYMENT DETAILS:
----------------
Amount: ₹${paymentData.amount}.00
Status: PAID ✅
Payment Method: Razorpay

========================================
Thank you for your payment!
Design Career Metrics Pvt Ltd
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `DCM-Receipt-${paymentData.paymentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------- UNAUTHORIZED ---------------- */
  if (!isValidAccess) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-blue-50 tw-to-emerald-50">
        <div className="tw-bg-white tw-rounded-2xl tw-shadow-2xl tw-p-8 tw-text-center tw-max-w-md tw-mx-4">
          <FaExclamationTriangle className="tw-text-red-500 tw-text-6xl tw-mx-auto tw-mb-4" />
          <h2 className="tw-text-2xl tw-font-bold tw-text-gray-900 tw-mb-2">Access Denied</h2>
          <p className="tw-text-gray-600 tw-mb-6">
            This page is only accessible after successful payment verification.
          </p>
          <button
            onClick={() => navigate("/")}
            className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-font-semibold tw-px-8 tw-py-3 tw-rounded-lg hover:tw-shadow-lg tw-transition-all"
          >
            Return to Homepage
          </button>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-gradient-to-br tw-from-blue-50 tw-to-emerald-50">
        <div className="tw-w-16 tw-h-16 tw-border-4 tw-border-blue-200 tw-border-t-blue-600 tw-rounded-full tw-animate-spin tw-mb-4"></div>
        <p className="tw-text-gray-600 tw-text-lg">Loading payment details...</p>
      </div>
    );
  }

  return (
    <div className="tw-min-h-screen tw-bg-gradient-to-br tw-from-blue-50 tw-via-emerald-50 tw-to-purple-50 tw-p-4 md:tw-p-6">
      <div className="tw-max-w-6xl tw-mx-auto">
        
        {/* Success Header */}
        <div className="tw-bg-gradient-to-r tw-from-emerald-600 tw-to-green-500 tw-text-white tw-rounded-t-2xl tw-p-8 md:tw-p-12 tw-text-center tw-shadow-lg">
          <div className="tw-inline-flex tw-items-center tw-justify-center tw-w-24 tw-h-24 tw-bg-white tw-rounded-full tw-mb-6 tw-shadow-xl">
            <FaCheckCircle className="tw-text-emerald-600 tw-text-5xl" />
          </div>
          <h1 className="tw-text-3xl md:tw-text-4xl tw-font-bold tw-mb-3">
            Payment Successful! 🎉
          </h1>
          <p className="tw-text-emerald-100 tw-text-lg">
            Your internship registration has been confirmed
          </p>
        </div>

        {/* Main Content */}
        <div className="tw-bg-white tw-rounded-b-2xl tw-shadow-xl tw-overflow-hidden tw-mt-1">
          <div className="tw-p-6 md:tw-p-8">
            
            {/* Two Column Layout for Desktop */}
            <div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-6 md:tw-gap-8">
              
              {/* Student & College Information */}
              <div className="tw-space-y-6">
                
                {/* Student Card */}
                <div className="tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-p-6 tw-rounded-xl tw-border tw-border-blue-100">
                  <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-4 tw-flex tw-items-center">
                    <FaUserGraduate className="tw-mr-3 tw-text-blue-600" />
                    Student Information
                  </h3>
                  <div className="tw-space-y-4">
                    <DetailRow 
                      icon={<FaUser className="tw-text-blue-500" />}
                      label="Full Name"
                      value={paymentData.student.name}
                    />
                    <DetailRow 
                      icon={<FaEnvelope className="tw-text-blue-500" />}
                      label="Email Address"
                      value={paymentData.student.email}
                    />
                    <DetailRow 
                      icon={<FaIdCard className="tw-text-blue-500" />}
                      label="Roll Number"
                      value={paymentData.student.rollNumber}
                    />
                    <DetailRow 
                      icon={<FaCalendarDay className="tw-text-blue-500" />}
                      label="Phone Number"
                      value={paymentData.student.phone}
                    />
                  </div>
                </div>

                {/* College Card */}
                <div className="tw-bg-gradient-to-r tw-from-purple-50 tw-to-pink-50 tw-p-6 tw-rounded-xl tw-border tw-border-purple-100">
                  <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-4 tw-flex tw-items-center">
                    <FaUniversity className="tw-mr-3 tw-text-purple-600" />
                    College Details
                  </h3>
                  <div className="tw-space-y-4">
                    <DetailRow 
                      icon={<FaUniversity className="tw-text-purple-500" />}
                      label="College Name"
                      value={paymentData.collegeName}
                    />
                    <DetailRow 
                      icon={<HiAcademicCap className="tw-text-purple-500" />}
                      label="Department"
                      value={paymentData.department}
                    />
                    <DetailRow 
                      icon={<FaBook className="tw-text-purple-500" />}
                      label="Semester"
                      value={paymentData.semester}
                    />
                  </div>
                </div>
              </div>

              {/* Program & Payment Information */}
              <div className="tw-space-y-6">
                
                {/* Program Card */}
                <div className="tw-bg-gradient-to-r tw-from-emerald-50 tw-to-green-50 tw-p-6 tw-rounded-xl tw-border tw-border-emerald-100">
                  <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-4 tw-flex tw-items-center">
                    <FaLaptopCode className="tw-mr-3 tw-text-emerald-600" />
                    Program Details
                  </h3>
                  <div className="tw-space-y-4">
                    <DetailRow 
                      icon={<HiDesktopComputer className="tw-text-emerald-500" />}
                      label="Internship Domain"
                      value={getDomainName(paymentData.domain)}
                      highlight
                    />
                    <DetailRow 
                      icon={<FaCalendarAlt className="tw-text-emerald-500" />}
                      label="Program"
                      value={getProgramName(paymentData.program)}
                    />
                    <DetailRow 
                      icon={<FaClock className="tw-text-emerald-500" />}
                      label="Duration"
                      value={paymentData.program === "5days" ? "5 Days" : "15 Days"}
                    />
                  </div>
                </div>

                {/* Payment Summary Card */}
                <div className="tw-bg-gradient-to-r tw-from-amber-50 tw-to-orange-50 tw-p-6 tw-rounded-xl tw-border tw-border-amber-100">
                  <h3 className="tw-text-xl tw-font-bold tw-text-gray-900 tw-mb-4 tw-flex tw-items-center">
                    <FaRupeeSign className="tw-mr-3 tw-text-amber-600" />
                    Payment Summary
                  </h3>
                  
                  <div className="tw-space-y-4">
                    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-amber-200">
                      <div className="tw-flex tw-justify-between tw-items-center">
                        <span className="tw-text-gray-600">Total Amount</span>
                        <div className="tw-text-right">
                          <div className="tw-text-3xl tw-font-bold tw-text-emerald-600">
                            ₹{paymentData.amount}.00
                          </div>
                          <div className="tw-text-sm tw-text-emerald-500 tw-font-medium">
                            PAID SUCCESSFULLY
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200">
                      <DetailRow 
                        icon={<FaReceipt className="tw-text-gray-500" />}
                        label="Payment ID"
                        value={paymentData.paymentId}
                        small
                      />
                      <DetailRow 
                        icon={<FaShieldAlt className="tw-text-gray-500" />}
                        label="Order ID"
                        value={paymentData.orderId}
                        small
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="tw-mt-8 tw-p-6 tw-bg-gradient-to-r tw-from-blue-50 tw-to-indigo-50 tw-rounded-xl tw-border tw-border-blue-100">
              <h3 className="tw-text-lg tw-font-bold tw-text-gray-900 tw-mb-3">What's Next?</h3>
              <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-4">
                <NextStep 
                  number="1"
                  title="Check Email"
                  description="Confirmation email with details will be sent"
                />
                <NextStep 
                  number="2"
                  title="Join WhatsApp"
                  description="You'll receive group link for updates"
                />
                <NextStep 
                  number="3"
                  title="Session Schedule"
                  description="Date & time details will be shared"
                />
                <NextStep 
                  number="4"
                  title="Start Learning"
                  description="Access study materials & resources"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="tw-mt-8 tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">
              <button
                onClick={handleDownloadReceipt}
                className="tw-bg-gradient-to-r tw-from-emerald-600 tw-to-green-500 tw-text-white tw-font-semibold tw-px-8 tw-py-3.5 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-gap-3 hover:tw-shadow-lg tw-transition-all tw-w-full sm:tw-w-auto"
              >
                <FaDownload className="tw-text-lg" />
                Download Payment Receipt
              </button>
              <button
                onClick={() => navigate("/internships")}
                className="tw-bg-gradient-to-r tw-from-blue-600 tw-to-purple-600 tw-text-white tw-font-semibold tw-px-8 tw-py-3.5 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-gap-3 hover:tw-shadow-lg tw-transition-all tw-w-full sm:tw-w-auto"
              >
                <FaHome className="tw-text-lg" />
                Back to Internships
              </button>
            </div>

            {/* Countdown & Note */}
            <div className="tw-mt-8 tw-text-center tw-space-y-2">
              <div className="tw-inline-flex tw-items-center tw-bg-blue-100 tw-text-blue-800 tw-px-4 tw-py-2 tw-rounded-full">
                <FaClock className="tw-mr-2" />
                Redirecting to homepage in <span className="tw-font-bold tw-mx-1">{countdown}</span> seconds
              </div>
              <p className="tw-text-gray-500 tw-text-sm">
                Please save your payment ID for future reference. For any queries, contact: hr@designcareermetrics.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------- DETAIL ROW COMPONENT ---------- */
const DetailRow = ({ icon, label, value, highlight, small }) => (
  <div className="tw-flex tw-items-center tw-justify-between tw-py-3 tw-border-b tw-border-gray-100 last:tw-border-0">
    <div className="tw-flex tw-items-center">
      <span className="tw-mr-3">{icon}</span>
      <span className="tw-text-gray-600">{label}</span>
    </div>
    <span className={`tw-font-semibold ${highlight ? 'tw-text-emerald-600' : 'tw-text-gray-900'} ${small ? 'tw-text-sm' : ''} tw-text-right`}>
      {value}
    </span>
  </div>
);

/* ---------- NEXT STEP COMPONENT ---------- */
const NextStep = ({ number, title, description }) => (
  <div className="tw-bg-white tw-p-4 tw-rounded-lg tw-border tw-border-gray-200 hover:tw-border-blue-300 tw-transition-colors">
    <div className="tw-w-10 tw-h-10 tw-bg-blue-100 tw-text-blue-600 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-font-bold tw-mb-3">
      {number}
    </div>
    <h4 className="tw-font-semibold tw-text-gray-900 tw-mb-1">{title}</h4>
    <p className="tw-text-sm tw-text-gray-600">{description}</p>
  </div>
);

export default PaymentSuccess;