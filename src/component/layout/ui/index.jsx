
export const Badge = ({ label, variant = "default" }) => {
  const variants = {
    default:  "bg-slate-100 text-slate-600",
    active:   "bg-emerald-50 text-emerald-700 border border-emerald-200",
    disabled: "bg-slate-100 text-slate-400 border border-slate-200",
    critical: "bg-red-50 text-red-700 border border-red-200",
    warning:  "bg-amber-50 text-amber-700 border border-amber-200",
    info:     "bg-blue-50 text-blue-700 border border-blue-200",
    apx:      "bg-indigo-50 text-indigo-700 border border-indigo-200",
    mrd:      "bg-cyan-50 text-cyan-700 border border-cyan-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide ${variants[variant] || variants.default}`}>
      {label}
    </span>
  );
};

export const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative inline-flex w-9 h-5 rounded-full transition-colors duration-200 focus:outline-none ${checked ? "bg-indigo-600" : "bg-slate-200"}`}
  >
    <span className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 mt-0.5 ${checked ? "translate-x-4" : "translate-x-0.5"}`} />
  </button>
);

export const Modal = ({ title, onClose, children, size = "md" }) => {
  const sizes = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl", xl: "max-w-4xl" };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${sizes[size]} overflow-hidden flex flex-col max-h-[90vh]`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 flex-shrink-0">
          <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors text-lg leading-none">✕</button>
        </div>
        <div className="overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

export const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="text-lg font-bold text-slate-800 tracking-tight">{title}</h2>
      {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-100 shadow-sm ${className}`}>{children}</div>
);

export const CardHeader = ({ title, subtitle, right }) => (
  <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
    <div>
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      {subtitle && <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
    </div>
    {right}
  </div>
);

export const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex gap-1 p-1 bg-slate-100 rounded-lg w-fit flex-wrap">
    {tabs.map(t => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${active === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
      >
        {t}
      </button>
    ))}
  </div>
);

export const Input = ({ label, type = "text", placeholder, value, onChange }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>}
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
    />
  </div>
);

export const Select = ({ label, options, value, onChange }) => (
  <div>
    {label && <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>}
    <select
      value={value}
      onChange={onChange}
      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
    >
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  </div>
);

export const BtnPrimary = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);

export const BtnSecondary = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${className}`}
  >
    {children}
  </button>
);
