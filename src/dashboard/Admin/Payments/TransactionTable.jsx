import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { useDownloadPaymentsExcelMutation } from '@/Services/admin/studentReportsServices';



const columnHelper = createColumnHelper();

// 🎨 Status Badge Styling
const statusStyles = {
  paid: "bg-green-100 text-green-700",
  failed: "bg-red-100 text-red-700",
  created: "bg-yellow-100 text-yellow-700",
  attempted: "bg-blue-100 text-blue-700",
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
          <span className="text-gray-700 font-medium">
            {info.getValue()?.toUpperCase()}
          </span>
        ),
      }),

      columnHelper.accessor("appUsed", {
        header: "App Used",
        cell: (info) => (
          <span className="text-gray-600">
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className="font-semibold text-gray-900">
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
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[value] || "bg-gray-100 text-gray-600"
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
          <span className="text-gray-500 text-sm">
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
    <div className="bg-white border rounded-xl shadow-md overflow-x-auto ">

      {/* 🔎 Filters */}
      <div className="flex gap-4 p-5 border-b  flex-wrap items-center">        <input
        type="text"
        placeholder="Search payments..."
        value={globalFilter}
        onChange={(e) => setGlobalFilter(e.target.value)}
        className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
        <select
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="border rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="failed">Failed</option>
          <option value="created">Created</option>
          <option value="attempted">Attempted</option>
        </select>

        <button
          onClick={handleDownloadExcel}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
        >
          Download Excel
        </button>
      </div>

      {/* 📋 Table */}
      <table className="min-w-[1200px] text-sm ">
        <thead className="bg-gray-100 text-gray-700">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="p-4 text-left font-semibold cursor-pointer select-none hover:text-blue-600"
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
                className="text-center p-8 text-gray-500"
              >
                No payments found
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-4 align-middle"
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
