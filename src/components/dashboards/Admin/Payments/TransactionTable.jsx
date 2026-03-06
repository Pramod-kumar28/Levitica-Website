import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useDownloadPaymentsExcelMutation } from "../../../../Services/admin/studentReportsServices";



const columnHelper = createColumnHelper();

// 🎨 Status Badge Styling
const statusStyles = {
  paid: "tw-bg-green-100 tw-text-green-700",
  failed: "tw-bg-red-100 tw-text-red-700",
  created: "tw-bg-yellow-100 tw-text-yellow-700",
  attempted: "tw-bg-blue-100 tw-text-blue-700",
};

const PaymentsTable = ({ data = [] }) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");

  // Extract unique course/internship titles for filter dropdown
  const uniqueTitles = useMemo(() => {
    return [...new Set(data.map((item) => item.title).filter(Boolean))];
  }, [data]);

  
  // Filtering Logic
  

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesStatus = statusFilter
        ? row.status === statusFilter
        : true;

      const matchesTitle = titleFilter
        ? row.title === titleFilter
        : true;

      const search = globalFilter.toLowerCase();

      const matchesSearch =
        row.name?.toLowerCase().includes(search) ||
        row.email?.toLowerCase().includes(search) ||
        row.orderId?.toLowerCase().includes(search) ||
        row.paymentId?.toLowerCase().includes(search);

      return matchesStatus && matchesTitle && matchesSearch;
    });
  }, [data, globalFilter, statusFilter, titleFilter]);

  // Columns
  const columns = useMemo(
    () => [
      columnHelper.accessor("orderId", {
        header: "Order ID",
      }),

      columnHelper.accessor("paymentId", {
        header: "Payment ID",
      }),

      columnHelper.accessor("name", {
        header: "User",
      }),

      columnHelper.accessor("email", {
        header: "Email",
      }),

      columnHelper.accessor("title", {
        header: "Course / Domain",
      }),

      columnHelper.accessor("type", {
        header: "Type",
      }),

      columnHelper.accessor("paymentMode", {
        header: "Mode",
        cell: (info) => (
          <span className="tw-text-gray-700 tw-font-medium">
            {info.getValue()?.toUpperCase()}
          </span>
        ),
      }),

      columnHelper.accessor("appUsed", {
        header: "App Used",
        cell: (info) => (
          <span className="tw-text-gray-600">
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className="tw-font-semibold tw-text-gray-900">
            ₹{info.getValue()?.toLocaleString()}
          </span>
        ),
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const value = info.getValue();
          return (
            <span
              className={`tw-inline-flex tw-items-center tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold ${statusStyles[value] || "tw-bg-gray-100 tw-text-gray-600"
                }`}
            >
              {value?.toUpperCase()}
            </span>
          );
        },
      }),

      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => (
          <span className="tw-text-gray-500 tw-text-sm">
            {new Date(info.getValue()).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
            })}
          </span>
        ),
      }),
    ],
    []
  );

  const [downloadPaymentsExcel] = useDownloadPaymentsExcelMutation();

  const handleDownloadExcel = async () => {
    try {
      const blob = await downloadPaymentsExcel().unwrap();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "payments.xlsx";
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
    }
  };


  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // UI
  return (
    <div className="tw-bg-white tw-border tw-rounded-xl tw-shadow-md tw-overflow-x-auto ">

      {/* 🔎 Filters */}
      <div className="tw-flex tw-gap-4 tw-p-5 tw-border-b  tw-flex-wrap tw-items-center">        <input
        type="text"
        placeholder="Search payments..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="tw-border tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-bg-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
      />
        <select
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="tw-border tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-bg-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
        >
          <option value="">All Courses / Internships</option>
          {uniqueTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="tw-border tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm tw-bg-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="created">Created</option>
          <option value="attempted">Attempted</option>
        </select>

        <button
          onClick={handleDownloadExcel}
          className="tw-ml-auto tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-text-sm tw-font-semibold hover:tw-bg-blue-700 tw-transition"
        >
          Download Excel
        </button>
      </div>

      {/* 📋 Table */}
      <table className="tw-min-w-[1200px] tw-text-sm ">
        <thead className="tw-bg-gray-100 tw-text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="tw-p-4 tw-text-left tw-font-semibold tw-cursor-pointer tw-select-none hover:tw-text-blue-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {{
                    asc: " 🔼",
                    desc: " 🔽",
                  }[header.column.getIsSorted()] ?? null}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="tw-text-center tw-p-8 tw-text-gray-500"
              >
                No payments found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="tw-border-b hover:tw-bg-gray-50 tw-transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="tw-p-4 tw-align-middle"
                  >
                    {flexRender(
                      cell.column.columnDef.cell ??
                      cell.column.columnDef.accessorKey,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsTable;
