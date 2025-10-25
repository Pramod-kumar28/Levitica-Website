import React, { useState } from 'react';
import { useGetMeetingsQuery, useDeleteMeetingMutation } from '../../../../Services/admin/zoomService';
import toast from 'react-hot-toast';
 import { LayoutList, LayoutGrid } from "lucide-react"; // Lucide icons
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Play, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Plus,
  RefreshCw
} from 'lucide-react';

const AdminLiveClasses = () => {
  const { data: meetingsData, isLoading, error, refetch } = useGetMeetingsQuery();
  const [deleteMeeting] = useDeleteMeetingMutation();
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const handleStartClass = async (meetingId) => {
    try {
      window.location.href = `http://localhost:7777/api/zoom/start/${meetingId}`;
    } catch (err) {
      toast.error('Unable to join class. Please check your enrollment.');
    }
  };

  const handleDelete = async (meetingId) => {
    if (!window.confirm('Are you sure you want to delete this live class? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(meetingId);
      await deleteMeeting(meetingId).unwrap();
      toast.success('Live class deleted successfully');
      refetch();
    } catch (error) {
      console.error('Failed to delete meeting:', error);
      toast.error('Failed to delete the live class. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter meetings based on search and filters
  const filteredMeetings = meetingsData?.liveClasses?.filter(meeting => {
    const matchesSearch = searchTerm === "" || 
      meeting.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.course?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.batch?.batchName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || meeting.status === statusFilter;
    
    const matchesDate = dateFilter === "" || 
      new Date(meeting.startTime).toDateString() === new Date(dateFilter).toDateString();

    return matchesSearch && matchesStatus && matchesDate;
  }) || [];

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'ongoing':
        return <span className="badge bg-error text-white">LIVE</span>;
      case 'completed':
        return <span className="badge bg-success text-white">COMPLETED</span>;
      default:
        return <span className="badge bg-warning text-white">UPCOMING</span>;
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-app-container d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <span className="ms-2 text-muted">Loading live classes...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-app-container text-center py-5">
        <div className="text-error fs-lg">Failed to load live classes</div>
        <p className="text-muted mb-3">{error.data?.error || 'Please try again later'}</p>
        <button className="btn btn-primary" onClick={refetch}>
          <RefreshCw size={16} className="me-2" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-app-container p-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Live Classes Management</h2>
          <p className="text-muted">Create and manage all live classes</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
            <Download size={18} />
            Export
          </button>
          <button className="btn btn-primary d-flex align-items-center gap-2">
            <Plus size={18} />
            Create Meeting
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label className="form-label fw-medium text-dark mb-2">Search</label>
              <div >
          
                <input
                  type="text"
                  className="form-control ps-5"
                  placeholder="Search by title, course, or batch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="col-md-3">
              <label className="form-label fw-medium text-dark mb-2">Status</label>
              <select 
                className="form-control"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="scheduled">Upcoming</option>
                <option value="ongoing">Live</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div className="col-md-3">
              <label className="form-label fw-medium text-dark mb-2">Date</label>
              <input
                type="date"
                className="form-control"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
            
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setDateFilter("");
                }}
              >
                <Filter size={16} />
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
  

<div>
  <div className="d-flex flex-wrap align-items-center justify-content-between w-100 mb-3">
  <h5 className="text-dark mb-2 mb-md-0">View Options</h5>
  <div
    className="btn-group ms-auto text-nowrap"
    role="group"
    aria-label="View Toggle"
  >
    <button
      className={`tab-btn ${activeTab === "cards" ? "active" : ""} btn`}
      onClick={() => setActiveTab("cards")}
    >
      <div className="d-flex align-items-center gap-1">
        <LayoutGrid size={16} />
        <span className="d-none d-sm-inline">Card</span>
      </div>
    </button>
    <button
      className={`tab-btn ${activeTab === "table" ? "active" : ""} btn`}
      onClick={() => setActiveTab("table")}
    >
      <div className="d-flex align-items-center gap-1">
        <LayoutList size={16} />
        <span className="d-none d-sm-inline">Table</span>
      </div>
    </button>
  </div>
</div>
</div>

      {/* Results Count */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="text-muted">
          Showing {filteredMeetings.length} of {meetingsData?.liveClasses?.length || 0} classes
        </div>
        <button 
          className="btn btn-outline-primary btn-sm d-flex align-items-center gap-2"
          onClick={refetch}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
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
              meetings={filteredMeetings}
              onStartClass={handleStartClass}
              onDelete={handleDelete}
              deletingId={deletingId}
              formatTime={formatTime}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
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
              meetings={filteredMeetings}
              onStartClass={handleStartClass}
              onDelete={handleDelete}
              deletingId={deletingId}
              formatTime={formatTime}
              formatDate={formatDate}
              getStatusBadge={getStatusBadge}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredMeetings.length === 0 && (
        <div className="card shadow-sm text-center py-5">
          <div className="card-body">
            <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                 style={{ width: '80px', height: '80px' }}>
              <Calendar size={32} className="text-muted" />
            </div>
            <h4 className="text-dark mb-2">No live classes found</h4>
            <p className="text-muted mb-4">
              {meetingsData?.liveClasses?.length === 0 
                ? "Get started by creating your first live class" 
                : "Try adjusting your search filters"}
            </p>
            <button className="btn btn-primary">
              <Plus size={18} className="me-2" />
              Create First Class
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// Cards View Component
const CardsView = ({ meetings, onStartClass, onDelete, deletingId, formatTime, formatDate, getStatusBadge }) => (
  <div className="row g-4">
    {meetings.map((meeting) => (
      <div key={meeting._id} className='col-md-4 my-4' >
        <motion.div
          className="card  shadow-lg h-100 border-1 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="card-body d-flex flex-column p-4">
            {/* Header with Status */}
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div className="flex-grow-1">
                <h5 className="card-title fw-bold text-dark mb-2">{meeting.title}</h5>
                {getStatusBadge(meeting.status)}
              </div>
            </div>

            {/* Meeting Details */}
            <div className="mb-3 flex-grow-1">
              <div className="d-flex align-items-center gap-2 mb-2">
                <BookOpen size={16} className="text-muted mx-3" />
                <span className="text-dark fw-medium">{meeting.course?.name || 'No Course'}</span>
              </div>
              
              {meeting.batch?.batchName && (
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Users size={16} className="text-muted mx-3" />
                  <span className="text-muted">{meeting.batch.batchName}</span>
                </div>
              )}
              
              <div className="d-flex align-items-center gap-2 mb-2">
                <Calendar size={16} className="text-muted mx-3" />
                <span className="text-muted">{formatDate(meeting.startTime)}</span>
              </div>
              
              <div className="d-flex align-items-center gap-2 mb-2">
                <Clock size={16} className="text-muted mx-3" />
                <span className="text-muted">{formatTime(meeting.startTime)} • {meeting.duration} mins</span>
              </div>
              
              <div className="text-muted mx-3 small">
                Host: {meeting.hostEmail}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto">
              <div className="d-flex g-3 flex-wrap">
                {(meeting.status === 'scheduled' || meeting.status === 'ongoing') && (
                  <button
                    className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                    onClick={() => onStartClass(meeting._id)}
                  >
                    
                    {meeting.status === 'ongoing' ? 'Join' : 'Start'}
                  </button>
                )}
                
                <button className="btn btn-outline-primary btn-sm mx-2">
                  <Edit size={14} />
                  Edit
                </button>
                
                <button
                  className="btn btn-outline-danger btn-sm "
                  onClick={() => onDelete(meeting._id)}
                  disabled={deletingId === meeting._id}
                >
                  <Trash2 size={14} />
                  {deletingId === meeting._id ? 'Deleting...' : 'Delete'}
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
const TableView = ({ meetings, onStartClass, onDelete, deletingId, formatTime, formatDate, getStatusBadge }) => (
  <div className="card shadow-sm">
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead className="table-light">
            <tr>
              <th scope="col" className="ps-4">Class Title</th>
              <th scope="col">Course</th>
              <th scope="col">Batch</th>
              <th scope="col">Date & Time</th>
              <th scope="col">Duration</th>
              <th scope="col">Status</th>
              <th scope="col" className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting, index) => (
              <motion.tr
                key={meeting._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <td className="ps-4">
                  <div className="fw-semibold text-dark">{meeting.title}</div>
                  <small className="text-muted">{meeting.hostEmail}</small>
                </td>
                <td className="fw-medium">{meeting.course?.name || 'N/A'}</td>
                <td>
                  {meeting.batch?.batchName ? (
                    <span className="badge bg-light text-dark">{meeting.batch.batchName}</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td>
                  <div className="text-dark fw-medium">{formatDate(meeting.startTime)}</div>
                  <small className="text-muted">{formatTime(meeting.startTime)}</small>
                </td>
                <td className="text-muted">{meeting.duration} mins</td>
                <td>{getStatusBadge(meeting.status)}</td>
                <td>
                  <div className="d-flex justify-content-center gap-1">
                    {(meeting.status === 'scheduled' || meeting.status === 'ongoing') && (
                      <button
                        className="btn btn-primary btn-sm d-flex align-items-center gap-1"
                        onClick={() => onStartClass(meeting._id)}
                        title={meeting.status === 'ongoing' ? 'Join Class' : 'Start Class'}
                      >
                        <Play size={14} />
                      </button>
                    )}
                    
                    <button 
                      className="btn btn-outline-primary btn-sm"
                      title="Edit Class"
                    >
                      <Edit size={14} />
                    </button>
                    
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => onDelete(meeting._id)}
                      disabled={deletingId === meeting._id}
                      title="Delete Class"
                    >
                      <Trash2 size={14} />
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

export default AdminLiveClasses;

     