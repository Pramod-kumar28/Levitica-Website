import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from '@/context/ThemeContext';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiGrid, FiList, FiUsers, FiAward, FiBriefcase, FiPhone, FiMail } from "react-icons/fi";
import {
  useGetMentorsQuery,
  useDeleteMentorMutation,
  useUpdateMentorMutation,
} from '@/Services/admin/mentorServices';
import { motion } from "framer-motion";

const columnHelper = createColumnHelper();

const MentorTable = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data, isLoading } = useGetMentorsQuery();
  const [deleteMentor] = useDeleteMentorMutation();
  const [updateMentor] = useUpdateMentorMutation();

  const userRole = useSelector((state) => state.auth.user?.role);

  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewMode, setViewMode] = useState("table");

  const mentors = data?.data || [];
  const isSuperAdmin = userRole === "superadmin";

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete mentor "${name}"?`)) return;
    await deleteMentor(id);
  };

  const handleEditClick = (mentor) => {
    setEditRowId(mentor._id);
    setEditData(mentor);
  };

  const handleSave = async () => {
    await updateMentor({ id: editRowId, data: editData });
    setEditRowId(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditData({});
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className={`h-9 w-9 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0`}>
              <FiUsers className="h-4 w-4 text-white" />
            </div>
            {editRowId === row.original._id ? (
              <input
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className={`border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 text-sm ${
                  isDark
                    ? 'border-dark_border bg-darklight text-white focus:border-primary focus:ring-primary/30'
                    : 'border-border bg-light text-midnight_text focus:border-primary focus:ring-primary/20'
                }`}
              />
            ) : (
              <span className={`font-medium ${isDark ? 'text-white' : 'text-midnight_text'}`}>
                {row.original.name}
              </span>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiMail className={`h-3.5 w-3.5 ${isDark ? 'text-gray' : 'text-gray'}`} />
            <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
              {row.original.email}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("expertise", {
        header: "Expertise",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiAward className={`h-3.5 w-3.5 ${isDark ? 'text-gray' : 'text-gray'}`} />
            {editRowId === row.original._id ? (
              <input
                value={editData.expertise}
                onChange={(e) => setEditData({ ...editData, expertise: e.target.value })}
                className={`border rounded px-2 py-1 w-28 focus:outline-none focus:ring-1 text-xs ${
                  isDark ? 'border-dark_border bg-darklight text-white' : 'border-border bg-white'
                }`}
              />
            ) : (
              <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${
                isDark
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {row.original.expertise}
              </span>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("experience", {
        header: "Experience",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiBriefcase className={`h-3.5 w-3.5 ${isDark ? 'text-gray' : 'text-gray'}`} />
            {editRowId === row.original._id ? (
              <input
                type="number"
                value={editData.experience}
                onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                className={`border rounded px-2 py-1 w-16 focus:outline-none focus:ring-1 text-xs ${
                  isDark ? 'border-dark_border bg-darklight text-white' : 'border-border bg-white'
                }`}
              />
            ) : (
              <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
                {row.original.experience} years
              </span>
            )}
          </div>
        ),
      }),
      columnHelper.accessor("phone", {
        header: "Phone",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiPhone className={`h-3.5 w-3.5 ${isDark ? 'text-gray' : 'text-gray'}`} />
            {editRowId === row.original._id ? (
              <input
                value={editData.phone}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                className={`border rounded px-2 py-1 w-28 focus:outline-none focus:ring-1 text-xs ${
                  isDark ? 'border-dark_border bg-darklight text-white' : 'border-border bg-white'
                }`}
              />
            ) : (
              <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
                {row.original.phone || "—"}
              </span>
            )}
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) =>
          isSuperAdmin && (
            <div className="flex gap-2 flex-wrap">
              {editRowId === row.original._id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiCheck className="h-3.5 w-3.5" /> 
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiX className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(row.original)}
                    className="flex items-center gap-1 bg-primary hover:bg-skyBlue text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiEdit2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(row.original._id, row.original.name)}
                    className="flex items-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiTrash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </>
              )}
            </div>
          ),
      }),
    ],
    [editRowId, editData, isSuperAdmin, isDark]
  );

  const table = useReactTable({
    data: mentors,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className={`mt-6 rounded-xl border shadow-property p-12 text-center ${
        isDark
          ? 'bg-semidark border-dark_border'
          : 'bg-white border-border'
      }`}>
        <div className="inline-flex h-10 w-10 animate-spin mb-4 rounded-full border-4 border-primary border-t-transparent"></div>
        <p className={`font-medium text-sm text-gray`}>Loading mentor accounts...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {/* Premium Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg bg-emerald-500/10`}>
              <FiUsers className="h-4 w-4 text-emerald-600" />
            </div>
            <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>
              Mentor Directory
            </h3>
          </div>
          <p className={`text-xs text-gray mt-1 ml-7`}>
            Total mentors: {mentors.length}
          </p>
        </div>
        <div className={`p-1 rounded-lg flex gap-1 shadow-sm ${
          isDark ? 'bg-darklight' : 'bg-light'
        }`}>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewMode === "table"
                ? 'bg-emerald-500 text-white shadow'
                : isDark
                  ? 'text-gray hover:text-white'
                  : 'text-gray hover:text-midnight_text'
            }`}
          >
            <FiList className="h-3.5 w-3.5" /> 
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewMode === "card"
                ? 'bg-emerald-500 text-white shadow'
                : isDark
                  ? 'text-gray hover:text-white'
                  : 'text-gray hover:text-midnight_text'
            }`}
          >
            <FiGrid className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      <div className={`rounded-xl border shadow-property overflow-hidden ${
        isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'
      }`}>
        
        {/* ================= TABLE VIEW ================= */}
        {viewMode === "table" && (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full text-sm">
              <thead className={`border-b ${
                isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
              }`}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-4 py-3 text-left font-semibold text-xs whitespace-nowrap text-gray`}
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

              <tbody className={`divide-y ${
                isDark ? 'divide-dark_border' : 'divide-border'
              }`}>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${
                      isDark ? 'hover:bg-darklight' : 'hover:bg-light'
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-4 py-3 text-sm whitespace-nowrap ${
                          isDark ? 'text-gray' : 'text-gray'
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell ??
                            cell.column.columnDef.accessorKey,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= CARD VIEW ================= */}
        {viewMode === "card" && (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mentors.map((mentor, idx) => (
              <motion.div
                key={mentor._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-xl border p-4 shadow-property hover:shadow-deatail_shadow transition ${
                  isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0">
                    <FiUsers className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {editRowId === mentor._id ? (
                      <input
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className={`border px-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 mb-2 ${
                          isDark
                            ? 'border-dark_border bg-semidark text-white focus:border-primary focus:ring-primary/30'
                            : 'border-border bg-white text-midnight_text focus:border-primary focus:ring-primary/20'
                        }`}
                      />
                    ) : (
                      <p className={`font-semibold text-sm truncate ${
                        isDark ? 'text-white' : 'text-midnight_text'
                      }`}>{mentor.name}</p>
                    )}
                    <p className={`text-xs truncate flex items-center gap-1 text-gray`}>
                      <FiMail className="h-3 w-3" />
                      {mentor.email}
                    </p>
                  </div>
                </div>

                <div className={`space-y-2 mb-4 pb-3 border-b ${
                  isDark ? 'border-dark_border' : 'border-border'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray">
                      <FiAward className="h-3.5 w-3.5" />
                      Expertise
                    </span>
                    {editRowId === mentor._id ? (
                      <input
                        value={editData.expertise}
                        onChange={(e) => setEditData({ ...editData, expertise: e.target.value })}
                        className={`border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 ${
                          isDark ? 'border-dark_border bg-semidark text-white' : 'border-border bg-white'
                        }`}
                      />
                    ) : (
                      <span className={`inline-block px-2 py-0.5 rounded-lg text-xs font-semibold ${
                        isDark ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {mentor.expertise}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray">
                      <FiBriefcase className="h-3.5 w-3.5" />
                      Experience
                    </span>
                    {editRowId === mentor._id ? (
                      <input
                        type="number"
                        value={editData.experience}
                        onChange={(e) => setEditData({ ...editData, experience: e.target.value })}
                        className={`border rounded px-2 py-1 w-16 text-xs focus:outline-none focus:ring-1 ${
                          isDark ? 'border-dark_border bg-semidark text-white' : 'border-border bg-white'
                        }`}
                      />
                    ) : (
                      <span className="text-xs text-gray">{mentor.experience} years</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-xs text-gray">
                      <FiPhone className="h-3.5 w-3.5" />
                      Phone
                    </span>
                    {editRowId === mentor._id ? (
                      <input
                        value={editData.phone}
                        onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                        className={`border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 ${
                          isDark ? 'border-dark_border bg-semidark text-white' : 'border-border bg-white'
                        }`}
                      />
                    ) : (
                      <span className="text-xs text-gray">{mentor.phone || "—"}</span>
                    )}
                  </div>
                </div>

                {mentor.bio && (
                  <p className={`text-xs mb-4 line-clamp-2 ${isDark ? 'text-gray' : 'text-gray'}`}>
                    {mentor.bio}
                  </p>
                )}

                {isSuperAdmin && (
                  <div className="flex flex-wrap gap-2">
                    {editRowId === mentor._id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex-1 flex items-center justify-center gap-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          <FiCheck className="h-3.5 w-3.5" /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 flex items-center justify-center gap-1 bg-gray-400 hover:bg-gray-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          <FiX className="h-3.5 w-3.5" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(mentor)}
                          className="flex-1 flex items-center justify-center gap-1 bg-primary hover:bg-skyBlue text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          <FiEdit2 className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(mentor._id, mentor.name)}
                          className="flex-1 flex items-center justify-center gap-1 bg-rose-500 hover:bg-rose-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          <FiTrash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {mentors.length === 0 && (
          <div className="p-12 text-center">
            <div className={`inline-flex h-14 w-14 rounded-full items-center justify-center mb-4 ${
              isDark ? 'bg-darklight' : 'bg-light'
            }`}>
              <FiUsers className={`h-7 w-7 text-gray`} />
            </div>
            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-midnight_text'}`}>
              No mentors found
            </p>
            <p className={`text-xs text-gray mt-1`}>
              Create your first mentor profile to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorTable;