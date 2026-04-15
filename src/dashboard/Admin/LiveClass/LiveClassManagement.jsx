import React, { useState } from "react";
import { useGetMeetingsQuery, useDeleteMeetingMutation } from '@/Services/admin/zoomService';
import toast from "react-hot-toast";
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
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
  FiPlus,
  FiRefreshCw,
  FiCopy,
} from "react-icons/fi";


const AdminLiveClasses = () => {
  const { data, isLoading, error, refetch } = useGetMeetingsQuery();
  const [deleteMeeting] = useDeleteMeetingMutation();
  const { openModal } = useModal();

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
      window.location.href = `${import.meta.env.VITE_PROD_API_URL}/admin/zoom/start/${id}`;
    } finally {
      setStarting(false);
    }
  };

  const handleEdit = (liveClass) => {
    openModal(MODAL_TYPES.EDIT_MEETING, {
      initialData: liveClass,
    });
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Joining link copied to clipboard ✅");
    } catch (error) {
      toast.error("Failed to copy link ❌");
      console.error(error);
    }
  };

  const handleDelete = (meetingId) => {
    toast((t) => (
      <div className="flex flex-col gap-3">
        <p className="font-medium">
          Are you sure you want to delete this live class?
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={async () => {
              try {
                toast.dismiss(t.id);

                await deleteMeeting(meetingId);

                toast.success("Class deleted successfully ");
              } catch (error) {
                toast.error("Failed to delete class ");

              }
            }}
            className="px-3 py-1 rounded bg-red-600 text-white"
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
      ongoing: "bg-red-500",
      completed: "bg-green-500",
      scheduled: "bg-yellow-500",
    };
    return (
      <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${map[status]}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  /* ---------------- loading / error ---------------- */

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500">
        Loading live classes…
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600">Failed to load live classes</p>
        <button
          onClick={refetch}
          className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <FiRefreshCw /> Retry
        </button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-8">


      {/* ===== Page Header ===== */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Live Classes
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage, schedule and monitor all Zoom live sessions
          </p>
        </div>

        <div className="flex gap-2">

          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
            onClick={() => openModal(MODAL_TYPES.CREATE_MEETING)}>
            <FiPlus />
            Create Class
          </button>
        </div>
      </div>

      {/* ===== Filters Card ===== */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none"
              placeholder="Search class, course, or batch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status */}
          <select
            className="rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
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
            className="rounded-lg border border-gray-300 py-2 px-3 text-sm focus:border-blue-500 focus:outline-none"
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
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <FiFilter />
            Clear
          </button>
        </div>
      </div>

      {/* ===== View Toggle & Count ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{filteredMeetings.length}</span> of{" "}
          <span className="font-medium text-gray-900">{meetings.length}</span> classes
        </p>

        <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-1">
          <button
            onClick={() => setActiveTab("cards")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${activeTab === "cards"
              ? "bg-white shadow text-blue-600"
              : "text-gray-500 hover:text-gray-700"
              }`}
          >
            <FiGrid />
            Cards
          </button>

          <button
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${activeTab === "table"
              ? "bg-white shadow text-blue-600"
              : "text-gray-500 hover:text-gray-700"
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
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            deletingId={deletingId}
            formatDate={formatDate}
            formatTime={formatTime}
            StatusBadge={StatusBadge}
            handleCopy={handleCopy}
          />
        ) : (
          <TableView
            filteredMeetings={filteredMeetings}
            handleStartClass={handleStartClass}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            deletingId={deletingId}
            formatDate={formatDate}
            formatTime={formatTime}
            StatusBadge={StatusBadge}
            handleCopy={handleCopy}
          />
        )}
      </AnimatePresence>

    </div>

  );
};

/* ---------------- CARDS VIEW ---------------- */
const CardsView = ({
  filteredMeetings,
  handleStartClass,
  handleEdit,
  handleDelete,
  deletingId,
  formatDate,
  formatTime,
  StatusBadge,
  handleCopy
}) => (
  <div className="grid md:grid-cols-3 gap-6">
    {filteredMeetings.map((m) => (
      <motion.div
        key={m._id}
        whileHover={{ y: -4 }}
        className="bg-white rounded-xl border p-5 flex flex-col shadow-sm hover:shadow-md transition"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold lg:text-xl text-lg text-gray-900">
            {m.title}
          </h3>
          <StatusBadge status={m.status} />
        </div>

        {/* Meta */}
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <FiBookOpen /> {m.course?.name}
          </p>
          <p className="flex items-center gap-2">
            <FiUsers /> {m.batch?.batchName || "—"}
          </p>
          <p className="flex items-center gap-2">
            <FiCalendar /> {formatDate(m.startTime)}
          </p>
          <p className="flex items-center gap-2">
            <FiClock /> {formatTime(m.startTime)} • {m.duration} mins
          </p>
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 flex gap-2 flex-wrap">
          {(m.status === "scheduled" || m.status === "ongoing") && (
            <button
              onClick={() => handleStartClass(m._id)}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <FiPlay />
              {m.status === "ongoing" ? "Join" : "Start"}
            </button>
          )}

          {/* 🔹 NEW COPY BUTTON */}
          {m.zoomJoinUrl && (
            <button
              onClick={() => handleCopy(m.zoomJoinUrl)}
              className="rounded-lg border border-gray-300 px-3 text-gray-600 hover:bg-gray-50"
              title="Copy Joining Link"
            >
              <FiCopy />
            </button>
          )}

          <button
            onClick={() => handleEdit(m)}
            className="rounded-lg border border-gray-300 px-3 text-gray-600 hover:bg-gray-50"
            title="Edit class"
          >
            <FiEdit />
          </button>

          <button
            disabled={deletingId === m._id}
            onClick={() => handleDelete(m._id)}
            className="rounded-lg border border-red-200 px-3 text-red-600 hover:bg-red-50 disabled:opacity-50"
            title="Delete class"
          >
            <FiTrash2 />
          </button>
        </div>
      </motion.div>
    ))}
  </div>
);


/* ---------------- TABLE VIEW ---------------- */
const TableView = ({
  filteredMeetings,
  handleStartClass,
  handleEdit,
  handleDelete,
  deletingId,
  formatDate,
  formatTime,
  StatusBadge,
  handleCopy
}) => (
  <div className="bg-white border rounded-xl overflow-x-auto">
    <table className="w-full text-sm">
      <thead className="bg-gray-50">
        <tr>
          <th className="p-3 text-left">Title</th>
          <th className="p-3">Course</th>
          <th className="p-3">Batch</th>
          <th className="p-3">Date</th>
          <th className="p-3">Duration</th>
          <th className="p-3">Status</th>
          <th className="p-3 text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        {filteredMeetings.map((m) => (
          <tr
            key={m._id}
            className="border-t hover:bg-gray-50"
          >
            <td className="p-3 font-medium text-gray-900">
              {m.title}
            </td>
            <td className="p-3">{m.course?.name}</td>
            <td className="p-3">{m.batch?.batchName || "—"}</td>
            <td className="p-3">
              {formatDate(m.startTime)}
              <div className="text-xs text-gray-500">
                {formatTime(m.startTime)}
              </div>
            </td>
            <td className="p-3">{m.duration} mins</td>
            <td className="p-3">
              <StatusBadge status={m.status} />
            </td>

            {/* Actions */}
            <td className="p-3">
              <div className="flex items-center justify-center gap-2">

                {(m.status === "scheduled" || m.status === "ongoing") && (
                  <button
                    onClick={() => handleStartClass(m._id)}
                    className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
                    title="Start / Join"
                  >
                    <FiPlay />
                  </button>
                )}

                {/* 🔹 NEW COPY BUTTON */}
                {m.zoomJoinUrl && (
                  <button
                    onClick={() => handleCopy(m.zoomJoinUrl)}
                    className="rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-100"
                    title="Copy Joining Link"
                  >
                    <FiCopy />
                  </button>
                )}

                <button
                  onClick={() => handleEdit(m)}
                  className="rounded-md border border-gray-300 p-2 text-gray-600 hover:bg-gray-100"
                  title="Edit"
                >
                  <FiEdit />
                </button>

                <button
                  disabled={deletingId === m._id}
                  onClick={() => handleDelete(m._id)}
                  className="rounded-md border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export default AdminLiveClasses;
