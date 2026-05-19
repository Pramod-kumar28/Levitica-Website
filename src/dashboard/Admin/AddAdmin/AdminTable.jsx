import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from '@/context/ThemeContext';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FiEdit2, FiTrash2, FiGrid, FiList, FiUsers, FiMail, FiShield } from "react-icons/fi";
import {
  useGetAdminsQuery,
  useDeleteAdminMutation,
} from '@/Services/admin/admincreationServices';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const columnHelper = createColumnHelper();

const AdminTable = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data, isLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const { openModal } = useModal();

  const userRole = useSelector((state) => state.auth.user?.role);
  const [viewMode, setViewMode] = useState("table");

  const admins = data?.data || [];
  const isSuperAdmin = userRole === "superadmin";

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete admin "${name}"?`)) return;
    try {
      await deleteAdmin(id).unwrap();
      toast.success(`Admin "${name}" deleted successfully`);
    } catch (error) {
      console.error("Delete admin failed:", error);
      toast.error(error?.data?.message || "Failed to delete admin");
    }
  };

  const handleEditClick = (admin) => {
    openModal(MODAL_TYPES.ADD_EDIT_ADMIN, { mode: "edit", admin });
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
            <span className={`font-bold text-sm ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
              {row.original.name}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiMail className={`h-3.5 w-3.5 flex-shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {row.original.email}
            </span>
          </div>
        ),
      }),
      columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <FiShield className={`h-3.5 w-3.5 flex-shrink-0 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
              row.original.role === "superadmin"
                ? isDark 
                  ? "bg-purple-500/20 text-purple-400" 
                  : "bg-purple-50 text-purple-700"
                : isDark 
                  ? "bg-emerald-500/20 text-emerald-400" 
                  : "bg-emerald-50 text-emerald-700"
            }`}>
              {row.original.role === "superadmin" ? "Super Admin" : "Admin"}
            </span>
          </div>
        ),
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) =>
          isSuperAdmin && (
            <div className="flex gap-2 whitespace-nowrap">
              <button
                onClick={() => handleEditClick(row.original)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                title="Edit Admin"
              >
                <FiEdit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(row.original._id, row.original.name)}
                className="inline-flex items-center justify-center h-8 w-8 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors"
                title="Delete Admin"
              >
                <FiTrash2 className="h-4 w-4" />
              </button>
            </div>
          ),
      }),
    ],
    [isSuperAdmin, isDark]
  );

  const table = useReactTable({
    data: admins,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className={`mt-6 rounded-xl border shadow-property p-12 text-center ${isDark
        ? 'bg-semidark border-dark_border'
        : 'bg-white border-border'
        }`}>
        <div className="inline-flex h-10 w-10 animate-spin mb-4 rounded-full border-4 border-emerald-500 border-t-transparent"></div>
        <p className={`font-medium text-sm text-gray`}>Loading admin accounts...</p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-5">
      {/* Directory Header / Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg bg-emerald-500/10`}>
              <FiUsers className="h-4 w-4 text-emerald-600" />
            </div>
            <p className={`text-sm text-gray mt-1`}>
              Total registered admins: <span className="font-semibold text-emerald-500">{admins.length}</span>
            </p>
          </div>
        </div>
        <div className={`p-1 rounded-lg flex gap-1 shadow-sm border ${isDark ? 'bg-darklight border-slate-700' : 'bg-light border-slate-200'
          }`}>
          <button
            onClick={() => setViewMode("table")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${viewMode === "table"
              ? 'btn btn-primary shadow'
              : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <FiList className="h-3.5 w-3.5" />
            <span>Table View</span>
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${viewMode === "card"
              ? 'btn btn-primary shadow'
              : isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
              }`}
          >
            <FiGrid className="h-3.5 w-3.5" />
            <span>Cards View</span>
          </button>
        </div>
      </div>

      <div className={`rounded-xl border shadow-property overflow-hidden ${isDark ? 'bg-semidark border-dark_border' : 'bg-white border-border'
        }`}>

        {/* ================= TABLE VIEW ================= */}
        {viewMode === "table" && (
          <div className="w-full overflow-x-auto">
            <table className="min-w-[650px] w-full text-sm">
              <thead className={`border-b ${isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
                }`}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`px-4 py-3.5 text-left font-semibold text-xs whitespace-nowrap text-gray`}
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

              <tbody className={`divide-y ${isDark ? 'divide-dark_border' : 'divide-border'
                }`}>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={`transition-colors ${isDark ? 'hover:bg-darklight' : 'hover:bg-light'
                      }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className={`px-4 py-3.5 text-sm whitespace-nowrap`}
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
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {admins.map((admin, idx) => (
              <motion.div
                key={admin._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`rounded-xl border p-5 shadow-property hover:shadow-deatail_shadow transition flex flex-col justify-between ${isDark ? 'border-dark_border bg-darklight' : 'border-border bg-light'
                  }`}
              >
                <div>
                  {/* Header: Picture & Basic info */}
                  <div className="flex items-start justify-between gap-2.5 mb-4 pb-4 border-b border-dashed border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-md flex-shrink-0">
                        <FiUsers className="h-5 w-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <p className={`font-bold text-sm truncate ${isDark ? 'text-slate-100' : 'text-slate-900'
                          }`}>{admin.name}</p>
                        <p className={`text-xs truncate flex items-center gap-1.5 text-gray mt-0.5`}>
                          <FiMail className="h-3 w-3 flex-shrink-0" />
                          {admin.email}
                        </p>
                      </div>
                    </div>

                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      admin.role === "superadmin"
                        ? isDark 
                          ? "bg-purple-500/20 text-purple-400" 
                          : "bg-purple-50 text-purple-700"
                        : isDark 
                          ? "bg-emerald-500/20 text-emerald-400" 
                          : "bg-emerald-50 text-emerald-700"
                    }`}>
                      <FiShield className="h-2.5 w-2.5" />
                      {admin.role === "superadmin" ? "Super Admin" : "Admin"}
                    </span>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                        <FiShield className="h-3.5 w-3.5 text-slate-400" />
                        Permission Level
                      </span>
                      <span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {admin.role === "superadmin" ? "Full Access" : "Limited Access"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions buttons */}
                {isSuperAdmin && (
                  <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => handleEditClick(admin)}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 border rounded-lg text-xs font-bold btn-border transition-colors`}
                    >
                      <FiEdit2 className="h-3.5 w-3.5" /> Edit Profile
                    </button>
                    <button
                      onClick={() => handleDelete(admin._id, admin.name)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 border rounded-lg text-xs font-bold btn-border-delete transition-colors"
                    >
                      <FiTrash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {admins.length === 0 && (
          <div className="p-12 text-center">
            <div className={`inline-flex h-14 w-14 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-darklight' : 'bg-light'
              }`}>
              <FiUsers className={`h-7 w-7 text-gray`} />
            </div>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-midnight_text'}`}>
              No admins found
            </p>
            <p className={`text-xs text-slate-500 mt-1`}>
              Create your first admin profile to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;