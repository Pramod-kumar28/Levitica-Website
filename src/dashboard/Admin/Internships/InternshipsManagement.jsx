import { useState } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import {
  useDeleteInternshipsDomainMutation,
} from '@/Services/admin/internshipsDomainService';
import { useModal, MODAL_TYPES } from '@/dashboard/Admin/Modals/ModalContext';
import { useGetAllInternshipsDomainsQuery } from '@/Services/paymentServices/internshipsServices';
import { useTheme } from '@/context/ThemeContext';

const InternshipsDomainManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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
      <div className={`flex items-center justify-center py-16 ${isDark ? 'bg-slate-900 min-h-screen' : ''}`}>
        <div className="space-y-3 text-center">
          <div className={`mx-auto h-12 w-12 animate-spin rounded-full border-4 ${isDark ? 'border-slate-700 border-t-indigo-500' : 'border-slate-200 border-t-indigo-600'}`}></div>
          <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Loading internship domains...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`mx-auto flex max-w-md items-center gap-4 rounded-xl border p-4 ${isDark ? 'bg-rose-950/40 border-rose-900/50' : 'border-rose-200 bg-rose-50'}`}>
        <FiAlertCircle className={`h-8 w-8 flex-shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`} />
        <div>
          <p className={`font-medium ${isDark ? 'text-rose-300' : 'text-rose-900'}`}>Failed to load</p>
          <p className={`text-sm ${isDark ? 'text-rose-400' : 'text-rose-700'}`}>Unable to fetch internship domains</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 py-6 transition-colors ${isDark ? 'bg-slate-900 min-h-screen' : ''}`}>
      {/* ================= HEADER SECTION ================= */}
      <div className={`flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between px-4 sm:px-6 ${isDark ? 'bg-slate-800 rounded-xl p-6' : ''}`}>
        <div className="space-y-1">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Internship Domains
          </h1>
          <p className={`text-sm sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            Create and manage domain-based internship programs
          </p>
        </div>

        {/* ADD BUTTON */}
        <button
          onClick={() => openModal(MODAL_TYPES.ADD_INTERNSHIP_DOMAIN)}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold shadow-lg transition-all hover:shadow-xl active:scale-95 w-full sm:w-auto ${isDark ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800' : 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white hover:from-indigo-700 hover:to-indigo-800'}`}
        >
          <FiPlus className="h-4 w-4 sm:h-5 sm:w-5" /> Add New Domain
        </button>
      </div>

      {/* ================= FILTER SECTION ================= */}
      <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3 px-4 sm:px-6">
        <button
          onClick={() => setFilter("active")}
          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${filter === "active"
              ? isDark 
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-indigo-600 text-white shadow-md'
              : isDark
              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
        >
          Active Domains
        </button>

        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-2.5 text-sm font-semibold transition-all sm:px-6 ${filter === "all"
              ? isDark
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-indigo-600 text-white shadow-md'
              : isDark
              ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
        >
          All Domains
        </button>
      </div>

      {/* ================= TABLE SECTION ================= */}
      <div className={`overflow-hidden rounded-2xl border shadow-sm ${isDark ? 'bg-slate-800 border-slate-700' : 'border-slate-200 bg-white'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${isDark ? 'border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700' : 'border-slate-200 bg-gradient-to-r from-slate-50 to-slate-100'}`}>
                <th className={`px-2 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Domain</th>
                <th className={`px-2 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Level</th>
                <th className={`px-2 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Durations</th>
                <th className={`px-2 sm:px-6 py-3 sm:py-4 text-right text-xs sm:text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Actions</th>
              </tr>
            </thead>

            <tbody className={`divide-y ${isDark ? 'divide-slate-700' : 'divide-slate-100'}`}>
              {domains.map((domain, idx) => (
                <tr
                  key={domain._id}
                  className={`transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}
                >
                  {/* DOMAIN */}
                  <td className="px-3 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center gap-2 sm:gap-4">
                      {/* ICON CENTER */}
                      <div className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl shrink-0 ${isDark ? 'bg-indigo-950 text-indigo-400' : 'bg-indigo-100 text-indigo-600'}`}>
                        <span className="text-base sm:text-lg font-bold">
                          {domain.name.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* TEXT SECTION */}
                      <div className="flex flex-col justify-center leading-tight min-w-0 flex-1">

                        {/* TITLE + ACTIVE */}
                        <div className="flex items-center gap-1 flex-wrap">
                          <p className={`font-semibold text-xs sm:text-sm truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {domain.name}
                          </p>

                          {domain.isActive ? (
                            <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 whitespace-nowrap ${isDark ? 'bg-emerald-950 text-emerald-300' : 'bg-emerald-100 text-emerald-700'}`}>
                              <FiCheckCircle className="h-2.5 w-2.5" />
                              <span className="text-[10px] sm:text-[11px] font-medium">
                                Active
                              </span>
                            </span>
                          ) : (
                            <span className={`rounded-full px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium whitespace-nowrap ${isDark ? 'bg-rose-950 text-rose-300' : 'bg-rose-100 text-rose-700'}`}>
                              Inactive
                            </span>
                          )}
                        </div>

                        {/* FOCUS (NO GAP) */}
                        <p className={`text-[11px] sm:text-xs mt-[2px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Focus: {domain.focus}
                        </p>

                      </div>
                    </div>
                  </td>

                  {/* LEVEL */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    <span className={`inline-flex rounded-lg px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-sm font-medium ${isDark ? 'bg-blue-950 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                      {domain.level}
                    </span>
                  </td>

                  {/* DURATIONS */}
                  <td className="px-2 sm:px-6 py-3 sm:py-4">
                    <div className="space-y-1">
                      {domain.durations.slice(0, 2).map((d, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-1 sm:gap-2 rounded-lg px-2 sm:px-3 py-1 sm:py-1.5 ${isDark ? 'bg-slate-700' : 'bg-slate-50'}`}
                        >
                          <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                            {d.days}d
                          </span>
                          <span className={`inline-block h-0.5 w-0.5 sm:h-1 sm:w-1 rounded-full ${isDark ? 'bg-slate-600' : 'bg-slate-300'}`}></span>
                          <span className={`font-semibold text-[10px] sm:text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>₹{d.fee.toLocaleString()}</span>
                        </div>
                      ))}
                      {domain.durations.length > 2 && (
                        <div className={`text-[10px] sm:text-xs px-2 sm:px-3 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>+{domain.durations.length - 2} more</div>
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
                        className={`inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 transition-colors active:scale-95 ${isDark ? 'text-indigo-400 hover:bg-indigo-950 hover:text-indigo-300' : 'text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700'}`}
                        title="Edit domain"
                      >
                        <FiEdit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>

                      <button
                        disabled={isDeleting}
                        onClick={() => handleDelete(domain._id)}
                        className={`inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 transition-colors disabled:opacity-50 active:scale-95 ${isDark ? 'text-rose-400 hover:bg-rose-950 hover:text-rose-300' : 'text-rose-600 hover:bg-rose-50 hover:text-rose-700'}`}
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
                  <td colSpan={4} className={`px-4 sm:px-6 py-8 sm:py-12 ${isDark ? 'bg-slate-800' : ''}`}>
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className={`rounded-full p-3 ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
                        <FiAlertCircle className={`h-6 w-6 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
                      </div>
                      <div className="text-center">
                        <p className={`font-medium text-sm sm:text-base ${isDark ? 'text-slate-300' : 'text-slate-900'}`}>No domains found</p>
                        <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
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
