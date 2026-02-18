import { useState } from "react";
import { FiX } from "react-icons/fi";

// ─────────────────────────────────────────────
// STATUS BADGE
// ─────────────────────────────────────────────
export function StatusBadge({ status }) {
  const map = {
    low:        "bg-red-50 text-red-700 border border-red-200",
    overdue:    "bg-red-50 text-red-700 border border-red-200",
    critical:   "bg-red-50 text-red-700 border border-red-200",
    due_soon:   "bg-amber-50 text-amber-700 border border-amber-200",
    warning:    "bg-amber-50 text-amber-700 border border-amber-200",
    pending:    "bg-amber-50 text-amber-700 border border-amber-200",
    prepared:   "bg-blue-50 text-blue-700 border border-blue-200",
    dispatched: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    ok:         "bg-emerald-50 text-emerald-700 border border-emerald-200",
    active:     "bg-emerald-50 text-emerald-700 border border-emerald-200",
    in:         "bg-emerald-50 text-emerald-700 border border-emerald-200",
    out:        "bg-slate-100 text-slate-600",
  };
  const label = {
    low: "Low Stock", overdue: "Overdue", due_soon: "Due Soon",
    pending: "Pending", prepared: "Prepared", dispatched: "Dispatched",
    ok: "OK", in: "IN", out: "OUT", critical: "Critical", active: "Active",
  };
  const key = status?.toLowerCase();
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${map[key] || "bg-slate-100 text-slate-500"}`}>
      {label[key] || status}
    </span>
  );
}

// ─────────────────────────────────────────────
// SUMMARY CARD
// ─────────────────────────────────────────────
export function SummaryCard({ label, value, sub, icon: Icon, iconBg, critical }) {
  return (
    <div className={`bg-white rounded-xl border shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition-shadow ${critical ? "border-red-200 bg-red-50/30" : "border-slate-100"}`}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {Icon && <Icon className="text-white" size={20} />}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{label}</p>
        <p className={`text-2xl font-black leading-tight mt-0.5 ${critical ? "text-red-600" : "text-slate-800"}`}>{value}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MODAL
// ─────────────────────────────────────────────
export function Modal({ title, onClose, children, size = "md" }) {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} overflow-hidden flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h3 className="text-sm font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
            <FiX size={16} />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// CARD WRAPPER
// ─────────────────────────────────────────────
export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div>
        <p className="text-sm font-bold text-slate-700">{title}</p>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {right && <div>{right}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────
// SEARCH INPUT
// ─────────────────────────────────────────────
export function SearchInput({ placeholder, value, onChange, icon: Icon }) {
  return (
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />}
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full border border-slate-200 rounded-lg py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${Icon ? "pl-9 pr-3" : "px-3"}`}
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────
export function EmptyState({ message = "No records found" }) {
  return (
    <div className="text-center py-12 text-slate-400">
      <p className="text-sm">{message}</p>
    </div>
  );
}
