import { AnimatePresence } from "framer-motion";
import { MODAL_TYPES, useModal } from '@/dashboard/Admin/Modals/ModalContext';
import { useState } from "react";
import { FiPlus, FiGrid, FiList } from "react-icons/fi";
import { useTheme } from '@/context/ThemeContext';

import {
  useGetPromosQuery,
  useDeletePromoMutation,
  useTogglePromoMutation,
} from '@/Services/admin/promocodeServices';

import PromoCardView from "./PromoCodeviews/PromocodeCards";
import PromoTableView from "./PromoCodeviews/PromocodeTable";

const PromoCodeManagement = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { data: promos = [], isLoading } = useGetPromosQuery();
  const [deletePromo] = useDeletePromoMutation();
  const [togglePromo] = useTogglePromoMutation();

  const { openModal } = useModal();
  const [view, setView] = useState("cards");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete promo?")) return;
    await deletePromo(id);
  };

  const handleToggle = async (id) => {
    await togglePromo(id);
  };

  return (
    <div className={`space-y-6 p-4 md:p-6 transition-colors ${isDark ? 'bg-slate-900 min-h-screen rounded-xl' : ''}`}>

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Title */}
        <div>
          <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Promo Management
          </h1>
          <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Manage promo codes and influencer tracking
          </p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => openModal(MODAL_TYPES.ADD_PROMO, { mode: "add" })}
          className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg w-full md:w-auto font-semibold transition-all ${isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          <FiPlus />
          Add Promo
        </button>
      </div>

      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

        {/* Count */}
        <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          {promos.length} total promos
        </span>

        {/* View Toggle */}
        <div className={`flex w-full md:w-auto rounded-lg p-1 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
          <button
            onClick={() => setView("cards")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === "cards"
                ? isDark
                  ? 'bg-slate-700 shadow font-medium text-white'
                  : 'bg-white shadow font-medium'
                : isDark
                ? 'text-slate-400'
                : ''
            }`}
          >
            <FiGrid /> Cards
          </button>

          <button
            onClick={() => setView("table")}
            className={`flex-1 md:flex-none flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
              view === "table"
                ? isDark
                  ? 'bg-slate-700 shadow font-medium text-white'
                  : 'bg-white shadow font-medium'
                : isDark
                ? 'text-slate-400'
                : ''
            }`}
          >
            <FiList /> Table
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div className={`text-center py-10 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
          Loading promos...
        </div>
      ) : promos.length === 0 ? (
        <div className={`text-center py-10 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
          No promo codes found
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {view === "cards" ? (
            <PromoCardView
              promos={promos}
              onEdit={(promo) =>
                openModal(MODAL_TYPES.ADD_PROMO, { mode: "edit", promo })
              }
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          ) : (
            <PromoTableView
              promos={promos}
              onEdit={(promo) =>
                openModal(MODAL_TYPES.ADD_PROMO, { mode: "edit", promo })
              }
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default PromoCodeManagement;