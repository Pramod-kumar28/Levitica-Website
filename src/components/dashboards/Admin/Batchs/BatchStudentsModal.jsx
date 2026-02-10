import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useGetBatchstudentsQuery } from "../../../../Services/admin/batchdetailsService";

const BatchStudentsModal = ({ batchId, handleClose }) => {
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
          <span className="tw-capitalize">{info.getValue()}</span>
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
        className="tw-fixed tw-inset-0 tw-z-[1200] tw-flex tw-items-center tw-justify-center tw-bg-slate-900/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="tw-bg-white tw-rounded-xl tw-w-full tw-max-w-4xl tw-shadow-xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          {/* HEADER */}
          <div className="tw-flex tw-justify-between tw-items-center tw-border-b tw-p-4">
            <h2 className="tw-font-semibold">Batch Students</h2>
            <button onClick={handleClose}>
              <FiX />
            </button>
          </div>

          {/* TABLE */}
          <div className="tw-p-4 tw-overflow-x-auto">
            {isLoading ? (
              <p>Loading students…</p>
            ) : (
              <table className="tw-w-full tw-text-sm">
                <thead className="tw-bg-slate-50">
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((header) => (
                        <th
                          key={header.id}
                          className="tw-p-3 tw-text-left tw-cursor-pointer"
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
                    <tr key={row.id} className="tw-border-t">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="tw-p-3">
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
          <div className="tw-flex tw-justify-between tw-items-center tw-border-t tw-p-4">
            <span className="tw-text-sm">
              Page {page} of {pagination?.totalPages || 1}
            </span>
            <div className="tw-flex tw-gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="tw-border tw-px-3 tw-py-1 tw-rounded"
              >
                Prev
              </button>
              <button
                disabled={page === pagination?.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="tw-border tw-px-3 tw-py-1 tw-rounded"
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
