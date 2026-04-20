import { useEffect, useState } from "react";
import { FiUsers, FiBookOpen, FiAward, FiAlertTriangle } from "react-icons/fi";
import toast from "react-hot-toast";

import Loader from '@/dashboard/common/Loader';
import GenericTable from "./GenericTable";
import { useTheme } from '@/context/ThemeContext';

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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
      <div className={`border rounded-xl p-10 text-center transition-colors ${
        isDark
          ? 'bg-gradient-to-br from-red-950/50 to-rose-950/50 border-red-900/50'
          : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'
      }`}>
        <div className={`inline-block p-4 rounded-full mb-4 transition-colors ${
          isDark
            ? 'bg-red-900/30 text-red-400'
            : 'bg-red-100 text-red-600'
        }`}>
          <FiAlertTriangle className="text-4xl" />
        </div>
        <h3 className={`mt-3 font-semibold text-lg transition-colors ${
          isDark
            ? 'text-red-300'
            : 'text-red-900'
        }`}>
          Failed to load data
        </h3>
        <p className={`text-sm mt-2 transition-colors ${
          isDark
            ? 'text-red-300/70'
            : 'text-red-700'
        }`}>
          {error?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={fetchUnassigned}
          className={`mt-6 px-6 py-2.5 rounded-lg font-semibold transition-colors ${
            isDark
              ? 'bg-red-600 hover:bg-red-500 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Retry
        </button>
      </div>
    );
  }

  /* ================= EMPTY ================= */
  if (isSuccess && results.length === 0) {
    return (
      <div className={`border rounded-xl p-12 text-center transition-colors ${
        isDark
          ? 'bg-gradient-to-br from-emerald-950/50 to-teal-950/50 border-emerald-900/50'
          : 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
      }`}>
        <div className={`inline-block p-4 rounded-full mb-4 transition-colors ${
          isDark
            ? 'bg-emerald-900/30 text-emerald-400'
            : 'bg-emerald-100 text-emerald-600'
        }`}>
          <FiUsers className="text-4xl" />
        </div>
        <h3 className={`mt-4 font-semibold text-lg transition-colors ${
          isDark
            ? 'text-emerald-300'
            : 'text-emerald-900'
        }`}>
          All Students Assigned!
        </h3>
        <p className={`text-sm mt-2 transition-colors ${
          isDark
            ? 'text-emerald-300/70'
            : 'text-emerald-700'
        }`}>
          All enrolled students are already assigned to batches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className={`text-2xl font-bold bg-clip-text transition-colors ${
          isDark
            ? 'text-blue-400'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
        }`}>
          Unassigned Students
        </h2>
        <p className={`mt-2 flex items-center gap-2 transition-colors ${
          isDark
            ? 'text-slate-400'
            : 'text-slate-600'
        }`}>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold transition-colors ${
            isDark
              ? 'bg-orange-900/30 text-orange-400'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {results.length}
          </span>
          students awaiting batch assignment
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`border rounded-xl p-6 transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-800/30'
            : 'bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDark
                  ? 'text-blue-400'
                  : 'text-blue-600'
              }`}>Unassigned</p>
              <p className={`text-3xl font-bold mt-2 transition-colors ${
                isDark
                  ? 'text-blue-300'
                  : 'text-blue-900'
              }`}>{results.length}</p>
            </div>
            <div className={`p-3 rounded-lg transition-colors ${
              isDark
                ? 'bg-blue-800/30'
                : 'bg-blue-200/50'
            }`}>
              <FiUsers className={`text-2xl transition-colors ${
                isDark
                  ? 'text-blue-400'
                  : 'text-blue-600'
              }`} />
            </div>
          </div>
        </div>
        
        <div className={`border rounded-xl p-6 transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-800/30'
            : 'bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDark
                  ? 'text-purple-400'
                  : 'text-purple-600'
              }`}>Available Batches</p>
              <p className={`text-3xl font-bold mt-2 transition-colors ${
                isDark
                  ? 'text-purple-300'
                  : 'text-purple-900'
              }`}>{availableBatches.length}</p>
            </div>
            <div className={`p-3 rounded-lg transition-colors ${
              isDark
                ? 'bg-purple-800/30'
                : 'bg-purple-200/50'
            }`}>
              <FiBookOpen className={`text-2xl transition-colors ${
                isDark
                  ? 'text-purple-400'
                  : 'text-purple-600'
              }`} />
            </div>
          </div>
        </div>
        
        <div className={`border rounded-xl p-6 transition-colors ${
          isDark
            ? 'bg-gradient-to-br from-emerald-900/20 to-emerald-800/20 border-emerald-800/30'
            : 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium transition-colors ${
                isDark
                  ? 'text-emerald-400'
                  : 'text-emerald-600'
              }`}>Active Courses</p>
              <p className={`text-3xl font-bold mt-2 transition-colors ${
                isDark
                  ? 'text-emerald-300'
                  : 'text-emerald-900'
              }`}>{availableCourses.length}</p>
            </div>
            <div className={`p-3 rounded-lg transition-colors ${
              isDark
                ? 'bg-emerald-800/30'
                : 'bg-emerald-200/50'
            }`}>
              <FiAward className={`text-2xl transition-colors ${
                isDark
                  ? 'text-emerald-400'
                  : 'text-emerald-600'
              }`} />
            </div>
          </div>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className={`border rounded-xl shadow-sm transition-colors ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div className={`p-4 border-b transition-colors ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <h3 className={`font-semibold transition-colors ${
            isDark
              ? 'text-slate-200'
              : 'text-slate-900'
          }`}>
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

        <div className={`border-t p-3 text-sm flex items-center justify-between transition-colors ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-400'
            : 'bg-white border-slate-200 text-gray-500'
        }`}>
          <span>Select students and assign them to batches</span>
          {isAssigning && (
            <span className={`flex items-center gap-2 transition-colors ${
              isDark
                ? 'text-blue-400'
                : 'text-blue-600'
            }`}>
              <span className={`w-4 h-4 border-2 rounded-full animate-spin ${
                isDark
                  ? 'border-blue-400 border-t-transparent'
                  : 'border-blue-600 border-t-transparent'
              }`} />
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
