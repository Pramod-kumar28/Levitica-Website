import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { FiSearch, FiDownload, FiArrowUp, FiArrowDown } from "react-icons/fi";
import { useDownloadPaymentsExcelMutation } from '@/Services/admin/studentReportsServices';



const columnHelper = createColumnHelper();

// 🎨 Status Badge Styling
const statusStyles = {
  paid: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  failed: "bg-red-100 text-red-700 border border-red-200",
  created: "bg-amber-100 text-amber-700 border border-amber-200",
  attempted: "bg-blue-100 text-blue-700 border border-blue-200",
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
          <span className="text-slate-700 font-semibold">
            {info.getValue()?.toUpperCase()}
          </span>
        ),
      }),

      columnHelper.accessor("appUsed", {
        header: "App Used",
        cell: (info) => (
          <span className="text-slate-600 text-sm">
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className="font-bold text-slate-900">
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
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[value] || "bg-slate-100 text-slate-600"
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
          <span className="text-slate-600 text-sm font-medium">
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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden">

      {/* 🔎 Filters Section */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, email, order ID..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Course/Domain Filter */}
          <select
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">All Courses / Internships</option>
            {uniqueTitles.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">All Status</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="created">Created</option>
            <option value="attempted">Attempted</option>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownloadExcel}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg transition-all active:scale-95"
          >
            <FiDownload className="h-4 w-4" /> Download
          </button>
        </div>

        {/* Filter Summary */}
        {(globalFilter || statusFilter || titleFilter) && (
          <div className="mt-3 text-xs text-slate-600 font-medium">
            Showing {filteredData.length} of {data.length} payments
          </div>
        )}
      </div>

      {/* 📋 Table */}
    <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
  
  {/* SCROLL CONTAINER */}
  <div className="w-full overflow-x-auto">
    <table className="min-w-[700px] w-full text-sm">
      
      {/* HEADER */}
      <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                onClick={header.column.getToggleSortingHandler()}
                className="px-4 sm:px-6 py-3 text-left font-semibold text-slate-800 text-[11px] sm:text-xs uppercase tracking-wide cursor-pointer select-none hover:bg-slate-100 transition"
              >
                <div className="flex items-center gap-1.5 whitespace-nowrap">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}

                  {header.column.getCanSort() && (
                    <span className="text-slate-400">
                      {header.column.getIsSorted() === "asc" && (
                        <FiArrowUp className="h-3.5 w-3.5" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <FiArrowDown className="h-3.5 w-3.5" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      {/* BODY */}
      <tbody className="divide-y divide-slate-100">
        {table.getRowModel().rows.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length}
              className="text-center py-10 text-slate-500"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center">
                  <FiSearch className="h-6 w-6 text-slate-400" />
                </div>
                <p className="font-medium text-sm">No payments found</p>
                <p className="text-xs text-slate-400">
                  Try adjusting your filters
                </p>
              </div>
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-slate-50 transition even:bg-slate-50/40"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 sm:px-6 py-3 align-middle text-slate-700 whitespace-nowrap"
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
</div>

      {/* Footer Info */}
      {filteredData.length > 0 && (
        <div className="px-4 sm:px-6 py-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 font-medium">
          Displaying {table.getRowModel().rows.length} of {filteredData.length} payments
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;
