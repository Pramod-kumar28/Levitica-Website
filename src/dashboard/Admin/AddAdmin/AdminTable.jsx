import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
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
              className="border px-2 py-1 rounded w-full"
            />
          ) : (
            row.original.name
          ),
      }),
      columnHelper.accessor("email", {
        header: "Email",
      }),
      columnHelper.accessor("role", {
        header: "Role",
      }),
      columnHelper.display({
        id: "actions",
        header: "Actions",
        cell: ({ row }) =>
          isSuperAdmin && (
            <div className="flex gap-2">
              {editRowId === row.original._id ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-3 py-1 rounded text-xs"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditClick(row.original)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(row.original._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                  >
                    Delete
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

  if (isLoading) return <p>Loading admins...</p>;

  return (
    <div className="mt-6">
      {/* 🔥 Toggle */}
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 p-1 rounded-lg flex">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-1 rounded-md text-sm ${
              viewMode === "table"
                ? "bg-white shadow"
                : "text-gray-500"
            }`}
          >
            Table
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-1 rounded-md text-sm ${
              viewMode === "card"
                ? "bg-white shadow"
                : "text-gray-500"
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        {/* ================= TABLE VIEW ================= */}
        {viewMode === "table" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-3 text-left font-semibold"
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

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3">
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
          <div className="p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {admins.map((admin) => (
              <div
                key={admin._id}
                className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                {editRowId === admin._id ? (
                  <input
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <p className="font-semibold">{admin.name}</p>
                )}

                <p className="text-sm text-gray-500">
                  {admin.email}
                </p>

                <p className="text-xs mt-1">
                  Role: <span className="font-medium">{admin.role}</span>
                </p>

                {isSuperAdmin && (
                  <div className="flex gap-2 mt-3">
                    {editRowId === admin._id ? (
                      <>
                        <button
                          onClick={handleSave}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className="bg-gray-400 text-white px-3 py-1 rounded text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(admin)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(admin._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
                          Delete
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
          <div className="p-6 text-center text-gray-500">
            No admins found
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTable;