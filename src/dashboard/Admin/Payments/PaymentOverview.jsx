import { useState, useMemo } from "react";
import { FiCreditCard, FiTrendingUp, FiLoader, FiBook, FiBriefcase } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';
import {
  useGetTransactionQuery,
  useGetInternshipTransactionQuery,
} from '@/Services/paymentServices/transactionServices';

import PaymentStatsCards from "./PaymentStats";
import PaymentChart from "./PaymentStatsCharts";
import PaymentsTable from "./TransactionTable";

import {
  normalizeCoursePayments,
  normalizeInternshipPayments,
} from '@/utils/normalizePaymentData.js';

const PaymentOverview = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState("course");
  const [page, setPage] = useState(1);


  // Fetch APIs (Lazy per tab)
  
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

 
  // Normalize Data
 
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

    // Stats 

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

  
  // Pagination Helpers
  

  const totalPages =
    activeTab === "course"
      ? courseData?.totalPages
      : internshipData?.pagination?.totalPages;

  return (
    <div className={`space-y-6 sm:space-y-8 py-4 sm:py-6 transition-colors ${
      isDark ? 'bg-slate-900 min-h-screen' : 'bg-white'
    }`}>

      {/* ================= Header Section ================= */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <FiCreditCard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Payment Overview
            </h1>
            <p className={`text-sm sm:text-base ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Manage course & internship payments, analyze revenue data
            </p>
          </div>
        </div>
      </div>

      {/* ================= Global Analytics (Backend Driven) ================= */}
      <PaymentChart />

      {/* ================= Tab Buttons ================= */}
      <div className="flex gap-3 sm:gap-4 flex-wrap">
        <button
          onClick={() => {
            setActiveTab("course");
            setPage(1);
          }}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
            activeTab === "course"
              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl"
              : isDark
              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <FiBook className="hidden sm:block h-4 w-4 sm:h-5 sm:w-5" />
          Course Payments
        </button>

        <button
          onClick={() => {
            setActiveTab("internship");
            setPage(1);
          }}
          className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 ${
            activeTab === "internship"
              ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl"
              : isDark
              ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          <FiBriefcase className="hidden sm:block h-4 w-4 sm:h-5 sm:w-5" />
          Internship Payments
        </button>

        {/* Tab Indicator */}
        <div className={`ml-auto flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
          isDark
            ? 'bg-slate-700 text-slate-300'
            : 'bg-slate-100 text-slate-600'
        }`}>
          <FiTrendingUp className="h-4 w-4" />
          <span>{normalizedData.length} transactions</span>
        </div>
      </div>

      {/* ================= Stats Cards (Per Tab) ================= */}
      <PaymentStatsCards stats={stats} />

      {/* ================= Table ================= */}
      <div>
        {isLoading ? (
          <div className={`rounded-2xl shadow-lg border p-8 sm:p-12 transition-colors ${
            isDark
              ? 'bg-slate-800 border-slate-700'
              : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="h-12 w-12 animate-spin">
                <FiLoader className={`h-12 w-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="text-center">
                <p className={`font-semibold text-lg ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Loading Payments</p>
                <p className={`text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Please wait while we fetch your data...</p>
              </div>
            </div>
          </div>
        ) : (
          <PaymentsTable data={normalizedData} />
        )}
      </div>

      {/* ================= Pagination ================= */}
      {totalPages && totalPages > 1 && (
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isDark
                ? 'bg-slate-700 text-slate-300 disabled:opacity-50 hover:bg-slate-600'
                : 'bg-slate-100 text-slate-700 disabled:opacity-50 hover:bg-slate-200'
            }`}
          >
            Previous
          </button>

          <span className={`font-medium text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              isDark
                ? 'bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-500'
                : 'bg-blue-600 text-white disabled:opacity-50 hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentOverview;
