import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useGetBatchstudentsQuery } from '@/Services/admin/batchdetailsService';

const BatchStudentsModal = ({ batchId, handleClose }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState([]);
  const limit = 10;

  const { data, isLoading } = useGetBatchstudentsQuery({
    batchId,
    page,
    limit,
  });

  const students = data?.students || [];
  const pagination = data?.pagination;

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Student Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "course",
        header: "Course",
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (info) => (
          <span className="capitalize">{info.getValue()}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: students,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-999 flex items-center justify-center bg-midnight_text/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`rounded-lg w-full max-w-4xl shadow-property transition-all duration-150 ${
            isDark
              ? 'bg-semidark border border-dark_border'
              : 'bg-white border border-border'
          }`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {/* HEADER */}
          <div className={`flex justify-between items-center border-b p-4 transition-colors duration-150 ${
            isDark
              ? 'border-dark_border'
              : 'border-border'
          }`}>
            <h2 className={`font-semibold text-lg transition-colors duration-150 ${
              isDark
                ? 'text-light'
                : 'text-midnight_text'
            }`}>
              Batch Students
            </h2>
            <button 
              onClick={handleClose} 
              className={`p-2 rounded-lg transition-all duration-150 ${
                isDark
                  ? 'hover:bg-darklight text-gray hover:text-light'
                  : 'hover:bg-light text-gray hover:text-midnight_text'
              }`}
            >
              <FiX className="text-lg" />
            </button>
          </div>

          {/* TABLE */}
          <div className={`p-4 overflow-x-auto transition-colors duration-150 ${isDark ? 'bg-semidark' : 'bg-white'}`}>
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className={`text-center transition-colors duration-150 ${
                  isDark ? 'text-light' : 'text-midnight_text'
                }`}>
                  Loading students...
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className={`text-center py-8 transition-colors duration-150 ${
                isDark ? 'text-gray' : 'text-gray'
              }`}>
                No students found in this batch
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead className={`transition-colors duration-150 ${
                  isDark
                    ? 'bg-darklight'
                    : 'bg-light'
                }`}>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`p-3 text-left cursor-pointer transition-all duration-150 font-semibold ${
                            isDark
                              ? 'text-light hover:text-primary'
                              : 'text-midnight_text hover:text-primary'
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " ↑",
                            desc: " ↓",
                          }[header.column.getIsSorted()] ?? null}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr 
                      key={row.id} 
                      className={`border-t transition-all duration-150 ${
                        isDark
                          ? 'border-dark_border hover:bg-darklight/50'
                          : 'border-border hover:bg-light/50'
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td 
                          key={cell.id} 
                          className={`p-3 transition-colors duration-150 ${
                            isDark
                              ? 'text-light'
                              : 'text-midnight_text'
                          }`}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* PAGINATION */}
          {pagination && pagination.totalPages > 1 && (
            <div className={`flex justify-between items-center border-t p-4 transition-colors duration-150 ${
              isDark
                ? 'border-dark_border bg-semidark'
                : 'border-border bg-white'
            }`}>
              <span className={`text-sm transition-colors duration-150 ${
                isDark
                  ? 'text-darkgray'
                  : 'text-gray'
              }`}>
                Page {page} of {pagination?.totalPages || 1}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className={`px-3 py-1 rounded-lg border transition-all duration-150 text-sm font-medium ${
                    isDark
                      ? 'border-dark_border bg-semidark text-light hover:bg-darklight disabled:opacity-40 disabled:cursor-not-allowed'
                      : 'border-border bg-white text-midnight_text hover:bg-light disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  Previous
                </button>
                <button
                  disabled={page === pagination?.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className={`px-3 py-1 rounded-lg border transition-all duration-150 text-sm font-medium ${
                    isDark
                      ? 'border-dark_border bg-semidark text-light hover:bg-darklight disabled:opacity-40 disabled:cursor-not-allowed'
                      : 'border-border bg-white text-midnight_text hover:bg-light disabled:opacity-40 disabled:cursor-not-allowed'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BatchStudentsModal;