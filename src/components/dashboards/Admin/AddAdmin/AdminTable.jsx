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
} from "../../../../Services/admin/admincreationServices";

const columnHelper = createColumnHelper();

const AdminTable = () => {
  const { data, isLoading } = useGetAdminsQuery();
  const [deleteAdmin] = useDeleteAdminMutation();
  const [updateAdmin] = useUpdateAdminMutation();

  const userRole = useSelector((state) => state.auth.user?.role);

  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

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
              className="tw-border tw-px-2 tw-py-1 tw-rounded"
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
            <div className="tw-flex tw-gap-2">
    

              <button
                onClick={() => handleDelete(row.original._id)}
                className="tw-bg-red-600 tw-text-white tw-px-3 tw-py-1 tw-rounded tw-text-xs"
              >
                Delete
              </button>
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
    <div className="tw-rounded-xl tw-border tw-bg-white tw-shadow-sm tw-mt-6 tw-overflow-x-auto">
      {/* Desktop Table */}
      <table className="tw-w-full tw-text-sm hidden md:tw-table">
        <thead className="tw-bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="tw-p-3 tw-text-left tw-font-semibold"
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
            <tr key={row.id} className="tw-border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="tw-p-3">
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

      {/* Mobile Cards */}
      <div className="md:tw-hidden tw-p-4 tw-space-y-4">
        {admins.map((admin) => (
          <div
            key={admin._id}
            className="tw-border tw-rounded-lg tw-p-4 tw-shadow-sm"
          >
            <p className="tw-font-semibold">{admin.name}</p>
            <p className="tw-text-sm tw-text-gray-500">{admin.email}</p>
            <p className="tw-text-xs tw-mt-1">Role: {admin.role}</p>

            {isSuperAdmin && (
              <div className="tw-flex tw-gap-2 tw-mt-3">
                <button
                  onClick={() => handleEditClick(admin)}
                  className="tw-bg-blue-600 tw-text-white tw-px-3 tw-py-1 tw-rounded tw-text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(admin._id)}
                  className="tw-bg-red-600 tw-text-white tw-px-3 tw-py-1 tw-rounded tw-text-xs"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {admins.length === 0 && (
        <div className="tw-p-6 tw-text-center tw-text-gray-500">
          No admins found
        </div>
      )}
    </div>
  );
};

export default AdminTable;