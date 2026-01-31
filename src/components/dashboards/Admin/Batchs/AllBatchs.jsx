import React, { useState } from "react";
import {
  useGetIdAndBatchNamesQuery,
  useDeleteBatchMutation,
  useGetBatchstudentsQuery,
} from "../../../../Services/admin/batchdetailsService";
import { useModal, MODAL_TYPES } from "../Modals/ModalContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import * as XLSX from 'xlsx';

const BatchList = () => {
  const { data: batches = [], isLoading, isError, refetch: refetchBatches } = useGetIdAndBatchNamesQuery();
  const [deleteBatch] = useDeleteBatchMutation();
  const { openModal } = useModal();
  const [expandedBatch, setExpandedBatch] = useState(null);
  const [selectedBatchName, setSelectedBatchName] = useState("");
  const [activeTab, setActiveTab] = useState("cards"); // "cards" or "table"

  const handleDelete = async (batchId, batchName) => {
    if (window.confirm(`Are you sure you want to delete the batch "${batchName}"?`)) {
      try {
        await deleteBatch(batchId).unwrap();
        toast.success("Batch deleted successfully");
        refetchBatches();
        if (expandedBatch === batchId) {
          setExpandedBatch(null);
          setSelectedBatchName("");
        }
      } catch (err) {
        toast.error("Failed to delete batch");
      }
    }
  };

  const handleViewStudents = (batchId, batchName) => {
    if (expandedBatch === batchId) {
      setExpandedBatch(null);
      setSelectedBatchName("");
    } else {
      setExpandedBatch(batchId);
      setSelectedBatchName(batchName);
    }
  };

  if (isLoading) return (
    <div className="dashboard-app-container d-flex justify-content-center align-items-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
      <span className="ms-2 text-muted">Loading batches...</span>
    </div>
  );
  
  if (isError) return (
    <div className="dashboard-app-container text-center py-5">
      <div className="text-error fs-lg">Failed to load batches.</div>
      <button className="btn btn-primary mt-2" onClick={refetchBatches}>
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Batch Management</h2>
          <p className="text-muted">Manage and view all student batches</p>
        </div>
        <button
          className="btn btn-primary d-flex align-items-center gap-2"
          onClick={() => openModal(MODAL_TYPES.CREATE_BATCH, { mode: "add" })}
        >
          <i className="fas fa-plus"></i>
          Create New Batch
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="card shadow-sm mb-4">
        <div className="card-body p-0">
          <div className="d-flex border-bottom">
            <button
              className={`tab-btn ${activeTab === "cards" ? "active" : ""} btn`}
              onClick={() => setActiveTab("cards")}
            >
              <i className="fas fa-th-large me-2"></i>
              Card View
            </button>
            <button
              className={`tab-btn ${activeTab === "table" ? "active" : ""} btn`}
              onClick={() => setActiveTab("table")}
            >
              <i className="fas fa-table me-2"></i>
              Table View
            </button>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        {activeTab === "cards" ? (
          <motion.div
            key="cards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CardsView
              batches={batches}
              expandedBatch={expandedBatch}
              selectedBatchName={selectedBatchName}
              onViewStudents={handleViewStudents}
              onEdit={(batch) => openModal(MODAL_TYPES.CREATE_BATCH, { mode: "edit", batch })}
              onDelete={handleDelete}
            />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TableView
              batches={batches}
              onEdit={(batch) => openModal(MODAL_TYPES.CREATE_BATCH, { mode: "edit", batch })}
              onDelete={handleDelete}
              onViewStudents={handleViewStudents}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Table Expansion */}
      <AnimatePresence>
        {expandedBatch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <StudentTableSection 
              batchId={expandedBatch} 
              batchName={selectedBatchName}
              onClose={() => {
                setExpandedBatch(null);
                setSelectedBatchName("");
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {batches.length === 0 && (
        <div className="card shadow-sm text-center py-5">
          <div className="card-body">
            <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
            <h4 className="text-dark mb-2">No batches created yet</h4>
            <p className="text-muted mb-4">Get started by creating your first batch of students</p>
            <button
              className="btn btn-primary"
              onClick={() => openModal(MODAL_TYPES.CREATE_BATCH, { mode: "add" })}
            >
              Create Your First Batch
            </button>
          </div>
        </div>
      )}

   
    </div>
  );
};

// Cards View Component
const CardsView = ({ batches, expandedBatch, selectedBatchName, onViewStudents, onEdit, onDelete }) => (
  <div className="row g-4">
    {batches.map((batch) => (
      <div key={batch._id} className="col-xl-4 col-lg-6 col-md-6">
        <motion.div
          className="card shadow-sm h-100 border-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="card-body d-flex flex-column p-4">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" 
                   style={{ width: '40px', height: '40px' }}>
                <i className="fas fa-users text-white"></i>
              </div>
              <div>
                <h5 className="card-title fw-bold text-dark mb-0">{batch.batchName}</h5>
                <small className="text-muted">Batch ID: {batch._id.slice(-8)}</small>
              </div>
            </div>

            <div className="mt-auto">
              <div className="d-flex gap-2 flex-wrap">
                <button
                  className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                  onClick={() => onEdit(batch)}
                >
                  
                  Edit
                </button>
                <button
                  className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                  onClick={() => onDelete(batch._id, batch.batchName)}
                >
                  
                  Delete
                </button>
                <button
                  className={`btn btn-sm d-flex align-items-center gap-1 ${
                    expandedBatch === batch._id ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => onViewStudents(batch._id, batch.batchName)}
                >
                 
                  {expandedBatch === batch._id ? "Hide Students" : "View Students"}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    ))}
  </div>
);

// Table View Component
const TableView = ({ batches, onEdit, onDelete, onViewStudents }) => (
  <div className="card shadow-sm">
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-4">Batch Name</th>
              <th scope="col">Batch ID</th>
              <th scope="col">Created</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch, index) => (
              <motion.tr
                key={batch._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <td className="ps-4 fw-semibold text-dark">{batch.batchName}</td>
                <td>
                  <code className="text-muted">{batch._id.slice(-8)}</code>
                </td>
                <td className="text-muted">
                  {new Date(batch.createdAt || Date.now()).toLocaleDateString()}
                </td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <button
                      className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1"
                      onClick={() => onEdit(batch)}
                    >
                      <i className="fas fa-edit"></i>
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                      onClick={() => onDelete(batch._id, batch.batchName)}
                    >
                      <i className="fas fa-trash"></i>
                      Delete
                    </button>
                    <button
                      className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                      onClick={() => onViewStudents(batch._id, batch.batchName)}
                    >
                      <i className="fas fa-users"></i>
                      Students
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// Student Table Section with Excel Download
const StudentTableSection = ({ batchId, batchName, onClose }) => {
  const { data, isLoading, isError, refetch } = useGetBatchstudentsQuery(batchId, {
    refetchOnMountOrArgChange: true,
  });

  const downloadExcel = () => {
    const students = data?.students || data?.enrollments || data || [];
    console.log(students)
    
    if (students.length === 0) {
      toast.error("No students data to download");
      return;
    }

    const worksheetData = students.map((enrollment, index) => {
      const user = enrollment.user || enrollment || {};
      const course = enrollment.course || {};
      
      return {
        'S.No': index + 1,
        'Student Name': user.name || 'N/A',
        'Email': user.email || 'N/A',
        'Role': user.role || 'Unknown',
        'Course': course.name || 'No course assigned',
        'Student ID': enrollment.id || 'N/A',
        'Batch': batchName
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    
    XLSX.writeFile(workbook, `${batchName}_students.xlsx`);
    toast.success("Excel file downloaded successfully");
  };

  return (
    <div className="card shadow-lg border-0">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-0 fw-bold">
            <i className="fas fa-users me-2"></i>
            Students in {batchName}
          </h5>
          <small>{batchId}</small>
        </div>
        <div className="d-flex gap-2">
          <button 
            className="btn btn-success btn-sm d-flex align-items-center gap-1"
            onClick={downloadExcel}
            disabled={isLoading}
          >
            <i className="fas fa-download"></i>
            Download Excel
          </button>
          <button 
            className="btn btn-light btn-sm"
            onClick={onClose}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      <div className="card-body p-0">
        <StudentTable key={batchId} batchId={batchId} data={data} />
      </div>
    </div>
  );
};

// Student Table Component
const StudentTable = ({ batchId, data }) => {
  const { isLoading, isError, refetch } = useGetBatchstudentsQuery(batchId, {
    refetchOnMountOrArgChange: true,
  });

  if (isError) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-exclamation-triangle fa-2x text-danger mb-3"></i>
        <p className="text-danger mb-2">Failed to load students.</p>
        <button className="btn btn-primary btn-sm" onClick={refetch}>
          <i className="fas fa-redo me-1"></i>
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) return (
    <div className="text-center py-5">
      <div className="spinner-border text-primary" role="status"></div>
      <p className="mt-2 text-muted">Loading students...</p>
    </div>
  );
  
  const students = data?.students || data?.enrollments || data || [];
  
  if (!students.length) return (
    <div className="alert alert-info text-center m-4">
      <i className="fas fa-info-circle me-2"></i>
      No students found in this batch.
    </div>
  );

  return (
    <div className="table-responsive">
      <table className="table table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col" className="ps-4">#</th>
            <th scope="col">Student Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Course</th>
            <th scope="col">Student ID</th>
          </tr>
        </thead>
        <tbody>
          {students.map((enrollment, index) => {
            const user = enrollment.user || enrollment || {};
            const course = enrollment.course || {};
            
            return (
              <motion.tr
                key={user.id || enrollment._id || index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <td className="ps-4 fw-medium">{index + 1}</td>
                <td className="fw-semibold text-dark">{user.name || 'N/A'}</td>
                <td>{user.email || 'N/A'}</td>
                <td>
                  <span className={`badge ${
                    user.role === 'admin' ? 'bg-danger' : 
                    user.role === 'teacher' ? 'bg-warning' : 
                    user.role === 'student' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {user.role || 'Unknown'}
                  </span>
                </td>
                <td>{enrollment.course || 'No course assigned'}</td>
                <td className="text-muted">
                  <code>{enrollment.id || user._id?.slice(-8) || 'N/A'}</code>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BatchList;