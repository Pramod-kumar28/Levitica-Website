import { useEffect, useState } from "react";
import { FiUsers, FiBookOpen, FiAward, FiAlertTriangle, FiTrendingUp } from "react-icons/fi";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

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

  if (isUnassignedLoading || isCoursesLoading) {
    return <Loader message="Loading unassigned students..." />;
  }

  if (isError) {
    return (
      <div className={`rounded-xl p-10 text-center border ${
        isDark
          ? 'bg-rose-500/10 border-rose-500/20'
          : 'bg-rose-500/10 border-rose-500/20'
      }`}>
        <div className={`inline-block p-4 rounded-full mb-4 ${
          isDark
            ? 'bg-rose-500/20 text-rose-400'
            : 'bg-rose-500/20 text-rose-600'
        }`}>
          <FiAlertTriangle className="text-4xl" />
        </div>
        <h3 className={`mt-3 font-semibold text-lg ${
          isDark ? 'text-rose-400' : 'text-rose-600'
        }`}>
          Failed to load data
        </h3>
        <p className={`text-sm mt-2 text-gray`}>
          {error?.data?.message || "Something went wrong"}
        </p>
        <button
          onClick={fetchUnassigned}
          className={`mt-6 px-6 py-2.5 rounded-lg font-semibold transition bg-primary hover:bg-skyBlue text-white`}
        >
          Retry
        </button>
      </div>
    );
  }

  if (isSuccess && results.length === 0) {
    return (
      <div className={`rounded-xl p-12 text-center border ${
        isDark
          ? 'bg-emerald-500/10 border-emerald-500/20'
          : 'bg-emerald-500/10 border-emerald-500/20'
      }`}>
        <div className={`inline-block p-4 rounded-full mb-4 ${
          isDark
            ? 'bg-emerald-500/20 text-emerald-400'
            : 'bg-emerald-500/20 text-emerald-600'
        }`}>
          <FiUsers className="text-4xl" />
        </div>
        <h3 className={`mt-4 font-semibold text-lg ${
          isDark ? 'text-emerald-400' : 'text-emerald-600'
        }`}>
          All Students Assigned!
        </h3>
        <p className={`text-sm mt-2 text-gray`}>
          All enrolled students are already assigned to batches.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div>
        <h2 className={`text-2xl font-bold ${
          isDark
            ? 'text-blue-400'
            : 'bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'
        }`}>
          Unassigned Students
        </h2>
        <p className={`mt-2 flex items-center gap-2 text-gray`}>
          <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-semibold ${
            isDark
              ? 'bg-orange-900/30 text-orange-400'
              : 'bg-orange-100 text-orange-700'
          }`}>
            {results.length}
          </span>
          students awaiting batch assignment
        </p>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className={`border rounded-xl shadow-sm overflow-hidden ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div className={`p-4 border-b ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h3 className={`font-semibold ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
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

        <div className={`border-t p-3 text-sm flex items-center justify-between ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-slate-400'
            : 'bg-white border-slate-200 text-gray-500'
        }`}>
          <span>Select students and assign them to batches</span>
          {isAssigning && (
            <span className={`flex items-center gap-2 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
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

export default UnassignedStudents;