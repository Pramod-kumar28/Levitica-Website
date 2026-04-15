import React, { useState } from "react";
import {
  useGetBatchesQuery,
  useDeleteBatchMutation,
} from '@/Services/admin/batchdetailsService';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
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
    <div className=" space-y-8 py-3">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Batch Management</h1>
          <p className="text-sm text-slate-500">
            {pagination?.total || batches.length} total batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.CREATE_BATCH)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
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
            className={`px-4 py-2 rounded-lg text-sm ${status === tab.key
                ? "bg-indigo-600 text-white"
                : "bg-white border"
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
            className={`px-3 py-2 rounded-lg ${view === key
              ? "bg-indigo-600 text-white"
              : "bg-white border"
              }`}
          >
            <Icon />
          </button>
        ))}
      </div>

      {/* CONTENT */}
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
  );
};

export default BatchManagement;

/* ================= CARDS ================= */


const BatchCards = ({ batches, onEdit, onDelete ,onViewStudents}) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {batches.map((batch) => (
      <div
        key={batch._id}
        className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
      >
        {/* ===== HEADER ===== */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold lg:text-xl text-lg text-slate-900">
              {batch.batchName}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <FiBookOpen size={12} />
              {batch.courseId?.name || "Unknown Course"}
            </div>
          </div>

          {/* STATUS */}
          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium
              ${batch.status === "active"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
              }
            `}
          >
            {batch.status}
          </span>
        </div>

        {/* ===== DATES ===== */}
        <div className="mt-4 space-y-1 text-xs text-slate-500">
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
            
               <ActionBtn icon={FiUsers} onClick={() => onViewStudents(batch._id)} />
            <ActionBtn icon={FiEdit} onClick={() => onEdit(batch)} />
            <ActionBtn
              icon={FiTrash2}
              danger
              onClick={() => onDelete(batch._id, batch.batchName)}
            />
          </div>

          <span className="text-xs text-slate-400">
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
        <p className="font-medium text-slate-900">
          {info.getValue()}
        </p>
      ),
    },

    {
      id: "courseName",
      header: "Course",
      accessorFn: (row) => row.courseId?.name ?? "Unknown",
      cell: (info) => (
        <span className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs">
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
          <div className="text-xs text-slate-600 space-y-1">
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
          active: "bg-emerald-50 text-emerald-600",
          completed: "bg-blue-50 text-blue-600",
          cancelled: "bg-rose-50 text-rose-600",
          inactive: "bg-slate-100 text-slate-600",
        };

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize
          ${statusStyles[status] || "bg-gray-100 text-gray-600"}
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
    <div className="bg-white border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-slate-600">
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

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-t hover:bg-slate-50"
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
      <div className="flex justify-between items-center p-4 border-t">
        <span className="text-sm text-slate-600">
          Page {page} of {pagination?.totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="border rounded-lg px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page === pagination?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="border rounded-lg px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};



/* ================= SHARED ================= */

const ActionBtn = ({ icon: Icon, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`p-2 rounded-lg ${danger
      ? "text-rose-600 hover:bg-rose-50"
      : "text-slate-600 hover:bg-slate-100"
      }`}
  >
    <Icon size={16} />
  </button>
);
