import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from '@/context/ThemeContext';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiGrid, FiList, FiUsers } from "react-icons/fi";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} from '@/Services/admin/admincreationServices';

const columnHelper = createColumnHelper();

const AdminTable = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data, isLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();

  const userRole = useSelector((state) => state.auth.user?.role);

  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewMode, setViewMode] = useState("table"); // 🔥 toggle state

  const admins = data?.data || [];
  const isSuperAdmin = userRole === "superadmin";

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteAdmin(id);
  };

  const handleEditClick = (admin) => {
    setEditRowId(admin._id);
    setEditData(admin);
  };

  const handleSave = async () => {
    await updateAdmin({ id: editRowId, data: editData });
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
        cell: ({ row }) =>
          editRowId === row.original._id ? (
            <input
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className={`border px-3 py-2 rounded-lg w-full focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                isDark
                  ? 'border-slate-600 bg-slate-700 text-white'
                  : 'border-slate-300 bg-white text-slate-900'
              }`}
            />
          ) : (
            <span className={`font-medium ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{row.original.name}</span>
          ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>{row.original.email}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => (
          <span className={`inline-block px-3 py-1 rounded-lg text-xs font-semibold ${
            isDark
              ? 'bg-indigo-950 text-indigo-300'
              : 'bg-indigo-100 text-indigo-800'
          }`}>
            {row.original.role}
          </span>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) =>
          isSuperAdmin && (
            <div className="flex gap-1 sm:gap-2 flex-wrap">
              {editRowId === row.original._id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> 
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 bg-slate-400 hover:bg-slate-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(row.original)}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiEdit2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(row.original._id)}
                    className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiTrash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </>
              )}
            </div>
          ),
      }),
    ],
    [editRowId, editData, isSuperAdmin]
  );

  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return (
    <div className={`mt-6 sm:mt-8 rounded-2xl border shadow-lg p-8 sm:p-12 text-center ${
      isDark
        ? 'border-slate-700 bg-slate-800'
        : 'border-slate-200 bg-white'
    }`}>
      <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 animate-spin mb-4">
        <FiUsers className={`h-10 w-10 sm:h-12 sm:w-12 ${isDark ? 'text-slate-600' : 'text-slate-400'}`} />
      </div>
      <p className={`font-medium text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Loading admin accounts...</p>
    </div>
  );

  return (
    <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
      {/* Premium Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h3 className={`text-base sm:text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Admin Accounts</h3>
          <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Total admins: {admins.length}</p>
        </div>
        <div className={`p-1 sm:p-1.5 rounded-lg sm:rounded-xl flex gap-0.5 sm:gap-1 shadow-sm flex-shrink-0 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              viewMode === "table"
                ? isDark
                  ? 'bg-slate-600 text-white shadow-md'
                  : 'bg-white text-slate-900 shadow-md'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FiList className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              viewMode === "card"
                ? isDark
                  ? 'bg-slate-600 text-white shadow-md'
                  : 'bg-white text-slate-900 shadow-md'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FiGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border shadow-lg overflow-hidden ${isDark ? 'bg-slate-800 border-slate-700' : 'border-slate-200 bg-white'}`}>
        {/* ================= TABLE VIEW ================= */}
       {viewMode === "table" && (
  <div className={`w-full overflow-hidden rounded-xl border ${isDark ? 'border-slate-700 bg-slate-800' : 'border-slate-200 bg-white'}`}>
    
    {/* SCROLL ONLY ON MOBILE */}
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full text-sm">
        
        {/* HEADER */}
        <thead className={`border-b ${isDark ? 'bg-gradient-to-r from-slate-800 to-slate-700 border-slate-700' : 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200'}`}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-3 sm:px-5 py-3 text-left font-semibold text-[11px] sm:text-xs whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-700'}`}
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

        {/* BODY */}
        <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-100'}`}>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`transition ${isDark ? 'hover:bg-slate-700 even:bg-slate-700/30' : 'hover:bg-slate-50 even:bg-slate-50/40'}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-3 sm:px-5 py-3 text-xs sm:text-sm whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-800'}`}
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
  </div>
)}
        {/* ================= CARD VIEW ================= */}
        {viewMode === "card" && (
          <div className={`p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 ${isDark ? 'bg-slate-800' : ''}`}>
            {admins.map((admin) => (
              <div
                key={admin._id}
                className={`border rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition ${isDark ? 'border-slate-700 bg-gradient-to-br from-slate-800 to-slate-700' : 'border-slate-200 bg-gradient-to-br from-white to-slate-50'}`}
              >
                {editRowId === admin._id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className={`border px-3 py-2 rounded-lg w-full text-xs sm:text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 mb-3 ${isDark ? 'border-slate-600 bg-slate-700 text-white' : 'border-slate-300 bg-white text-slate-900'}`}
                  />
                ) : (
                  <p className={`font-bold text-sm sm:text-base mb-1 truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>{admin.name}</p>
                )}

                <p className={`text-xs sm:text-sm truncate mb-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {admin.email}
                </p>

                <div className={`mb-3 sm:mb-4 pb-3 sm:pb-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-200'}`}>
                  <span className={`inline-block px-2 sm:px-3 py-1 rounded-lg text-xs font-semibold ${isDark ? 'bg-indigo-950 text-indigo-300' : 'bg-indigo-100 text-indigo-800'}`}>
                    {admin.role}
                  </span>
                </div>

                {isSuperAdmin && (
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {editRowId === admin._id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition"
                        >
                          <FiCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1 bg-slate-400 hover:bg-slate-500 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition"
                        >
                          <FiX className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(admin)}
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition"
                        >
                          <FiEdit2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id)}
                          className="flex-1 min-w-[80px] flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs font-medium transition"
                        >
                          <FiTrash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {admins.length === 0 && (
          <div className={`p-8 sm:p-12 text-center ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
            <div className={`inline-flex h-12 w-12 sm:h-14 sm:w-14 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <FiUsers className={`h-6 w-6 sm:h-7 sm:w-7 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            </div>
            <p className={`font-medium text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>No admins found</p>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Create your first admin account to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;