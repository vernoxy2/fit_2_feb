import { FiUpload, FiX, FiFile } from "react-icons/fi";

// ═══════════════════════════════════════════════════════════
// STATUS BADGE
// ═══════════════════════════════════════════════════════════
export function StatusBadge({ status }) {
  const map = {
    draft:             { bg: "bg-slate-100",   text: "text-slate-600",   label: "Draft" },
    pending_approval:  { bg: "bg-amber-50",    text: "text-amber-700",   label: "Pending Approval", border: "border-amber-200" },
    approved:          { bg: "bg-emerald-50",  text: "text-emerald-700", label: "Approved", border: "border-emerald-200" },
    rejected:          { bg: "bg-red-50",      text: "text-red-700",     label: "Rejected", border: "border-red-200" },
    dispatched:        { bg: "bg-blue-50",     text: "text-blue-700",    label: "Dispatched", border: "border-blue-200" },
    completed:         { bg: "bg-green-50",    text: "text-green-700",   label: "Completed", border: "border-green-200" },
    normal:            { bg: "bg-slate-100",   text: "text-slate-600",   label: "Normal" },
    high:              { bg: "bg-orange-50",   text: "text-orange-700",  label: "High", border: "border-orange-200" },
    urgent:            { bg: "bg-red-50",      text: "text-red-700",     label: "Urgent", border: "border-red-200" },
    manual:            { bg: "bg-indigo-50",   text: "text-indigo-700",  label: "Manual", border: "border-indigo-200" },
    uploaded:          { bg: "bg-purple-50",   text: "text-purple-700",  label: "Uploaded", border: "border-purple-200" },
  };
  const s = map[status] || map.draft;
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${s.bg} ${s.text} ${s.border ? `border ${s.border}` : ""}`}>
      {s.label}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════
// FORM SECTION
// ═══════════════════════════════════════════════════════════
export function FormSection({ title, children }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-800 mb-4 pb-3 border-b border-slate-100">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CARD
// ═══════════════════════════════════════════════════════════
export function Card({ children, className = "" }) {
  return <div className={`bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden ${className}`}>{children}</div>;
}

export function CardHeader({ title, subtitle, right }) {
  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
      <div>
        <p className="text-sm font-bold text-slate-700">{title}</p>
        {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
      </div>
      {right}
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
// ═══════════════════════════════════════════════════════════
// INPUT
// ═══════════════════════════════════════════════════════════
export function Input({ label, type = "text", value, onChange, placeholder, required, disabled, readOnly, className = "" }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-slate-600 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${disabled || readOnly ? "bg-slate-50" : ""} ${className}`}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SELECT
// ═══════════════════════════════════════════════════════════
export function Select({ label, value, onChange, options, required, disabled }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-slate-600 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
      >
        {options.map(opt => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TEXTAREA
// ═══════════════════════════════════════════════════════════
export function Textarea({ label, value, onChange, placeholder, rows = 3, required }) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-bold text-slate-600 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TOGGLE
// ═══════════════════════════════════════════════════════════
export function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center gap-3">
      {label && <span className="text-xs font-bold text-slate-600">{label}</span>}
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-indigo-600" : "bg-slate-200"}`}
      >
        <span className={`inline-block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 mt-0.5 ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </button>
      {checked && <span className="text-xs font-semibold text-indigo-600">YES</span>}
      {!checked && <span className="text-xs font-semibold text-slate-400">NO</span>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// FILE UPLOAD
// ═══════════════════════════════════════════════════════════
export function FileUpload({ label, file, onChange, onRemove }) {
  return (
    <div>
      {label && <label className="block text-xs font-bold text-slate-600 mb-1.5">{label}</label>}
      {!file ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-lg p-4 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer">
          <FiUpload size={24} className="text-slate-400 mb-2" />
          <span className="text-xs text-slate-500 font-medium">Click to upload file</span>
          <span className="text-[10px] text-slate-400 mt-0.5">PDF, Excel, or Image (Max 5MB)</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png"
            onChange={onChange}
          />
        </label>
      ) : (
        <div className="flex items-center justify-between border border-slate-200 rounded-lg p-3 bg-slate-50">
          <div className="flex items-center gap-2">
            <FiFile size={16} className="text-indigo-600" />
            <span className="text-xs font-semibold text-slate-700">{file.name}</span>
            <span className="text-[10px] text-slate-400">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
          <button
            onClick={onRemove}
            className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
          >
            <FiX size={14} />
          </button>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MODAL
// ═══════════════════════════════════════════════════════════
export function Modal({ title, onClose, children, size = "md" }) {
  const sizes = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl", "2xl": "max-w-6xl" };
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

// ═══════════════════════════════════════════════════════════
// BUTTONS
// ═══════════════════════════════════════════════════════════
export function BtnPrimary({ children, onClick, className = "", disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function BtnSecondary({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export function BtnDanger({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
