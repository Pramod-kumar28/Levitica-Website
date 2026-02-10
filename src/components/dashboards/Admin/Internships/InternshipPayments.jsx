import React, { useState } from "react";
import { useGetAllInternshipPaymentsQuery } from "../../services/adminPaymentApi";

const StatusBadge = ({ status }) => {
  const map = {
    paid: "tw-bg-green-100 tw-text-green-700",
    failed: "tw-bg-red-100 tw-text-red-700",
    created: "tw-bg-yellow-100 tw-text-yellow-700",
    attempted: "tw-bg-blue-100 tw-text-blue-700",
  };

  return (
    <span className={`tw-px-3 tw-py-1 tw-rounded-full tw-text-xs tw-font-semibold ${map[status]}`}>
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
    return <p className="tw-p-6">Loading payments...</p>;
  }

  if (isError) {
    return <p className="tw-p-6 tw-text-red-600">Failed to load data</p>;
  }

  return (
    <div className="tw-p-6">
      <div className="tw-flex tw-justify-between tw-items-center tw-mb-4">
        <h2 className="tw-text-2xl tw-font-bold">Internship Payments</h2>

        <input
          type="text"
          placeholder="Search student / email / roll"
          className="tw-border tw-border-gray-300 tw-rounded-lg tw-px-4 tw-py-2 tw-text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="tw-overflow-x-auto">
        <table className="tw-w-full tw-border tw-border-gray-200 tw-rounded-lg">
          <thead className="tw-bg-gray-100 tw-text-sm">
            <tr>
              <th className="tw-p-3 tw-text-left">Student</th>
              <th className="tw-p-3">Internship</th>
              <th className="tw-p-3">College</th>
              <th className="tw-p-3">Amount</th>
              <th className="tw-p-3">Status</th>
              <th className="tw-p-3">Paid On</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((p) => (
              <tr key={p._id} className="tw-border-t">
                <td className="tw-p-3">
                  <p className="tw-font-medium">{p.name}</p>
                  <p className="tw-text-xs tw-text-gray-500">{p.email}</p>
                  <p className="tw-text-xs">Roll: {p.rollNumber}</p>
                </td>

                <td className="tw-p-3">
                  <p className="tw-font-medium">{p.domain}</p>
                  <p className="tw-text-xs">{p.department}</p>
                </td>

                <td className="tw-p-3">
                  <p className="tw-text-sm">{p.collegeName}</p>
                  <p className="tw-text-xs tw-text-gray-500">{p.collegeCode}</p>
                </td>

                <td className="tw-p-3 tw-font-semibold">
                  ₹{p.amount}
                </td>

                <td className="tw-p-3">
                  <StatusBadge status={p.status} />
                </td>

                <td className="tw-p-3 tw-text-sm">
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
      <div className="tw-flex tw-justify-end tw-gap-3 tw-mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="tw-px-4 tw-py-2 tw-border tw-rounded disabled:tw-opacity-50"
        >
          Prev
        </button>
        <button
          disabled={page >= data.pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="tw-px-4 tw-py-2 tw-border tw-rounded disabled:tw-opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InternshipPayments;
