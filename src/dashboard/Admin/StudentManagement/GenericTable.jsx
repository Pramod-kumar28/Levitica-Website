import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/table-core";
import { useReactTable, flexRender } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  FiUsers,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const GenericTable = ({
  data = [],
  availableCourses = [],
  availableBatches = [],
  showAssignControls = false,
  showBatchColumn = false,
  isAssignedView = false,
  isAssigning,
  onAssignBatch,
  onCourseChange,
  onRemove,
  getRowId = (row) => row.id,
}) => {

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [rowSelection, setRowSelection] = useState({});

  /* ---------------- Filter ---------------- */
  const filteredData = useMemo(() => {
    if (!selectedCourse) return data;

    return data.filter(
      (s) => s.courseId === selectedCourse
    );
  }, [data, selectedCourse]);


  /* ---------------- Columns ---------------- */
  const columns = useMemo(() => {
    return [
      showAssignControls && {
        id: "select",
        header: ({ table }) => (
          <input
            type="checkbox"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="accent-blue-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="accent-blue-600"
          />
        ),
      },
      { accessorKey: "name", header: "Student Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "courseName", header: "Course" },
      showBatchColumn && {
        accessorKey: "batchName",
        header: "Batch",
        cell: ({ row }) => row.original.batchName || "—",
      },
    ].filter(Boolean);
  }, [showAssignControls, showBatchColumn]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: showAssignControls ? { rowSelection } : {},
    onRowSelectionChange: showAssignControls ? setRowSelection : undefined,
    enableRowSelection: showAssignControls,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId,
  });

  const selectedRows = table.getSelectedRowModel().flatRows.map(r => r.original);

  const handleBulkAssign = () => {
    const batchObj = availableBatches.find(b => b._id === selectedBatch);
    const payload = selectedRows.map(s => ({
      enrollment_id: s.enrollment_id,
      student_mail: s.email,
      courseTitle: s.courseName,
      courseId: s.courseId,
      batchId: selectedBatch,
      batchName: batchObj?.title,
    }));
    onAssignBatch?.(payload);
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm">
      {/* ---------------- Controls ---------------- */}
      {(availableCourses.length > 0 || showAssignControls) && (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border-b">
          <div className="flex gap-3">
            {availableCourses.length > 0 && (
              <select
                className="border rounded-lg px-3 py-2 text-sm"
                value={selectedCourse}
                onChange={(e) => {
                  const courseId = e.target.value;

                  setSelectedCourse(courseId);
                  setSelectedBatch(""); // 🔥 reset batch when course changes
                  onCourseChange?.(courseId);
                }}
              >
                <option value="">All Courses</option>

                {availableCourses.map(({ _id, title }) => (
                  <option key={_id} value={_id}>
                    {title}
                  </option>
                ))}
              </select>


            )}

            {showAssignControls && (
              <select
                disabled={!availableBatches.length}
                className="border rounded-lg px-3 py-2 text-sm disabled:opacity-50"
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
              >

                <option value="">Select Batch</option>
                {availableBatches.map(({ _id, title }) => (
                  <option key={_id} value={_id}>{title}</option>
                ))}
              </select>
            )}
          </div>

          {showAssignControls && (
            <div className="flex gap-2">
              <button
                onClick={handleBulkAssign}
                disabled={!selectedBatch || selectedRows.length === 0 || isAssigning}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {isAssigning ? (
                  <>
                    <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Assigning...
                  </>
                ) : (
                  <>
                    <FiUsers /> Assign
                  </>
                )}
              </button>

              <button
                onClick={() => onRemove?.(selectedRows)}
                disabled={selectedRows.length === 0}
                className="border text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <FiTrash2 /> Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- Table ---------------- */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th key={header.id} className="text-left p-3 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 border-b last:border-b-0"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- Pagination ---------------- */}
      <div className="flex items-center justify-between p-4 border-t">
        <span className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border rounded-lg px-3 py-1 disabled:opacity-50"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border rounded-lg px-3 py-1 disabled:opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
