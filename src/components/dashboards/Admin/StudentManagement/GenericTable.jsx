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
            className="tw-accent-blue-600"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="tw-accent-blue-600"
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
    <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm">
      {/* ---------------- Controls ---------------- */}
      {(availableCourses.length > 0 || showAssignControls) && (
        <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4 tw-p-4 tw-border-b">
          <div className="tw-flex tw-gap-3">
            {availableCourses.length > 0 && (
              <select
                className="tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm"
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
                className="tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm disabled:tw-opacity-50"
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
            <div className="tw-flex tw-gap-2">
              <button
                onClick={handleBulkAssign}
                disabled={!selectedBatch || selectedRows.length === 0}
                className="tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 disabled:tw-opacity-50"
              >
                <FiUsers /> Assign
              </button>

              <button
                onClick={() => onRemove?.(selectedRows)}
                disabled={selectedRows.length === 0}
                className="tw-border tw-text-red-600 hover:tw-bg-red-50 tw-px-4 tw-py-2 tw-rounded-lg tw-flex tw-items-center tw-gap-2 disabled:tw-opacity-50"
              >
                <FiTrash2 /> Remove
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---------------- Table ---------------- */}
      <div className="tw-overflow-x-auto">
        <table className="tw-w-full tw-text-sm">
          <thead className="tw-bg-gray-50 tw-border-b">
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th key={header.id} className="tw-text-left tw-p-3 tw-font-semibold">
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
                className="hover:tw-bg-gray-50 tw-border-b last:tw-border-b-0"
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="tw-p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- Pagination ---------------- */}
      <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-t">
        <span className="tw-text-sm tw-text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>

        <div className="tw-flex tw-gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="tw-border tw-rounded-lg tw-px-3 tw-py-1 disabled:tw-opacity-50"
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="tw-border tw-rounded-lg tw-px-3 tw-py-1 disabled:tw-opacity-50"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericTable;
