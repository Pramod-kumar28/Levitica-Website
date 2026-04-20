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
  FiVideo,
  FiRadio,
  FiCheckCircle,
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
      toast.success("Joining link copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy link");
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
    const styles = {
      ongoing: {
        bg: "bg-gradient-to-r from-red-500 to-red-600",
        text: "text-white",
        pulse: "animate-pulse",
        icon: <FiRadio className="w-3 h-3" />,
        label: "Live"
      },
      completed: {
        bg: "bg-gradient-to-r from-green-500 to-emerald-600",
        text: "text-white",
        pulse: "",
        icon: <FiCheckCircle className="w-3 h-3" />,
        label: "Completed"
      },
      scheduled: {
        bg: "bg-gradient-to-r from-amber-500 to-orange-600",
        text: "text-white",
        pulse: "",
        icon: <FiClock className="w-3 h-3" />,
        label: "Upcoming"
      },
    };
    const style = styles[status] || styles.scheduled;
    return (
      <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${style.bg} ${style.text} ${style.pulse} inline-flex items-center gap-1.5 shadow-md`}>
        {style.icon}
        {style.label}
      </span>
    );
  };

  /* ---------------- loading / error ---------------- */

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 mb-4"
        />
        <p className="text-gray-600 font-medium">Loading live classes…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
        <div className="text-5xl mb-3">⚠️</div>
        <p className="text-red-700 font-semibold mb-4">Failed to load live classes</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refetch}
          className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-red-700 transition"
        >
          <FiRefreshCw /> Retry
        </motion.button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6 sm:space-y-8">

      {/* ===== Page Header with Gradient ===== */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-xl sm:rounded-3xl p-4 sm:p-8 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">
              Live Classes
            </h1>
            <p className="text-blue-100 text-sm sm:text-base flex items-center gap-2">
              <FiVideo className="w-4 h-4" />
              Manage, schedule and monitor all Zoom sessions
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-xl sm:rounded-2xl bg-white text-blue-600 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto justify-center sm:justify-start"
            onClick={() => openModal(MODAL_TYPES.CREATE_MEETING)}>
            <FiPlus className="w-5 h-5" />
            Create Class
          </motion.button>
        </div>
      </div>

      {/* ===== Filters Card ===== */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <FiFilter className="w-4 h-4" /> Filter Classes
        </h3>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">

          {/* Search */}
          <div className="relative group">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition w-4 h-4" />
            <input
              className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status */}
          <select
            className="rounded-lg border border-gray-300 py-2.5 px-3 text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="scheduled">Upcoming</option>
            <option value="ongoing">Live Now</option>
            <option value="completed">Completed</option>
          </select>

          {/* Date */}
          <input
            type="date"
            className="rounded-lg border border-gray-300 py-2.5 px-3 text-sm bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition cursor-pointer"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          {/* Clear */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setDateFilter("");
            }}
            className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-gray-50 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            <FiFilter className="w-4 h-4" />
            Clear
          </motion.button>
        </div>
      </motion.div>

      {/* ===== View Toggle & Stats ===== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-xl px-4 py-3 sm:py-4">
          <p className="text-sm text-gray-700">
            <span className="font-bold text-blue-600">{filteredMeetings.length}</span>
            <span className="text-gray-600"> of </span>
            <span className="font-bold text-blue-600">{meetings.length}</span>
            <span className="text-gray-600"> live sessions</span>
          </p>
        </div>

        <div className="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <motion.button
            whileHover={{ backgroundColor: "#f3f4f6" }}
            onClick={() => setActiveTab("cards")}
            className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium transition ${activeTab === "cards"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
              }`}
          >
            <FiGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </motion.button>

          <motion.button
            whileHover={{ backgroundColor: "#f3f4f6" }}
            onClick={() => setActiveTab("table")}
            className={`flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-sm font-medium transition ${activeTab === "table"
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-600 hover:text-gray-900"
              }`}
          >
            <FiList className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </motion.button>
        </div>
      </div>

      {/* ===== Content ===== */}
      <AnimatePresence mode="wait">
        {filteredMeetings.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center py-16 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-2 border-dashed border-blue-200"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-4"
            >
              <FiVideo className="w-16 h-16 text-blue-400 mx-auto" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No live classes found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter !== "all" || dateFilter
                ? "Try adjusting your filters"
                : "Create your first live class to get started"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openModal(MODAL_TYPES.CREATE_MEETING)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              <FiPlus className="w-5 h-5" /> Create Class
            </motion.button>
          </motion.div>
        ) : activeTab === "cards" ? (
          <CardsView
            key="cards"
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
            key="table"
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
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
  >
    {filteredMeetings.map((m, idx) => (
      <motion.div
        key={m._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col group"
      >
        {/* Status Header */}
        <div className="h-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 group-hover:from-blue-700 group-hover:to-cyan-700 transition" />

        {/* Content */}
        <div className="p-4 sm:p-5 lg:p-6 flex flex-col h-full">
          {/* Title & Status */}
          <div className="flex justify-between items-start gap-2 mb-3">
            <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 line-clamp-2 flex-1">
              {m.title}
            </h3>
            <StatusBadge status={m.status} />
          </div>

          {/* Meta Information */}
          <div className="space-y-2 sm:space-y-2.5 flex-1 mb-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-blue-50 rounded-lg p-2 sm:p-2.5">
              <FiBookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <span className="font-medium truncate">{m.course?.name || "—"}</span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 bg-purple-50 rounded-lg p-2 sm:p-2.5">
              <FiUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-600 flex-shrink-0" />
              <span className="font-medium truncate">{m.batch?.batchName || "No batch"}</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-green-50 rounded-lg p-2 sm:p-2.5">
                <FiCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <span className="font-medium truncate">{formatDate(m.startTime)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-700 bg-orange-50 rounded-lg p-2 sm:p-2.5">
                <FiClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-600 flex-shrink-0" />
                <span className="font-medium truncate">{formatTime(m.startTime)}</span>
              </div>
            </div>

            <div className="text-xs text-gray-600 bg-gray-100 rounded-lg p-2 sm:p-2.5 font-medium">
              <FiClock className="inline w-3 h-3 mr-1" /> {m.duration} min
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 border-t border-gray-200 pt-3 sm:pt-4">
            {(m.status === "scheduled" || m.status === "ongoing") && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleStartClass(m._id)}
                className="w-full flex items-center justify-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transition"
              >
                <FiPlay className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>{m.status === "ongoing" ? "Join" : "Start"}</span>
              </motion.button>
            )}

            <div className="flex gap-1 sm:gap-1.5">
              {m.zoomJoinUrl && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCopy(m.zoomJoinUrl)}
                  className="flex-1 p-1.5 sm:p-2 rounded-lg border-2 border-cyan-300 text-cyan-700 hover:bg-cyan-50 transition flex items-center justify-center gap-1"
                  title="Copy link"
                >
                  <FiCopy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline text-xs">Copy</span>
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(m)}
                className="flex-1 p-1.5 sm:p-2 rounded-lg border-2 border-blue-300 text-blue-700 hover:bg-blue-50 transition flex items-center justify-center gap-1"
                title="Edit"
              >
                <FiEdit className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs">Edit</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={deletingId === m._id}
                onClick={() => handleDelete(m._id)}
                className="flex-1 p-1.5 sm:p-2 rounded-lg border-2 border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50 transition flex items-center justify-center gap-1"
                title="Delete"
              >
                <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline text-xs">Delete</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </motion.div>
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden"
  >
  <div className="w-full overflow-x-auto">
  <table className="w-full min-w-[600px] text-xs sm:text-sm">
    
    {/* HEADER */}
    <thead>
      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <th className="px-3 py-3 text-left font-semibold">Title</th>
        <th className="px-3 py-3 text-left font-semibold hidden sm:table-cell">Course</th>
        <th className="px-3 py-3 text-left font-semibold hidden md:table-cell">Batch</th>
        <th className="px-3 py-3 text-left font-semibold">Schedule</th>
        <th className="px-3 py-3 text-center font-semibold hidden sm:table-cell">Duration</th>
        <th className="px-3 py-3 text-center font-semibold">Status</th>
        <th className="px-3 py-3 text-center font-semibold">Actions</th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody className="divide-y divide-gray-200">
      {filteredMeetings.map((m, idx) => (
        <motion.tr
          key={m._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.02 }}
          className="hover:bg-blue-50 transition"
        >

          {/* TITLE + COURSE (STACK IN MOBILE) */}
          <td className="px-3 py-3">
            <div className="font-semibold text-gray-900 truncate">
              {m.title}
            </div>

            {/* show course in mobile */}
            <div className="text-gray-500 text-[11px] sm:hidden">
              {m.course?.name || "—"}
            </div>
          </td>

          {/* COURSE */}
          <td className="px-3 py-3 text-gray-700 hidden sm:table-cell">
            {m.course?.name || "—"}
          </td>

          {/* BATCH */}
          <td className="px-3 py-3 text-gray-700 hidden md:table-cell">
            {m.batch?.batchName || "—"}
          </td>

          {/* SCHEDULE */}
          <td className="px-3 py-3">
            <div className="text-xs font-semibold">
              {formatDate(m.startTime)}
            </div>
            <div className="text-xs text-gray-500">
              {formatTime(m.startTime)}
            </div>
          </td>

          {/* DURATION */}
          <td className="px-3 py-3 text-center hidden sm:table-cell">
            {m.duration}m
          </td>

          {/* STATUS */}
          <td className="px-3 py-3 text-center">
            <StatusBadge status={m.status} />
          </td>

          {/* ACTIONS */}
          <td className="px-3 py-3">
            <div className="flex flex-wrap items-center justify-center gap-1">

              {(m.status === "scheduled" || m.status === "ongoing") && (
                <button
                  onClick={() => handleStartClass(m._id)}
                  className="p-2 rounded-lg bg-blue-600 text-white"
                >
                  <FiPlay className="w-4 h-4" />
                </button>
              )}

              {m.zoomJoinUrl && (
                <button
                  onClick={() => handleCopy(m.zoomJoinUrl)}
                  className="p-2 rounded-lg border border-cyan-400 text-cyan-700"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => handleEdit(m)}
                className="p-2 rounded-lg border border-blue-400 text-blue-700"
              >
                <FiEdit className="w-4 h-4" />
              </button>

              <button
                disabled={deletingId === m._id}
                onClick={() => handleDelete(m._id)}
                className="p-2 rounded-lg border border-red-400 text-red-700"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>

            </div>
          </td>

        </motion.tr>
      ))}
    </tbody>
  </table>
</div>
  </motion.div>
);


export default AdminLiveClasses;
