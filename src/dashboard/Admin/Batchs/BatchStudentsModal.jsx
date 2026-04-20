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
        className="fixed inset-0 z-[1200] flex items-center justify-center bg-slate-900/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`rounded-xl w-full max-w-4xl shadow-xl transition-colors ${
            isDark
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white'
          }`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* HEADER */}
          <div className={`flex justify-between items-center border-b p-4 transition-colors ${
            isDark
              ? 'border-slate-700'
              : 'border-slate-200'
          }`}>
            <h2 className={`font-semibold transition-colors ${
              isDark
                ? 'text-slate-100'
                : 'text-slate-900'
            }`}>Batch Students</h2>
            <button onClick={handleClose} className={`p-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-slate-700 text-slate-400'
                : 'hover:bg-slate-100 text-slate-600'
            }`}>
              <FiX />
            </button>
          </div>

          {/* TABLE */}
          <div className={`p-4 overflow-x-auto transition-colors ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            {isLoading ? (
              <p className={`transition-colors ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Loading students…</p>
            ) : (
              <table className="w-full text-sm">
                <thead className={`transition-colors ${
                  isDark
                    ? 'bg-slate-700'
                    : 'bg-slate-50'
                }`}>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className={`p-3 text-left cursor-pointer transition-colors ${
                            isDark
                              ? 'text-slate-200 hover:text-slate-100'
                              : 'text-slate-900 hover:text-slate-700'
                          }`}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted()] ?? null}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className={`border-t transition-colors ${
                      isDark
                        ? 'border-slate-700 hover:bg-slate-700/50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}>
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className={`p-3 transition-colors ${
                          isDark
                            ? 'text-slate-300'
                            : 'text-slate-700'
                        }`}>
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
          <div className={`flex justify-between items-center border-t p-4 transition-colors ${
            isDark
              ? 'border-slate-700 bg-slate-800'
              : 'border-slate-200 bg-white'
          }`}>
            <span className={`text-sm transition-colors ${
              isDark
                ? 'text-slate-300'
                : 'text-slate-600'
            }`}>
              Page {page} of {pagination?.totalPages || 1}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className={`px-3 py-1 rounded border transition-colors ${
                  isDark
                    ? 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                Prev
              </button>
              <button
                disabled={page === pagination?.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={`px-3 py-1 rounded border transition-colors ${
                  isDark
                    ? 'border-slate-600 bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BatchStudentsModal;
