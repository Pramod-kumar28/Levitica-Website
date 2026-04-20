import React, { useState } from "react";
import {
  useGetBatchesQuery,
  useDeleteBatchMutation,
} from '@/Services/admin/batchdetailsService';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { useTheme } from '@/context/ThemeContext';
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiGrid,
  FiList,
  FiBookOpen,
  FiCalendar,
} from "react-icons/fi";


import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";




const STATUS_TABS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "inactive", label: "Inactive" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

/* ================= MAIN ================= */

const BatchManagement = () => {
  const { openModal } = useModal();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [view, setView] = useState("cards");
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");
  const limit = 10;


  const { data, isLoading, isError } = useGetBatchesQuery({
    page,
    limit,
    ...(status !== "all" ? { status } : {}),
  });
  const [deleteBatch] = useDeleteBatchMutation();

  const batches = data?.data || [];
  const pagination = data?.pagination;

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" batch?`)) return;
    try {
      await deleteBatch(id).unwrap();
      toast.success("Batch deleted");

    } catch {
      toast.error("Delete failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading batches…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-rose-600">
        Failed to load batches
      </div>
    );
  }

  return (
    <div className={`space-y-8 py-3 px-6 rounded-xl transition-colors ${
      isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen'
        : 'bg-white'
    }`}>
      {/* HEADER */}
      <div className="flex justify-between items-center pt-6">
        <div>
          <h1 className={`text-2xl font-bold transition-colors ${
            isDark
              ? 'text-slate-100'
              : 'text-slate-900'
          }`}>Batch Management</h1>
          <p className={`text-sm transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-slate-500'
          }`}>
            {pagination?.total || batches.length} total batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.CREATE_BATCH)}
          className={`flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-colors ${
            isDark
              ? 'bg-indigo-600 hover:bg-indigo-500'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          <FiPlus /> Create Batch
        </button>
      </div>
      <div className="flex gap-2 flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatus(tab.key);
              setPage(1);
            }}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              status === tab.key
                ? isDark
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                : isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                  : 'bg-white border text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>



      {/* VIEW TOGGLE */}
      <div className="flex gap-2">
        {[
          { key: "cards", icon: FiGrid },
          { key: "table", icon: FiList },
        ].map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`px-3 py-2 rounded-lg transition-colors ${
              view === key
                ? isDark
                  ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
                : isDark
                  ? 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'
                  : 'bg-white border text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Icon />
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="pb-6">
      <AnimatePresence mode="wait">
        {view === "cards" ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BatchCards
              batches={batches}
              isDark={isDark}
              onEdit={(batch) =>
                openModal(MODAL_TYPES.CREATE_BATCH, {
                  mode: "edit",
                  batch,
                })
              }
              onDelete={handleDelete}
              onViewStudents={(batchId) =>
                openModal(MODAL_TYPES.VIEW_BATCH_STUDENTS, { batchId })
              }
            />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BatchTable
              batches={batches}
              isDark={isDark}
              pagination={pagination}
              page={page}
              setPage={setPage}
              onEdit={(batch) =>
                openModal(MODAL_TYPES.CREATE_BATCH, {
                  mode: "edit",
                  batch,
                })
              }
              onViewStudents={(batchId) =>
                openModal(MODAL_TYPES.VIEW_BATCH_STUDENTS, { batchId })
              }
              onDelete={handleDelete}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

export default BatchManagement;

/* ================= CARDS ================= */


const BatchCards = ({ batches, isDark, onEdit, onDelete ,onViewStudents}) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {batches.map((batch) => (
      <div
        key={batch._id}
        className={`rounded-xl border p-5 shadow-sm hover:shadow-md transition ${
          isDark
            ? 'bg-slate-800 border-slate-700'
            : 'bg-white border-slate-200'
        }`}
      >
        {/* ===== HEADER ===== */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className={`font-semibold lg:text-xl text-lg transition-colors ${
              isDark
                ? 'text-slate-100'
                : 'text-slate-900'
            }`}>
              {batch.batchName}
            </h3>

            <div className={`mt-1 flex items-center gap-1 text-xs transition-colors ${
              isDark
                ? 'text-slate-400'
                : 'text-slate-500'
            }`}>
              <FiBookOpen size={12} />
              {batch.courseId?.name || "Unknown Course"}
            </div>
          </div>

          {/* STATUS */}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium transition-colors
              ${batch.status === "active"
                ? isDark
                  ? 'bg-emerald-900/30 text-emerald-400'
                  : 'bg-emerald-50 text-emerald-600'
                : isDark
                  ? 'bg-rose-900/30 text-rose-400'
                  : 'bg-rose-50 text-rose-600'
              }
            `}
          >
            {batch.status}
          </span>
        </div>

        {/* ===== DATES ===== */}
        <div className={`mt-4 space-y-1 text-xs transition-colors ${
          isDark
            ? 'text-slate-400'
            : 'text-slate-500'
        }`}>
          <div className="flex items-center gap-1">
            <FiCalendar size={12} />
            <span>
              Start:{" "}
              {batch.startDate
                ? new Date(batch.startDate).toLocaleDateString()
                : "—"}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <FiCalendar size={12} />
            <span>
              End:{" "}
              {batch.endDate
                ? new Date(batch.endDate).toLocaleDateString()
                : "—"}
            </span>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            <ActionBtn isDark={isDark} icon={FiUsers} onClick={() => onViewStudents(batch._id)} />
            <ActionBtn isDark={isDark} icon={FiEdit} onClick={() => onEdit(batch)} />
            <ActionBtn
              isDark={isDark}
              icon={FiTrash2}
              danger
              onClick={() => onDelete(batch._id, batch.batchName)}
            />
          </div>

          <span className={`text-xs transition-colors ${
            isDark
              ? 'text-slate-500'
              : 'text-slate-400'
          }`}>
            #{batch._id}
          </span>
        </div>
      </div>
    ))}
  </div>
);


/* ================= TABLE (TANSTACK) ================= */

const BatchTable = ({
  batches,
  isDark,
  pagination,
  page,
  setPage,
  onEdit,
  onDelete,
  onViewStudents
}) => {
  const columns = [
    {
      accessorKey: "batchName",
      header: "Batch",
      cell: (info) => (
        <p className={`font-medium transition-colors ${
          isDark
            ? 'text-slate-200'
            : 'text-slate-900'
        }`}>
          {info.getValue()}
        </p>
      ),
    },

    {
      id: "courseName",
      header: "Course",
      accessorFn: (row) => row.courseId?.name ?? "Unknown",
      cell: (info) => (
        <span className={`px-2 py-1 rounded-full text-xs transition-colors ${
          isDark
            ? 'bg-indigo-900/30 text-indigo-400'
            : 'bg-indigo-50 text-indigo-600'
        }`}>
          {info.getValue()}
        </span>
      ),
    },

    {
      id: "dates",
      header: "Duration",
      cell: ({ row }) => {
        const { startDate, endDate } = row.original;
        return (
          <div className={`text-xs space-y-1 transition-colors ${
            isDark
              ? 'text-slate-400'
              : 'text-slate-600'
          }`}>
            <div className="flex items-center gap-1">
              <FiCalendar size={12} />
              <span>
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "—"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <FiCalendar size={12} />
              <span>
                {endDate
                  ? new Date(endDate).toLocaleDateString()
                  : "—"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;

        const statusStyles = {
          active: isDark ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-600",
          completed: isDark ? "bg-blue-900/30 text-blue-400" : "bg-blue-50 text-blue-600",
          cancelled: isDark ? "bg-rose-900/30 text-rose-400" : "bg-rose-50 text-rose-600",
          inactive: isDark ? "bg-slate-700 text-slate-300" : "bg-slate-100 text-slate-600",
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors
          ${statusStyles[status] || isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}
        `}
          >
            {status}
          </span>
        );
      },
    },


    {
      accessorKey: "_id",
      header: "ID",
      cell: (info) => (
        <span className="text-xs text-slate-500">
          #{info.getValue()}
        </span>
      ),
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const batch = row.original;
        return (
          <div className="flex justify-start gap-3">
              <ActionBtn
            icon={FiUsers}
            onClick={() => onViewStudents(batch._id)}
          />
            <ActionBtn icon={FiEdit} onClick={() => onEdit(batch)} />
            <ActionBtn
              icon={FiTrash2}
              danger
              onClick={() => onDelete(batch._id, batch.batchName)}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: batches,
    columns,
    pageCount: pagination?.totalPages ?? -1,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: pagination?.limit || 10,
      },
    },
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function"
          ? updater({ pageIndex: page - 1, pageSize: 10 })
          : updater;

      setPage(next.pageIndex + 1);
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className={`border rounded-xl overflow-hidden transition-colors ${
      isDark
        ? 'bg-slate-800 border-slate-700'
        : 'bg-white border-slate-200'
    }`}>
      <table className="w-full text-sm">
        <thead className={`transition-colors ${
          isDark
            ? 'bg-slate-700 text-slate-300'
            : 'bg-slate-50 text-slate-600'
        }`}>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-left font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className={`divide-y transition-colors ${
          isDark
            ? 'divide-slate-700'
            : 'divide-slate-200'
        }`}>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`transition-colors ${
                isDark
                  ? 'hover:bg-slate-700'
                  : 'hover:bg-slate-50'
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4 align-top">
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

      {/* PAGINATION */}
      <div className={`flex justify-between items-center p-4 border-t transition-colors ${
        isDark
          ? 'border-slate-700'
          : 'border-slate-200'
      }`}>
        <span className={`text-sm transition-colors ${
          isDark
            ? 'text-slate-400'
            : 'text-slate-600'
        }`}>
          Page {page} of {pagination?.totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className={`rounded-lg px-3 py-1 transition-colors disabled:opacity-50 border ${
              isDark
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                : 'border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Prev
          </button>

          <button
            disabled={page === pagination?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`rounded-lg px-3 py-1 transition-colors disabled:opacity-50 border ${
              isDark
                ? 'border-slate-600 text-slate-300 hover:bg-slate-700'
                : 'border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};



/* ================= SHARED ================= */

const ActionBtn = ({ icon: Icon, onClick, danger, isDark }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg transition-colors ${
      danger
        ? isDark
          ? 'text-rose-400 hover:bg-rose-900/30'
          : 'text-rose-600 hover:bg-rose-50'
        : isDark
          ? 'text-slate-400 hover:bg-slate-700'
          : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    <Icon size={16} />
  </button>
);
