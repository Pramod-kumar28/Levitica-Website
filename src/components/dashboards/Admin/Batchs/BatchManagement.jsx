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

  if (isLoading)
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-h-64">
        <span className="tw-text-gray-500">Loading batches…</span>
      </div>
    );

  if (isError)
    return (
      <div className="tw-text-center tw-py-10">
        <p className="tw-text-red-500">Failed to load batches</p>
        <button onClick={refetch} className="tw-btn-primary tw-mt-3">
          <FiRefreshCw /> Retry
        </button>
      </div>
    );

  return (
   <div className="tw-p-6 tw-space-y-8 tw-bg-slate-50 min-h-screen">

  {/* ================= HEADER ================= */}
  <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between md:tw-items-center tw-gap-6">
    <div>
      <h1 className="tw-text-3xl tw-font-extrabold tw-text-slate-800 tracking-tight">
        Batch Management
      </h1>
      <p className="tw-mt-1 tw-text-slate-500">
        Create, organize & manage student batches efficiently
      </p>
    </div>

    <button
      onClick={() => openModal(MODAL_TYPES.CREATE_BATCH, { mode: "add" })}
      className="
        tw-inline-flex tw-items-center tw-gap-2
        tw-px-5 tw-py-3
        tw-rounded-xl
        tw-font-semibold
        tw-text-white
        tw-bg-gradient-to-r tw-from-blue-600 tw-to-indigo-600
        hover:tw-from-blue-700 hover:tw-to-indigo-700
        tw-shadow-lg hover:tw-shadow-xl
        tw-transition-all
      "
    >
      <FiPlus className="tw-text-lg" />
      Create Batch
    </button>
  </div>

  {/* ================= VIEW TOGGLE ================= */}
  <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-justify-between sm:tw-items-center tw-gap-4">
    <span className="tw-text-sm tw-text-slate-500">
      <span className="tw-font-semibold tw-text-slate-700">{batches.length}</span>{" "}
      total batches
    </span>

    <div className="tw-inline-flex tw-bg-white tw-rounded-xl tw-p-1 tw-shadow-sm tw-border">
      <button
        onClick={() => setView("cards")}
        className={`
          tw-flex tw-items-center tw-gap-2
          tw-px-4 tw-py-2 tw-rounded-lg
          tw-text-sm tw-font-medium
          tw-transition
          ${
            view === "cards"
              ? "tw-bg-blue-600 tw-text-white tw-shadow"
              : "tw-text-slate-600 hover:tw-bg-slate-100"
          }
        `}
      >
        <FiGrid />
        Cards
      </button>

      <button
        onClick={() => setView("table")}
        className={`
          tw-flex tw-items-center tw-gap-2
          tw-px-4 tw-py-2 tw-rounded-lg
          tw-text-sm tw-font-medium
          tw-transition
          ${
            view === "table"
              ? "tw-bg-blue-600 tw-text-white tw-shadow"
              : "tw-text-slate-600 hover:tw-bg-slate-100"
          }
        `}
      >
        <FiList />
        Table
      </button>
    </div>
  </div>

  {/* ================= CONTENT ================= */}
  <AnimatePresence mode="wait">
    {view === "cards" ? (
      <motion.div
        key="cards"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25 }}
      >
        <BatchCards
          batches={batches}
          expandedBatch={expandedBatch}
          onEdit={(batch) =>
            openModal(MODAL_TYPES.CREATE_BATCH, { mode: "edit", batch })
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
        transition={{ duration: 0.25 }}
      >
        <BatchTable
          batches={batches}
          onEdit={(batch) =>
            openModal(MODAL_TYPES.CREATE_BATCH, { mode: "edit", batch })
          }
          onDelete={handleDelete}
          onView={toggleStudents}
        />
      </motion.div>
    )}
  </AnimatePresence>

  {/* ================= STUDENTS SECTION ================= */}
  <AnimatePresence>
    {expandedBatch && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
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

const BatchCards = ({ batches, onEdit, onDelete, onView, expandedBatch }) => (
  <div className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-6">
    {batches.map(batch => (
      <motion.div
        key={batch._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="tw-bg-white tw-border tw-rounded-xl tw-p-5 tw-shadow-sm"
      >
        <h3 className="tw-font-semibold">{batch.batchName}</h3>
        <p className="tw-text-xs tw-text-gray-500">
          ID: {batch._id.slice(-8)}
        </p>

        <div className="tw-flex tw-justify-between tw-mt-4">
          <div className="tw-flex tw-gap-3">
            <FiEdit onClick={() => onEdit(batch)} className="tw-icon-btn" />
            <FiTrash2
              onClick={() => onDelete(batch._id, batch.batchName)}
              className="tw-icon-btn tw-text-red-500"
            />
            <FiUsers
              onClick={() => onView(batch._id, batch.batchName)}
              className="tw-icon-btn"
            />
          </div>

          {expandedBatch === batch._id && (
            <span className="tw-text-xs tw-text-blue-600">Viewing</span>
          )}
        </div>
      </motion.div>
    ))}
  </div>
);



const BatchTable = ({ batches, onEdit, onDelete, onView }) => (
  <div className="tw-bg-white tw-border tw-rounded-xl tw-overflow-hidden">
    <table className="tw-w-full">
      <thead className="tw-bg-gray-50">
        <tr className="tw-text-sm tw-text-gray-500">
          <th className="tw-p-4">Batch</th>
          <th>ID</th>
          <th className="tw-text-right tw-p-4">Actions</th>
        </tr>
      </thead>
      <tbody>
        {batches.map(batch => (
          <tr key={batch._id} className="tw-border-t">
            <td className="tw-p-4">{batch.batchName}</td>
            <td className="tw-text-xs tw-text-gray-500">
              {batch._id.slice(-8)}
            </td>
            <td className="tw-p-4 tw-flex tw-justify-end tw-gap-3">
              <FiEdit onClick={() => onEdit(batch)} />
              <FiTrash2 onClick={() => onDelete(batch._id, batch.batchName)} />
              <FiUsers onClick={() => onView(batch._id, batch.batchName)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


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
    <motion.div className="tw-bg-white tw-border tw-rounded-xl tw-p-6 tw-shadow-lg">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h3 className="tw-font-semibold">Students – {batchName}</h3>
        <div className="tw-flex tw-gap-3">
          <button onClick={downloadExcel} className="tw-btn-outline">
            <FiDownload /> Excel
          </button>
          <FiX onClick={onClose} className="tw-cursor-pointer" />
        </div>
      </div>

      {isLoading ? (
        <p className="tw-text-gray-500">Loading students…</p>
      ) : (
        <div className="tw-overflow-x-auto">
          <table className="tw-w-full">
            <thead className="tw-text-sm tw-text-gray-500">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {data?.students?.map((s, i) => (
                <tr key={i} className="tw-border-t">
                  <td>{i + 1}</td>
                  <td>{s.user?.name}</td>
                  <td>{s.user?.email}</td>
                  <td>{s.course?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default BatchManagement;