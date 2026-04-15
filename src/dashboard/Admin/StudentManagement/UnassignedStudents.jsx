import { useEffect, useState } from "react";
import { FiUsers, FiBookOpen, FiAward, FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";

import Loader from '@/dashboard/common/Loader';
import GenericTable from "./GenericTable";

import {
  useAssignStudentsToBatchMutation,
  useLazyGetUnassignedEnrollmentsQuery,
} from '@/Services/admin/assignService';

import { useCourses } from '@/hooks/useCourses';
import { useGetBatchesByCourseQuery, } from '@/Services/admin/batchdetailsService';

import {
  flattenEnrollments,
  transformAssignmentPayload,
} from '@/utils/formatchange';

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
      <div className="bg-white border rounded-xl p-8 text-center">
        <FiAlertTriangle className="text-red-500 text-4xl mx-auto" />
        <h3 className="mt-3 font-semibold text-lg">
          Failed to load data
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {error?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={fetchUnassigned}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (isSuccess && results.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-10 text-center">
        <FiUsers className="text-gray-300 text-5xl mx-auto" />
        <h3 className="mt-4 font-semibold">
          No Unassigned Students
        </h3>
        <p className="text-sm text-gray-500">
          All enrolled students are already assigned to batches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          Assign Students to Batches
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {results.length} students waiting for assignment
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="bg-white border rounded-xl shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-semibold">
            Student Assignment Panel
          </h3>
        </div>

        <div className="p-4">
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

        <div className="border-t p-3 text-sm text-gray-500 flex items-center justify-between">
          <span>Select students and assign them to batches</span>
          {isAssigning && (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
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
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
  };

  return (
    <div className="bg-white border rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}
      >
        {icon}
      </div>
    </div>
  );
};

export default UnassignedStudents;
