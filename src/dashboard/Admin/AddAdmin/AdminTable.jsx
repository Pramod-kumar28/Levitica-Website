import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
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
              className="border border-slate-300 px-3 py-2 rounded-lg w-full focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          ) : (
            <span className="font-medium text-slate-900">{row.original.name}</span>
          ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
          <span className="text-slate-600">{row.original.email}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => (
          <span className="inline-block px-3 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-semibold">
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
    <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-200 bg-white shadow-lg p-8 sm:p-12 text-center">
      <div className="inline-flex h-10 w-10 sm:h-12 sm:w-12 animate-spin mb-4">
        <FiUsers className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400" />
      </div>
      <p className="text-slate-600 font-medium text-sm sm:text-base">Loading admin accounts...</p>
    </div>
  );

  return (
    <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
      {/* Premium Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">Admin Accounts</h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">Total admins: {admins.length}</p>
        </div>
        <div className="bg-slate-100 p-1 sm:p-1.5 rounded-lg sm:rounded-xl flex gap-0.5 sm:gap-1 shadow-sm flex-shrink-0">
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              viewMode === "table"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FiList className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> 
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition ${
              viewMode === "card"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FiGrid className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
        {/* ================= TABLE VIEW ================= */}
       {viewMode === "table" && (
  <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white">
    
    {/* SCROLL ONLY ON MOBILE */}
    <div className="w-full overflow-x-auto">
      <table className="min-w-[600px] w-full text-sm">
        
        {/* HEADER */}
        <thead className="bg-gradient-to-r from-slate-50 to-slate-100 border-b border-slate-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 sm:px-5 py-3 text-left font-semibold text-slate-700 text-[11px] sm:text-xs whitespace-nowrap"
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
        <tbody className="divide-y divide-slate-100">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-slate-50 transition even:bg-slate-50/40"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-3 sm:px-5 py-3 text-slate-800 text-xs sm:text-sm whitespace-nowrap"
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
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="border border-slate-200 rounded-lg sm:rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition bg-gradient-to-br from-white to-slate-50"
              >
                {editRowId === admin._id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="border border-slate-300 px-3 py-2 rounded-lg w-full text-xs sm:text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 mb-3"
                  />
                ) : (
                  <p className="font-bold text-slate-900 text-sm sm:text-base mb-1 truncate">{admin.name}</p>
                )}

                <p className="text-xs sm:text-sm text-slate-600 truncate mb-3">
                  {admin.email}
                </p>

                <div className="mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-slate-200">
                  <span className="inline-block px-2 sm:px-3 py-1 rounded-lg bg-indigo-100 text-indigo-800 text-xs font-semibold">
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
          <div className="p-8 sm:p-12 text-center">
            <div className="inline-flex h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-slate-100 items-center justify-center mb-4">
              <FiUsers className="h-6 w-6 sm:h-7 sm:w-7 text-slate-400" />
            </div>
            <p className="text-slate-600 font-medium text-sm sm:text-base">No admins found</p>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">Create your first admin account to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;