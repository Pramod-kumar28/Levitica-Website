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
import { motion } from "framer-motion";

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
  const [viewMode, setViewMode] = useState("table");

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
              className={`border px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 text-sm ${
                isDark
                  ? 'border-dark_border bg-darklight text-white focus:border-primary focus:ring-primary/30'
                  : 'border-border bg-light text-midnight_text focus:border-primary focus:ring-primary/20'
              }`}
            />
          ) : (
            <span className={`font-medium ${isDark ? 'text-white' : 'text-midnight_text'}`}>{row.original.name}</span>
          ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
          <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>{row.original.email}</span>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => (
          <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${
            isDark
              ? 'bg-primary/20 text-primary'
              : 'bg-primary/10 text-primary'
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
            <div className="flex gap-2 flex-wrap">
              {editRowId === row.original._id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-1 btn-border-save px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiCheck className="h-3.5 w-3.5" /> 
                    <span className="hidden sm:inline">Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-1 btn-border-cancel px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiX className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Cancel</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(row.original)}
                    className="flex items-center gap-1 btn-border px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  >
                    <FiEdit2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(row.original._id)}
                    className="flex items-center gap-1 btn-border-delete px-3 py-1.5 rounded-lg text-xs font-medium transition"
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
    data: admins,
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
        <p className={`font-medium text-sm text-gray`}>Loading admin accounts...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {/* Premium Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg bg-primary/10`}>
              <FiUsers className="h-4 w-4 text-primary" />
            </div>
            <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-midnight_text'}`}>Admin Accounts</h3>
          </div>
          <p className={`text-xs text-gray mt-1 ml-7`}>Total admins: {admins.length}</p>
        </div>
        <div className={`p-1 rounded-lg flex gap-1 shadow-sm ${
          isDark ? 'bg-darklight' : 'bg-light'
        }`}>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
              viewMode === "table"
                ? 'btn-primary shadow'
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
                ? 'btn-primary shadow'
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
            <table className="min-w-[600px] w-full text-sm">
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
            {admins.map((admin, idx) => (
              <motion.div
                key={admin._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-xl border p-4 shadow-property hover:shadow-deatail_shadow transition ${
                  isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
                }`}
              >
                {editRowId === admin._id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className={`border px-3 py-2 rounded-lg w-full text-sm focus:outline-none focus:ring-2 mb-3 ${
                      isDark
                        ? 'border-dark_border bg-semidark text-white focus:border-primary focus:ring-primary/30'
                        : 'border-border bg-white text-midnight_text focus:border-primary focus:ring-primary/20'
                    }`}
                  />
                ) : (
                  <p className={`font-semibold text-sm mb-1 truncate ${
                    isDark ? 'text-white' : 'text-midnight_text'
                  }`}>{admin.name}</p>
                )}

                <p className={`text-xs truncate mb-3 text-gray`}>
                  {admin.email}
                </p>

                <div className={`mb-3 pb-3 border-b ${
                  isDark ? 'border-dark_border' : 'border-border'
                }`}>
                  <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
                  }`}>
                    {admin.role}
                  </span>
                </div>

                {isSuperAdmin && (
                  <div className="flex flex-wrap gap-2">
                    {editRowId === admin._id ? (
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
                          onClick={() => handleEditClick(admin)}
                          className="flex-1 flex items-center justify-center gap-1 btn-border px-3 py-1.5 rounded-lg text-xs font-medium transition"
                        >
                          <FiEdit2 className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id)}
                          className="flex-1 flex items-center justify-center gap-1 btn-border-delete px-3 py-1.5 rounded-lg text-xs font-medium transition"
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

        {admins.length === 0 && (
          <div className="p-12 text-center">
            <div className={`inline-flex h-14 w-14 rounded-full items-center justify-center mb-4 ${
              isDark ? 'bg-darklight' : 'bg-light'
            }`}>
              <FiUsers className={`h-7 w-7 text-gray`} />
            </div>
            <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-midnight_text'}`}>No admins found</p>
            <p className={`text-xs text-gray mt-1`}>Create your first admin account to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;