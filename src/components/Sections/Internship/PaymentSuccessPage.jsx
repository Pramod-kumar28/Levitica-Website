import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyInternshipPaymentMutation } from "../../../Services/paymentServices/internshipsServices";
import jsPDF from "jspdf";

import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaDownload,
  FaHome,
  FaClock,
  FaUser,
  FaEnvelope,
  FaIdCard,
  FaRupeeSign,
  FaReceipt
} from "react-icons/fa";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [verifyPayment] = useVerifyInternshipPaymentMutation();

  const [paymentData, setPaymentData] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [isValidAccess, setIsValidAccess] = useState(true);

  /* ---------------- VERIFY PAYMENT ---------------- */

  useEffect(() => {

    const verify = async () => {

      const params = new URLSearchParams(location.search);

      const orderId = params.get("orderId");
      const paymentId = params.get("paymentId");
      const signature = params.get("signature");
      if (!orderId || !paymentId) {
        setIsValidAccess(false);
        setTimeout(() => navigate("/"), 2000);
        return;
      }

      try {

        const res = await verifyPayment({
          razorpay_order_id: orderId,
          razorpay_payment_id: paymentId,
          razorpay_signature: signature
        }).unwrap();

        if (!res.success) throw new Error("Verification failed");

        setPaymentData({
          paymentId: res.paymentId,
          receipt: res.receipt,
          student: {
            name: res.student.name,
            email: res.student.email,
            rollNumber: res.student.rollNumber
          },
          program: res.student.program,
          domain: res.student.domain,
          amount: res.student.amount
        });

      } catch (error) {

        console.error("Payment verification failed", error);
        setIsValidAccess(false);
        setTimeout(() => navigate("/"), 8000);

      }

    };

    verify();

  }, [location.search, navigate, verifyPayment]);

  /* ---------------- COUNTDOWN ---------------- */

  useEffect(() => {
    if (!isValidAccess) return;

    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          navigate("/");
          return 0;
        }
        return c - 1;
      });
    }, 6000);

    return () => clearInterval(timer);
  }, [navigate, isValidAccess]);
  console.log(paymentData)

  /* ---------------- PDF DOWNLOAD ---------------- */
  const handleDownloadReceipt = () => {

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    /* -------- HEADER -------- */

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Design Career Metrics", centerX, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Internship Payment Receipt", centerX, 28, { align: "center" });

    doc.setDrawColor(200);
    doc.line(20, 32, pageWidth - 20, 32);

    /* -------- RECEIPT INFO -------- */

    doc.setFontSize(11);

    doc.text(`Payment ID:`, 20, 45);
    doc.text(`${paymentData.paymentId}`, 60, 45);

    doc.text(`Receipt ID:`, 20, 52);
    doc.text(`${paymentData.receipt}`, 60, 52);

    doc.text(`Date:`, 20, 59);
    doc.text(`${new Date().toLocaleDateString()}`, 60, 59);

    /* -------- STUDENT DETAILS -------- */

    doc.setFont("helvetica", "bold");
    doc.text("Student Details", 20, 75);

    doc.setFont("helvetica", "normal");

    doc.text("Name:", 20, 85);
    doc.text(paymentData.student.name, 60, 85);

    doc.text("Email:", 20, 92);
    doc.text(paymentData.student.email, 60, 92);

    doc.text("Roll Number:", 20, 99);
    doc.text(paymentData.student.rollNumber, 60, 99);

    /* -------- PROGRAM DETAILS -------- */

    doc.setFont("helvetica", "bold");
    doc.text("Program Details", 20, 115);

    doc.setFont("helvetica", "normal");

    doc.text("Domain:", 20, 125);
    doc.text(paymentData.domain || "N/A", 60, 125);

    doc.text("Program Duration:", 20, 132);
    doc.text(`${paymentData.program} Days`, 60, 132);

    /* -------- PAYMENT DETAILS -------- */

    doc.setFont("helvetica", "bold");
    doc.text("Payment Details", 20, 148);

    doc.setFont("helvetica", "normal");

    doc.text("Amount Paid:", 20, 158);
    doc.text(`${paymentData.amount} rs`, 60, 158);

    doc.text("Status:", 20, 165);
    doc.text("PAID", 60, 165);

    doc.text("Gateway:", 20, 172);
    doc.text("Razorpay", 60, 172);

    /* -------- HIGHLIGHT AMOUNT -------- */

    doc.setDrawColor(0);
    doc.setFillColor(240, 248, 255);

    doc.rect(20, 185, pageWidth - 40, 15, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);

    doc.text(
      `Total Paid:  ${paymentData.amount} rs`,
      centerX,
      195,
      { align: "center" }
    );

    /* -------- FOOTER -------- */

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");

    doc.text(
      "Thank you for registering with Design Career Metrics",
      centerX,
      220,
      { align: "center" }
    );

    doc.text(
      "For support contact: hr@designcareermetrics.com",
      centerX,
      227,
      { align: "center" }
    );

    doc.save(`DCM-Receipt-${paymentData.paymentId}.pdf`);
  };
  /* ---------------- INVALID ACCESS ---------------- */

  if (!isValidAccess) {
    return (
      <div className="tw-min-h-screen tw-flex tw-items-center tw-justify-center tw-bg-gray-100">
        <div className="tw-bg-white tw-p-8 tw-rounded-xl tw-shadow-lg tw-text-center">
          <FaExclamationTriangle className="tw-text-red-500 tw-text-5xl tw-mx-auto tw-mb-4" />
          <h2 className="tw-text-xl tw-font-bold">Access Denied</h2>
          <p className="tw-text-gray-600 tw-mt-2">
            This page is only accessible after successful payment.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- LOADING ---------------- */

  if (!paymentData) {
    return (
      <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center">
        <div className="tw-w-14 tw-h-14 tw-border-4 tw-border-blue-200 tw-border-t-blue-600 tw-rounded-full tw-animate-spin"></div>
        <p className="tw-mt-4">Verifying payment...</p>
      </div>
    );
  }

  /* ---------------- SUCCESS UI ---------------- */

  return (
    <div className="tw-min-h-screen tw-bg-gray-50 tw-flex tw-items-center tw-justify-center tw-p-4">

      <div className="tw-bg-white tw-shadow-xl tw-rounded-xl tw-max-w-lg tw-w-full tw-p-8 tw-text-center">

        <FaCheckCircle className="tw-text-green-500 tw-text-6xl tw-mx-auto tw-mb-4" />

        <h1 className="tw-text-2xl tw-font-bold tw-mb-2">
          Payment Successful 🎉
        </h1>

        <p className="tw-text-gray-600 tw-mb-6">
          Your internship registration is confirmed.
        </p>

        {/* Payment Details */}

        <div className="tw-text-left tw-space-y-3 tw-mb-6">

          <Detail icon={<FaUser />} label="Name" value={paymentData.student.name} />
          <Detail icon={<FaEnvelope />} label="Email" value={paymentData.student.email} />
          <Detail icon={<FaIdCard />} label="Roll Number" value={paymentData.student.rollNumber} />
          <Detail icon={<FaReceipt />} label="Payment ID" value={paymentData.paymentId} />
          <Detail icon={<FaRupeeSign />} label="Amount Paid" value={`₹${paymentData.amount}`} />
          <Detail icon={<FaClock />} label="Program Duration" value={`${paymentData.program} Days`} />

        </div>

        {/* Buttons */}

        <div className="tw-flex tw-flex-col sm:tw-flex-row tw-gap-4 tw-justify-center">

          <button
            onClick={handleDownloadReceipt}
            className="tw-bg-green-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-gap-2 hover:tw-bg-green-700"
          >
            <FaDownload />
            Download Receipt
          </button>

          <button
            onClick={() => navigate("/internships")}
            className="tw-bg-blue-600 tw-text-white tw-px-6 tw-py-3 tw-rounded-lg tw-flex tw-items-center tw-justify-center tw-gap-2 hover:tw-bg-blue-700"
          >
            <FaHome />
            Back to Internships
          </button>

        </div>

        {/* Countdown */}

        <p className="tw-text-sm tw-text-gray-500 tw-mt-6">
          Redirecting to homepage in {countdown}s
        </p>

      </div>

    </div>
  );
};

/* ---------------- DETAIL ROW ---------------- */

const Detail = ({ icon, label, value }) => (
  <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-py-2">
    <div className="tw-flex tw-items-center tw-gap-2 tw-text-gray-600">
      {icon}
      {label}
    </div>
    <div className="tw-font-semibold">{value}</div>
  </div>
);

export default PaymentSuccess;