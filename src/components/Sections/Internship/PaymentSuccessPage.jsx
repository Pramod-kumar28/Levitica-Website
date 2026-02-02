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
  FaClock
} from "react-icons/fa";

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
    "python-ai": "Python Full Stack + AI",
    "dotnet-cloud": ".NET Full Stack + Cloud",
    "flutter-mobile": "Flutter Mobile Development",
    "software-testing": "Software Testing",
    "data-science-ai": "Data Science & AI"
  }[id] || id);

  const getProgramName = (id) =>
    id === "5days" ? "5 Days Program" : "15 Days Program";

  /* ---------------- RECEIPT ---------------- */
  const handleDownloadReceipt = () => {
    const text = `
PAYMENT RECEIPT
------------------------
Payment ID: ${paymentData.paymentId}
Order ID: ${paymentData.orderId}
Name: ${paymentData.student.name}
Email: ${paymentData.student.email}
Program: ${getDomainName(paymentData.domain)}
Amount: ₹${paymentData.amount}
Status: PAID
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${paymentData.paymentId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ---------------- UNAUTHORIZED ---------------- */
  if (!isValidAccess) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-slate-100">
        <div className="tw-bg-white tw-rounded-xl tw-shadow-lg tw-p-8 tw-text-center tw-max-w-md">
          <FaExclamationTriangle className="tw-text-red-500 tw-text-5xl tw-mx-auto" />
          <h2 className="tw-text-xl tw-font-bold tw-mt-4">Access Denied</h2>
          <p className="tw-text-slate-500 tw-mt-2">
            This page is accessible only after successful payment.
          </p>
          <button
            onClick={() => navigate("/")}
            className="tw-mt-6 tw-bg-red-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center">
        <p className="tw-text-slate-500">Loading payment details...</p>
      </div>
    );
  }

  /* ---------------- SUCCESS UI ---------------- */
  return (
    <div className="tw-min-h-screen tw-bg-slate-100 tw-p-6">
      <div className="tw-max-w-6xl tw-mx-auto tw-bg-white tw-rounded-2xl tw-shadow-xl tw-overflow-hidden">

        {/* HEADER */}
        <div className="tw-bg-emerald-600 tw-text-white tw-text-center tw-py-10">
          <FaCheckCircle className="tw-text-6xl tw-mx-auto" />
          <h1 className="tw-text-3xl tw-font-bold tw-mt-4">
            Payment Successful!
          </h1>
          <p className="tw-text-emerald-100">
            Your internship registration is confirmed
          </p>
        </div>

        {/* DETAILS */}
        <div className="tw-p-8 tw-grid md:tw-grid-cols-2 tw-gap-8">

          {/* STUDENT */}
          <div className="tw-border tw-rounded-xl tw-p-6">
            <h3 className="tw-font-bold tw-text-lg tw-flex tw-items-center tw-gap-2">
              <FaUserGraduate /> Student Information
            </h3>
            <Detail label="Name" value={paymentData.student.name} />
            <Detail label="Email" value={paymentData.student.email} />
            <Detail label="Roll No" value={paymentData.student.rollNumber} />

            <h4 className="tw-font-semibold tw-mt-4 tw-flex tw-items-center tw-gap-2">
              <FaUniversity /> College
            </h4>
            <Detail label="College" value={paymentData.collegeName} />
            <Detail label="Department" value={paymentData.department} />
            <Detail label="Semester" value={paymentData.semester} />
          </div>

          {/* PROGRAM */}
          <div className="tw-border tw-rounded-xl tw-p-6">
            <h3 className="tw-font-bold tw-text-lg tw-flex tw-items-center tw-gap-2">
              <FaLaptopCode /> Program Details
            </h3>
            <Detail label="Domain" value={getDomainName(paymentData.domain)} highlight />
            <Detail label="Program" value={getProgramName(paymentData.program)} />
            <Detail label="Duration" value={paymentData.program === "5days" ? "5 Days" : "15 Days"} />

            <div className="tw-mt-4 tw-bg-slate-100 tw-p-4 tw-rounded-lg">
              <span className="tw-text-slate-500">Amount Paid</span>
              <div className="tw-text-2xl tw-font-bold tw-text-emerald-600">
                ₹{paymentData.amount}
              </div>
            </div>

            <h4 className="tw-font-semibold tw-mt-6 tw-flex tw-items-center tw-gap-2">
              <FaCalendarAlt /> Payment Info
            </h4>
            <Detail label="Payment ID" value={paymentData.paymentId} small />
            <Detail label="Order ID" value={paymentData.orderId} small />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4 tw-justify-center tw-p-6">
          <button
            onClick={handleDownloadReceipt}
            className="tw-bg-emerald-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-flex tw-items-center tw-gap-2"
          >
            <FaDownload /> Download Receipt
          </button>
          <button
            onClick={() => navigate("/")}
            className="tw-border tw-border-slate-300 tw-px-6 tw-py-3 tw-rounded-lg tw-flex tw-items-center tw-gap-2"
          >
            <FaHome /> Back Home
          </button>
        </div>

        {/* COUNTDOWN */}
        <div className="tw-text-center tw-text-slate-500 tw-pb-6">
          <FaClock className="tw-inline tw-mr-2" />
          Redirecting in <b>{countdown}</b> seconds
        </div>
      </div>
    </div>
  );
};

/* ---------- SMALL COMPONENT ---------- */
const Detail = ({ label, value, highlight, small }) => (
  <div className="tw-flex tw-justify-between tw-mt-2">
    <span className="tw-text-slate-500">{label}</span>
    <span
      className={`tw-font-medium ${
        highlight ? "tw-text-emerald-600" : ""
      } ${small ? "tw-text-sm" : ""}`}
    >
      {value}
    </span>
  </div>
);

export default PaymentSuccess;
