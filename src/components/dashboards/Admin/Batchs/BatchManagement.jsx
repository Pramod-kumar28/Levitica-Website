import React, { useState } from "react";
import {
  useGetIdAndBatchNamesQuery,
  useDeleteBatchMutation,
  useGetBatchstudentsQuery,
} from "../../../../Services/admin/batchdetailsService";
import { useModal, MODAL_TYPES } from "../Modals/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import * as XLSX from "xlsx";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiUsers,
  FiGrid,
  FiList,
  FiDownload,
  FiX,
  FiRefreshCw,
} from "react-icons/fi";

const BatchManagement = () => {
  const { data: batches = [], isLoading, isError, refetch } =
    useGetIdAndBatchNamesQuery();
  const [deleteBatch] = useDeleteBatchMutation();
  const { openModal } = useModal();

  const [expandedBatch, setExpandedBatch] = useState(null);
  const [batchName, setBatchName] = useState("");
  const [view, setView] = useState("cards");

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}" batch?`)) return;
    try {
      await deleteBatch(id).unwrap();
      toast.success("Batch deleted");
      refetch();
      setExpandedBatch(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const toggleStudents = (id, name) => {
    setExpandedBatch(prev => (prev === id ? null : id));
    setBatchName(name);
  };

  /* ---------------- Loading / Error ---------------- */

  if (isLoading) {
    return (
      <div className="tw-flex tw-items-center tw-justify-center tw-h-64 tw-text-slate-500">
        Loading batches…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="tw-text-center tw-py-12">
        <p className="tw-text-rose-600">Failed to load batches</p>
        <button
          onClick={refetch}
          className="tw-mt-4 tw-inline-flex tw-items-center tw-gap-2 tw-rounded-lg tw-bg-indigo-600 tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-text-white hover:tw-bg-indigo-700"
        >
          <FiRefreshCw />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="tw-min-h-screen tw-bg-slate-50 tw-p-6 tw-space-y-8">
      {/* ================= Header ================= */}
      <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-6">
        <div>
          <h1 className="tw-text-3xl tw-font-bold tw-text-slate-900">
            Batch Management
          </h1>
          <p className="tw-mt-1 tw-text-sm tw-text-slate-500">
            Create, organize, and manage student batches
          </p>
        </div>

        <button
          onClick={() => openModal(MODAL_TYPES.CREATE_BATCH, { mode: "add" })}
          className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-xl tw-bg-gradient-to-r tw-from-indigo-600 tw-to-blue-600 tw-px-5 tw-py-3 tw-text-sm tw-font-semibold tw-text-white tw-shadow-lg hover:tw-from-indigo-700 hover:tw-to-blue-700"
        >
          <FiPlus />
          Create Batch
        </button>
      </div>

      {/* ================= Controls ================= */}
      <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-gap-4">
        <p className="tw-text-sm tw-text-slate-500">
          <span className="tw-font-medium tw-text-slate-900">
            {batches.length}
          </span>{" "}
          total batches
        </p>

        <div className="tw-inline-flex tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-p-1">
          {[
            { key: "cards", icon: FiGrid, label: "Cards" },
            { key: "table", icon: FiList, label: "Table" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-font-medium tw-transition ${
                view === key
                  ? "tw-bg-indigo-600 tw-text-white tw-shadow"
                  : "tw-text-slate-600 hover:tw-bg-slate-100"
              }`}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= Content ================= */}
      <AnimatePresence mode="wait">
        {view === "cards" ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <BatchCards
              batches={batches}
              expandedBatch={expandedBatch}
              onEdit={batch =>
                openModal(MODAL_TYPES.CREATE_BATCH, {
                  mode: "edit",
                  batch,
                })
              }
              onDelete={handleDelete}
              onView={toggleStudents}
            />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
          >
            <BatchTable
              batches={batches}
              onEdit={batch =>
                openModal(MODAL_TYPES.CREATE_BATCH, {
                  mode: "edit",
                  batch,
                })
              }
              onDelete={handleDelete}
              onView={toggleStudents}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= Students Panel ================= */}
      <AnimatePresence>
        {expandedBatch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <StudentsSection
              batchId={expandedBatch}
              batchName={batchName}
              onClose={() => setExpandedBatch(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ================= Cards ================= */

const BatchCards = ({ batches, onEdit, onDelete, onView, expandedBatch }) => (
  <div className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
    {batches.map(batch => (
      <div
        key={batch._id}
        className="tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-p-5 tw-shadow-sm hover:tw-shadow-md tw-transition"
      >
        <h3 className="tw-font-semibold tw-text-slate-900">
          {batch.batchName}
        </h3>
        <p className="tw-mt-1 tw-text-xs tw-text-slate-500">
          ID: {batch._id.slice(-8)}
        </p>

        <div className="tw-mt-4 tw-flex tw-items-center tw-justify-between">
          <div className="tw-flex tw-gap-2">
            <ActionBtn icon={FiEdit} onClick={() => onEdit(batch)} />
            <ActionBtn
              icon={FiTrash2}
              danger
              onClick={() => onDelete(batch._id, batch.batchName)}
            />
            <ActionBtn
              icon={FiUsers}
              onClick={() => onView(batch._id, batch.batchName)}
            />
          </div>

          {expandedBatch === batch._id && (
            <span className="tw-text-xs tw-font-medium tw-text-indigo-600">
              Viewing
            </span>
          )}
        </div>
      </div>
    ))}
  </div>
);

/* ================= Table ================= */

const BatchTable = ({ batches, onEdit, onDelete, onView }) => (
  <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-overflow-hidden">
    <table className="tw-w-full tw-text-sm">
      <thead className="tw-bg-slate-50 tw-text-slate-500">
        <tr>
          <th className="tw-p-4 tw-text-left">Batch</th>
          <th className="tw-p-4">ID</th>
          <th className="tw-p-4 tw-text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {batches.map(batch => (
          <tr
            key={batch._id}
            className="tw-border-t hover:tw-bg-slate-50"
          >
            <td className="tw-p-4 tw-font-medium tw-text-slate-900">
              {batch.batchName}
            </td>
            <td className="tw-p-4 tw-text-xs tw-text-slate-500">
              {batch._id.slice(-8)}
            </td>
            <td className="tw-p-4">
              <div className="tw-flex tw-justify-end tw-gap-2">
                <ActionBtn icon={FiEdit} onClick={() => onEdit(batch)} />
                <ActionBtn
                  icon={FiTrash2}
                  danger
                  onClick={() => onDelete(batch._id, batch.batchName)}
                />
                <ActionBtn
                  icon={FiUsers}
                  onClick={() => onView(batch._id, batch.batchName)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ================= Students ================= */

const StudentsSection = ({ batchId, batchName, onClose }) => {
  const { data, isLoading } = useGetBatchstudentsQuery(batchId);

  const downloadExcel = () => {
    const students = data?.students || [];
    if (!students.length) return toast.error("No data");

    const sheet = XLSX.utils.json_to_sheet(
      students.map((s, i) => ({
        "#": i + 1,
        Name: s.user?.name,
        Email: s.user?.email,
        Course: s.course?.name,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Students");
    XLSX.writeFile(wb, `${batchName}.xlsx`);
  };

  return (
    <div className="tw-rounded-xl tw-border tw-border-slate-200 tw-bg-white tw-p-6 tw-shadow-lg">
      <div className="tw-flex tw-items-center tw-justify-between tw-mb-4">
        <h3 className="tw-font-semibold tw-text-slate-900">
          Students – {batchName}
        </h3>
        <div className="tw-flex tw-gap-2">
          <button
            onClick={downloadExcel}
            className="tw-inline-flex tw-items-center tw-gap-2 tw-rounded-lg tw-border tw-border-slate-300 tw-px-3 tw-py-1.5 tw-text-sm hover:tw-bg-slate-50"
          >
            <FiDownload />
            Excel
          </button>
          <button
            onClick={onClose}
            className="tw-rounded-lg tw-p-2 tw-text-slate-500 hover:tw-bg-slate-100"
          >
            <FiX />
          </button>
        </div>
      </div>

      {isLoading ? (
        <p className="tw-text-slate-500">Loading students…</p>
      ) : (
        <div className="tw-overflow-x-auto">
          <table className="tw-w-full tw-text-sm">
            <thead className="tw-bg-slate-50 tw-text-slate-500">
              <tr>
                <th className="tw-p-3">#</th>
                <th className="tw-p-3 tw-text-left">Name</th>
                <th className="tw-p-3 tw-text-left">Email</th>
                <th className="tw-p-3 tw-text-left">Course</th>
              </tr>
            </thead>
            <tbody>
              {data?.students?.map((s, i) => (
                <tr key={i} className="tw-border-t">
                  <td className="tw-p-3">{i + 1}</td>
                  <td className="tw-p-3">{s.user?.name}</td>
                  <td className="tw-p-3">{s.user?.email}</td>
                  <td className="tw-p-3">{s.course?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ================= Shared ================= */

const ActionBtn = ({ icon: Icon, onClick, danger }) => (
  <button
    onClick={onClick}
    className={`tw-rounded-lg tw-p-2 tw-transition ${
      danger
        ? "tw-text-rose-600 hover:tw-bg-rose-50"
        : "tw-text-slate-600 hover:tw-bg-slate-100"
    }`}
  >
    <Icon />
  </button>
);

export default BatchManagement;
