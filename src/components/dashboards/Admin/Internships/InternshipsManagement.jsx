import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  useDeleteInternshipsDomainMutation,
} from "../../../../Services/admin/internshipsDomainService";
import { useModal, MODAL_TYPES } from "../Modals/ModalContext";
import { useGetAllInternshipsDomainsQuery } from "../../../../Services/paymentServices/internshipsServices";
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
    return <p className="tw-p-6">Loading internship domains...</p>;
  }

  if (isError) {
    return (
      <p className="tw-p-6 tw-text-rose-600">
        Failed to load internship domains
      </p>
    );
  }

  return (
    <div className="tw-py-3 tw-space-y-8">
      {/* ================= HEADER ================= */}
      <div className="tw-flex tw-items-start tw-justify-between">
        <div>
          <h1 className="tw-text-xl tw-font-semibold">
            Internship Domains
          </h1>
          <p className="tw-text-sm tw-text-slate-500">
            Manage internship domains and durations
          </p>

          {/* FILTER */}
          <div className="tw-mt-3 tw-flex tw-gap-2">
            <button
              onClick={() => setFilter("active")}
              className={`tw-rounded-lg tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium
                ${filter === "active"
                  ? "tw-bg-indigo-600 tw-text-white"
                  : "tw-bg-slate-100 tw-text-slate-600 hover:tw-bg-slate-200"
                }`}
            >
              Active
            </button>

            <button
              onClick={() => setFilter("all")}
              className={`tw-rounded-lg tw-px-4 tw-py-1.5 tw-text-sm tw-font-medium
                ${filter === "all"
                  ? "tw-bg-indigo-600 tw-text-white"
                  : "tw-bg-slate-100 tw-text-slate-600 hover:tw-bg-slate-200"
                }`}
            >
              All
            </button>
          </div>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => openModal(MODAL_TYPES.ADD_INTERNSHIP_DOMAIN)}
          className="tw-flex tw-items-center tw-gap-2 tw-rounded-lg tw-bg-indigo-600 tw-px-4 tw-py-2 tw-text-sm tw-font-semibold tw-text-white hover:tw-bg-indigo-700"
        >
          <FiPlus /> Add Domain
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="tw-overflow-x-auto tw-rounded-xl tw-border tw-bg-white">
        <table className="tw-w-full tw-text-sm">
          <thead className="tw-bg-slate-50 tw-text-left">
            <tr>
              <th className="tw-px-4 tw-py-3">Domain</th>
              <th className="tw-px-4 tw-py-3">Level</th>
              <th className="tw-px-4 tw-py-3">Durations</th>
              <th className="tw-px-4 tw-py-3 tw-text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {domains.map((domain) => (
              <tr
                key={domain._id}
                className="tw-border-t hover:tw-bg-slate-50"
              >
                {/* DOMAIN */}
                <td className="tw-px-4 tw-py-3">
                  <div className="tw-flex tw-items-center tw-gap-2">
                    <p className="tw-font-medium">{domain.name}</p>
                    {!domain.isActive && (
                      <span className="tw-rounded-full tw-bg-rose-100 tw-px-2 tw-text-xs tw-text-rose-600">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="tw-text-xs tw-text-slate-500">
                    {domain.focus}
                  </p>
                </td>

                {/* LEVEL */}
                <td className="tw-px-4 tw-py-3">
                  {domain.level}
                </td>

                {/* DURATIONS */}
                <td className="tw-px-4 tw-py-3">
                  <div className="tw-space-y-1">
                    {domain.durations.map((d, idx) => (
                      <div key={idx} className="tw-text-xs">
                        {d.days} days – ₹{d.fee}
                      </div>
                    ))}
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="tw-px-4 tw-py-3 tw-text-right">
                  <div className="tw-flex tw-justify-end tw-gap-3">
                    <button
                      onClick={() =>
                        openModal(
                          MODAL_TYPES.EDIT_INTERNSHIP_DOMAIN,
                          { domain }
                        )
                      }
                      className="tw-text-indigo-600 hover:tw-text-indigo-800"
                    >
                      <FiEdit2 />
                    </button>

                    <button
                      disabled={isDeleting}
                      onClick={() => handleDelete(domain._id)}
                      className="tw-text-rose-600 hover:tw-text-rose-800 disabled:tw-opacity-50"
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
                  className="tw-p-6 tw-text-center tw-text-slate-500"
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
