import React, { useState } from "react";
import {
  useGetBatchesQuery,
  useDeleteBatchMutation,
} from "../../../../Services/admin/batchdetailsService";
import { useModal, MODAL_TYPES } from "../Modals/ModalContext";
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
      <div className="tw-flex tw-justify-center tw-items-center tw-h-64">
        Loading batches…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="tw-text-center tw-text-rose-600">
        Failed to load batches
      </div>
    );
  }

  return (
    <div className=" tw-space-y-8 tw-py-3">
      {/* HEADER */}
      <div className="tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 className="tw-text-2xl tw-font-bold">Batch Management</h1>
          <p className="tw-text-sm tw-text-slate-500">
            {pagination?.total || batches.length} total batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.CREATE_BATCH)}
          className="tw-flex tw-items-center tw-gap-2 tw-bg-indigo-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
        >
          <FiPlus /> Create Batch
        </button>
      </div>
      <div className="tw-flex tw-gap-2 tw-flex-wrap">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setStatus(tab.key);
              setPage(1);
            }}
            className={`tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm ${status === tab.key
                ? "tw-bg-indigo-600 tw-text-white"
                : "tw-bg-white tw-border"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>



      {/* VIEW TOGGLE */}
      <div className="tw-flex tw-gap-2">
        {[
          { key: "cards", icon: FiGrid },
          { key: "table", icon: FiList },
        ].map(({ key, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setView(key)}
            className={`tw-px-3 tw-py-2 tw-rounded-lg ${view === key
              ? "tw-bg-indigo-600 tw-text-white"
              : "tw-bg-white tw-border"
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
  <div className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
    {batches.map((batch) => (
      <div
        key={batch._id}
        className="tw-rounded-xl tw-border tw-bg-white tw-p-5 tw-shadow-sm hover:tw-shadow-md tw-transition"
      >
        {/* ===== HEADER ===== */}
        <div className="tw-flex tw-items-start tw-justify-between">
          <div>
            <h3 className="tw-font-semibold tw-text-slate-900">
              {batch.batchName}
            </h3>

            <div className="tw-mt-1 tw-flex tw-items-center tw-gap-1 tw-text-xs tw-text-slate-500">
              <FiBookOpen size={12} />
              {batch.courseId?.name || "Unknown Course"}
            </div>
          </div>

          {/* STATUS */}
          <span
            className={`tw-rounded-full tw-px-2 tw-py-0.5 tw-text-xs tw-font-medium
              ${batch.status === "active"
                ? "tw-bg-emerald-50 tw-text-emerald-600"
                : "tw-bg-rose-50 tw-text-rose-600"
              }
            `}
          >
            {batch.status}
          </span>
        </div>

        {/* ===== DATES ===== */}
        <div className="tw-mt-4 tw-space-y-1 tw-text-xs tw-text-slate-500">
          <div className="tw-flex tw-items-center tw-gap-1">
            <FiCalendar size={12} />
            <span>
              Start:{" "}
              {batch.startDate
                ? new Date(batch.startDate).toLocaleDateString()
                : "—"}
            </span>
          </div>

          <div className="tw-flex tw-items-center tw-gap-1">
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
        <div className="tw-mt-5 tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-gap-2">
            
               <ActionBtn icon={FiUsers} onClick={() => onViewStudents(batch._id)} />
            <ActionBtn icon={FiEdit} onClick={() => onEdit(batch)} />
            <ActionBtn
              icon={FiTrash2}
              danger
              onClick={() => onDelete(batch._id, batch.batchName)}
            />
          </div>

          <span className="tw-text-xs tw-text-slate-400">
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
        <p className="tw-font-medium tw-text-slate-900">
          {info.getValue()}
        </p>
      ),
    },

    {
      id: "courseName",
      header: "Course",
      accessorFn: (row) => row.courseId?.name ?? "Unknown",
      cell: (info) => (
        <span className="tw-bg-indigo-50 tw-text-indigo-600 tw-px-2 tw-py-1 tw-rounded-full tw-text-xs">
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
          <div className="tw-text-xs tw-text-slate-600 tw-space-y-1">
            <div className="tw-flex tw-items-center tw-gap-1">
              <FiCalendar size={12} />
              <span>
                {startDate
                  ? new Date(startDate).toLocaleDateString()
                  : "—"}
              </span>
            </div>
            <div className="tw-flex tw-items-center tw-gap-1">
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
          active: "tw-bg-emerald-50 tw-text-emerald-600",
          completed: "tw-bg-blue-50 tw-text-blue-600",
          cancelled: "tw-bg-rose-50 tw-text-rose-600",
          inactive: "tw-bg-slate-100 tw-text-slate-600",
        };

        return (
          <span
            className={`tw-rounded-full tw-px-3 tw-py-1 tw-text-xs tw-font-semibold capitalize
          ${statusStyles[status] || "tw-bg-gray-100 tw-text-gray-600"}
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
        <span className="tw-text-xs tw-text-slate-500">
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
          <div className="tw-flex tw-justify-start tw-gap-3">
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
    <div className="tw-bg-white tw-border tw-rounded-xl tw-overflow-hidden">
      <table className="tw-w-full tw-text-sm">
        <thead className="tw-bg-slate-50 tw-text-slate-600">
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th
                  key={header.id}
                  className="tw-p-4 tw-text-left tw-font-semibold"
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
              className="tw-border-t hover:tw-bg-slate-50"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="tw-p-4 align-top">
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
      <div className="tw-flex tw-justify-between tw-items-center tw-p-4 tw-border-t">
        <span className="tw-text-sm tw-text-slate-600">
          Page {page} of {pagination?.totalPages}
        </span>

        <div className="tw-flex tw-gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="tw-border tw-rounded-lg tw-px-3 tw-py-1 disabled:tw-opacity-50"
          >
            Prev
          </button>

          <button
            disabled={page === pagination?.totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="tw-border tw-rounded-lg tw-px-3 tw-py-1 disabled:tw-opacity-50"
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
    className={`tw-p-2 tw-rounded-lg ${danger
      ? "tw-text-rose-600 hover:tw-bg-rose-50"
      : "tw-text-slate-600 hover:tw-bg-slate-100"
      }`}
  >
    <Icon size={16} />
  </button>
);
