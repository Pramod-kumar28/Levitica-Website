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
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { motion } from "framer-motion";

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

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
      alert("Failed to download Excel");
    }
  };

  if (isError) {
    return (
      <div className={`rounded-xl p-6 text-center ${
        isDark
          ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
          : 'bg-rose-500/10 border border-rose-500/20 text-rose-600'
      }`}>
        <XCircle className="w-12 h-12 mx-auto mb-3" />
        <h3 className="font-semibold mb-1">Error loading students</h3>
        <p className="text-sm opacity-80">{error?.data?.error || "Something went wrong"}</p>
        <button onClick={refetch} className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium ${
          isDark ? 'bg-primary text-white' : 'bg-primary text-white'
        }`}>
          Try Again
        </button>
      </div>
    );
  }

  const totalStudents = studentsData?.total || 0;
  const verifiedStudents = studentsData?.students?.filter(s => s.emailVerified).length || 0;
  const pendingStudents = studentsData?.students?.filter(s => !s.emailVerified).length || 0;

  return (
    <div className="space-y-6">

      {/* ===== SEARCH BAR ===== */}
      <div className={`rounded-xl p-4 shadow-property border ${
        isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'
      }`}>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or phone number..."
            className={`w-full pl-11 pr-11 py-3 rounded-xl border focus:outline-none focus:ring-2 transition-all text-sm ${
              isDark
                ? 'bg-darklight border-dark_border text-white placeholder-gray focus:border-primary focus:ring-primary/30'
                : 'bg-light border-border text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20'
            }`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors text-gray hover:text-rose-500`}
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* ===== STUDENTS TABLE ===== */}
      <div className={`rounded-xl shadow-property border overflow-hidden ${
        isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'
      }`}>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className={`animate-spin h-10 w-10 text-primary`} />
              <p className={`mt-4 text-sm text-gray`}>Loading students...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDark ? 'border-dark_border' : 'border-border'}`}>
                  <th className={`text-left px-3 py-2 text-xs font-semibold uppercase tracking-wide ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>Student</th>
                  <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>Email</th>
                  <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>Phone</th>
                  <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wide ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>Status</th>
                  <th className={`text-center px-6 py-4 text-xs font-semibold uppercase tracking-wide ${
                    isDark ? 'text-gray' : 'text-gray'
                  }`}>Action</th>
                </tr>
              </thead>

              <tbody className={`divide-y ${isDark ? 'divide-dark_border' : 'divide-border'}`}>
                {studentsData?.students?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-16">
                      <div className="flex flex-col items-center gap-3">
                        <div className={`p-4 rounded-full ${isDark ? 'bg-darklight' : 'bg-light'}`}>
                          <Users className={`h-8 w-8 text-gray`} />
                        </div>
                        <p className={`font-medium text-gray`}>No students found</p>
                        <p className={`text-sm text-gray`}>Try adjusting your search criteria</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  studentsData.students.map((student, idx) => (
                    <motion.tr
                      key={student._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`transition-colors duration-150 ${
                        isDark ? 'hover:bg-darklight' : 'hover:bg-light'
                      }`}
                    >
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className={`font-medium ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                              {student.name || "Not Provided"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-3.5 w-3.5 text-gray" />
                          <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
                            {student.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5 text-gray" />
                          <span className={`text-sm font-mono ${isDark ? 'text-gray' : 'text-gray'}`}>
                            {student.mobile || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {student.emailVerified ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            <CheckCircle className="h-3 w-3" />
                            Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400">
                            <Clock className="h-3 w-3" />
                            Pending
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          onClick={() => openModal(MODAL_TYPES.VIEW_STUDENT_DETAILS, {
                            userId: student._id,
                          })}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all btn-border"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ===== PAGINATION ===== */}
      {studentsData?.totalPages > 1 && (
        <div className={`rounded-xl p-2 shadow-property border ${
          isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'
        }`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className={`text-sm text-gray`}>
              Showing <span className={`font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                {(currentPage - 1) * limit + 1}–{Math.min(currentPage * limit, totalStudents)}
              </span> of{" "}
              <span className={`font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                {totalStudents}
              </span> students
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition ${
                  isDark
                    ? 'border border-dark_border text-gray hover:bg-darklight disabled:opacity-40'
                    : 'border border-border text-gray hover:bg-light disabled:opacity-40'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
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
                      className={`w-6 h-6 rounded-lg text-sm font-semibold transition ${
                        pageNum === currentPage
                          ? 'btn-primary'
                          : isDark
                            ? 'text-gray hover:bg-darklight'
                            : 'text-gray hover:bg-light'
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
                className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 transition ${
                  isDark
                    ? 'border border-dark_border text-gray hover:bg-darklight disabled:opacity-40'
                    : 'border border-border text-gray hover:bg-light disabled:opacity-40'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;