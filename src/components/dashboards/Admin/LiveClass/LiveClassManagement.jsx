import React, { useState } from "react";
import { useGetMeetingsQuery, useDeleteMeetingMutation } from "../../../../Services/admin/zoomService";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGrid,
  FiList,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiClock,
  FiUsers,
  FiBookOpen,
  FiPlay,
  FiEdit,
  FiTrash2,
  FiDownload,
  FiPlus,
  FiRefreshCw,
} from "react-icons/fi";


const AdminLiveClasses = () => {
  const { data, isLoading, error, refetch } = useGetMeetingsQuery();
  const [deleteMeeting] = useDeleteMeetingMutation();

  const [starting, setStarting] = useState(false);
  const [activeTab, setActiveTab] = useState("cards");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const meetings = data?.liveClasses || [];

  /* ---------------- helpers ---------------- */
const handleStartClass = async (id) => {
  try {
    setStarting(true);
    window.location.href = `${process.env.REACT_APP_LOCAL_API_URL}/api/zoom/start/${id}`;
  } finally {
    setStarting(false);
  }
};


const handleDelete = (meetingId) => {
  toast((t) => (
    <div className="tw-flex tw-flex-col tw-gap-3">
      <p className="tw-font-medium">
        Are you sure you want to delete this live class?
      </p>

      <div className="tw-flex tw-justify-end tw-gap-2">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="tw-px-3 tw-py-1 tw-rounded tw-bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={async () => {
            toast.dismiss(t.id);
            await deleteMeeting(meetingId);
          }}
          className="tw-px-3 tw-py-1 tw-rounded tw-bg-red-600 tw-text-white"
        >
          Delete
        </button>
      </div>
    </div>
  ), { duration: 6000 });
};


  const filteredMeetings = meetings.filter((m) => {
    const matchSearch =
      !searchTerm ||
      m.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.course?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.batch?.batchName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === "all" || m.status === statusFilter;

    const matchDate =
      !dateFilter ||
      new Date(m.startTime).toDateString() ===
        new Date(dateFilter).toDateString();

    return matchSearch && matchStatus && matchDate;
  });

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const StatusBadge = ({ status }) => {
    const map = {
      ongoing: "tw-bg-red-500",
      completed: "tw-bg-green-500",
      scheduled: "tw-bg-yellow-500",
    };
    return (
      <span className={`tw-text-white tw-text-xs tw-font-semibold tw-px-3 tw-py-1 tw-rounded-full ${map[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  /* ---------------- loading / error ---------------- */

  if (isLoading) {
    return (
      <div className="tw-flex tw-justify-center tw-items-center tw-py-20 tw-text-gray-500">
        Loading live classes…
      </div>
    );
  }

  if (error) {
    return (
      <div className="tw-text-center tw-py-20">
        <p className="tw-text-red-600">Failed to load live classes</p>
        <button
          onClick={refetch}
          className="tw-mt-4 tw-inline-flex tw-items-center tw-gap-2 tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg"
        >
          <FiRefreshCw /> Retry
        </button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
   <div className="tw-p-6 tw-space-y-6">

  {/* ===== Page Header ===== */}
  <div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center md:tw-justify-between tw-gap-4">
    <div>
      <h1 className="tw-text-3xl tw-font-bold tw-text-gray-900">
        Live Classes
      </h1>
      <p className="tw-mt-1 tw-text-sm tw-text-gray-500">
        Manage, schedule and monitor all Zoom live sessions
      </p>
    </div>

    <div className="tw-flex tw-gap-2">
      <button className="tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-border tw-border-gray-300 tw-bg-white tw-px-4 tw-py-2 tw-text-sm tw-font-medium hover:tw-bg-gray-50">
        <FiDownload />
        Export
      </button>

      <button className="tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-bg-blue-600 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-blue-700">
        <FiPlus />
        Create Class
      </button>
    </div>
  </div>

  {/* ===== Filters Card ===== */}
  <div className="tw-rounded-xl tw-border tw-border-gray-200 tw-bg-white tw-p-4 tw-shadow-sm">
    <div className="tw-grid tw-gap-4 md:tw-grid-cols-4">

      {/* Search */}
      <div className="tw-relative">
        <FiSearch className="tw-absolute tw-left-3 tw-top-1/2 -tw-translate-y-1/2 tw-text-gray-400" />
        <input
          className="tw-w-full tw-rounded-lg tw-border tw-border-gray-300 tw-py-2 tw-pl-10 tw-pr-3 tw-text-sm focus:tw-border-blue-500 focus:tw-outline-none"
          placeholder="Search class, course, or batch"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Status */}
      <select
        className="tw-rounded-lg tw-border tw-border-gray-300 tw-py-2 tw-px-3 tw-text-sm focus:tw-border-blue-500 focus:tw-outline-none"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="scheduled">Upcoming</option>
        <option value="ongoing">Live</option>
        <option value="completed">Completed</option>
      </select>

      {/* Date */}
      <input
        type="date"
        className="tw-rounded-lg tw-border tw-border-gray-300 tw-py-2 tw-px-3 tw-text-sm focus:tw-border-blue-500 focus:tw-outline-none"
        value={dateFilter}
        onChange={(e) => setDateFilter(e.target.value)}
      />

      {/* Clear */}
      <button
        onClick={() => {
          setSearchTerm("");
          setStatusFilter("all");
          setDateFilter("");
        }}
        className="tw-flex tw-items-center tw-justify-center tw-gap-2 tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-py-2 tw-text-sm tw-font-medium hover:tw-bg-gray-100"
      >
        <FiFilter />
        Clear
      </button>
    </div>
  </div>

  {/* ===== View Toggle & Count ===== */}
  <div className="tw-flex tw-flex-col sm:tw-flex-row sm:tw-items-center sm:tw-justify-between tw-gap-3">
    <p className="tw-text-sm tw-text-gray-500">
      Showing <span className="tw-font-medium tw-text-gray-900">{filteredMeetings.length}</span> of{" "}
      <span className="tw-font-medium tw-text-gray-900">{meetings.length}</span> classes
    </p>

    <div className="tw-inline-flex tw-rounded-lg tw-border tw-border-gray-300 tw-bg-gray-50 tw-p-1">
      <button
        onClick={() => setActiveTab("cards")}
        className={`tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium ${
          activeTab === "cards"
            ? "tw-bg-white tw-shadow tw-text-blue-600"
            : "tw-text-gray-500 hover:tw-text-gray-700"
        }`}
      >
        <FiGrid />
        Cards
      </button>

      <button
        onClick={() => setActiveTab("table")}
        className={`tw-flex tw-items-center tw-gap-2 tw-rounded-md tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium ${
          activeTab === "table"
            ? "tw-bg-white tw-shadow tw-text-blue-600"
            : "tw-text-gray-500 hover:tw-text-gray-700"
        }`}
      >
        <FiList />
        Table
      </button>
    </div>
  </div>

  {/* ===== Content ===== */}
  <AnimatePresence mode="wait">
    {activeTab === "cards" ? (
      <CardsView
        filteredMeetings={filteredMeetings}
        handleStartClass={handleStartClass}
        handleDelete={handleDelete}
        deletingId={deletingId}
        formatDate={formatDate}
        formatTime={formatTime}
        StatusBadge={StatusBadge}
      />
    ) : (
      <TableView
        filteredMeetings={filteredMeetings}
        handleStartClass={handleStartClass}
        handleDelete={handleDelete}
        deletingId={deletingId}
        formatDate={formatDate}
        formatTime={formatTime}
        StatusBadge={StatusBadge}
      />
    )}
  </AnimatePresence>

</div>

  );
};

/* ---------------- CARDS VIEW ---------------- */

const CardsView = ({ filteredMeetings, handleStartClass, handleDelete, deletingId, formatDate, formatTime, StatusBadge }) => (
  <div className="tw-grid md:tw-grid-cols-3 tw-gap-6">
    {filteredMeetings.map((m) => (
      <motion.div
        key={m._id}
        whileHover={{ y: -4 }}
        className="tw-bg-white tw-rounded-xl tw-border tw-p-5 tw-flex tw-flex-col"
      >
        <div className="tw-flex tw-justify-between">
          <h3 className="tw-font-semibold">{m.title}</h3>
          <StatusBadge status={m.status} />
        </div>

        <div className="tw-mt-3 tw-space-y-2 tw-text-sm tw-text-gray-600">
          <p className="tw-flex tw-items-center tw-gap-2"><FiBookOpen /> {m.course?.name}</p>
          <p className="tw-flex tw-items-center tw-gap-2"><FiUsers /> {m.batch?.batchName || "—"}</p>
          <p className="tw-flex tw-items-center tw-gap-2"><FiCalendar /> {formatDate(m.startTime)}</p>
          <p className="tw-flex tw-items-center tw-gap-2"><FiClock /> {formatTime(m.startTime)} • {m.duration} mins</p>
        </div>

        <div className="tw-mt-4 tw-flex tw-gap-2">
          {(m.status === "scheduled" || m.status === "ongoing") && (
            <button className="tw-btn-primary" onClick={() => handleStartClass(m._id)}>
              <FiPlay /> {m.status === "ongoing" ? "Join" : "Start"}
            </button>
          )}
          <button className="tw-btn-outline"><FiEdit /></button>
          <button
            disabled={deletingId === m._id}
            onClick={() => handleDelete(m._id)}
            className="tw-btn-danger"
          >
            <FiTrash2 />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);

/* ---------------- TABLE VIEW ---------------- */

const TableView = ({ filteredMeetings, handleStartClass, handleDelete, deletingId, formatDate, formatTime, StatusBadge }) => (
  <div className="tw-bg-white tw-border tw-rounded-xl tw-overflow-x-auto">
    <table className="tw-w-full tw-text-sm">
      <thead className="tw-bg-gray-50">
        <tr>
          <th className="tw-p-3 tw-text-left">Title</th>
          <th className="tw-p-3">Course</th>
          <th className="tw-p-3">Batch</th>
          <th className="tw-p-3">Date</th>
          <th className="tw-p-3">Duration</th>
          <th className="tw-p-3">Status</th>
          <th className="tw-p-3 tw-text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredMeetings.map((m) => (
          <tr key={m._id} className="tw-border-t">
            <td className="tw-p-3 tw-font-medium">{m.title}</td>
            <td className="tw-p-3">{m.course?.name}</td>
            <td className="tw-p-3">{m.batch?.batchName || "—"}</td>
            <td className="tw-p-3">{formatDate(m.startTime)}<br /><span className="tw-text-xs tw-text-gray-500">{formatTime(m.startTime)}</span></td>
            <td className="tw-p-3">{m.duration} mins</td>
            <td className="tw-p-3"><StatusBadge status={m.status} /></td>
            <td className="tw-p-3 tw-text-center tw-flex tw-gap-2 tw-justify-center">
              {(m.status === "scheduled" || m.status === "ongoing") && (
                <button onClick={() => handleStartClass(m._id)} className="tw-btn-primary"><FiPlay /></button>
              )}
              <button className="tw-btn-outline"><FiEdit /></button>
              <button disabled={deletingId === m._id} onClick={() => handleDelete(m._id)} className="tw-btn-danger"><FiTrash2 /></button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default AdminLiveClasses;
