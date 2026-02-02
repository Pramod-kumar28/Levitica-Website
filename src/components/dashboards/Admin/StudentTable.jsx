// import {
//   getCoreRowModel,
//   getSortedRowModel,
//   getPaginationRowModel,
// } from "@tanstack/table-core";
// import { useReactTable, flexRender } from "@tanstack/react-table";
// import { useMemo, useState } from "react";
// import {
//   FiUsers,
//   FiBookOpen,
//   FiLayers,
//   FiCheckSquare,
//   FiTrash2,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";

// const StudentTable = ({
//   students = [],
//   availableCourses = [],
//   availableBatches = [],
//   showAssignControls = false,
//   showBatchColumn = false,
//   onAssignBatch,
//   onRemove,
// }) => {
//   const [selectedCourse, setSelectedCourse] = useState("All");
//   const [selectedBatch, setSelectedBatch] = useState("");
//   const [rowSelection, setRowSelection] = useState({});

//   /* -------------------- DATA -------------------- */
//   const flattenedStudents = useMemo(() => {
//     return students.flatMap((student) =>
//       student.courses?.length
//         ? student.courses.map((course) => ({
//             ...student,
//             courseName: course.title || "No Course",
//             batchName: course.batchId || "Unassigned",
//           }))
//         : [{ ...student, courseName: "No Course", batchName: "Unassigned" }]
//     );
//   }, [students]);

//   const filteredData = useMemo(() => {
//     if (selectedCourse === "All") return flattenedStudents;
//     return flattenedStudents.filter((s) =>
//       selectedCourse === "No Course"
//         ? s.courseName === "No Course"
//         : s.courseName?.toLowerCase().includes(selectedCourse.toLowerCase())
//     );
//   }, [flattenedStudents, selectedCourse]);

//   /* -------------------- COLUMNS -------------------- */
//   const columns = useMemo(
//     () =>
//       [
//         showAssignControls && {
//           id: "select",
//           header: ({ table }) => (
//             <input
//               type="checkbox"
//               className="tw-accent-blue-600"
//               checked={table.getIsAllPageRowsSelected()}
//               onChange={table.getToggleAllPageRowsSelectedHandler()}
//             />
//           ),
//           cell: ({ row }) => (
//             <input
//               type="checkbox"
//               className="tw-accent-blue-600"
//               checked={row.getIsSelected()}
//               onChange={row.getToggleSelectedHandler()}
//             />
//           ),
//         },
//         {
//           accessorKey: "name",
//           header: "Student Name",
//         },
//         {
//           accessorKey: "email",
//           header: "Email",
//         },
//         {
//           accessorKey: "courseName",
//           header: "Course",
//         },
//         showBatchColumn && {
//           accessorKey: "batchName",
//           header: "Batch",
//         },
//         showAssignControls && {
//           id: "action",
//           header: "Action",
//           cell: ({ row }) => (
//             <button
//               disabled={!selectedBatch}
//               onClick={() =>
//                 onAssignBatch?.([
//                   {
//                     studentId: row.original.email,
//                     courseTitle: row.original.courseName,
//                     batchName: selectedBatch,
//                   },
//                 ])
//               }
//               className="tw-text-blue-600 hover:tw-underline disabled:tw-opacity-40"
//             >
//               Assign
//             </button>
//           ),
//         },
//       ].filter(Boolean),
//     [showAssignControls, showBatchColumn, selectedBatch, onAssignBatch]
//   );

//   /* -------------------- TABLE -------------------- */
//   const table = useReactTable({
//     data: filteredData,
//     columns,
//     state: showAssignControls ? { rowSelection } : {},
//     onRowSelectionChange: showAssignControls ? setRowSelection : undefined,
//     enableRowSelection: showAssignControls,
//     getRowId: (row) => `${row.email}_${row.courseName}`,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   const selectedStudents = table
//     .getSelectedRowModel()
//     .flatRows.map((row) => row.original);

//   const handleBulkAssign = () => {
//     const payload = selectedStudents.map((s) => ({
//       studentId: s.email,
//       courseTitle: s.courseName,
//       batchName: selectedBatch,
//     }));
//     onAssignBatch?.(payload);
//   };

//   return (
//     <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-sm">
//       {/* ================= FILTER BAR ================= */}
//       <div className="tw-p-4 tw-border-b tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4">
//         <div className="tw-flex tw-gap-3 tw-items-center">
//           <FiBookOpen className="tw-text-gray-500" />
//           <select
//             value={selectedCourse}
//             onChange={(e) => setSelectedCourse(e.target.value)}
//             className="tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm"
//           >
//             <option value="All">All Courses</option>
//             {availableCourses.map((c) => (
//               <option key={c} value={c}>
//                 {c}
//               </option>
//             ))}
//             <option value="No Course">No Course</option>
//           </select>

//           {showAssignControls && (
//             <>
//               <FiLayers className="tw-text-gray-500" />
//               <select
//                 value={selectedBatch}
//                 onChange={(e) => setSelectedBatch(e.target.value)}
//                 className="tw-border tw-rounded-lg tw-px-3 tw-py-2 tw-text-sm"
//               >
//                 <option value="">Select Batch</option>
//                 {availableBatches.map((b) => (
//                   <option key={b} value={b}>
//                     {b}
//                   </option>
//                 ))}
//               </select>
//             </>
//           )}
//         </div>

//         {showAssignControls && (
//           <div className="tw-flex tw-gap-2">
//             <button
//               onClick={handleBulkAssign}
//               disabled={!selectedBatch || selectedStudents.length === 0}
//               className="tw-flex tw-items-center tw-gap-2 tw-bg-blue-600 hover:tw-bg-blue-700 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg disabled:tw-opacity-50"
//             >
//               <FiCheckSquare />
//               Assign Selected
//             </button>
//             <button
//               onClick={() => onRemove?.(selectedStudents)}
//               disabled={selectedStudents.length === 0}
//               className="tw-flex tw-items-center tw-gap-2 tw-bg-red-500 hover:tw-bg-red-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg disabled:tw-opacity-50"
//             >
//               <FiTrash2 />
//               Remove
//             </button>
//           </div>
//         )}
//       </div>

//       {/* ================= TABLE ================= */}
//       <div className="tw-overflow-x-auto">
//         <table className="tw-w-full tw-text-sm">
//           <thead className="tw-bg-gray-50">
//             {table.getHeaderGroups().map((hg) => (
//               <tr key={hg.id}>
//                 {hg.headers.map((header) => (
//                   <th
//                     key={header.id}
//                     className="tw-px-4 tw-py-3 tw-text-left tw-font-semibold tw-text-gray-700"
//                   >
//                     {flexRender(
//                       header.column.columnDef.header,
//                       header.getContext()
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr
//                 key={row.id}
//                 className="hover:tw-bg-gray-50 tw-border-t"
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="tw-px-4 tw-py-3">
//                     {flexRender(
//                       cell.column.columnDef.cell,
//                       cell.getContext()
//                     )}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* ================= PAGINATION ================= */}
//       <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-t">
//         <span className="tw-text-sm tw-text-gray-500">
//           Page {table.getState().pagination.pageIndex + 1} of{" "}
//           {table.getPageCount()}
//         </span>
//         <div className="tw-flex tw-gap-2">
//           <button
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//             className="tw-px-3 tw-py-2 tw-border tw-rounded-lg disabled:tw-opacity-50"
//           >
//             <FiChevronLeft />
//           </button>
//           <button
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//             className="tw-px-3 tw-py-2 tw-border tw-rounded-lg disabled:tw-opacity-50"
//           >
//             <FiChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentTable;
