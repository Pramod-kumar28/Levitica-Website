import Loader from "../../common/Loader";
import { useGetAssignedEnrollmentsQuery } from "../../../../Services/admin/assignService";
import GenericTable from "./GenericTable";
import { flattenEnrollments } from "../../../../utils/formatchange";
import {
  Users,
  RefreshCcw,
  AlertTriangle,
  Inbox,
  Info,
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
      <div className="tw-flex tw-items-center tw-justify-center tw-py-16">
        <Loader message="Loading assigned students..." />
      </div>
    );
  }

  /* ------------------ Error ------------------ */
  if (isError) {
    return (
      <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-xl tw-p-6 tw-flex tw-items-start tw-gap-4">
        <AlertTriangle className="tw-text-red-500 tw-mt-1" />
        <div className="tw-flex-1">
          <h4 className="tw-font-semibold tw-text-red-600">
            Failed to load assigned students
          </h4>
          <p className="tw-text-sm tw-text-red-500">
            {error?.data?.message || "Unknown error occurred"}
          </p>
          <button
            onClick={refetch}
            className="tw-mt-4 tw-inline-flex tw-items-center tw-gap-2 tw-bg-red-600 hover:tw-bg-red-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
          >
            <RefreshCcw size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tw-space-y-6">
      {/* ================= HEADER ================= */}
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4">
        <div>
          <h2 className="tw-text-2xl tw-font-bold tw-flex tw-items-center tw-gap-2">
            <Users className="tw-text-blue-600" />
            Assigned Students
          </h2>
          <p className="tw-text-gray-500">
            Students who have been successfully assigned to batches
          </p>
        </div>

        <div className="tw-flex tw-items-center tw-gap-3">
          <div className="tw-bg-green-50 tw-text-green-700 tw-px-4 tw-py-2 tw-rounded-full tw-text-sm tw-font-medium">
            {results.length} Assigned
          </div>
          <button
            onClick={refetch}
            className="tw-inline-flex tw-items-center tw-gap-2 tw-border tw-rounded-lg tw-px-4 tw-py-2 hover:tw-bg-gray-50"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* ================= EMPTY STATE ================= */}
      {isSuccess && results.length === 0 && (
        <div className="tw-bg-white tw-border tw-rounded-xl tw-p-12 tw-text-center">
          <Inbox size={64} className="tw-mx-auto tw-text-gray-300" />
          <h3 className="tw-mt-4 tw-text-lg tw-font-semibold">
            No Assigned Students
          </h3>
          <p className="tw-text-gray-500 tw-mt-1">
            Students will appear here once they are assigned to batches.
          </p>
          <button
            onClick={refetch}
            className="tw-mt-6 tw-inline-flex tw-items-center tw-gap-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-6 tw-py-2 tw-rounded-lg"
          >
            <RefreshCcw size={16} />
            Check Again
          </button>
        </div>
      )}

      {/* ================= TABLE ================= */}
      {isSuccess && results.length > 0 && (
        <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm">
          <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-b">
            <h3 className="tw-font-semibold tw-flex tw-items-center tw-gap-2">
              <Info className="tw-text-blue-600" />
              Assigned Students Record
            </h3>
            <span className="tw-text-sm tw-bg-green-100 tw-text-green-700 tw-px-3 tw-py-1 tw-rounded-full">
              {results.length} records
            </span>
          </div>

          <div className="tw-p-4">
            <GenericTable
              data={results}
              showAssignControls={false}
              showBatchColumn={true}
              isAssignedView={true}
            />
          </div>

          <div className="tw-border-t tw-p-4 tw-text-sm tw-text-gray-500">
            Showing {results.length} assigned student records
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedStudents;
