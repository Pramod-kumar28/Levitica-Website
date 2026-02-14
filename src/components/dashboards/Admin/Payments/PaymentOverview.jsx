import { useState, useMemo } from "react";
import {
  useGetTransactionQuery,
  useGetInternshipTransactionQuery,
} from "../../../../Services/paymentServices/transactionServices";

import PaymentStatsCards from "./PaymentStats";
import PaymentChart from "./PaymentStatsCharts";
import PaymentsTable from "./TransactionTable";

import {
  normalizeCoursePayments,
  normalizeInternshipPayments,
} from "../../../../utils/normalizePaymentData.js";

const PaymentOverview = () => {
  const [activeTab, setActiveTab] = useState("course");
  const [page, setPage] = useState(1);

  // =============================
  // Fetch APIs (Lazy per tab)
  // =============================

  const {
    data: courseData,
    isLoading: courseLoading,
  } = useGetTransactionQuery(
    { page, limit: 20 },
    { skip: activeTab !== "course" }
  );

  const {
    data: internshipData,
    isLoading: internshipLoading,
  } = useGetInternshipTransactionQuery(
    { page, limit: 20 },
    { skip: activeTab !== "internship" }
  );

  const isLoading =
    activeTab === "course" ? courseLoading : internshipLoading;

  // =============================
  // Normalize Data
  // =============================

  const normalizedData = useMemo(() => {
    if (activeTab === "course") {
      return normalizeCoursePayments(
        courseData?.transactions || []
      );
    }
    return normalizeInternshipPayments(
      internshipData?.data || []
    );
  }, [activeTab, courseData, internshipData]);

  // =============================
  // Stats (Corrected)
  // =============================

  const stats = useMemo(() => {
    const total =
      activeTab === "course"
        ? courseData?.totalTransactions || 0
        : internshipData?.pagination?.total || 0;

    const paidRevenue = normalizedData
      .filter((p) => p.status === "paid")
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    const paidCount = normalizedData.filter(
      (p) => p.status === "paid"
    ).length;

    return {
      total,
      totalRevenue: paidRevenue,
      paidCount,
    };
  }, [activeTab, normalizedData, courseData, internshipData]);

  // =============================
  // Pagination Helpers
  // =============================

  const totalPages =
    activeTab === "course"
      ? courseData?.totalPages
      : internshipData?.pagination?.totalPages;

  return (
    <div className="tw-space-y-8 ">

      {/* ================= Header ================= */}
      <div>
        <h1 className="tw-text-2xl tw-font-bold tw-text-gray-900">
          Payment Overview
        </h1>
        <p className="tw-text-gray-500">
          Manage course and internship payments, analyze revenue,
          and monitor transaction status.
        </p>
      </div>

      {/* ================= Global Analytics (Backend Driven) ================= */}
      <PaymentChart />

      {/* ================= Tab Buttons ================= */}
      <div className="tw-flex tw-gap-4">
        <button
          onClick={() => {
            setActiveTab("course");
            setPage(1);
          }}
          className={`tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium ${
            activeTab === "course"
              ? "tw-bg-blue-600 tw-text-white"
              : "tw-bg-gray-100"
          }`}
        >
          Course Payments
        </button>

        <button
          onClick={() => {
            setActiveTab("internship");
            setPage(1);
          }}
          className={`tw-px-4 tw-py-2 tw-rounded-lg tw-font-medium ${
            activeTab === "internship"
              ? "tw-bg-blue-600 tw-text-white"
              : "tw-bg-gray-100"
          }`}
        >
          Internship Payments
        </button>
      </div>

      {/* ================= Stats Cards (Per Tab) ================= */}
      <PaymentStatsCards stats={stats} />

      {/* ================= Table ================= */}
      <div className="tw-bg-white tw-rounded-xl tw-shadow-sm">
        {isLoading ? (
          <div className="tw-text-center tw-py-10">
            Loading payments...
          </div>
        ) : (
          <PaymentsTable data={normalizedData} />
        )}
      </div>

      {/* ================= Pagination ================= */}
      <div className="tw-flex tw-justify-end tw-gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="tw-px-4 tw-py-2 tw-bg-gray-200 tw-rounded disabled:tw-opacity-50"
        >
          Previous
        </button>

        <span className="tw-self-center tw-text-sm tw-text-gray-500">
          Page {page} of {totalPages || 1}
        </span>

        <button
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="tw-px-4 tw-py-2 tw-bg-gray-200 tw-rounded disabled:tw-opacity-50"
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default PaymentOverview;
