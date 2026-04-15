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
import { Button } from '@/components/ui/button'; // Import your custom Button component

const StudentsTable = () => {
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
        <Button variant="error" size="sm" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  // Calculate stats
  const totalStudents = studentsData?.total || 0;
  const verifiedStudents = studentsData?.students?.filter(s => s.emailVerified).length || 0;
  const pendingStudents = studentsData?.students?.filter(s => !s.emailVerified).length || 0;

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* ================= HEADER SECTION ================= */}
      <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Student Management
                </h1>
                <p className="text-base-content/70 mt-1">
                  Manage and monitor all registered students
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              onClick={handleDownloadExcel}
              disabled={downloadLoading || isLoading}
            >
              {downloadLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Generating...
                </>
              ) : (
                <>
                  <FileSpreadsheet size={18} className="mr-2" />
                  Export Excel
                </>
              )}
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-base-100 rounded-xl p-4 border border-base-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/60 text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-primary">
                    {totalStudents}
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary/40" />
              </div>
            </div>
            <div className="bg-base-100 rounded-xl p-4 border border-base-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/60 text-sm">Verified</p>
                  <p className="text-2xl font-bold text-success">
                    {verifiedStudents}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-success/40" />
              </div>
            </div>
            <div className="bg-base-100 rounded-xl p-4 border border-base-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base-content/60 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-warning">
                    {pendingStudents}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-warning/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="card">
        <div className="card-body p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40 w-5 h-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students by name, email or phone number..."
              className="input pl-12 pr-12"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <XCircle className="text-base-content/40 hover:text-error transition-colors w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= STUDENTS TABLE ================= */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="animate-spin w-12 h-12 text-primary" />
              <p className="mt-4 text-base-content/60">Loading students...</p>
            </div>
          ) : (
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th className="text-base font-semibold py-4">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      Student Details
                    </div>
                  </th>
                  <th className="text-base font-semibold">
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      Email
                    </div>
                  </th>
                  <th className="text-base font-semibold">
                    <div className="flex items-center gap-2">
                      <Phone size={16} />
                      Mobile
                    </div>
                  </th>
                  <th className="text-base font-semibold">Status</th>
                  <th className="text-base font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {studentsData?.students?.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="w-12 h-12 text-base-content/20" />
                        <p className="text-base-content/60">No students found</p>
                        <p className="text-sm text-base-content/40">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  studentsData.students.map((student) => (
                    <tr
                      key={student._id}
                      className="group cursor-pointer hover:bg-base-200/50 transition-colors"
                    >
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-primary/10 text-primary rounded-full w-10 h-10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                              <span className="font-bold text-sm">
                                {student.name?.[0]?.toUpperCase() || "U"}
                              </span>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold text-base-content">
                              {student.name || "Not Provided"}
                            </div>
                            <div className="text-xs text-base-content/50 font-mono">
                              ID: {student._id?.slice(-8) || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-base-content/40 shrink-0" />
                          <span className="text-sm break-all">{student.email}</span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Phone size={14} className="text-base-content/40 shrink-0" />
                          <span className="font-mono text-sm">
                            {student.mobile || "—"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {student.emailVerified ? (
                          <div className="badge badge-success gap-2">
                            <CheckCircle size={12} />
                            Verified
                          </div>
                        ) : (
                          <div className="badge badge-warning gap-2">
                            <Clock size={12} />
                            Pending
                          </div>
                        )}
                      </td>
                      <td className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(MODAL_TYPES.VIEW_STUDENT_DETAILS, {
                              userId: student._id,
                            });
                          }}
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </Button>
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
        <div className="card">
          <div className="card-body p-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-base-content/60">
                Showing {(currentPage - 1) * limit + 1}–
                {Math.min(currentPage * limit, totalStudents)} of{" "}
                <span className="font-semibold text-base-content">
                  {totalStudents}
                </span>{" "}
                students
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                  Previous
                </Button>

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
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "primary" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === studentsData.totalPages}
                >
                  Next
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;