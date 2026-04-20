import { useState, useEffect } from "react";
import {
  useGetStudentsQuery,
  useDownloadStudentsExcelMutation,
} from '@/Services/admin/studentReportsServices';
import {
  Download,
  Loader2,
  Search,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Users,
  Mail,
  Phone,
  CheckCircle,
  Clock,
  User,
  FileSpreadsheet,
  Eye,
} from "lucide-react";
import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
import { useTheme } from '@/context/ThemeContext';

const StudentsTable = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { openModal } = useModal();

  const {
    data: studentsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetStudentsQuery({
    page: currentPage,
    limit,
    search: debouncedSearch,
  });

  const [downloadExcel, { isLoading: downloadLoading }] =
    useDownloadStudentsExcelMutation();

  /* ------------------ Debounce search ------------------ */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  /* ------------------ Excel download ------------------ */
  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadExcel({}).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `students_${new Date().toISOString().split("T")[0]}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // You can replace this with a toast notification
      alert("Failed to download Excel");
    }
  };

  /* ------------------ Error ------------------ */
  if (isError) {
    return (
      <div className="alert alert-error shadow-lg">
        <div className="flex-1">
          <XCircle className="stroke-current shrink-0" />
          <div>
            <h3 className="font-semibold">Error loading students</h3>
            <p className="text-sm opacity-70">
              {error?.data?.error || "Something went wrong"}
            </p>
          </div>
        </div>
        <button onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  // Calculate stats
  const totalStudents = studentsData?.total || 0;
  const verifiedStudents = studentsData?.students?.filter(s => s.emailVerified).length || 0;
  const pendingStudents = studentsData?.students?.filter(s => !s.emailVerified).length || 0;

  return (
    <div className={`space-y-4 md:space-y-6 p-2 sm:p-3 md:p-6`}>
      {/* ================= HEADER SECTION ================= */}
      <div className={`rounded-2xl p-6 sm:p-8 shadow-2xl border overflow-hidden relative transition-colors ${
        isDark
          ? 'bg-gradient-to-br from-slate-800 via-blue-800 to-indigo-900 border-blue-700/40'
          : 'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 border-blue-700/30'
      }`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl -z-0"></div>
        
        <div className="relative z-10">
          <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8`}>
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <div className={`p-2.5 sm:p-4 rounded-xl shadow-lg flex-shrink-0 ${ 
                isDark
                  ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                  : 'bg-gradient-to-br from-blue-400 to-indigo-500'
              }`}>
                <Users className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white truncate">
                  All Students
                </h1>
                <p className="text-blue-100 mt-1 text-xs sm:text-sm font-medium truncate">
                  Overview of registered students
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadExcel}
              disabled={downloadLoading || isLoading}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap text-sm sm:text-base flex-shrink-0"
            >
              {downloadLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <FileSpreadsheet size={18} />
                  Export Excel
                </>
              )}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:border-white/40 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Students</p>
                  <p className="text-4xl font-bold text-white mt-2">
                    {totalStudents}
                  </p>
                </div>
                <div className="p-3 bg-white/10 group-hover:bg-white/20 rounded-lg transition-all duration-300">
                  <Users className="w-6 h-6 text-blue-300" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:border-green-400/40 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Verified</p>
                  <p className="text-4xl font-bold text-green-300 mt-2">
                    {verifiedStudents}
                  </p>
                </div>
                <div className="p-3 bg-green-500/20 group-hover:bg-green-500/30 rounded-lg transition-all duration-300">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:border-amber-400/40 transition-all duration-300 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-amber-100 text-sm font-medium">Pending</p>
                  <p className="text-4xl font-bold text-amber-300 mt-2">
                    {pendingStudents}
                  </p>
                </div>
                <div className="p-3 bg-amber-500/20 group-hover:bg-amber-500/30 rounded-lg transition-all duration-300">
                  <Clock className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className={`rounded-xl shadow-md border p-3 sm:p-4 md:p-6 transition-colors ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div className="relative group">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
            isDark
              ? 'text-slate-500 group-focus-within:text-blue-400'
              : 'text-slate-400 group-focus-within:text-blue-500'
          }`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className={`w-full pl-12 pr-12 py-2.5 sm:py-3 border rounded-lg focus:outline-none transition-all text-sm sm:text-base ${
              isDark
                ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
            }`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                isDark
                  ? 'text-slate-500 hover:text-red-400'
                  : 'text-slate-400 hover:text-red-500'
              }`}
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ================= STUDENTS TABLE ================= */}
      <div className={`rounded-xl shadow-md border overflow-hidden transition-colors ${
        isDark
          ? 'bg-slate-800 border-slate-700'
          : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className={`animate-spin w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <p className={`mt-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Loading students...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className={`border-b transition-colors ${
                  isDark
                    ? 'bg-slate-700 border-slate-600'
                    : 'bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200'
                }`}>
                  <th className={`text-left px-6 py-4 font-semibold transition-colors ${
                    isDark
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <User size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                      Student Details
                    </div>
                  </th>
                  <th className={`text-left px-6 py-4 font-semibold transition-colors ${
                    isDark
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                      Email
                    </div>
                  </th>
                  <th className={`text-left px-6 py-4 font-semibold transition-colors ${
                    isDark
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className={isDark ? 'text-blue-400' : 'text-blue-600'} />
                      Mobile
                    </div>
                  </th>
                  <th className={`text-left px-6 py-4 font-semibold transition-colors ${
                    isDark
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}>Status</th>
                  <th className={`text-center px-6 py-4 font-semibold transition-colors ${
                    isDark
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}>Action</th>
                </tr>
              </thead>

              <tbody className={`divide-y transition-colors ${
                isDark
                  ? 'divide-slate-700'
                  : 'divide-slate-200'
              }`}>
                {studentsData?.students?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className={`text-center py-16 px-6 transition-colors ${
                      isDark
                        ? 'bg-slate-700'
                        : 'bg-white'
                    }`}>
                      <div className="flex flex-col items-center gap-3">
                        <div className={`p-4 rounded-full transition-colors ${
                          isDark
                            ? 'bg-slate-600'
                            : 'bg-slate-100'
                        }`}>
                          <Users className={`w-8 h-8 ${
                            isDark
                              ? 'text-slate-400'
                              : 'text-slate-400'
                          }`} />
                        </div>
                        <p className={`font-medium transition-colors ${
                          isDark
                            ? 'text-slate-400'
                            : 'text-slate-600'
                        }`}>No students found</p>
                        <p className="text-sm text-slate-500">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  studentsData.students.map((student) => (
                    <tr
                      key={student._id}
                      className={`transition-colors duration-200 group ${
                        isDark
                          ? 'hover:bg-slate-700/50'
                          : 'hover:bg-blue-50/30'
                      }`}
                    >
                      <td className={`px-6 py-4 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-900'
                      }`}>
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
                            {student.name?.[0]?.toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className={`font-semibold transition-colors ${
                              isDark
                                ? 'text-slate-100'
                                : 'text-slate-900'
                            }`}>
                              {student.name || "Not Provided"}
                            </div>
                            <div className={`text-xs font-mono transition-colors ${
                              isDark
                                ? 'text-slate-400'
                                : 'text-slate-500'
                            }`}>
                              ID: {student._id?.slice(-8) || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-4 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Mail size={14} className={`shrink-0 transition-colors ${
                            isDark
                              ? 'text-slate-500'
                              : 'text-slate-400'
                          }`} />
                          <span className="text-sm break-all">{student.email}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-4 transition-colors ${
                        isDark
                          ? 'text-slate-300'
                          : 'text-slate-700'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className={`shrink-0 transition-colors ${
                            isDark
                              ? 'text-slate-500'
                              : 'text-slate-400'
                          }`} />
                          <span className="font-mono text-sm">
                            {student.mobile || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {student.emailVerified ? (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            isDark
                              ? 'bg-green-900/30 text-green-300'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            <CheckCircle size={14} />
                            Verified
                          </span>
                        ) : (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                            isDark
                              ? 'bg-amber-900/30 text-amber-300'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            <Clock size={14} />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="text-center px-6 py-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(MODAL_TYPES.VIEW_STUDENT_DETAILS, {
                              userId: student._id,
                            });
                          }}
                          className={`px-4 py-2 text-white font-medium rounded-lg flex items-center gap-1.5 transition-colors inline-flex mx-auto shadow-sm hover:shadow-md ${
                            isDark
                              ? 'bg-blue-600 hover:bg-blue-500'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          <Eye size={14} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ================= PAGINATION ================= */}
      {studentsData?.totalPages > 1 && (
        <div className={`rounded-xl shadow-md border p-4 sm:p-6 transition-colors ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className={`text-sm transition-colors ${
              isDark
                ? 'text-slate-400'
                : 'text-slate-600'
            }`}>
              Showing <span className={`font-semibold ${
                isDark
                  ? 'text-slate-200'
                  : 'text-slate-900'
              }`}>{(currentPage - 1) * limit + 1}–{Math.min(currentPage * limit, totalStudents)}</span> of{" "}
              <span className={`font-semibold ${
                isDark
                  ? 'text-slate-200'
                  : 'text-slate-900'
              }`}>
                {totalStudents}
              </span>{" "}
              students
            </div>

            <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg border font-medium flex items-center gap-1 transition-colors ${
                  isDark
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, studentsData.totalPages) }, (_, i) => {
                  let pageNum;
                  if (studentsData.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= studentsData.totalPages - 2) {
                    pageNum = studentsData.totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                        pageNum === currentPage
                          ? isDark
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-500'
                            : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          : isDark
                            ? 'border border-slate-600 text-slate-300 hover:bg-slate-700'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === studentsData.totalPages}
                className={`px-3 py-2 rounded-lg border font-medium flex items-center gap-1 transition-colors ${
                  isDark
                    ? 'border-slate-600 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;