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

const AssignedStudents = () => {
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

  /* ------------------ Loading ------------------ */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader message="Loading assigned students..." />
      </div>
    );
  }

  /* ------------------ Error ------------------ */
  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
        <AlertTriangle className="text-red-500 mt-1" />
        <div className="flex-1">
          <h4 className="font-semibold text-red-600">
            Failed to load assigned students
          </h4>
          <p className="text-sm text-red-500">
            {error?.data?.message || "Unknown error occurred"}
          </p>
          <button
            onClick={refetch}
            className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="text-blue-600" />
            Assigned Students
          </h2>
          <p className="text-gray-500">
            Students who have been successfully assigned to batches
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            {results.length} Assigned
          </div>
          <button
            onClick={refetch}
            className="inline-flex items-center gap-2 border rounded-lg px-4 py-2 hover:bg-gray-50"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {isSuccess && results.length === 0 && (
        <div className="bg-white border rounded-xl p-12 text-center">
          <Inbox size={64} className="mx-auto text-gray-300" />
          <h3 className="mt-4 text-lg font-semibold">
            No Assigned Students
          </h3>
          <p className="text-gray-500 mt-1">
            Students will appear here once they are assigned to batches.
          </p>
          <button
            onClick={refetch}
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            <RefreshCcw size={16} />
            Check Again
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      {isSuccess && results.length > 0 && (
        <div className="bg-white border rounded-xl shadow-sm">

          <div >
            <GenericTable
              data={results}
              showAssignControls={false}
              showBatchColumn={true}
              isAssignedView={true}
            />
          </div>

          <div className="border-t p-4 text-sm text-gray-500">
            Showing {results.length} assigned student records
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedStudents;
