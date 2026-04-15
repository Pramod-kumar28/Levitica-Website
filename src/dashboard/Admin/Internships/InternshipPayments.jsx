import React, { useState } from "react";
import { useGetAllInternshipPaymentsQuery } from '@/dashboard/services/adminPaymentApi';

const StatusBadge = ({ status }) => {
  const map = {
    paid: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700",
    created: "bg-yellow-100 text-yellow-700",
    attempted: "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}>
      {status.toUpperCase()}
    </span>
  );
};

const InternshipPayments = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } =
    useGetAllInternshipPaymentsQuery({
      page,
      limit: 10,
      search,
    });

  if (isLoading) {
    return <p className="p-6">Loading payments...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-600">Failed to load data</p>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Internship Payments</h2>

        <input
          type="text"
          placeholder="Search student / email / roll"
          className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 text-left">Student</th>
              <th className="p-3">Internship</th>
              <th className="p-3">College</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Paid On</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-3">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.email}</p>
                  <p className="text-xs">Roll: {p.rollNumber}</p>
                </td>

                <td className="p-3">
                  <p className="font-medium">{p.domain}</p>
                  <p className="text-xs">{p.department}</p>
                </td>

                <td className="p-3">
                  <p className="text-sm">{p.collegeName}</p>
                  <p className="text-xs text-gray-500">{p.collegeCode}</p>
                </td>

                <td className="p-3 font-semibold">
                  ₹{p.amount}
                </td>

                <td className="p-3">
                  <StatusBadge status={p.status} />
                </td>

                <td className="p-3 text-sm">
                  {p.status === "paid"
                    ? new Date(p.updatedAt).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= data.pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InternshipPayments;
