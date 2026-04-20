import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
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
    return (
      <div className="flex items-center justify-center py-16">
        <div className="space-y-3 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
          <p className="text-sm font-medium text-slate-600">Loading internship domains...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex max-w-md items-center gap-4 rounded-xl border border-rose-200 bg-rose-50 p-4">
        <FiAlertCircle className="h-8 w-8 flex-shrink-0 text-rose-600" />
        <div>
          <p className="font-medium text-rose-900">Failed to load</p>
          <p className="text-sm text-rose-700">Unable to fetch internship domains</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-6">
      {/* ================= HEADER SECTION ================= */}
      <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Internship Domains
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Create and manage domain-based internship programs
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => openModal(MODAL_TYPES.ADD_INTERNSHIP_DOMAIN)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-700 px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:from-indigo-700 hover:to-indigo-800 active:scale-95 w-full sm:w-auto"
        >
          <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" /> Add New Domain
        </button>
      </div>

      {/* ================= FILTER SECTION ================= */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
        <button
          onClick={() => setFilter("active")}
          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${filter === "active"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
        >
          Active Domains
        </button>

        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${filter === "all"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
        >
          All Domains
        </button>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100">
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Domain</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Level</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-slate-700">Durations</th>
                <th className="px-2 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {domains.map((domain, idx) => (
                <tr
                  key={domain._id}
                  className="transition-colors hover:bg-slate-50"
                >
                  {/* DOMAIN */}
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* ICON CENTER */}
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl bg-indigo-100 shrink-0">
                        <span className="text-base sm:text-lg font-bold text-indigo-600">
                          {domain.name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* TEXT SECTION */}
                      <div className="flex flex-col justify-center leading-tight min-w-0 flex-1">

                        {/* TITLE + ACTIVE */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <p className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                            {domain.name}
                          </p>

                          {domain.isActive ? (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-0.5 whitespace-nowrap">
                              <FiCheckCircle className="h-2.5 w-2.5 text-emerald-600" />
                              <span className="text-[10px] sm:text-[11px] font-medium text-emerald-700">
                                Active
                              </span>
                            </span>
                          ) : (
                            <span className="rounded-full bg-rose-100 px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-rose-700 whitespace-nowrap">
                              Inactive
                            </span>
                          )}
                        </div>

                        {/* FOCUS (NO GAP) */}
                        <p className="text-[11px] sm:text-xs text-slate-500 mt-[2px] truncate">
                          Focus: {domain.focus}
                        </p>

                      </div>
                    </div>
                  </td>

                  {/* LEVEL */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    <span className="inline-flex rounded-lg bg-blue-100 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm font-medium text-blue-700">
                      {domain.level}
                    </span>
                  </td>

                  {/* DURATIONS */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    <div className="space-y-1">
                      {domain.durations.slice(0, 2).map((d, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1 sm:gap-2 rounded-lg bg-slate-50 px-2 sm:px-3 py-1 sm:py-1.5"
                        >
                          <span className="text-[10px] sm:text-xs font-medium text-slate-700 whitespace-nowrap">
                            {d.days}d
                          </span>
                          <span className="inline-block h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full bg-slate-300"></span>
                          <span className="font-semibold text-slate-900 text-[10px] sm:text-sm">₹{d.fee.toLocaleString()}</span>
                        </div>
                      ))}
                      {domain.durations.length > 2 && (
                        <div className="text-[10px] sm:text-xs text-slate-500 px-2 sm:px-3">+{domain.durations.length - 2} more</div>
                      )}
                    </div>
                  </td>

                  {/* ACTIONS */}
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex justify-end gap-1 sm:gap-2">
                      <button
                        onClick={() =>
                          openModal(
                            MODAL_TYPES.EDIT_INTERNSHIP_DOMAIN,
                            { domain }
                          )
                        }
                        className="inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 text-indigo-600 transition-colors hover:bg-indigo-50 hover:text-indigo-700 active:scale-95"
                        title="Edit domain"
                      >
                        <FiEdit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>

                      <button
                        disabled={isDeleting}
                        onClick={() => handleDelete(domain._id)}
                        className="inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 text-rose-600 transition-colors hover:bg-rose-50 hover:text-rose-700 disabled:opacity-50 active:scale-95"
                        title="Delete domain"
                      >
                        <FiTrash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {domains.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 sm:px-6 py-8 sm:py-12">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="rounded-full bg-slate-100 p-3">
                        <FiAlertCircle className="h-6 w-6 text-slate-400" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-slate-900 text-sm sm:text-base">No domains found</p>
                        <p className="text-xs sm:text-sm text-slate-500">
                          Create your first internship domain to get started
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InternshipsDomainManagement;
