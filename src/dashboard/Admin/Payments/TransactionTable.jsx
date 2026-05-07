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
import { useTheme } from '@/context/ThemeContext';
import { motion } from "framer-motion";

const columnHelper = createColumnHelper();

// Status Badge Styling with Theme Colors
const statusStyles = {
  light: {
    paid: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    failed: "bg-rose-500/10 text-rose-600 border border-rose-500/20",
    created: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    attempted: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
  },
  dark: {
    paid: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
    failed: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
    created: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
    attempted: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  }
};

const PaymentsTable = ({ data = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

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
        cell: (info) => (
          <span className={`font-mono text-xs ${isDark ? 'text-gray' : 'text-gray'}`}>
            {info.getValue()?.slice(-8) || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("paymentId", {
        header: "Payment ID",
        cell: (info) => (
          <span className={`font-mono text-xs ${isDark ? 'text-gray' : 'text-gray'}`}>
            {info.getValue()?.slice(-8) || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("name", {
        header: "User",
        cell: (info) => (
          <span className={`font-medium ${isDark ? 'text-white' : 'text-midnight_text'}`}>
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("email", {
        header: "Email",
        cell: (info) => (
          <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("title", {
        header: "Course / Domain",
        cell: (info) => (
          <span className={`font-medium ${isDark ? 'text-white' : 'text-midnight_text'}`}>
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("type", {
        header: "Type",
        cell: (info) => (
          <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${
            info.getValue() === "course"
              ? isDark ? 'bg-primary/20 text-primary' : 'bg-primary/10 text-primary'
              : isDark ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/10 text-purple-600'
          }`}>
            {info.getValue()?.toUpperCase() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("paymentMode", {
        header: "Mode",
        cell: (info) => (
          <span className={`text-sm font-medium ${isDark ? 'text-gray' : 'text-gray'}`}>
            {info.getValue()?.toUpperCase() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("appUsed", {
        header: "App Used",
        cell: (info) => (
          <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
            {info.getValue() || "-"}
          </span>
        ),
      }),

      columnHelper.accessor("amount", {
        header: "Amount",
        cell: (info) => (
          <span className={`font-bold ${isDark ? 'text-primary' : 'text-primary'}`}>
            ₹{info.getValue()?.toLocaleString()}
          </span>
        ),
      }),

      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => {
          const value = info.getValue();
          const style = isDark ? statusStyles.dark[value] : statusStyles.light[value];
          return (
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${style || (isDark ? "bg-darklight text-gray" : "bg-light text-gray")}`}
            >
              {value || "-"}
            </span>
          );
        },
      }),

      columnHelper.accessor("createdAt", {
        header: "Date",
        cell: (info) => (
          <span className={`text-sm ${isDark ? 'text-gray' : 'text-gray'}`}>
            {info.getValue() ? new Date(info.getValue()).toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }) : "-"}
          </span>
        ),
      }),
    ],
    [isDark]
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

  return (
    <div className={`rounded-xl border shadow-property overflow-hidden ${
      isDark
        ? 'bg-semidark border-dark_border'
        : 'bg-white border-border'
    }`}>

      {/* Filters Section */}
      <div className={`p-4 sm:p-5 `}>
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center flex-wrap grid md:grid-cols-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[250px]">
            <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray`} />
            <input
              type="text"
              placeholder="Search by name, email, order ID..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                isDark
                  ? 'bg-darklight border-dark_border text-white placeholder-gray focus:border-primary focus:ring-primary/30'
                  : 'bg-light border-border text-midnight_text placeholder-gray focus:border-primary focus:ring-primary/20'
              }`}
            />
          </div>

          {/* Course/Domain Filter */}
          <select
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className={`px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
              isDark
                ? 'bg-darklight border-dark_border text-white focus:border-primary focus:ring-primary/30'
                : 'bg-light border-border text-midnight_text focus:border-primary focus:ring-primary/20'
            }`}
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
            className={`px-4 py-2 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
              isDark
                ? 'bg-darklight border-dark_border text-white focus:border-primary focus:ring-primary/30'
                : 'bg-light border-border text-midnight_text focus:border-primary focus:ring-primary/20'
            }`}
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
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition shadow-md hover:shadow-lg ${
              isDark
                ? 'bg-primary hover:bg-skyBlue text-white'
                : 'bg-primary hover:bg-skyBlue text-white'
            }`}
          >
            <FiDownload className="h-4 w-4" /> Download
          </button>
        </div>

        {/* Filter Summary */}
        {(globalFilter || statusFilter || titleFilter) && (
          <div className={`mt-3 text-xs font-medium text-gray`}>
            Showing {filteredData.length} of {data.length} payments
          </div>
        )}
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="min-w-[800px] w-full text-sm">
          {/* HEADER */}
          <thead className={`border-b ${
            isDark
              ? 'bg-darklight border-dark_border'
              : 'bg-light border-border'
          }`}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`px-4 py-3 text-left font-semibold text-xs uppercase tracking-wide cursor-pointer select-none transition ${
                      isDark
                        ? 'text-gray hover:bg-darklight/80'
                        : 'text-gray hover:bg-light/80'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {header.column.getCanSort() && (
                        <span className="text-gray">
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
          <tbody className={`divide-y ${
            isDark ? 'divide-dark_border' : 'divide-border'
          }`}>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`h-14 w-14 rounded-full flex items-center justify-center ${
                      isDark ? 'bg-darklight' : 'bg-light'
                    }`}>
                      <FiSearch className={`h-6 w-6 text-gray`} />
                    </div>
                    <p className={`font-medium text-sm ${isDark ? 'text-white' : 'text-midnight_text'}`}>No payments found</p>
                    <p className={`text-xs text-gray`}>
                      Try adjusting your filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`transition-colors ${
                    isDark
                      ? 'hover:bg-darklight'
                      : 'hover:bg-light'
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`px-4 py-3 align-middle whitespace-nowrap ${
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      {filteredData.length > 0 && (
        <div className={`px-4 py-3 border-t text-xs font-medium ${
          isDark
            ? 'border-dark_border bg-darklight text-gray'
            : 'border-border bg-light text-gray'
        }`}>
          Displaying {table.getRowModel().rows.length} of {filteredData.length} payments
        </div>
      )}
    </div>
  );
};

export default PaymentsTable;