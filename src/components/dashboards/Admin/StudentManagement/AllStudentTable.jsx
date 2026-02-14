import { useState, useEffect } from "react";
import {
  useGetStudentsQuery,
  useDownloadStudentsExcelMutation,
} from "../../../../Services/admin/studentReportsServices";
import {
  Download,
  Loader2,
  Search,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentsTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
      console.error(err);
      alert("Failed to download Excel");
    }
  };

  /* ------------------ Error ------------------ */
  if (isError) {
    return (
      <div className="tw-bg-red-50 tw-border tw-border-red-200 tw-rounded-xl tw-p-6">
        <h2 className="tw-text-red-600 tw-font-semibold">
          Error loading students
        </h2>
        <p className="tw-text-sm tw-text-red-500 tw-mt-1">
          {error?.data?.error || "Something went wrong"}
        </p>
        <button
          onClick={refetch}
          className="tw-mt-4 tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="tw-space-y-6 ">
      {/* ================= HEADER ================= */}
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4">
        <div>
          <h2 className="tw-text-2xl tw-font-bold">
            Students
          </h2>
          <p className="tw-text-gray-500">
            Total {studentsData?.total || 0} registered students
          </p>
        </div>

        <button
          onClick={handleDownloadExcel}
          disabled={downloadLoading || isLoading}
          className="tw-flex tw-items-center tw-gap-2 tw-bg-green-600 hover:tw-bg-green-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg disabled:tw-opacity-60"
        >
          {downloadLoading ? (
            <>
              <Loader2 className="tw-animate-spin" size={18} />
              Generating…
            </>
          ) : (
            <>
              <Download size={18} />
              Download Excel
            </>
          )}
        </button>
      </div>

      {/* ================= SEARCH ================= */}
      <div className="tw-flex tw-items-center tw-gap-3 tw-bg-white tw-border tw-rounded-xl tw-p-4">
        <Search className="tw-text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or mobile…"
          className="tw-flex-1 tw-outline-none tw-text-sm"
        />
        {search && (
          <button onClick={() => setSearch("")}>
            <XCircle className="tw-text-gray-400 hover:tw-text-red-500" />
          </button>
        )}
      </div>

      {/* ================= TABLE ================= */}
      <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm tw-overflow-x-auto">
        {isLoading ? (
          <div className="tw-p-10 tw-text-center">
            <Loader2 className="tw-animate-spin tw-mx-auto" />
          </div>
        ) : (
          <table className="tw-w-full tw-text-sm">
            <thead className="tw-bg-gray-50">
              <tr>
                <th className="tw-px-4 tw-py-3 tw-text-left">Name</th>
                <th className="tw-px-4 tw-py-3 tw-text-left">Email</th>
                <th className="tw-px-4 tw-py-3 tw-text-left">Mobile</th>
                <th className="tw-px-4 tw-py-3 tw-text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {studentsData?.students?.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="tw-text-center tw-p-6 tw-text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              ) : (
                studentsData.students.map((student) => (
                  <tr
                    key={student._id}
                    className="tw-border-t hover:tw-bg-gray-50"
                  >
                    <td className="tw-px-4 tw-py-3">
                      {student.name || "Not Provided"}
                    </td>
                    <td className="tw-px-4 tw-py-3">
                      {student.email}
                    </td>
                    <td className="tw-px-4 tw-py-3">
                      {student.mobile || "—"}
                    </td>
                    <td className="tw-px-4 tw-py-3">
                      <span
                        className={`tw-text-xs tw-font-medium tw-px-3 tw-py-1 tw-rounded-full ${
                          student.emailVerified
                            ? "tw-bg-green-100 tw-text-green-700"
                            : "tw-bg-yellow-100 tw-text-yellow-700"
                        }`}
                      >
                        {student.emailVerified ? "Verified" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= PAGINATION ================= */}
      {studentsData?.totalPages > 1 && (
        <div className="tw-flex tw-items-center tw-justify-between">
          <span className="tw-text-sm tw-text-gray-500">
            Showing {(currentPage - 1) * limit + 1}–
            {Math.min(currentPage * limit, studentsData.total)} of{" "}
            {studentsData.total}
          </span>

          <div className="tw-flex tw-gap-2">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="tw-p-2 tw-border tw-rounded-lg disabled:tw-opacity-50"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === studentsData.totalPages}
              className="tw-p-2 tw-border tw-rounded-lg disabled:tw-opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsTable;
