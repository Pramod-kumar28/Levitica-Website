import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useDeleteInternshipsDomainMutation,
} from '@/Services/admin/internshipsDomainService';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { useGetAllInternshipsDomainsQuery } from '@/Services/paymentServices/internshipsServices';
const InternshipsDomainManagement = () => {
  const { openModal } = useModal();


  //  FILTER STATE
  const [filter, setFilter] = useState("active");

  //  FETCH DOMAINS
  const {
    data: domainsResponse = { data: [] },
    isLoading,
    isError,
  } = useGetAllInternshipsDomainsQuery(
    filter === "all" ? { all: true } : {}
  );

  const domains = domainsResponse.data;

  //  DELETE
  const [deleteDomain, { isLoading: isDeleting }] =
    useDeleteInternshipsDomainMutation();

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this domain?")) return;
    try {
      await deleteDomain(id).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  //  STATES
  if (isLoading) {
    return <p className="p-6">Loading internship domains...</p>;
  }

  if (isError) {
    return (
      <p className="p-6 text-rose-600">
        Failed to load internship domains
      </p>
    );
  }

  return (
    <div className="py-3 space-y-8">
      {/* ================= HEADER ================= */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold">
            Internship Domains
          </h1>
          <p className="text-sm text-slate-500">
            Manage internship domains and durations
          </p>

          {/* FILTER */}
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => setFilter("active")}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium
                ${filter === "active"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("all")}
              className={`rounded-lg px-4 py-1.5 text-sm font-medium
                ${filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
            >
              All
            </button>
          </div>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => openModal(MODAL_TYPES.ADD_INTERNSHIP_DOMAIN)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          <FiPlus /> Add Domain
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto rounded-xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left">
            <tr>
              <th className="px-4 py-3">Domain</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Durations</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {domains.map((domain) => (
              <tr
                key={domain._id}
                className="border-t hover:bg-slate-50"
              >
                {/* DOMAIN */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{domain.name}</p>
                    {!domain.isActive && (
                      <span className="rounded-full bg-rose-100 px-2 text-xs text-rose-600">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">
                    {domain.focus}
                  </p>
                </td>

                {/* LEVEL */}
                <td className="px-4 py-3">
                  {domain.level}
                </td>

                {/* DURATIONS */}
                <td className="px-4 py-3">
                  <div className="space-y-1">
                    {domain.durations.map((d, idx) => (
                      <div key={idx} className="text-xs">
                        {d.days} days – ₹{d.fee}
                      </div>
                    ))}
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() =>
                        openModal(
                          MODAL_TYPES.EDIT_INTERNSHIP_DOMAIN,
                          { domain }
                        )
                      }
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      disabled={isDeleting}
                      onClick={() => handleDelete(domain._id)}
                      className="text-rose-600 hover:text-rose-800 disabled:opacity-50"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {domains.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-slate-500"
                >
                  No internship domains found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InternshipsDomainManagement;
