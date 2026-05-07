import Loader from '@/dashboard/common/Loader';
import { useGetAssignedEnrollmentsQuery } from '@/Services/admin/assignService';
import GenericTable from "./GenericTable";
import { flattenEnrollments } from '@/utils/formatchange';
import {
  Users,
  RefreshCcw,
  AlertTriangle,
  Inbox,
} from "lucide-react";
import { useTheme } from '@/context/ThemeContext';
import { motion } from "framer-motion";

const AssignedStudents = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const {
    data: assignedData,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetAssignedEnrollmentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const results = flattenEnrollments(assignedData?.enrollments || []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader message="Loading assigned students..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`rounded-xl p-6 flex items-start gap-4 border ${
        isDark
          ? 'bg-rose-500/10 border-rose-500/20'
          : 'bg-rose-500/10 border-rose-500/20'
      }`}>
        <div className={`p-3 rounded-lg ${
          isDark ? 'bg-rose-500/20' : 'bg-rose-500/20'
        }`}>
          <AlertTriangle className={`w-6 h-6 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
        </div>
        <div className="flex-1">
          <h4 className={`font-semibold ${isDark ? 'text-rose-400' : 'text-rose-600'}`}>
            Failed to load assigned students
          </h4>
          <p className={`text-sm mt-1 text-gray`}>
            {error?.data?.message || "Unknown error occurred"}
          </p>
          <button
            onClick={refetch}
            className={`mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition bg-primary hover:bg-skyBlue text-white`}
          >
            <RefreshCcw size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-gradient-to-br from-primary to-skyBlue shadow-lg`}>
              <Users className="text-white w-5 h-5" />
            </div>
            <h2 className={`text-2xl font-bold ${
              isDark ? 'text-white' : 'text-midnight_text'
            }`}>
              Assigned Students
            </h2>
          </div>
          <p className={`text-sm mt-2 text-gray`}>
            Students successfully assigned to batches
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-5 py-2.5 rounded-full text-sm font-bold border ${
            isDark
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
              : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
          }`}>
            {results.length} Assigned
          </div>
          <button
            onClick={refetch}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 font-semibold transition border ${
              isDark
                ? 'border-dark_border text-gray hover:bg-darklight'
                : 'border-border text-gray hover:bg-light'
            }`}
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {isSuccess && results.length === 0 && (
        <div className={`rounded-xl p-12 text-center border ${
          isDark
            ? 'bg-semidark border-dark_border'
            : 'bg-white border-border'
        }`}>
          <Inbox size={64} className={`mx-auto ${isDark ? 'text-gray' : 'text-gray'}`} />
          <h3 className={`mt-4 text-lg font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
            No Assigned Students
          </h3>
          <p className={`text-gray mt-1`}>
            Students will appear here once they are assigned to batches.
          </p>
          <button
            onClick={refetch}
            className={`mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-lg transition bg-primary hover:bg-skyBlue text-white`}
          >
            <RefreshCcw size={16} />
            Check Again
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      {isSuccess && results.length > 0 && (
        <div className={`rounded-xl border shadow-property overflow-hidden ${
          isDark
            ? 'bg-semidark border-dark_border'
            : 'bg-white border-border'
        }`}>
          <div>
            <GenericTable
              data={results}
              showAssignControls={false}
              showBatchColumn={true}
              isAssignedView={true}
            />
          </div>

          <div className={`border-t p-4 text-sm text-gray ${
            isDark ? 'border-dark_border' : 'border-border'
          }`}>
            Showing {results.length} assigned student records
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedStudents;