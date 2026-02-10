import { useEffect, useState } from "react";
import { FiUsers, FiBookOpen, FiAward, FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";

import Loader from "../../common/Loader";
import GenericTable from "./GenericTable";

import {
  useAssignStudentsToBatchMutation,
  useLazyGetUnassignedEnrollmentsQuery,
} from "../../../../Services/admin/assignService";

import { useCourses } from "../../../../hooks/useCourses";
import { useGetBatchesByCourseQuery, } from "../../../../Services/admin/batchdetailsService";

import {
  flattenEnrollments,
  transformAssignmentPayload,
} from "../../../../utils/formatchange";

const UnassignedStudents = () => {
  const { courses = [], isLoading: isCoursesLoading } = useCourses();
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const {
    data: courseBatches,
  } = useGetBatchesByCourseQuery(selectedCourseId, {
    skip: !selectedCourseId,
  });


  const [assignStudents, { isLoading: isAssigning }] =
    useAssignStudentsToBatchMutation();

  const [
    fetchUnassigned,
    {
      data: unassignedData,
      isLoading: isUnassignedLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useLazyGetUnassignedEnrollmentsQuery();

  useEffect(() => {
    fetchUnassigned();
  }, [fetchUnassigned]);

  const results = flattenEnrollments(unassignedData?.enrollments || []);

  const availableCourses = courses.map((c) => ({
    title: c.name,
    _id: c._id,
  }));

  const availableBatches = selectedCourseId
    ? courseBatches?.data?.map((b) => ({
      title: b.batchName,
      _id: b._id,
    })) || []
    : [];

    console.log(availableBatches,'iam batches')


  const handleAssign = async (payload) => {
    try {
      const formatted = transformAssignmentPayload(payload);
      await assignStudents(formatted).unwrap();
      toast.success("Students assigned successfully");
      fetchUnassigned();
    } catch (err) {
      toast.error("Failed to assign students");
    }
  };

  /* ================= LOADING ================= */
  if (isUnassignedLoading || isCoursesLoading ) {
    return <Loader message="Loading unassigned students..." />;
  }

  /* ================= ERROR ================= */
  if (isError) {
    return (
      <div className="tw-bg-white tw-border tw-rounded-xl tw-p-8 tw-text-center">
        <FiAlertTriangle className="tw-text-red-500 tw-text-4xl tw-mx-auto" />
        <h3 className="tw-mt-3 tw-font-semibold tw-text-lg">
          Failed to load data
        </h3>
        <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
          {error?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={fetchUnassigned}
          className="tw-mt-4 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-5 tw-py-2 tw-rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (isSuccess && results.length === 0) {
    return (
      <div className="tw-bg-white tw-border tw-rounded-xl tw-p-10 tw-text-center">
        <FiUsers className="tw-text-gray-300 tw-text-5xl tw-mx-auto" />
        <h3 className="tw-mt-4 tw-font-semibold">
          No Unassigned Students
        </h3>
        <p className="tw-text-sm tw-text-gray-500">
          All enrolled students are already assigned to batches.
        </p>
      </div>
    );
  }

  return (
    <div className="tw-space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="tw-text-xl tw-font-bold tw-text-gray-800">
          Assign Students to Batches
        </h2>
        <p className="tw-text-sm tw-text-gray-500 tw-mt-1">
          {results.length} students waiting for assignment
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-3 tw-gap-4">
        <StatCard
          icon={<FiUsers />}
          label="Unassigned Students"
          value={results.length}
          color="blue"
        />
        <StatCard
          icon={<FiBookOpen />}
          label="Available Batches"
          value={availableBatches.length}
          color="purple"
        />
        <StatCard
          icon={<FiAward />}
          label="Available Courses"
          value={availableCourses.length}
          color="green"
        />
      </div>

      {/* ================= TABLE ================= */}
      <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm">
        <div className="tw-p-4 tw-border-b">
          <h3 className="tw-font-semibold">
            Student Assignment Panel
          </h3>
        </div>

        <div className="tw-p-4">
          <GenericTable
            data={results}
            availableCourses={availableCourses}
            availableBatches={availableBatches}
            showAssignControls
            isAssignedView={false}
            onAssignBatch={handleAssign}
            isAssigning={isAssigning}
            onCourseChange={setSelectedCourseId}
            onRemove={() => { }}
          />
        </div>

        <div className="tw-border-t tw-p-3 tw-text-sm tw-text-gray-500 tw-flex tw-items-center tw-justify-between">
          <span>Select students and assign them to batches</span>
          {isAssigning && (
            <span className="tw-flex tw-items-center tw-gap-2">
              <span className="tw-w-4 tw-h-4 tw-border-2 tw-border-blue-600 tw-border-t-transparent tw-rounded-full tw-animate-spin" />
              Assigning...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: "tw-bg-blue-50 tw-text-blue-600",
    purple: "tw-bg-purple-50 tw-text-purple-600",
    green: "tw-bg-green-50 tw-text-green-600",
  };

  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-p-5 tw-flex tw-items-center tw-justify-between">
      <div>
        <p className="tw-text-sm tw-text-gray-500">{label}</p>
        <h3 className="tw-text-2xl tw-font-bold tw-mt-1">{value}</h3>
      </div>
      <div
        className={`tw-w-12 tw-h-12 tw-rounded-lg tw-flex tw-items-center tw-justify-center ${colors[color]}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default UnassignedStudents;
